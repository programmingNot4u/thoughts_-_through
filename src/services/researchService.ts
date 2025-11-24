import api from "./api";

export interface ResearchImage {
  id: number;
  image: string;
  caption?: string;
  order: number;
}

export interface ResearchItem {
  id: number;
  area: "health" | "climate" | "social";
  title: string;
  date: string;
  description: string;
  content?: string;
  image?: string;
  image_layout?: "gallery" | "distributed" | "single";
  images?: ResearchImage[];
  tags?: { name: string }[];
  author?: string;
  external_links?: { title: string; url: string }[];
  youtube_video_id?: string;
}

export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

export const researchService = {
  getAll: async (params?: {
    area?: string;
    search?: string;
    page?: number;
    page_size?: number;
  }): Promise<ResearchItem[] | PaginatedResponse<ResearchItem>> => {
    try {
      const response = await api.get("/research/", { params });
      
      // Check if response.data exists
      if (!response.data) {
        console.warn("Empty response data");
        return [];
      }
      
      // If response has pagination structure (DRF format), return it
      if (
        typeof response.data === 'object' && 
        !Array.isArray(response.data) &&
        'results' in response.data && 
        Array.isArray(response.data.results) &&
        typeof response.data.count === "number"
      ) {
        return response.data as PaginatedResponse<ResearchItem>;
      }
      
      // Otherwise, return as array
      if (Array.isArray(response.data)) {
        return response.data;
      }
      
      // Fallback to empty array
      console.warn("Unexpected response format:", response.data);
      return [];
    } catch (error) {
      console.error("Error in researchService.getAll:", error);
      throw error;
    }
  },

  getById: async (id: string | number): Promise<ResearchItem> => {
    const response = await api.get(`/research/${id}/`);
    return response.data;
  },

  getHealth: async (): Promise<ResearchItem[]> => {
    const response = await api.get("/research/health/");
    return response.data;
  },

  getClimate: async (): Promise<ResearchItem[]> => {
    const response = await api.get("/research/climate/");
    return response.data;
  },

  getSocial: async (): Promise<ResearchItem[]> => {
    const response = await api.get("/research/social/");
    return response.data;
  },
};

