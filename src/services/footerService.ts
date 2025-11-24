import api from "./api";

export interface FooterLink {
  title: string;
  url: string;
}

export interface Footer {
  id: number;
  about_title: string;
  about_description: string;
  facebook_url?: string;
  linkedin_url?: string;
  youtube_url?: string;
  twitter_url?: string;
  email?: string;
  phone?: string;
  address?: string;
  research_areas_links: FooterLink[];
  publications_links: FooterLink[];
  copyright_text: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const footerService = {
  async getActive(): Promise<Footer | null> {
    try {
      const response = await api.get<Footer>("/footer/active/");
      // Backend now returns default footer instead of 404, so we always get data
      return response.data;
    } catch (error: any) {
      // Only log if it's not a 404 (expected when no footer exists, though backend should handle this now)
      if (error.response?.status !== 404) {
        console.error("Error fetching footer:", error);
      }
      // Return null on error (component will show loading state)
      return null;
    }
  },

  async getAll(): Promise<Footer[]> {
    try {
      const response = await api.get("/footer/");
      // Handle paginated responses (DRF format) or direct array
      if (response.data.results && Array.isArray(response.data.results)) {
        return response.data.results;
      }
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return [];
    } catch (error: any) {
      // Only log if it's not a 404 (expected when no footer exists)
      if (error.response?.status !== 404) {
        console.error("Error fetching footers:", error);
      }
      return [];
    }
  },
};

