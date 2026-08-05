import fs from "fs";
import path from "path";
import { BannerData, defaultBannerData } from "./banner-types";

export * from "./banner-types";

const dataFilePath = path.join(process.cwd(), "data", "banner.json");

export function getBannerData(): BannerData {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, "utf8");
      return JSON.parse(fileData);
    }
  } catch (err) {
    console.error("Error reading banner.json:", err);
  }
  return defaultBannerData;
}

export function saveBannerData(data: BannerData): void {
  try {
    const dirPath = path.dirname(dataFilePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error saving banner.json:", err);
    throw err;
  }
}
