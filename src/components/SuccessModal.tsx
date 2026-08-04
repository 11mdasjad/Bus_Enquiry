"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
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
  Sparkles
} from "lucide-react";
import { BookingSubmissionData } from "@/types/booking";

interface SuccessModalProps {
  submission: BookingSubmissionData | null;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ submission, onClose }) => {
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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden relative my-8"
        >
          {/* Header Banner - MAA LAXMI TRAVELS */}
          <div className="bg-gradient-to-r from-blue-900 via-red-600 to-orange-500 p-6 sm:p-8 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white text-emerald-600 flex items-center justify-center shadow-lg shrink-0">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>🙏 !! जय माता दी !! • MAA LAXMI TRAVELS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Inquiry Sent to WhatsApp!
                </h3>
                <p className="text-blue-100 text-sm mt-1">
                  Your travel details are ready. Click below to chat directly with Raju Kumar Singh at{" "}
                  <span className="font-bold underline">7488202225</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Ticket Inquiry Reference ID */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  TICKET / INQUIRY NO.
                </span>
                <span className="text-2xl font-black text-red-600 tracking-wider font-mono">
                  {submission.inquiryId}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Operator WhatsApp: 7488202225</span>
              </div>
            </div>

            {/* Passenger Details Summary Grid matching the banner */}
            <div>
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">
                Passenger Details
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-slate-50/70 p-4 rounded-2xl border border-slate-200 text-sm">
                <div className="flex items-start space-x-3">
                  <User className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs text-slate-400 block">Passenger Name</span>
                    <span className="font-bold text-slate-900">{submission.fullName}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs text-slate-400 block">Mobile Number</span>
                    <span className="font-bold text-slate-900">{submission.mobileNumber}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs text-slate-400 block">From ➔ To</span>
                    <span className="font-bold text-slate-900">
                      {submission.pickupLocation} ➔ {submission.destination}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs text-slate-400 block">Date of Visit</span>
                    <span className="font-bold text-slate-900">{submission.journeyDate}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Armchair className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs text-slate-400 block">Total Seat / Sleeper</span>
                    <span className="font-bold text-slate-900">
                      {submission.seaterCount > 0 ? `${submission.seaterCount} Seat 💺` : ""}
                      {submission.seaterCount > 0 && submission.sleeperCount > 0 ? " • " : ""}
                      {submission.sleeperCount > 0 ? `${submission.sleeperCount} Sleeper 🛌` : ""}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Bus className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs text-slate-400 block">Bus Type & Gender</span>
                    <span className="font-bold text-slate-900">
                      {submission.busType} ({submission.gender})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Open WhatsApp Button */}
            <a
              href={submission.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/30 transition transform active:scale-98"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Open WhatsApp Chat (Mo. 7488202225)</span>
            </a>

            {/* Print & Reset Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-1/2 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-sm flex items-center justify-center space-x-2 transition cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Ticket Inquiry</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center space-x-2 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>New Inquiry</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
