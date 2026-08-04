"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Phone, MessageSquare, MapPin } from "lucide-react";

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsAppNumber = "917488202225";
  const directWhatsAppUrl = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(
    "Hello Maa Laxmi Travels, I want to inquire about bus ticket availability."
  )}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-slate-200"
          : "bg-white/90 backdrop-blur-md py-3 text-slate-900 border-b border-slate-200"
      }`}
    >
      {/* Top Banner Tagline Strip */}
      <div className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white text-[11px] font-bold text-center py-1 tracking-wider uppercase shadow-xs">
        🙏 !! जय माता दी !! • MAA LAXMI TRAVELS GOPALGANJ • MO. 7488202225 🙏
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-1">
        <div className="flex items-center justify-between">
          {/* Company Brand Logo & Name */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {/* Bus Ticket Logo */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl overflow-hidden bg-white p-1 border border-slate-200 shadow-sm group-hover:scale-105 transition">
              <Image
                src="/bus-ticket-logo.png"
                alt="Bus Ticket Booking Logo"
                fill
                className="object-contain p-0.5"
              />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-xl sm:text-2xl tracking-tight uppercase text-blue-950">
                  MAA LAXMI <span className="text-red-600">TRAVELS</span>
                </span>
              </div>
              <p className="text-[11px] font-semibold text-slate-600 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                <span>Gopalganj • Prop. Raju Kumar Singh</span>
              </p>
            </div>
          </div>

          {/* Contact & WhatsApp Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <a
              href="tel:7488202225"
              className="hidden sm:flex items-center space-x-2 text-xs sm:text-sm font-extrabold px-3.5 py-2.5 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition border border-slate-200"
            >
              <Phone className="w-4 h-4 text-red-600" />
              <span>7488202225</span>
            </a>

            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition transform active:scale-95 flex items-center space-x-1.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
