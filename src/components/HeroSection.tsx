"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Sparkles, MessageSquare, ShieldCheck } from "lucide-react";

export const HeroSection: React.FC = () => {
  const whatsAppNumber = "917488202225";
  const directWhatsAppUrl = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(
    "Hello Maa Laxmi Travels, I want to inquire about Gopalganj bus tickets."
  )}`;

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-28 overflow-hidden bg-slate-950 text-white border-b border-slate-800">
      {/* Full-Width Hero Background Bus Fleet Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/maa-laxmi-bus-fleet-banner.jpg"
          alt="Maa Laxmi Travels Bus Fleet Full Width Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 filter brightness-90"
        />
        {/* Dark Gradient Overlay for Maximum Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/80 to-slate-950/65 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-5 sm:space-y-7 text-center lg:text-left">
          {/* Top Religious Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-red-600/90 backdrop-blur-md border border-red-400/40 text-white text-xs sm:text-sm font-extrabold shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="truncate">🙏 !! जय माता दी !! • MAA LAXMI TRAVELS • DAILY BUS SERVICES</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight uppercase drop-shadow-md"
          >
            Book Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-400 to-amber-400">
              Bus Journey
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-lg text-slate-200 leading-relaxed font-semibold max-w-2xl mx-auto lg:mx-0 drop-shadow-xs"
          >
            Fill in your travel details below and our team will contact you directly on WhatsApp or call shortly.
          </motion.p>

          {/* Location & Contact Operator Card (Glassmorphism) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-white"
          >
            <div className="flex items-center space-x-3.5 text-center sm:text-left">
              <div className="w-11 h-11 rounded-xl bg-red-600/30 border border-red-400/40 flex items-center justify-center shrink-0 hidden xs:flex">
                <MapPin className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <span className="font-extrabold text-white text-sm sm:text-base block">
                  Maa Laxmi Complex
                </span>
                <span className="text-slate-300 text-xs font-medium">
                  Banjari Pokhara, Shiv Mandir • Gopalganj
                </span>
              </div>
            </div>

            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-emerald-900/40 transition transform active:scale-95 shrink-0"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Mo. 7488202225</span>
            </a>
          </motion.div>

          {/* Bus Features Pills (Glassmorphism Badges) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-3 text-xs font-bold max-w-lg"
          >
            <div className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Seater & Sleeper</span>
            </div>
            <div className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white shadow-sm">
              <MessageSquare className="w-4 h-4 text-sky-400 shrink-0" />
              <span>WhatsApp Inquiry</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
