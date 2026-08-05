import { NextRequest, NextResponse } from "next/server";
import { getBannerData, saveBannerData, BannerData } from "@/lib/banner";

export async function GET() {
  try {
    const banner = getBannerData();
    return NextResponse.json({ success: true, banner });
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
    const currentBanner = getBannerData();

    const updatedBanner: BannerData = {
      heading: body.heading !== undefined ? String(body.heading) : currentBanner.heading,
      description: body.description !== undefined ? String(body.description) : currentBanner.description,
      buttonText: body.buttonText !== undefined ? String(body.buttonText) : currentBanner.buttonText,
      buttonLink: body.buttonLink !== undefined ? String(body.buttonLink) : currentBanner.buttonLink,
      showBanner: typeof body.showBanner === "boolean" ? body.showBanner : currentBanner.showBanner,
      imageUrl: body.imageUrl || currentBanner.imageUrl,
    };

    saveBannerData(updatedBanner);

    return NextResponse.json({
      success: true,
      message: "Banner updated successfully",
      banner: updatedBanner,
    });
  } catch (error) {
    console.error("POST /api/banner error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save banner data" },
      { status: 500 }
    );
  }
}
