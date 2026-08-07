export interface BannerItem {
  id: string;
  imageUrl: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  active: boolean;
}

export interface BannerConfig {
  banners: BannerItem[];
  showBanner: boolean;
  autoPlayInterval: number; // In milliseconds, default 5000 (5 seconds)
}

// Backward compatibility single banner interface
export interface BannerData {
  imageUrl: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  showBanner: boolean;
}

export const defaultBanners: BannerItem[] = [
  {
    id: "banner-1",
    imageUrl: "/maa-laxmi-travels-banner.png",
    heading: "Book Your Bus Journey",
    description: "Daily AC Seater & Sleeper Bus Services from Gopalganj to All Major Destinations.",
    buttonText: "Book Ticket",
    buttonLink: "#booking-form",
    active: true,
  },
  {
    id: "banner-2",
    imageUrl: "/maa-laxmi-bus-fleet-banner.jpg",
    heading: "Luxury AC Sleeper & Seater Fleet",
    description: "Experience Maximum Comfort, Clean Reclining Seats & On-Time Direct Service.",
    buttonText: "Reserve Seat",
    buttonLink: "#booking-form",
    active: true,
  },
  {
    id: "banner-3",
    imageUrl: "/volvo-bus-hero.png",
    heading: "Daily Express Routes & Fast Travel",
    description: "Connecting Gopalganj to Delhi, Varanasi, Siliguri, Lucknow, Agra, Jaipur & More.",
    buttonText: "Enquire Routes",
    buttonLink: "#booking-form",
    active: true,
  },
];



export const defaultBannerConfig: BannerConfig = {
  banners: defaultBanners,
  showBanner: true,
  autoPlayInterval: 3000,
};

export const defaultBannerData: BannerData = {
  imageUrl: defaultBanners[0].imageUrl,
  heading: defaultBanners[0].heading,
  description: defaultBanners[0].description,
  buttonText: defaultBanners[0].buttonText,
  buttonLink: defaultBanners[0].buttonLink,
  showBanner: true,
};
