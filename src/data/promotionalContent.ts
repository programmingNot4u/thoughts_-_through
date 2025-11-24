export interface PromotionalItem {
  id: string;
  title?: string;
  description?: string;
  content?: string; // URL for image/video, text content for text/announcement
  link?: string;
  linkText?: string;
  backgroundColor?: string;
  textColor?: string;
  youtubeUrl?: string;
  youtube_url?: string;
}

export const promotionalItems: PromotionalItem[] = [
  {
    id: "2",
    title: "New Research Publication Available",
    description:
      "Our latest study on climate change impacts is now available for download.",
    content:
      "Explore our comprehensive analysis of environmental health monitoring systems and their role in sustainable development.",
    link: "/publications",
    linkText: "Read Publication",
    backgroundColor: "#2D5F3F",
    textColor: "#ffffff",
  },
  {
    id: "3",
    title: "Upcoming Webinar: Mental Health in Urban Communities",
    description:
      "Join us for an insightful discussion on mental health challenges in urban settings.",
    content:
      "https://via.placeholder.com/1200x600/1C7C54/ffffff?text=Upcoming+Webinar",
    link: "/webinars",
    linkText: "Register Now",
  },
  {
    id: "5",
    title: "Recent Achievement",
    description:
      "We're proud to announce our recognition for excellence in environmental research.",
    content:
      "Our team has been awarded for outstanding contributions to sustainable development research.",
    backgroundColor: "#1C7C54",
    textColor: "#ffffff",
  },
];
