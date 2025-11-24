import api from "./api";

export interface AdditionalContactMethod {
  type: string;
  label: string;
  value: string;
  url?: string;
}

export interface ContactPage {
  id: number;
  hero_title: string;
  hero_description: string;
  contact_section_title: string;
  email?: string;
  phone?: string;
  address?: string;
  facebook_url?: string;
  linkedin_url?: string;
  youtube_url?: string;
  twitter_url?: string;
  form_title: string;
  form_submit_button_text: string;
  additional_contact_methods: AdditionalContactMethod[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const contactService = {
  async getActive(): Promise<ContactPage | null> {
    try {
      const response = await api.get<ContactPage>("/contact/active/");
      // Backend now returns default contact page instead of 404, so we always get data
      return response.data;
    } catch (error: any) {
      // Only log if it's not a 404 (expected when no contact page exists, though backend should handle this now)
      if (error.response?.status !== 404) {
        console.error("Error fetching contact page:", error);
      }
      // Return null on error (component will show default values)
      return null;
    }
  },

  async getAll(): Promise<ContactPage[]> {
    try {
      const response = await api.get("/contact/");
      // Handle paginated responses (DRF format) or direct array
      if (response.data.results && Array.isArray(response.data.results)) {
        return response.data.results;
      }
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return [];
    } catch (error: any) {
      // Only log if it's not a 404 (expected when no contact page exists)
      if (error.response?.status !== 404) {
        console.error("Error fetching contact pages:", error);
      }
      return [];
    }
  },
};

