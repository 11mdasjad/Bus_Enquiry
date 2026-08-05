import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
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
    const contentType = req.headers.get("content-type") || "";
    let updatedBanner: BannerData = getBannerData();

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const heading = (formData.get("heading") as string) ?? updatedBanner.heading;
      const description = (formData.get("description") as string) ?? updatedBanner.description;
      const buttonText = (formData.get("buttonText") as string) ?? updatedBanner.buttonText;
      const buttonLink = (formData.get("buttonLink") as string) ?? updatedBanner.buttonLink;
      const showBannerStr = formData.get("showBanner") as string;
      const showBanner = showBannerStr === "true" || showBannerStr === "1";

      let imageUrl = (formData.get("imageUrl") as string) || updatedBanner.imageUrl;

      const imageFile = formData.get("imageFile") as File | null;

      if (imageFile && imageFile instanceof File && imageFile.size > 0) {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const uploadsDir = path.join(process.cwd(), "public", "uploads");

        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const ext = path.extname(imageFile.name) || ".png";
        const fileName = `banner-${Date.now()}${ext}`;
        const filePath = path.join(uploadsDir, fileName);

        fs.writeFileSync(filePath, buffer);
        imageUrl = `/uploads/${fileName}`;
      }

      updatedBanner = {
        heading,
        description,
        buttonText,
        buttonLink,
        showBanner,
        imageUrl,
      };
    } else {
      const body = await req.json();
      updatedBanner = {
        ...updatedBanner,
        ...body,
      };
    }

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
