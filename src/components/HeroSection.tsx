"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageSquare, Sparkles, MapPin, Maximize2, X } from "lucide-react";
import { BannerData, defaultBannerData } from "@/lib/banner-types";

export const HeroSection: React.FC = () => {
  const [banner, setBanner] = useState<BannerData>(defaultBannerData);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const res = await fetch("/api/banner", { cache: "no-store" });
      const data = await res.json();
      if (data.success && data.banner) {
        setBanner(data.banner);
      }
    } catch (err) {
      console.error("Failed to fetch banner data in HeroSection:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // If showBanner is disabled, render nothing
  if (!isLoading && banner.showBanner === false) {
    return null;
  }

  const handleButtonClick = () => {
    if (banner.buttonLink.startsWith("#")) {
      const targetId = banner.buttonLink.substring(1);
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          const input = document.getElementById("fullName");
          if (input) input.focus();
        }, 400);
      }
    } else {
      window.location.href = banner.buttonLink;
    }
  };

  return (
    <section className="relative pt-24 pb-8 sm:pt-32 sm:pb-12 bg-slate-950 text-white border-b border-slate-800 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/30 via-slate-950 to-slate-950"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Top Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-600/90 backdrop-blur-md border border-red-400/40 text-white text-xs sm:text-sm font-extrabold shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="truncate">🙏 !! जय माता दी !! • MAA LAXMI TRAVELS GOPALGANJ</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase drop-shadow-md"
          >
            {banner.heading}
          </motion.h1>

          <p className="text-xs sm:text-base text-slate-300 font-medium max-w-xl mx-auto">
            {banner.description}
          </p>
        </div>

        {/* Perfectly Fitted & Responsive Banner Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group cursor-pointer"
          onClick={() => setIsZoomOpen(true)}
        >
          {/* Top Red Accent Line */}
          <div className="h-1 sm:h-1.5 bg-gradient-to-r from-red-600 via-orange-500 to-amber-400"></div>

          {/* Banner Image Display - Fitted Responsive Height & Aspect Ratio */}
          <div className="relative w-full aspect-[2.35/1] bg-slate-950 min-h-[160px] sm:min-h-[280px]">
            <Image
              src={banner.imageUrl || "/maa-laxmi-travels-banner.png"}
              alt={banner.heading}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1200px"
              className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.01]"
            />
            
            {/* Click to Zoom Overlay Hint */}
            <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="px-4 py-2 rounded-xl bg-red-600/90 text-white font-extrabold text-xs sm:text-sm shadow-xl flex items-center space-x-2 border border-red-400">
                <Maximize2 className="w-4 h-4" />
                <span>Tap / Click to View Full Banner</span>
              </span>
            </div>
          </div>

          {/* Quick Contact Bar below Banner */}
          <div className="p-3 sm:p-4 bg-slate-900/90 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2 text-slate-300 text-center sm:text-left">
              <MapPin className="w-4 h-4 text-red-500 shrink-0" />
              <span className="font-semibold text-slate-200">
                Maa Laxmi Complex, Banjari Pokhara, Shiv Mandir • Gopalganj
              </span>
            </div>

            <div className="flex items-center space-x-2.5 w-full sm:w-auto shrink-0">
              <a
                href="tel:7488202225"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition border border-slate-700 flex items-center justify-center space-x-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-red-400" />
                <span>Call: 7488202225</span>
              </a>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleButtonClick();
                }}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black transition shadow-md shadow-emerald-900/40 flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{banner.buttonText || "Book Ticket"}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox / Fullscreen Zoom Modal for Mobile & Desktop */}
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
              <button
                onClick={() => setIsZoomOpen(false)}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full aspect-[2.35/1] min-h-[220px] sm:min-h-[360px] bg-slate-950 rounded-xl overflow-hidden">
                <Image
                  src={banner.imageUrl || "/maa-laxmi-travels-banner.png"}
                  alt={banner.heading}
                  fill
                  sizes="1200px"
                  className="object-contain object-center"
                />
              </div>

              <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm px-2 text-slate-300">
                <span className="font-extrabold text-amber-400">
                  🙏 Maa Laxmi Travels • Mo. 7488202225 • www.maalaxmitravels.in
                </span>
                <button
                  onClick={() => {
                    setIsZoomOpen(false);
                    handleButtonClick();
                  }}
                  className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{banner.buttonText || "Book Ticket"} ➔</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
