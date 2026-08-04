"use client";

import React from "react";
import { motion } from "framer-motion";
import { Armchair, ShieldCheck, Headphones, Sparkles, CheckCircle2, Bus } from "lucide-react";

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Bus,
      iconBg: "bg-blue-50 text-blue-600 border-blue-100",
      title: "Volvo AC Luxury Fleet",
      description:
        "Premium Volvo AC luxury buses connecting Gopalganj directly to Delhi, Lucknow, Kanpur, and major routes with maximum riding comfort.",
      highlights: ["Volvo AC Luxury Coaches", "Cleaned & Sanitized", "Smooth Express Highway Travel"],
    },
    {
      icon: Armchair,
      iconBg: "bg-orange-50 text-orange-600 border-orange-100",
      title: "Seater & Sleeper Berths",
      description:
        "Choose between comfortable pushback seater seats or spacious upper/lower sleeper berths tailored for long-distance overnight journeys.",
      highlights: ["Reclining Seater Seats", "Spacious Sleeper Berths", "Charging Points & Lights"],
    },
    {
      icon: ShieldCheck,
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
      title: "Safe & Direct Journey",
      description:
        "Experienced professional drivers, GPS-monitored fleet, emergency support, and luggage assistance for every passenger.",
      highlights: ["Verified Drivers", "Safe Passenger Care", "Beware of Brokers Warning"],
    },
    {
      icon: Headphones,
      iconBg: "bg-red-50 text-red-600 border-red-100",
      title: "Instant WhatsApp & Call Support",
      description:
        "Direct ticket booking assistance, boarding stop updates, and inquiry support directly via phone or WhatsApp at 7488202225.",
      highlights: ["Direct Owner Contact", "Mo. 7488202225", "Quick Ticket Confirmation"],
    },
  ];

  return (
    <section id="features" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>MAA LAXMI TRAVELS GOPALGANJ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Travel With Maa Laxmi Travels
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Providing trusted, comfortable, and safe Volvo AC bus travel services between Gopalganj, Bihar, and major North Indian destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => {
            const IconComp = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-slate-50/70 hover:bg-white rounded-2xl p-7 border border-slate-200 shadow-2xs hover:shadow-xl hover:border-red-200 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl ${feat.iconBg} border flex items-center justify-center shadow-xs group-hover:scale-110 transition duration-300`}
                    >
                      <IconComp className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-black text-slate-300 group-hover:text-red-500 transition">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition">
                    {feat.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {feat.description}
                  </p>
                </div>

                <div className="border-t border-slate-200/80 pt-4 space-y-2">
                  {feat.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
