"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Bus, MapPin, Sparkles, MessageSquare, ShieldCheck, Phone } from "lucide-react";

export const HeroSection: React.FC = () => {
  const whatsAppNumber = "917488202225";
  const directWhatsAppUrl = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(
    "Hello Maa Laxmi Travels, I want to inquire about Gopalganj bus tickets."
  )}`;

  return (
    <section className="relative pt-28 pb-14 sm:pt-36 sm:pb-24 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-blue-50/40 text-slate-900 border-b border-slate-200">
      {/* Light Clean Background Glow Overlay */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-80 h-80 sm:w-96 sm:h-96 bg-blue-100 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute top-1/2 -left-32 w-80 h-80 sm:w-96 sm:h-96 bg-red-100 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
          {/* Left Column: Headlines & Operator Info */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-6">
            {/* Top Religious Tag */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-extrabold shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-red-600 shrink-0" />
              <span className="truncate">🙏 !! जय माता दी !! • MAA LAXMI TRAVELS • DAILY BUS SERVICES</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-blue-950 leading-tight uppercase"
            >
              Book Your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-orange-500 to-amber-500">
                Bus Journey
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-lg text-slate-600 leading-relaxed font-semibold max-w-2xl mx-auto lg:mx-0"
            >
              Fill in your travel details below and our team will contact you directly on WhatsApp or call shortly.
            </motion.p>

            {/* Location & Contact Operator Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-700"
            >
              <div className="flex items-center space-x-3 text-center sm:text-left">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center shrink-0 hidden xs:flex">
                  <MapPin className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 block">Maa Laxmi Complex, Gopalganj</span>
                  <span className="text-slate-500 text-xs font-medium">
                    Banjari Pokhara, Shiv Mandir • Prop. Raju Kumar Singh
                  </span>
                </div>
              </div>

              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl flex items-center justify-center space-x-2 shadow-md shadow-emerald-600/20 transition transform active:scale-95 shrink-0"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Mo. 7488202225</span>
              </a>
            </motion.div>

            {/* Bus Features Pills (Gopalganj -> Delhi badge removed) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] sm:text-xs font-bold"
            >
              <div className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-2xs">
                <Bus className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span>Volvo AC Luxury</span>
              </div>
              <div className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Seater & Sleeper</span>
              </div>
              <div className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-2xs">
                <MessageSquare className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>WhatsApp Inquiry</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Clean White Volvo Bus Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white shadow-xl shadow-slate-200 bg-white group">
              {/* Bus Image */}
              <div className="relative h-60 sm:h-80 w-full overflow-hidden bg-slate-100">
                <Image
                  src="/volvo-bus-hero.png"
                  alt="Maa Laxmi Travels Volvo Express Bus"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                {/* Overlaid Bus Ticket Logo */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 flex items-center space-x-2 shadow-md">
                  <div className="relative w-6 h-6 sm:w-8 sm:h-8 shrink-0">
                    <Image
                      src="/bus-ticket-logo.png"
                      alt="Bus Ticket Logo"
                      fill
                      sizes="32px"
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[10px] sm:text-xs font-black text-blue-950">MAA LAXMI TRAVELS</span>
                </div>

                {/* Bottom Clean Phone Tag Overlay */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl border border-slate-200 flex items-center justify-between text-[11px] sm:text-xs font-bold text-slate-800 shadow-md">
                  <div className="flex items-center space-x-1.5 truncate">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                    <span className="text-slate-700 truncate">Daily Bus Services</span>
                  </div>

                  <a
                    href="tel:7488202225"
                    className="flex items-center space-x-1 text-red-600 font-extrabold hover:underline shrink-0"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>7488202225</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
