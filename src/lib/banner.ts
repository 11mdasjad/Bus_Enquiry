import fs from "fs";
import path from "path";
import { BannerData, defaultBannerData } from "./banner-types";

export * from "./banner-types";

// In-memory fallback for Vercel / serverless environments where root fs is read-only
let memoryBannerData: BannerData | null = null;

const dataFilePath = path.join(process.cwd(), "data", "banner.json");
const tmpFilePath = path.join("/tmp", "banner.json");

export function getBannerData(): BannerData {
  if (memoryBannerData) {
    return memoryBannerData;
  }

  // 1. Try reading from /tmp (writable on Vercel)
  try {
    if (fs.existsSync(tmpFilePath)) {
      const fileData = fs.readFileSync(tmpFilePath, "utf8");
      memoryBannerData = JSON.parse(fileData);
      return memoryBannerData!;
    }
  } catch (err) {
    console.warn("Could not read from /tmp/banner.json:", err);
  }

  // 2. Try reading from project data/banner.json
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, "utf8");
      memoryBannerData = JSON.parse(fileData);
      return memoryBannerData!;
    }
  } catch (err) {
    console.warn("Could not read from data/banner.json:", err);
  }

  return defaultBannerData;
}

export function saveBannerData(data: BannerData): void {
  // Update in-memory cache immediately
  memoryBannerData = { ...data };

  // 1. Try saving to /tmp (always writable in Vercel serverless)
  try {
    fs.writeFileSync(tmpFilePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.warn("Could not write to /tmp/banner.json:", err);
  }

  // 2. Try saving to project data/banner.json if filesystem is writable (local dev)
  try {
    const dirPath = path.dirname(dataFilePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    // Expected on Vercel serverless (read-only filesystem)
    console.warn("Filesystem read-only (e.g. Vercel serverless), saved to memory & /tmp.");
  }
}
