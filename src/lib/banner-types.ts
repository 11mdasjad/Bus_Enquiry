export interface BannerData {
  imageUrl: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  showBanner: boolean;
}

export const defaultBannerData: BannerData = {
  imageUrl: "/maa-laxmi-travels-banner.png",
  heading: "Book Your Bus Journey",
  description: "Daily AC Seater & Sleeper Bus Services from Gopalganj to All Major Destinations.",
  buttonText: "Book Ticket",
  buttonLink: "#booking-form",
  showBanner: true,
};
