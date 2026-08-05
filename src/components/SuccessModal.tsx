"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { toPng } from "html-to-image";
import {
  CheckCircle2,
  X,
  Calendar,
  MapPin,
  Bus,
  Armchair,
  Phone,
  User,
  MessageSquare,
  Printer,
  RotateCcw,
  Sparkles,
  Download,
  ShieldCheck,
  Globe
} from "lucide-react";
import { BookingSubmissionData } from "@/types/booking";

interface SuccessModalProps {
  submission: BookingSubmissionData | null;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ submission, onClose }) => {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (submission) {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#dc2626", "#2563eb", "#10b981", "#f97316"],
      });
    }
  }, [submission]);

  if (!submission) return null;

  const handleDownloadPng = async () => {
    if (!ticketRef.current) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(ticketRef.current, { quality: 0.95, cacheBust: true });
      const link = document.createElement("a");
      link.download = `Maa_Laxmi_Travels_Ticket_${submission.inquiryId}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate ticket PNG:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden relative my-auto max-h-[94vh] flex flex-col"
        >
          {/* Top Banner Header */}
          <div className="bg-gradient-to-r from-red-700 via-orange-600 to-red-700 p-4 sm:p-6 text-white relative shrink-0">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/80 hover:text-white p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white text-emerald-600 flex items-center justify-center shadow-lg shrink-0">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>🙏 !! जय माता दी !! • TICKET BOOKING</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                  Bus Ticket Booking Generated!
                </h3>
                <p className="text-white/90 text-xs mt-0.5">
                  Download your full PNG Ticket or send ticket details directly to WhatsApp.
                </p>
              </div>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="p-3 sm:p-6 space-y-4 overflow-y-auto">
            
            {/* FULL TICKET CARD CONTAINER (Converts to PNG) */}
            <div
              ref={ticketRef}
              className="bg-white border-2 border-red-600 rounded-2xl p-4 sm:p-6 shadow-md relative overflow-hidden space-y-4 text-slate-900"
            >
              {/* Decorative Top Ticket Badge */}
              <div className="flex items-center justify-between border-b-2 border-dashed border-slate-300 pb-3">
                <div className="flex items-center space-x-2.5">
                  <div className="relative w-10 h-10 shrink-0 rounded-lg overflow-hidden border border-slate-200 p-0.5 bg-white">
                    <Image
                      src="/bus-ticket-logo.png"
                      alt="Maa Laxmi Travels Logo"
                      fill
                      sizes="40px"
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="font-black text-sm sm:text-base text-red-600 uppercase tracking-tight block">
                      MAA LAXMI TRAVELS
                    </span>
                    <span className="text-[10px] font-bold text-red-600 block">
                      🙏 !! जय माता दी !! • GOPALGANJ
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                    TICKET / BOOKING NO.
                  </span>
                  <span className="text-base sm:text-lg font-black text-red-600 font-mono tracking-wider">
                    {submission.inquiryId}
                  </span>
                </div>
              </div>

              {/* Full Passenger Customer Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Passenger Name</span>
                  <span className="font-extrabold text-slate-900 text-sm">{submission.fullName}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Mobile Number</span>
                  <span className="font-extrabold text-slate-900 text-sm">{submission.mobileNumber}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Pickup Location (From)</span>
                  <span className="font-bold text-blue-700">{submission.pickupLocation}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Destination (To)</span>
                  <span className="font-bold text-red-600">{submission.destination}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Date of Journey</span>
                  <span className="font-bold text-slate-900">{submission.journeyDate}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Seats / Berths</span>
                  <span className="font-bold text-emerald-700">
                    {submission.seaterCount > 0 ? `${submission.seaterCount} Seat(s) 💺` : ""}
                    {submission.seaterCount > 0 && submission.sleeperCount > 0 ? " + " : ""}
                    {submission.sleeperCount > 0 ? `${submission.sleeperCount} Sleeper(s) 🛌` : ""}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Bus Category</span>
                  <span className="font-bold text-slate-900">{submission.busType}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Gender</span>
                  <span className="font-bold text-slate-900">{submission.gender}</span>
                </div>

                <div className="col-span-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Full Pickup Address</span>
                  <span className="font-semibold text-slate-800">{submission.pickupAddress}</span>
                </div>

                {submission.additionalNotes && (
                  <div className="col-span-2 border-t border-slate-200 pt-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Notes / Special Requests</span>
                    <span className="font-medium text-slate-700">{submission.additionalNotes}</span>
                  </div>
                )}
              </div>

              {/* Bottom Footer Details */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t-2 border-dashed border-slate-300 pt-3 text-[11px] text-slate-600 font-medium">
                <div className="flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>Operator Mo: <strong>7488202225</strong></span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>www.maalaxmitravels.in</span>
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {/* Download PNG Ticket Button */}
              <button
                onClick={handleDownloadPng}
                disabled={isDownloading}
                className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75"
              >
                {isDownloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating PNG...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Ticket (PNG)</span>
                  </>
                )}
              </button>

              {/* Open WhatsApp Chat Button */}
              <a
                href={submission.whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>Book Ticket on WhatsApp</span>
              </a>
            </div>

            {/* Print & Reset Options */}
            <div className="flex items-center justify-between gap-2 text-xs pt-1">
              <button
                onClick={() => window.print()}
                className="py-2 px-3 text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Ticket</span>
              </button>

              <button
                onClick={onClose}
                className="py-2 px-3 text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>New Ticket Booking</span>
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
