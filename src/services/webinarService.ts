import api from "./api";

export interface Webinar {
  id: number;
  title: string;
  description: string;
  date: string;
  duration?: string;
  presenter_name: string;
  presenter_title?: string;
  presenter_bio?: string;
  topics: string[];
  registration_link?: string;
  recording_link?: string;
  status: "Upcoming" | "Ongoing" | "Completed";
}

export const webinarService = {
  getAll: async (params?: {
    status?: string;
    search?: string;
  }): Promise<Webinar[]> => {
    const response = await api.get("/webinars/", { params });
    return response.data.results || response.data;
  },

  getById: async (id: string | number): Promise<Webinar> => {
    const response = await api.get(`/webinars/${id}/`);
    return response.data;
  },
};

