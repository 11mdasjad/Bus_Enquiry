import { NextRequest, NextResponse } from "next/server";
import { getBannerConfig, saveBannerConfig, BannerConfig, BannerItem } from "@/lib/banner";

export async function GET() {
  try {
    const config = getBannerConfig();
    const activeBanners = config.banners.filter((b) => b.active);

    return NextResponse.json({
      success: true,
      bannerConfig: config,
      banners: config.banners,
      activeBanners,
      showBanner: config.showBanner,
      autoPlayInterval: config.autoPlayInterval || 3000,
      // Legacy compatibility single banner field
      banner: activeBanners[0] || config.banners[0] || null,
    });
  } catch (error) {
    console.error("GET /api/banner error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch banner data" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const currentConfig = getBannerConfig();

    let updatedConfig: BannerConfig;

    if (Array.isArray(body.banners)) {
      // Full multi-banner update
      const banners: BannerItem[] = body.banners.map((b: any, i: number) => ({
        id: b.id || `banner-${Date.now()}-${i}`,
        imageUrl: String(b.imageUrl || ""),
        heading: String(b.heading || ""),
        description: String(b.description || ""),
        buttonText: String(b.buttonText || "Book Ticket"),
        buttonLink: String(b.buttonLink || "#booking-form"),
        active: typeof b.active === "boolean" ? b.active : true,
      }));

      updatedConfig = {
        banners,
        showBanner: typeof body.showBanner === "boolean" ? body.showBanner : currentConfig.showBanner,
        autoPlayInterval: typeof body.autoPlayInterval === "number" ? body.autoPlayInterval : (currentConfig.autoPlayInterval || 3000),
      };
    } else {
      // Legacy single-banner update
      const updatedBanners = [...currentConfig.banners];
      if (updatedBanners.length > 0) {
        updatedBanners[0] = {
          ...updatedBanners[0],
          heading: body.heading !== undefined ? String(body.heading) : updatedBanners[0].heading,
          description: body.description !== undefined ? String(body.description) : updatedBanners[0].description,
          buttonText: body.buttonText !== undefined ? String(body.buttonText) : updatedBanners[0].buttonText,
          buttonLink: body.buttonLink !== undefined ? String(body.buttonLink) : updatedBanners[0].buttonLink,
          imageUrl: body.imageUrl || updatedBanners[0].imageUrl,
        };
      }

      updatedConfig = {
        ...currentConfig,
        showBanner: typeof body.showBanner === "boolean" ? body.showBanner : currentConfig.showBanner,
        banners: updatedBanners,
      };
    }

    saveBannerConfig(updatedConfig);

    return NextResponse.json({
      success: true,
      message: "Banners updated successfully",
      bannerConfig: updatedConfig,
      banners: updatedConfig.banners,
      showBanner: updatedConfig.showBanner,
    });
  } catch (error) {
    console.error("POST /api/banner error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save banner data" },
      { status: 500 }
    );
  }
}
