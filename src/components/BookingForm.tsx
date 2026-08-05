"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  User,
  Phone,
  MapPin,
  Navigation,
  Calendar,
  Snowflake,
  Armchair,
  Bed,
  Home,
  FileText,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Plus,
  Minus,
  Sparkles
} from "lucide-react";
import { bookingFormSchema, BookingFormData, BookingSubmissionData } from "@/types/booking";

interface BookingFormProps {
  onSuccess: (data: BookingSubmissionData) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const todayStr = new Date().toISOString().split("T")[0];
  const whatsAppNumber = "917488202225";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      pickupLocation: "Gopalganj",
      destination: "Delhi",
      journeyDate: todayStr,
      seaterCount: 1,
      sleeperCount: 0,
      busType: "AC Luxury",
      gender: "Male",
      pickupAddress: "",
      additionalNotes: "",
    },
  });

  const selectedGender = watch("gender");
  const currentSeaterVal = watch("seaterCount");
  const currentSleeperVal = watch("sleeperCount");

  const seaterDisplay = typeof currentSeaterVal === "number" && !isNaN(currentSeaterVal) ? currentSeaterVal : 0;
  const sleeperDisplay = typeof currentSleeperVal === "number" && !isNaN(currentSleeperVal) ? currentSleeperVal : 0;
  const totalSeatsSelected = seaterDisplay + sleeperDisplay;

  // Requested Moving Ticker Routes from Gopalganj
  const popularRoutes = [
    { from: "Gopalganj", to: "Siliguri" },
    { from: "Gopalganj", to: "Lucknow" },
    { from: "Gopalganj", to: "Agra" },
    { from: "Gopalganj", to: "Delhi" },
    { from: "Gopalganj", to: "Jaipur" },
    { from: "Gopalganj", to: "Nagpur" },
    { from: "Gopalganj", to: "Bangalore" },
  ];

  // Duplicated list for smooth infinite moving marquee loop
  const marqueeRoutes = [...popularRoutes, ...popularRoutes];

  const handleRouteSelect = (from: string, to: string) => {
    setValue("pickupLocation", from, { shouldValidate: true });
    setValue("destination", to, { shouldValidate: true });
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const seatsFormatted = `${data.seaterCount > 0 ? `${data.seaterCount} Seat(s) 💺` : ""}${
      data.seaterCount > 0 && data.sleeperCount > 0 ? " + " : ""
    }${data.sleeperCount > 0 ? `${data.sleeperCount} Sleeper(s) 🛌` : ""}`;

    const rawMessage = `*🚌 MAA LAXMI TRAVELS - FULL CUSTOMER TICKET BOOKING*
---------------------------------------------
👤 *Customer Full Name:* ${data.fullName}
📱 *Mobile Number:* ${data.mobileNumber}
📍 *From (Pickup Location):* ${data.pickupLocation}
🏁 *To (Destination City):* ${data.destination}
📅 *Date of Journey / Visit:* ${data.journeyDate}
💺 *Total Seat / Sleeper:* ${seatsFormatted}
🚌 *Bus Coach Category:* AC Luxury Seater/Sleeper Express
👤 *Gender:* ${data.gender}
🏠 *Full Pickup Address:* ${data.pickupAddress}
${data.additionalNotes ? `📝 *Additional Notes / Requests:* ${data.additionalNotes}` : ""}
---------------------------------------------
🙏 *Maa Laxmi Travels Gopalganj*
📞 *Operator Contact:* 7488202225
🌐 *Website:* www.maalaxmitravels.in`;

    const whatsAppUrl = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(rawMessage)}`;

    const submission: BookingSubmissionData = {
      ...data,
      busType: "AC Luxury",
      submittedAt: new Date().toLocaleString(),
      whatsAppUrl,
    };

    setIsSubmitting(false);

    window.open(whatsAppUrl, "_blank");
    onSuccess(submission);
  };

  return (
    <section id="booking-form" className="relative -mt-8 sm:-mt-14 z-20 pb-12 sm:pb-16 px-3 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-slate-200 p-4 sm:p-10 md:p-12 relative overflow-hidden"
        >
          {/* Top Banner Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-2 sm:h-2.5 bg-gradient-to-r from-blue-700 via-red-600 to-orange-500"></div>

          {/* Header Info */}
          <div className="mb-6 sm:mb-8 border-b border-slate-200 pb-5 sm:pb-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-start sm:items-center space-x-3">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl overflow-hidden border border-slate-200 p-0.5 bg-white shadow-xs">
                  <Image
                    src="/bus-ticket-logo.png"
                    alt="Bus Ticket Logo"
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 font-extrabold text-[10px] sm:text-[11px] uppercase mb-1 border border-red-100">
                    <span>MAA LAXMI TRAVELS GOPALGANJ</span>
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">
                    Passenger Bus Ticket Booking
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                    Fill in details below to book ticket directly on WhatsApp (**7488202225**).
                  </p>
                </div>
              </div>

              {/* Continuous Moving Marquee Routes Ticker */}
              <div className="bg-slate-900 text-white rounded-xl p-2.5 overflow-hidden border border-slate-800 shadow-md">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 px-2.5 py-1 bg-red-600 rounded-lg text-[10px] sm:text-xs font-black tracking-wider uppercase shrink-0 shadow-sm">
                    <Sparkles className="w-3 h-3 text-amber-300 animate-spin-slow" />
                    <span>POPULAR ROUTES:</span>
                  </div>

                  {/* Moving Ticker Container */}
                  <div className="overflow-hidden relative flex-1">
                    <div className="animate-marquee flex items-center space-x-3">
                      {marqueeRoutes.map((route, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleRouteSelect(route.from, route.to)}
                          className="text-[11px] sm:text-xs font-bold px-3 py-1 rounded-lg bg-white/10 hover:bg-red-600 text-white border border-white/15 transition cursor-pointer shrink-0 flex items-center space-x-1"
                        >
                          <span className="text-orange-400 font-extrabold">{route.from}</span>
                          <span className="text-slate-300">➔</span>
                          <span className="text-white font-extrabold">{route.to}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-8" noValidate>
            {/* Section 1: Passenger Details */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <span>1. Passenger Details</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Passenger Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                    Passenger Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-xl shadow-2xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="e.g. Raju Kumar Singh"
                      {...register("fullName")}
                      className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 rounded-xl border ${
                        errors.fullName ? "border-red-400 bg-red-50/20" : "border-slate-300"
                      } text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition placeholder:text-slate-400`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.fullName.message}</span>
                    </p>
                  )}
                </div>

                {/* Mobile Number - Strictly 10 Digits Only */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="mobileNumber" className="block text-xs sm:text-sm font-semibold text-slate-700">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-400">
                      (10 digits only)
                    </span>
                  </div>
                  <div className="relative rounded-xl shadow-2xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <input
                      id="mobileNumber"
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={10}
                      placeholder="e.g. 7488202225"
                      {...register("mobileNumber", {
                        onChange: (e) => {
                          const sanitized = e.target.value.replace(/[^0-9]/g, "");
                          setValue("mobileNumber", sanitized, { shouldValidate: true });
                        },
                      })}
                      className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 rounded-xl border ${
                        errors.mobileNumber ? "border-red-400 bg-red-50/20" : "border-slate-300"
                      } text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition placeholder:text-slate-400 font-mono tracking-wider`}
                    />
                  </div>
                  {errors.mobileNumber && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.mobileNumber.message}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Route & Date of Visit */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-red-500" />
                <span>2. Route & Date of Visit</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {/* From */}
                <div>
                  <label htmlFor="pickupLocation" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                    From <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-xl shadow-2xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-600">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <input
                      id="pickupLocation"
                      type="text"
                      placeholder="e.g. Gopalganj"
                      {...register("pickupLocation")}
                      className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 rounded-xl border ${
                        errors.pickupLocation ? "border-red-400 bg-red-50/20" : "border-slate-300"
                      } text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition placeholder:text-slate-400`}
                    />
                  </div>
                  {errors.pickupLocation && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.pickupLocation.message}</span>
                    </p>
                  )}
                </div>

                {/* To */}
                <div>
                  <label htmlFor="destination" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                    To <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-xl shadow-2xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-red-500">
                      <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <input
                      id="destination"
                      type="text"
                      placeholder="e.g. Delhi"
                      {...register("destination")}
                      className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 rounded-xl border ${
                        errors.destination ? "border-red-400 bg-red-50/20" : "border-slate-300"
                      } text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition placeholder:text-slate-400`}
                    />
                  </div>
                  {errors.destination && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.destination.message}</span>
                    </p>
                  )}
                </div>

                {/* Date of Visit / Journey Date */}
                <div>
                  <label htmlFor="journeyDate" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                    Date of Visit / Journey Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-xl shadow-2xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <input
                      id="journeyDate"
                      type="date"
                      min={todayStr}
                      {...register("journeyDate")}
                      className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 rounded-xl border ${
                        errors.journeyDate ? "border-red-400 bg-red-50/20" : "border-slate-300"
                      } text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition`}
                    />
                  </div>
                  {errors.journeyDate && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.journeyDate.message}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 3: Total Seat / Sleeper Count & Bus Preference */}
            <div className="p-4 sm:p-6 bg-slate-50/80 rounded-xl sm:rounded-2xl border border-slate-200/80 space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <h3 className="text-xs sm:text-sm font-extrabold text-blue-950 uppercase tracking-wider flex items-center gap-2">
                  <Armchair className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>3. Total Seat / Sleeper Count & Bus Preference</span>
                </h3>

                {/* Total Selected Summary Badge */}
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] sm:text-xs font-bold self-start sm:self-auto">
                  <span>Total: {totalSeatsSelected} Seat(s)</span>
                  <span className="text-blue-400">•</span>
                  <span>
                    ({seaterDisplay} Seat 💺, {sleeperDisplay} Sleeper 🛌)
                  </span>
                </div>
              </div>

              {/* Row 1: Side-by-Side Seater & Sleeper Counter Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Seater Count Card */}
                <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                      <Armchair className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-slate-800 block">Total Seat (Seater 💺)</span>
                      <span className="text-[10px] sm:text-xs text-slate-500">Pushback Seating</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setValue("seaterCount", Math.max(0, seaterDisplay - 1), {
                          shouldValidate: true,
                        })
                      }
                      className="w-8 h-8 bg-white text-slate-700 hover:bg-blue-600 hover:text-white font-bold rounded-lg transition flex items-center justify-center shadow-2xs active:scale-95 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-7 text-center font-extrabold text-sm sm:text-base text-slate-900">
                      {seaterDisplay}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setValue("seaterCount", Math.min(20, seaterDisplay + 1), {
                          shouldValidate: true,
                        })
                      }
                      className="w-8 h-8 bg-white text-slate-700 hover:bg-blue-600 hover:text-white font-bold rounded-lg transition flex items-center justify-center shadow-2xs active:scale-95 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Sleeper Count Card */}
                <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 border border-red-100 flex items-center justify-center shrink-0">
                      <Bed className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-slate-800 block">Total Sleeper (Berths 🛌)</span>
                      <span className="text-[10px] sm:text-xs text-slate-500">Berths Seating</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setValue("sleeperCount", Math.max(0, sleeperDisplay - 1), {
                          shouldValidate: true,
                        })
                      }
                      className="w-8 h-8 bg-white text-slate-700 hover:bg-red-600 hover:text-white font-bold rounded-lg transition flex items-center justify-center shadow-2xs active:scale-95 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-7 text-center font-extrabold text-sm sm:text-base text-slate-900">
                      {sleeperDisplay}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setValue("sleeperCount", Math.min(20, sleeperDisplay + 1), {
                          shouldValidate: true,
                        })
                      }
                      className="w-8 h-8 bg-white text-slate-700 hover:bg-red-600 hover:text-white font-bold rounded-lg transition flex items-center justify-center shadow-2xs active:scale-95 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
              {errors.seaterCount && (
                <p className="text-xs text-red-500 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.seaterCount.message}</span>
                </p>
              )}

              {/* Row 2: Bus Type & Gender Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200/80 pt-4">
                {/* Bus Type */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Bus Type <span className="text-red-500">*</span>
                  </label>
                  <div className="w-full py-2.5 px-3 rounded-xl border border-blue-600 bg-blue-50 text-blue-800 font-extrabold flex items-center justify-center space-x-2 shadow-2xs">
                    <Snowflake className="w-4 h-4 text-blue-600 animate-spin-slow shrink-0" />
                    <span className="text-xs sm:text-sm">AC Luxury Coach</span>
                  </div>
                </div>

                {/* Gender Preference */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-1.5">
                    {(["Male", "Female", "Other"] as const).map((gVal) => (
                      <label
                        key={gVal}
                        className={`flex-1 flex items-center justify-center py-2.5 px-2 rounded-xl border cursor-pointer text-xs font-bold transition ${
                          selectedGender === gVal
                            ? "border-blue-700 bg-blue-700 text-white shadow-2xs"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="radio"
                          value={gVal}
                          {...register("gender")}
                          className="sr-only"
                        />
                        <span>{gVal}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Boarding Address & Notes */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-2">
                <Home className="w-4 h-4 text-indigo-600" />
                <span>4. Boarding Address & Notes</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Pickup Address */}
                <div>
                  <label htmlFor="pickupAddress" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                    Pickup Address / Stop Point <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-xl shadow-2xs">
                    <div className="absolute top-3 left-3 text-slate-400 pointer-events-none">
                      <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <textarea
                      id="pickupAddress"
                      rows={3}
                      placeholder="e.g. Maa Laxmi Complex, Banjari Pokhara, Shiv Mandir, Gopalganj..."
                      {...register("pickupAddress")}
                      className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 rounded-xl border ${
                        errors.pickupAddress ? "border-red-400 bg-red-50/20" : "border-slate-300"
                      } text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition placeholder:text-slate-400 resize-none`}
                    ></textarea>
                  </div>
                  {errors.pickupAddress && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.pickupAddress.message}</span>
                    </p>
                  )}
                </div>

                {/* Additional Notes */}
                <div>
                  <label htmlFor="additionalNotes" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                    Additional Notes <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative rounded-xl shadow-2xs">
                    <div className="absolute top-3 left-3 text-slate-400 pointer-events-none">
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <textarea
                      id="additionalNotes"
                      rows={3}
                      placeholder="Luggage requirements, lower berth preference, boarding time window..."
                      {...register("additionalNotes")}
                      className="w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition placeholder:text-slate-400 resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <div className="pt-3 sm:pt-4 border-t border-slate-200 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-w-[280px] sm:min-w-[340px] bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-base sm:text-lg py-3.5 sm:py-4 px-6 sm:px-10 rounded-xl sm:rounded-2xl shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/40 transition transform active:scale-98 flex items-center justify-center space-x-2.5 mx-auto disabled:opacity-75 disabled:cursor-not-allowed group cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Opening WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                    <span className="truncate">Book Ticket on WhatsApp (7488202225)</span>
                  </>
                )}
              </button>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs text-slate-500 font-semibold">
                <span className="flex items-center gap-1 text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Direct WhatsApp Chat
                </span>
                <span>•</span>
                <span>Mo. 7488202225</span>
                <span>•</span>
                <span>Instant Ticket Response</span>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
