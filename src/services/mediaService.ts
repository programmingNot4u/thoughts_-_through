import api from "./api";

export interface MediaCoverageItem {
  id: number;
  title: string;
  date: string;
  type: "Article" | "Video" | "News" | "Interview" | "Event";
  description: string;
  content?: string;
  youtube_video_id?: string;
  author?: string;
  publication?: string;
  image?: string;
  tags?: { name: string }[];
  external_links?: { title: string; url: string }[];
}

export const mediaService = {
  getAll: async (params?: {
    type?: string;
    search?: string;
  }): Promise<MediaCoverageItem[]> => {
    const response = await api.get("/media/", { params });
    return response.data.results || response.data;
  },

  getById: async (id: string | number): Promise<MediaCoverageItem> => {
    const response = await api.get(`/media/${id}/`);
    return response.data;
  },
};

