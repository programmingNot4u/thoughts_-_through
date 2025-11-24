import api from "./api";

export interface ResourcePanelMember {
  id: number;
  name: string;
  title: string;
  bio: string;
  email?: string;
  phone?: string;
  image?: string;
  expertise: string[];
  created_at: string;
  updated_at: string;
}

export interface ResourcePanelFilters {
  search?: string;
  expertise?: string;
}

export const resourcePanelService = {
  async getAll(filters?: ResourcePanelFilters): Promise<ResourcePanelMember[]> {
    const params = new URLSearchParams();
    
    if (filters?.search) params.append("search", filters.search);
    
    const response = await api.get(`/resource-panel/?${params.toString()}`);
    // Handle paginated responses (DRF format) or direct array
    if (response.data.results && Array.isArray(response.data.results)) {
      return response.data.results;
    }
    if (Array.isArray(response.data)) {
      return response.data;
    }
    // Fallback to empty array if data structure is unexpected
    console.warn("Unexpected resource panel data structure:", response.data);
    return [];
  },

  async getById(id: number): Promise<ResourcePanelMember> {
    const response = await api.get<ResourcePanelMember>(`/resource-panel/${id}/`);
    return response.data;
  },
};
