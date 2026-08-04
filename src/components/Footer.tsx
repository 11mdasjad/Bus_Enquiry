"use client";

import React from "react";
import Image from "next/image";
import { Phone, MapPin, MessageSquare, ArrowUp, Video, ShieldAlert } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsAppNumber = "917488202225";
  const directWhatsAppUrl = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(
    "Hello Maa Laxmi Travels, I want to inquire about Gopalganj bus tickets."
  )}`;

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Company Branding with Official Bus Ticket Logo */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 shrink-0 rounded-xl overflow-hidden bg-white p-1 shadow-md border border-slate-200">
                <Image
                  src="/bus-ticket-logo.png"
                  alt="Bus Ticket Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-black text-xl text-white tracking-tight uppercase">
                  MAA LAXMI <span className="text-red-500">TRAVELS</span>
                </span>
                <p className="text-[11px] text-red-400 font-bold">
                  🙏 !! जय माता दी !! 🙏
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">
              Maa Laxmi Travels Gopalganj. Daily Volvo AC & Non-AC Seater and Sleeper express bus service between Gopalganj, Delhi, Lucknow, and major routes.
            </p>

            <div className="flex items-center space-x-3 text-sm pt-1">
              <span className="text-xs text-red-400 font-semibold flex items-center gap-1">
                <Video className="w-4 h-4 text-red-500" />
                <span>YouTube - Maa Laxmi Travels Gopalganj</span>
              </span>
            </div>
          </div>

          {/* Contact & WhatsApp */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Booking & Contact Number
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs text-slate-400 block">Mobile & Pay / PhonePe No.</span>
                  <a href="tel:7488202225" className="text-white font-bold hover:text-red-400 text-base">
                    7488202225
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MessageSquare className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs text-slate-400 block">WhatsApp Inquiry</span>
                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 font-bold"
                  >
                    Chat on 7488202225 ➔
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Address & Office */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Office Location
            </h4>
            <div className="flex items-start space-x-3 text-sm">
              <MapPin className="w-4 h-4 text-red-500 mt-1 shrink-0" />
              <div className="text-slate-300 space-y-1">
                <p className="font-bold text-white">Maa Laxmi Travels Office</p>
                <p>Maa Laxmi Complex, Banjari Pokhara</p>
                <p>Shiv Mandir, Gopalganj, Bihar</p>
                <p className="text-xs text-orange-400 font-semibold pt-1">
                  Prop. Raju Kumar Singh
                </p>
              </div>
            </div>
          </div>

          {/* Important Information Banner Terms */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-orange-400" />
              <span>Important Information</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                <span>Luggage Charges Extra</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                <span>Beware of Brokers</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>Neither Refundable Nor Transferable</span>
              </li>
              <li className="text-slate-400 pt-1 leading-normal">
                Cancellation Policy: Cancel ticket 24 hours in advance.
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © 2026 <span className="text-white font-bold">Maa Laxmi Travels Gopalganj</span>. All rights reserved. Prop. Raju Kumar Singh (Mo. 7488202225).
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-3.5 py-2 rounded-xl border border-slate-700 transition cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-red-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
