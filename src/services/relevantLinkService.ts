import api from "./api";

export interface RelevantLink {
  id: number;
  title: string;
  description: string;
  url: string;
  category: string;
  tags?: { name: string }[];
}

export const relevantLinkService = {
  getAll: async (params?: {
    category?: string;
    search?: string;
  }): Promise<RelevantLink[]> => {
    const response = await api.get("/relevant-links/", { params });
    return response.data.results || response.data;
  },

  getById: async (id: string | number): Promise<RelevantLink> => {
    const response = await api.get(`/relevant-links/${id}/`);
    return response.data;
  },
};

