"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Upload,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowLeft,
  Sparkles,
  Link as LinkIcon,
  Type,
  FileText,
  ImageIcon
} from "lucide-react";
import { BannerData } from "@/lib/banner-types";

export default function AdminBannerPage() {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonLink, setButtonLink] = useState("");
  const [showBanner, setShowBanner] = useState(true);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch initial banner configuration
  useEffect(() => {
    fetchBannerData();
  }, []);

  const fetchBannerData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/banner");
      const data = await res.json();
      if (data.success && data.banner) {
        const b: BannerData = data.banner;
        setHeading(b.heading);
        setDescription(b.description);
        setButtonText(b.buttonText);
        setButtonLink(b.buttonLink);
        setShowBanner(b.showBanner);
        setCurrentImageUrl(b.imageUrl);
        setPreviewUrl(b.imageUrl);
      }
    } catch (err) {
      console.error("Failed to load banner data:", err);
      showToast("Failed to load current banner data", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (text: string, type: "success" | "error") => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("Please select a valid image file", "error");
      return;
    }
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append("heading", heading);
      formData.append("description", description);
      formData.append("buttonText", buttonText);
      formData.append("buttonLink", buttonLink);
      formData.append("showBanner", showBanner ? "true" : "false");
      formData.append("imageUrl", currentImageUrl);

      if (selectedFile) {
        formData.append("imageFile", selectedFile);
      }

      const res = await fetch("/api/banner", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success && result.banner) {
        const b: BannerData = result.banner;
        setHeading(b.heading);
        setDescription(b.description);
        setButtonText(b.buttonText);
        setButtonLink(b.buttonLink);
        setShowBanner(b.showBanner);
        setCurrentImageUrl(b.imageUrl);
        setPreviewUrl(b.imageUrl);
        setSelectedFile(null);

        showToast("Banner updated successfully!", "success");
      } else {
        showToast(result.message || "Failed to save banner", "error");
      }
    } catch (err) {
      console.error("Save banner error:", err);
      showToast("An error occurred while saving", "error");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-700">
        <div className="flex items-center space-x-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="w-6 h-6 border-3 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="font-bold text-sm">Loading Banner Admin...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-red-500 selection:text-white pb-20">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 animate-bounce-in">
          <div
            className={`flex items-center space-x-3 px-5 py-3.5 rounded-2xl shadow-xl border text-sm font-bold ${
              toastMessage.type === "success"
                ? "bg-emerald-950 border-emerald-800 text-emerald-300"
                : "bg-red-950 border-red-800 text-red-300"
            }`}
          >
            {toastMessage.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Admin Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              title="Return to Homepage"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <span className="text-[10px] font-black text-red-600 uppercase tracking-wider block">
                Admin Panel
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Hero Banner Management
              </h1>
            </div>
          </div>

          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-sm"
          >
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>View Homepage</span>
          </Link>
        </div>
      </header>

      {/* Main Admin Form Layout */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Inputs (Left Column - 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Card 1: Banner Image Upload */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-red-600" />
                  <span>1. Banner Image Upload</span>
                </label>
                <span className="text-xs text-slate-400 font-medium">PNG, JPG, WEBP (Max 5MB)</span>
              </div>

              {/* Drag & Drop Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-3 ${
                  isDragging
                    ? "border-red-500 bg-red-50/50"
                    : "border-slate-300 hover:border-red-400 bg-slate-50/50 hover:bg-slate-50"
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    <span className="text-red-600 hover:underline">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">High resolution wide banner image</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </div>
            </div>

            {/* Card 2: Banner Details Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
                <Type className="w-4 h-4 text-red-600" />
                <span>2. Banner Content & Action</span>
              </h2>

              {/* Banner Heading */}
              <div>
                <label htmlFor="heading" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Banner Heading
                </label>
                <div className="relative">
                  <input
                    id="heading"
                    type="text"
                    required
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    placeholder="e.g. Book Your Bus Journey"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-600 focus:border-red-600 transition placeholder:text-slate-400 font-semibold"
                  />
                </div>
              </div>

              {/* Banner Description */}
              <div>
                <label htmlFor="description" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Banner Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Daily AC Seater & Sleeper Bus Services from Gopalganj..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-600 focus:border-red-600 transition placeholder:text-slate-400 font-medium resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Button Text */}
                <div>
                  <label htmlFor="buttonText" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Button Text
                  </label>
                  <input
                    id="buttonText"
                    type="text"
                    required
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    placeholder="e.g. Book Ticket"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-600 focus:border-red-600 transition font-semibold"
                  />
                </div>

                {/* Button Link */}
                <div>
                  <label htmlFor="buttonLink" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Button Link
                  </label>
                  <div className="relative">
                    <input
                      id="buttonLink"
                      type="text"
                      required
                      value={buttonLink}
                      onChange={(e) => setButtonLink(e.target.value)}
                      placeholder="e.g. #booking-form"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-600 focus:border-red-600 transition font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Show/Hide Banner Toggle */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-sm text-slate-900 block">Show Banner on Homepage</span>
                  <span className="text-xs text-slate-500">Toggle whether the hero banner is displayed to users</span>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showBanner}
                    onChange={(e) => setShowBanner(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-13 h-7 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            </div>

            {/* Save Button */}
            <div>
              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-4 px-6 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 hover:from-red-700 hover:to-orange-700 text-white font-black text-base rounded-2xl shadow-xl shadow-red-600/25 transition transform active:scale-98 flex items-center justify-center space-x-2.5 cursor-pointer disabled:opacity-75"
              >
                {isSaving ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving Banner Changes...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save Banner Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Real-Time Live Banner Preview (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl sticky top-24 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Live Homepage Preview</span>
                </span>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    showBanner ? "bg-emerald-950 text-emerald-400 border border-emerald-800" : "bg-red-950 text-red-400 border border-red-800"
                  }`}
                >
                  {showBanner ? "Banner Active" : "Banner Hidden"}
                </span>
              </div>

              {!showBanner ? (
                <div className="p-8 text-center bg-slate-950/80 rounded-2xl border border-slate-800/80 space-y-2">
                  <EyeOff className="w-8 h-8 text-slate-500 mx-auto" />
                  <p className="text-xs font-bold text-slate-400 uppercase">Banner Hidden</p>
                  <p className="text-xs text-slate-500">The Hero Banner will not be rendered on the homepage when disabled.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Banner Image Preview Container */}
                  <div className="relative w-full aspect-[2.35/1] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
                    {previewUrl ? (
                      <Image
                        src={previewUrl}
                        alt="Banner Preview"
                        fill
                        sizes="500px"
                        className="object-contain object-center"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-xs font-bold">
                        No Image Selected
                      </div>
                    )}
                  </div>

                  {/* Text Details Preview */}
                  <div className="space-y-2 pt-1">
                    <h3 className="text-lg font-black text-white uppercase leading-snug">
                      {heading || "Banner Heading"}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">
                      {description || "Banner description paragraph text..."}
                    </p>
                  </div>

                  {/* Button Preview */}
                  <div className="pt-2">
                    <span className="inline-block px-5 py-2.5 bg-emerald-600 text-white text-xs font-black rounded-xl shadow-md">
                      {buttonText || "Button Text"} ➔
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                <span>Updates save instantly to <strong className="text-slate-200">data/banner.json</strong> and homepage.</span>
              </div>
            </div>
          </div>

        </form>
      </main>
    </div>
  );
}
