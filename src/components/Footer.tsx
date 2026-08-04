"use client";

import React from "react";
import Image from "next/image";
import { Phone, MapPin, MessageSquare, ArrowUp, ShieldAlert } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsAppNumber = "917488202225";
  const directWhatsAppUrl = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(
    "Hello Maa Laxmi Travels, I want to inquire about Gopalganj bus tickets."
  )}`;

  // Social Media Links
  const socialLinks = [
    {
      name: "YouTube",
      url: "https://www.youtube.com/results?search_query=Maa+Laxmi+Travels+Gopalganj",
      hoverBg: "hover:bg-red-600 hover:border-red-500 hover:text-white",
      color: "text-red-500",
      svg: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/",
      hoverBg: "hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-600 hover:to-purple-600 hover:border-pink-500 hover:text-white",
      color: "text-pink-500",
      svg: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/search/top?q=Maa%20Laxmi%20Travels%20Gopalganj",
      hoverBg: "hover:bg-blue-600 hover:border-blue-500 hover:text-white",
      color: "text-blue-500",
      svg: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      url: directWhatsAppUrl,
      hoverBg: "hover:bg-emerald-600 hover:border-emerald-500 hover:text-white",
      color: "text-emerald-500",
      svg: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Company Branding & Social Links */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 shrink-0 rounded-xl overflow-hidden bg-white p-1 shadow-md border border-slate-200">
                <Image
                  src="/bus-ticket-logo.png"
                  alt="Bus Ticket Logo"
                  fill
                  sizes="48px"
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

            {/* Social Media Link Icons */}
            <div className="pt-1">
              <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2.5">
                Connect With Us On Social Media
              </span>
              <div className="flex items-center space-x-2.5">
                {socialLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Maa Laxmi Travels on ${item.name}`}
                    className={`w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 ${item.color} ${item.hoverBg} flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110 cursor-pointer group`}
                    title={item.name}
                  >
                    {item.svg}
                  </a>
                ))}
              </div>
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
