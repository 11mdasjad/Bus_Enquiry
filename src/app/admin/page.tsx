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
  Type,
  ImageIcon,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Layers,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { BannerItem, defaultBanners } from "@/lib/banner-types";

export default function AdminBannerPage() {
  const [banners, setBanners] = useState<BannerItem[]>(defaultBanners);
  const [selectedId, setSelectedId] = useState<string>("banner-1");
  const [showBanner, setShowBanner] = useState<boolean>(true);
  const [autoPlayInterval, setAutoPlayInterval] = useState<number>(5000);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Live preview slider state
  const [previewIndex, setPreviewIndex] = useState<number>(0);

  // Fetch banner configuration
  useEffect(() => {
    fetchBannerData();
  }, []);

  const fetchBannerData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/banner", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        if (Array.isArray(data.banners) && data.banners.length > 0) {
          setBanners(data.banners);
          setSelectedId(data.banners[0].id);
        }
        if (typeof data.showBanner === "boolean") {
          setShowBanner(data.showBanner);
        }
        if (typeof data.autoPlayInterval === "number") {
          setAutoPlayInterval(data.autoPlayInterval);
        }
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

  // Client-side image compression
  const compressImage = (file: File, maxWidth = 1600, quality = 0.85): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(event.target?.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/webp", quality);
          resolve(compressedDataUrl);
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const selectedBanner = banners.find((b) => b.id === selectedId) || banners[0];

  const updateSelectedBanner = (fields: Partial<BannerItem>) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === selectedId ? { ...b, ...fields } : b))
    );
  };

  const handleFileChange = async (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("Please select a valid image file", "error");
      return;
    }
    try {
      const compressedUrl = await compressImage(file);
      updateSelectedBanner({ imageUrl: compressedUrl });
      showToast("Banner image updated!", "success");
    } catch (err) {
      console.error("Image compression error:", err);
      showToast("Failed to process image", "error");
    }
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

  const handleAddNewBanner = () => {
    const newId = `banner-${Date.now()}`;
    const newBanner: BannerItem = {
      id: newId,
      imageUrl: "/volvo-bus-hero.png",
      heading: "New Bus Special Offer",
      description: "Book early to get exclusive seat discounts on Gopalganj routes.",
      buttonText: "Book Now",
      buttonLink: "#booking-form",
      active: true,
    };

    setBanners((prev) => [...prev, newBanner]);
    setSelectedId(newId);
    showToast("New banner added! Modify its details below.", "success");
  };

  const handleDeleteBanner = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (banners.length <= 1) {
      showToast("At least one banner must remain in the system", "error");
      return;
    }
    const updated = banners.filter((b) => b.id !== id);
    setBanners(updated);
    if (selectedId === id) {
      setSelectedId(updated[0].id);
    }
    showToast("Banner removed", "success");
  };

  const handleMoveBanner = (index: number, direction: "up" | "down", e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= banners.length) return;

    const updated = [...banners];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;

    setBanners(updated);
  };

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const payload = {
        banners,
        showBanner,
        autoPlayInterval,
      };

      const res = await fetch("/api/banner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json().catch(() => null);

      if (res.ok && result?.success) {
        showToast("All banner changes saved successfully!", "success");
      } else {
        showToast(result?.message || `Server returned error (${res.status})`, "error");
      }
    } catch (err) {
      console.error("Save banners error:", err);
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
          <span className="font-bold text-sm">Loading Banner Management...</span>
        </div>
      </div>
    );
  }

  const activeBanners = banners.filter((b) => b.active);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-red-500 selection:text-white pb-20">
      
      {/* Toast Alert */}
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

      {/* Admin Top Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
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
                Hero Banner Slider Management
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border border-slate-300"
            >
              <Eye className="w-4 h-4 text-emerald-600" />
              <span>View Homepage</span>
            </Link>

            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-xl text-xs font-black transition flex items-center space-x-1.5 shadow-md shadow-red-600/30 cursor-pointer disabled:opacity-75"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save All Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        
        {/* Global Slider Config Bar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-50 text-red-600 rounded-2xl border border-red-100">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">Slider Controls & Settings</h2>
              <p className="text-xs text-slate-500 font-medium">Configure display state and autoplay rotation speed</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 w-full sm:w-auto">
            {/* Enable Slider Toggle */}
            <div className="flex items-center space-x-3">
              <span className="text-xs font-bold text-slate-700">Show Slider on Homepage</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showBanner}
                  onChange={(e) => setShowBanner(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            {/* Autoplay Speed Select */}
            <div className="flex items-center space-x-2">
              <label htmlFor="speed" className="text-xs font-bold text-slate-700">
                Autoplay Speed:
              </label>
              <select
                id="speed"
                value={autoPlayInterval}
                onChange={(e) => setAutoPlayInterval(Number(e.target.value))}
                className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-red-600"
              >
                <option value={3000}>3 Seconds (Fast)</option>
                <option value={5000}>5 Seconds (Recommended)</option>
                <option value={7000}>7 Seconds (Relaxed)</option>
                <option value={10000}>10 Seconds (Slow)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Grid: Left (Banners List & Form) | Right (Live Preview) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Banners Selector & Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Banner List Selector Cards */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <label className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-red-600" />
                  <span>Banner Carousel Items ({banners.length})</span>
                </label>

                <button
                  type="button"
                  onClick={handleAddNewBanner}
                  className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-extrabold transition flex items-center space-x-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Banner</span>
                </button>
              </div>

              {/* Banner Tabs List */}
              <div className="space-y-3">
                {banners.map((item, index) => {
                  const isSelected = item.id === selectedId;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedId(item.id);
                        setPreviewIndex(index);
                      }}
                      className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? "border-red-600 bg-red-50/40 ring-2 ring-red-600/20"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center space-x-3 overflow-hidden">
                        {/* Thumbnail */}
                        <div className="relative w-16 h-10 rounded-lg overflow-hidden border border-slate-200 bg-slate-900 shrink-0">
                          {item.imageUrl && (
                            <Image
                              src={item.imageUrl}
                              alt={item.heading}
                              fill
                              sizes="100px"
                              className="object-cover"
                            />
                          )}
                        </div>

                        {/* Title & Status */}
                        <div className="truncate">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-black text-red-600">#{index + 1}</span>
                            <span className="text-sm font-bold text-slate-900 truncate">
                              {item.heading || "Untitled Banner"}
                            </span>
                          </div>
                          <span
                            className={`inline-block mt-0.5 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              item.active
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-slate-200 text-slate-600"
                            }`}
                          >
                            {item.active ? "Active in Slider" : "Hidden"}
                          </span>
                        </div>
                      </div>

                      {/* Item Actions (Reorder & Delete) */}
                      <div className="flex items-center space-x-1 shrink-0">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={(e) => handleMoveBanner(index, "up", e)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 cursor-pointer"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={index === banners.length - 1}
                          onClick={(e) => handleMoveBanner(index, "down", e)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 cursor-pointer"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteBanner(item.id, e)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                          title="Delete Banner"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Banner Editor Form */}
            {selectedBanner && (
              <form onSubmit={handleSaveAll} className="space-y-6">
                
                {/* Image Upload Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <label className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-red-600" />
                      <span>Editing Banner #{banners.findIndex((b) => b.id === selectedId) + 1} Image</span>
                    </label>
                    <span className="text-xs text-slate-400 font-medium">Auto WebP Compressed</span>
                  </div>

                  {/* Drag & Drop */}
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
                        <span className="text-red-600 hover:underline">Click to upload new image</span> or drag and drop
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">High quality wide banner (PNG, JPG, WEBP)</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </div>

                  {/* Image URL Manual Override */}
                  <div>
                    <label htmlFor="imageUrl" className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Or Image URL Path
                    </label>
                    <input
                      id="imageUrl"
                      type="text"
                      value={selectedBanner.imageUrl}
                      onChange={(e) => updateSelectedBanner({ imageUrl: e.target.value })}
                      placeholder="/maa-laxmi-travels-banner.png"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold"
                    />
                  </div>
                </div>

                {/* Banner Text Details Form */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
                  <h2 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Type className="w-4 h-4 text-red-600" />
                    <span>Banner Content & Buttons</span>
                  </h2>

                  {/* Banner Heading */}
                  <div>
                    <label htmlFor="heading" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Heading Title
                    </label>
                    <input
                      id="heading"
                      type="text"
                      required
                      value={selectedBanner.heading}
                      onChange={(e) => updateSelectedBanner({ heading: e.target.value })}
                      placeholder="e.g. Book Your Bus Journey"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-600 font-semibold"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Sub-heading / Description
                    </label>
                    <textarea
                      id="description"
                      rows={3}
                      required
                      value={selectedBanner.description}
                      onChange={(e) => updateSelectedBanner({ description: e.target.value })}
                      placeholder="e.g. Daily AC Seater & Sleeper Bus Services from Gopalganj..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-600 font-medium resize-none"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* Button Text */}
                    <div>
                      <label htmlFor="buttonText" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Button Label
                      </label>
                      <input
                        id="buttonText"
                        type="text"
                        required
                        value={selectedBanner.buttonText}
                        onChange={(e) => updateSelectedBanner({ buttonText: e.target.value })}
                        placeholder="e.g. Book Ticket"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-red-600"
                      />
                    </div>

                    {/* Button Link */}
                    <div>
                      <label htmlFor="buttonLink" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Button Action / Link
                      </label>
                      <input
                        id="buttonLink"
                        type="text"
                        required
                        value={selectedBanner.buttonLink}
                        onChange={(e) => updateSelectedBanner({ buttonLink: e.target.value })}
                        placeholder="e.g. #booking-form"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                  </div>

                  {/* Active Toggle for this banner */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="font-extrabold text-sm text-slate-900 block">Include Banner in Slider</span>
                      <span className="text-xs text-slate-500">Toggle whether this specific banner item is active</span>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBanner.active}
                        onChange={(e) => updateSelectedBanner({ active: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                </div>

                {/* Submit Save Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full py-4 px-6 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 hover:from-red-700 hover:to-orange-700 text-white font-black text-base rounded-2xl shadow-xl shadow-red-600/25 transition transform active:scale-98 flex items-center justify-center space-x-2.5 cursor-pointer disabled:opacity-75"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Saving All Changes...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>Save All Changes Now</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Interactive Live Slider Preview (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl sticky top-24 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Live Homepage Slider Preview</span>
                </span>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    showBanner
                      ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                      : "bg-red-950 text-red-400 border border-red-800"
                  }`}
                >
                  {showBanner ? `${activeBanners.length} Active` : "Slider Disabled"}
                </span>
              </div>

              {!showBanner ? (
                <div className="p-8 text-center bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
                  <EyeOff className="w-8 h-8 text-slate-500 mx-auto" />
                  <p className="text-xs font-bold text-slate-400 uppercase">Homepage Slider Hidden</p>
                  <p className="text-xs text-slate-500">Enable "Show Slider on Homepage" above to display the hero banner.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  
                  {/* Slider Preview Container */}
                  <div className="relative w-full aspect-[2.35/1] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
                    {banners[previewIndex] ? (
                      <Image
                        src={banners[previewIndex].imageUrl || "/maa-laxmi-travels-banner.png"}
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

                    {/* Preview Controls */}
                    {banners.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => setPreviewIndex((prev) => (prev - 1 + banners.length) % banners.length)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-950/80 text-white border border-slate-700 shadow cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewIndex((prev) => (prev + 1) % banners.length)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-950/80 text-white border border-slate-700 shadow cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Dot Indicators Preview */}
                  {banners.length > 1 && (
                    <div className="flex items-center justify-center space-x-1.5 py-1">
                      {banners.map((b, i) => (
                        <button
                          key={b.id}
                          onClick={() => setPreviewIndex(i)}
                          className={`h-2 rounded-full transition-all cursor-pointer ${
                            i === previewIndex ? "w-6 bg-amber-400" : "w-2 bg-slate-700"
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Live Text Preview */}
                  {banners[previewIndex] && (
                    <div className="space-y-2 pt-1 border-t border-slate-800/80">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-amber-400 uppercase">
                          Slide #{previewIndex + 1}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {banners[previewIndex].active ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <h3 className="text-base font-black text-white uppercase leading-snug">
                        {banners[previewIndex].heading || "Banner Heading"}
                      </h3>
                      <p className="text-xs text-slate-300 font-medium leading-relaxed">
                        {banners[previewIndex].description || "Banner description..."}
                      </p>
                      <div className="pt-2">
                        <span className="inline-block px-4 py-2 bg-emerald-600 text-white text-xs font-black rounded-xl">
                          {banners[previewIndex].buttonText || "Button Text"} ➔
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                <span>Saving updates writes directly to <strong className="text-slate-200">data/banner.json</strong>.</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
