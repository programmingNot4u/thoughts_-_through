import api from "./api";

export interface AboutPageSection {
  id: number;
  title: string;
  section_type: "vision" | "mission" | "goals" | "objectives" | "values" | "custom";
  items: string[];
  order: number;
  is_active: boolean;
}

export interface AboutPageContent {
  id: number;
  title?: string;
  content_type: "chairman_intro" | "organization_intro" | "history" | "achievements" | "custom";
  content: string;
  image?: string;
  image_position: "left" | "right" | "top" | "bottom";
  order: number;
  is_active: boolean;
}

export interface OrganizationalMember {
  id: number;
  name: string;
  designation: string;
  bio?: string;
  email?: string;
  phone?: string;
  image?: string;
  reports_to?: number;
  reports_to_name?: string;
  reports_to_designation?: string;
  level: number;
  order: number;
  is_active: boolean;
  subordinates_count?: number;
}

export const aboutService = {
  getSections: async (): Promise<AboutPageSection[]> => {
    const response = await api.get("/about/sections/");
    return response.data.results || response.data;
  },

  getContent: async (): Promise<AboutPageContent[]> => {
    const response = await api.get("/about/content/");
    return response.data.results || response.data;
  },

  getOrganizationalMembers: async (): Promise<OrganizationalMember[]> => {
    const response = await api.get("/about/organizational/");
    return response.data.results || response.data;
  },

  getOrganizationalStructure: async (): Promise<{ members: OrganizationalMember[] }> => {
    const response = await api.get("/about/organizational/structure/");
    return response.data;
  },
};

