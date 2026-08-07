"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  MessageSquare,
  Sparkles,
  MapPin,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { BannerItem, defaultBanners } from "@/lib/banner-types";

export const HeroSection: React.FC = () => {
  const [banners, setBanners] = useState<BannerItem[]>(defaultBanners);
  const [showBanner, setShowBanner] = useState<boolean>(true);
  const [autoPlayInterval, setAutoPlayInterval] = useState<number>(3000); // Default 3 seconds

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchBannerData = async () => {
    try {
      const res = await fetch("/api/banner", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        if (typeof data.showBanner === "boolean") {
          setShowBanner(data.showBanner);
        }
        if (typeof data.autoPlayInterval === "number" && data.autoPlayInterval > 0) {
          setAutoPlayInterval(data.autoPlayInterval);
        }

        // Get active banners list or fallback to defaultBanners
        const loadedBanners: BannerItem[] =
          Array.isArray(data.banners) && data.banners.length > 0
            ? data.banners
            : defaultBanners;

        const activeOnly = loadedBanners.filter((b) => b.active);
        setBanners(activeOnly.length > 0 ? activeOnly : loadedBanners);
      }
    } catch (err) {
      console.error("Failed to fetch banner data in HeroSection:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBannerData();
  }, []);

  // Filter active banners
  const activeBanners = banners.filter((b) => b.active);
  const totalSlides = activeBanners.length > 0 ? activeBanners.length : 1;

  // Slide navigation helpers
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Guaranteed 3-second automatic slider mechanism
  useEffect(() => {
    if (isLoading || !showBanner || isZoomOpen || totalSlides <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isLoading, showBanner, isZoomOpen, totalSlides, autoPlayInterval, nextSlide]);

  if (!isLoading && (!showBanner || activeBanners.length === 0)) {
    return null;
  }

  const currentBanner = activeBanners[currentIndex] || activeBanners[0] || defaultBanners[0];

  const handleButtonClick = (link: string) => {
    if (link.startsWith("#")) {
      const targetId = link.substring(1);
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          const input = document.getElementById("fullName");
          if (input) input.focus();
        }, 400);
      }
    } else {
      window.location.href = link;
    }
  };

  // Framer Motion slide variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  return (
    <section className="relative pt-24 pb-8 sm:pt-32 sm:pb-12 bg-slate-950 text-white border-b border-slate-800 overflow-hidden select-none">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/30 via-slate-950 to-slate-950"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Continuous Scrolling Marquee Announcement Strip */}
        <div className="w-full overflow-hidden bg-gradient-to-r from-red-700 via-red-600 to-orange-600 rounded-2xl py-2 px-3 border border-red-500/50 shadow-xl relative">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 12,
              ease: "linear",
            }}
            className="flex whitespace-nowrap space-x-6 text-white text-xs sm:text-sm font-black tracking-wide"
          >
            <div className="flex items-center space-x-4 shrink-0">
              <span className="flex items-center gap-1.5 text-amber-300">
                <Sparkles className="w-4 h-4" />
                <span>🙏 !! जय माता दी !!</span>
              </span>
              <span>•</span>
              <span className="uppercase tracking-wider">MAA LAXMI TRAVELS GOPALGANJ</span>
              <span>•</span>
              <span>DAILY AC SEATER & SLEEPER BUS SERVICES TO ALL DESTINATIONS</span>
              <span>•</span>
              <span className="text-amber-300 font-extrabold">BOOKING: 7488202225</span>
              <span>•</span>
            </div>

            {/* Duplicate block for 100% seamless infinite marquee looping */}
            <div className="flex items-center space-x-4 shrink-0">
              <span className="flex items-center gap-1.5 text-amber-300">
                <Sparkles className="w-4 h-4" />
                <span>🙏 !! जय माता दी !!</span>
              </span>
              <span>•</span>
              <span className="uppercase tracking-wider">MAA LAXMI TRAVELS GOPALGANJ</span>
              <span>•</span>
              <span>DAILY AC SEATER & SLEEPER BUS SERVICES TO ALL DESTINATIONS</span>
              <span>•</span>
              <span className="text-amber-300 font-extrabold">BOOKING: 7488202225</span>
              <span>•</span>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Slide Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-3">

          {/* Animated Heading & Description per slide */}
          <div className="min-h-[90px] sm:min-h-[110px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBanner.id || currentIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase drop-shadow-md">
                  {currentBanner.heading}
                </h1>

                <p className="text-xs sm:text-base text-slate-300 font-medium max-w-xl mx-auto">
                  {currentBanner.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Slider Container */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
          
          {/* Top Red Progress Line (Visual 3-second timer bar) */}
          <div className="h-1.5 w-full bg-slate-950 overflow-hidden relative">
            <motion.div
              key={currentIndex}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
              className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 shadow-sm"
            />
          </div>

          {/* Main Slide Image Display */}
          <div
            className="relative w-full aspect-[2.35/1] bg-slate-950 min-h-[180px] sm:min-h-[320px] cursor-pointer overflow-hidden"
            onClick={() => setIsZoomOpen(true)}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentBanner.id || currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={currentBanner.imageUrl || "/maa-laxmi-travels-banner.png"}
                  alt={currentBanner.heading}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1200px"
                  className="object-contain object-center transition-transform duration-500 hover:scale-[1.01]"
                />
              </motion.div>
            </AnimatePresence>

            {/* Click to Zoom Overlay */}
            <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <span className="px-4 py-2 rounded-xl bg-red-600/90 text-white font-extrabold text-xs sm:text-sm shadow-xl flex items-center space-x-2 border border-red-400 backdrop-blur-xs">
                <Maximize2 className="w-4 h-4" />
                <span>Tap / Click to View Full Banner</span>
              </span>
            </div>

            {/* Slide Navigation Buttons (Left / Right) */}
            {totalSlides > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  aria-label="Previous Slide"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-slate-950/80 hover:bg-red-600 text-white border border-slate-700/80 shadow-lg backdrop-blur-md transition transform hover:scale-110 active:scale-95 cursor-pointer opacity-90 sm:opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  aria-label="Next Slide"
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-slate-950/80 hover:bg-red-600 text-white border border-slate-700/80 shadow-lg backdrop-blur-md transition transform hover:scale-110 active:scale-95 cursor-pointer opacity-90 sm:opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </>
            )}

            {/* Top Right Counter Badge */}
            {totalSlides > 1 && (
              <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-slate-950/80 text-[11px] font-bold text-amber-300 border border-slate-800 backdrop-blur-md">
                {currentIndex + 1} / {totalSlides}
              </div>
            )}
          </div>

          {/* Dots Pagination Indicators */}
          {totalSlides > 1 && (
            <div className="bg-slate-950/90 py-2.5 flex items-center justify-center space-x-2 border-t border-slate-800/60">
              {activeBanners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === currentIndex
                      ? "w-8 h-2.5 bg-gradient-to-r from-red-500 to-amber-400 shadow-md shadow-red-600/50"
                      : "w-2.5 h-2.5 bg-slate-700 hover:bg-slate-500"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Contact Bar & Call-to-action */}
          <div className="p-3 sm:p-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2 text-slate-300 text-center sm:text-left">
              <MapPin className="w-4 h-4 text-red-500 shrink-0" />
              <span className="font-semibold text-slate-200">
                Maa Laxmi Complex, Banjari Pokhara, Shiv Mandir • Gopalganj
              </span>
            </div>

            <div className="flex items-center space-x-2.5 w-full sm:w-auto shrink-0">
              <a
                href="tel:7488202225"
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition border border-slate-700 flex items-center justify-center space-x-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-red-400" />
                <span>Call: 7488202225</span>
              </a>

              <button
                onClick={() => handleButtonClick(currentBanner.buttonLink)}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black transition shadow-lg shadow-emerald-950/50 flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{currentBanner.buttonText || "Book Ticket"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Fullscreen Zoom Modal */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/95 backdrop-blur-md"
            onClick={() => setIsZoomOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl p-2 sm:p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Modal Button */}
              <button
                onClick={() => setIsZoomOpen(false)}
                className="absolute top-3 right-3 z-30 p-2 rounded-full bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-700 transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Banner Full Image */}
              <div className="relative w-full aspect-[2.35/1] min-h-[220px] sm:min-h-[380px] bg-slate-950 rounded-xl overflow-hidden">
                <Image
                  src={currentBanner.imageUrl || "/maa-laxmi-travels-banner.png"}
                  alt={currentBanner.heading}
                  fill
                  sizes="1200px"
                  className="object-contain object-center"
                />

                {/* Modal Navigation Buttons */}
                {totalSlides > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevSlide}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-950/80 hover:bg-red-600 text-white border border-slate-700 shadow-xl transition cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={nextSlide}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-950/80 hover:bg-red-600 text-white border border-slate-700 shadow-xl transition cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Modal Footer Info */}
              <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm px-2 text-slate-300">
                <span className="font-extrabold text-amber-400">
                  🙏 Maa Laxmi Travels • Mo. 7488202225 • www.maalaxmitravels.in
                </span>
                <button
                  onClick={() => {
                    setIsZoomOpen(false);
                    handleButtonClick(currentBanner.buttonLink);
                  }}
                  className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{currentBanner.buttonText || "Book Ticket"} ➔</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
