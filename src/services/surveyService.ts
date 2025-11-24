import api from "./api";

export interface Survey {
  id: number;
  title: string;
  date: string;
  description: string;
  status: "Active" | "Completed" | "Upcoming";
  category: string;
  participants?: number;
  content?: string;
  image?: string;
  tags?: { name: string }[];
  author?: string;
  objectives?: { objective: string }[];
  external_links?: { title: string; url: string }[];
  methodology?: string;
  findings?: string;
}

export const surveyService = {
  getAll: async (params?: {
    status?: string;
    category?: string;
    search?: string;
  }): Promise<Survey[]> => {
    const response = await api.get("/surveys/", { params });
    return response.data.results || response.data;
  },

  getById: async (id: string | number): Promise<Survey> => {
    const response = await api.get(`/surveys/${id}/`);
    return response.data;
  },

  getActive: async (): Promise<Survey[]> => {
    const response = await api.get("/surveys/active/");
    return response.data;
  },

  getCompleted: async (): Promise<Survey[]> => {
    const response = await api.get("/surveys/completed/");
    return response.data;
  },
};

