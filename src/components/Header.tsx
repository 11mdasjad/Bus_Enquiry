"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Phone, MessageSquare } from "lucide-react";

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
          ? "bg-white/95 backdrop-blur-md shadow-md py-2 border-b border-slate-200"
          : "bg-white/90 backdrop-blur-md py-2.5 text-slate-900 border-b border-slate-200"
      }`}
    >
      {/* Top Banner Tagline Strip - Only Daily Bus Services */}
      <div className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white text-[10px] sm:text-[11px] font-extrabold text-center py-1 px-2 tracking-wider uppercase shadow-xs">
        DAILY BUS SERVICES
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-1">
        <div className="flex items-center justify-between gap-2">
          {/* Company Brand Logo & Name */}
          <div
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group min-w-0"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {/* Bus Ticket Logo */}
            <div className="relative w-10 h-10 sm:w-13 sm:h-13 shrink-0 rounded-xl overflow-hidden bg-white p-0.5 border border-slate-200 shadow-2xs group-hover:scale-105 transition">
              <Image
                src="/bus-ticket-logo.png"
                alt="Bus Ticket Booking Logo"
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>

            <div className="min-w-0 flex flex-col leading-tight">
              <span className="font-black text-base sm:text-2xl lg:text-3xl tracking-tight uppercase text-red-600 truncate">
                MAA LAXMI TRAVELS
              </span>
              <span className="text-[11px] sm:text-xs font-black text-red-600 tracking-wide flex items-center gap-1">
                🙏 !! जय माता दी !! 🙏
              </span>
            </div>
          </div>

          {/* Contact & WhatsApp Buttons */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
            <a
              href="tel:7488202225"
              className="hidden md:flex items-center space-x-2 text-xs sm:text-sm font-extrabold px-3 py-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition border border-slate-200"
            >
              <Phone className="w-4 h-4 text-red-600" />
              <span>7488202225</span>
            </a>

            <button
              onClick={() => {
                const el = document.getElementById("booking-form");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                  setTimeout(() => {
                    const input = document.getElementById("fullName");
                    if (input) input.focus();
                  }, 400);
                }
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition transform active:scale-95 flex items-center space-x-1 sm:space-x-1.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden xs:inline">Book Ticket</span>
              <span className="xs:hidden">Book Ticket</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
