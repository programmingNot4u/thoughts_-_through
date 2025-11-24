import api from "./api";

export interface PromotionalItem {
  id: number;
  title?: string;
  description?: string;
  content?: string;
  link?: string;
  link_text?: string;
  background_color?: string;
  text_color?: string;
  image?: string;
  youtube_url?: string;
  youtubeUrl?: string;
  order: number;
  is_active: boolean;
}

export const promotionalService = {
  getAll: async (): Promise<PromotionalItem[]> => {
    const response = await api.get("/promotional/");
    return response.data.results || response.data;
  },

  getById: async (id: string | number): Promise<PromotionalItem> => {
    const response = await api.get(`/promotional/${id}/`);
    return response.data;
  },
};

