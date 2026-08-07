import fs from "fs";
import path from "path";
import {
  BannerConfig,
  BannerData,
  BannerItem,
  defaultBannerConfig,
  defaultBanners,
} from "./banner-types";

export * from "./banner-types";

// In-memory fallback for serverless environments (e.g. Vercel)
let memoryBannerConfig: BannerConfig | null = null;

const dataFilePath = path.join(process.cwd(), "data", "banner.json");
const tmpFilePath = path.join("/tmp", "banner.json");

// Helper to normalize or migrate old single-banner json data to multi-banner config
function normalizeBannerConfig(parsedData: any): BannerConfig {
  if (!parsedData || typeof parsedData !== "object") {
    return defaultBannerConfig;
  }

  // If already in new BannerConfig format with a banners array
  if (Array.isArray(parsedData.banners) && parsedData.banners.length > 0) {
    const validBanners: BannerItem[] = parsedData.banners.map((b: any, index: number) => ({
      id: b.id || `banner-${index + 1}`,
      imageUrl: b.imageUrl || defaultBanners[index % defaultBanners.length]?.imageUrl || "/maa-laxmi-travels-banner.png",
      heading: b.heading || "Book Your Bus Journey",
      description: b.description || "Daily AC Seater & Sleeper Bus Services.",
      buttonText: b.buttonText || "Book Ticket",
      buttonLink: b.buttonLink || "#booking-form",
      active: typeof b.active === "boolean" ? b.active : true,
    }));

    return {
      banners: validBanners,
      showBanner: typeof parsedData.showBanner === "boolean" ? parsedData.showBanner : true,
      autoPlayInterval: typeof parsedData.autoPlayInterval === "number" ? parsedData.autoPlayInterval : 3000,
    };
  }

  // Legacy single banner migration: put single banner as Banner 1, and supply default Banner 2 and 3
  const legacyBanner1: BannerItem = {
    id: "banner-1",
    imageUrl: parsedData.imageUrl || defaultBanners[0].imageUrl,
    heading: parsedData.heading || defaultBanners[0].heading,
    description: parsedData.description || defaultBanners[0].description,
    buttonText: parsedData.buttonText || defaultBanners[0].buttonText,
    buttonLink: parsedData.buttonLink || defaultBanners[0].buttonLink,
    active: true,
  };

  return {
    banners: [legacyBanner1, defaultBanners[1], defaultBanners[2]],
    showBanner: typeof parsedData.showBanner === "boolean" ? parsedData.showBanner : true,
    autoPlayInterval: 3000,
  };
}

export function getBannerConfig(): BannerConfig {
  // 1. Try reading from /tmp (writable on Vercel)
  try {
    if (fs.existsSync(tmpFilePath)) {
      const fileData = fs.readFileSync(tmpFilePath, "utf8");
      const parsed = JSON.parse(fileData);
      memoryBannerConfig = normalizeBannerConfig(parsed);
      return memoryBannerConfig;
    }
  } catch (err) {
    console.warn("Could not read from /tmp/banner.json:", err);
  }

  // 2. Try reading from project data/banner.json
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, "utf8");
      const parsed = JSON.parse(fileData);
      memoryBannerConfig = normalizeBannerConfig(parsed);
      return memoryBannerConfig;
    }
  } catch (err) {
    console.warn("Could not read from data/banner.json:", err);
  }

  if (memoryBannerConfig) {
    return memoryBannerConfig;
  }

  memoryBannerConfig = defaultBannerConfig;
  return memoryBannerConfig;
}

export function saveBannerConfig(config: BannerConfig): void {
  // Update in-memory cache immediately
  memoryBannerConfig = { ...config };

  const jsonString = JSON.stringify(config, null, 2);

  // 1. Save to /tmp (always writable in Vercel serverless)
  try {
    fs.writeFileSync(tmpFilePath, jsonString, "utf8");
  } catch (err) {
    console.warn("Could not write to /tmp/banner.json:", err);
  }

  // 2. Save to project data/banner.json if filesystem is writable (local dev)
  try {
    const dirPath = path.dirname(dataFilePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, jsonString, "utf8");
  } catch (err) {
    console.warn("Filesystem read-only (e.g. Vercel serverless), saved to memory & /tmp.");
  }
}

// Backward compatibility helpers
export function getBannerData(): BannerData {
  const config = getBannerConfig();
  const activeBanner = config.banners.find((b) => b.active) || config.banners[0] || defaultBanners[0];
  return {
    imageUrl: activeBanner.imageUrl,
    heading: activeBanner.heading,
    description: activeBanner.description,
    buttonText: activeBanner.buttonText,
    buttonLink: activeBanner.buttonLink,
    showBanner: config.showBanner,
  };
}

export function saveBannerData(data: BannerData): void {
  const currentConfig = getBannerConfig();
  const updatedBanners = [...currentConfig.banners];
  if (updatedBanners.length > 0) {
    updatedBanners[0] = {
      ...updatedBanners[0],
      imageUrl: data.imageUrl || updatedBanners[0].imageUrl,
      heading: data.heading || updatedBanners[0].heading,
      description: data.description || updatedBanners[0].description,
      buttonText: data.buttonText || updatedBanners[0].buttonText,
      buttonLink: data.buttonLink || updatedBanners[0].buttonLink,
    };
  }
  saveBannerConfig({
    ...currentConfig,
    showBanner: data.showBanner,
    banners: updatedBanners,
  });
}
