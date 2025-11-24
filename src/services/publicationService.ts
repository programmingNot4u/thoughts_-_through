import api from "./api";

export type PublicationType = "PDF" | "DOCX" | "XLSX" | "PPTX" | "Link";
export type PublicationCategory =
  | "Research Report"
  | "Policy Brief"
  | "Journal Article"
  | "Working Paper"
  | "Case Study"
  | "Methodology"
  | "Annual Report";
export type PublicationSector =
  | "Health"
  | "Social"
  | "Environment"
  | "Research"
  | "Policy";

export interface Publication {
  id: number;
  title: string;
  description: string;
  authors: string[];
  date: string;
  category: PublicationCategory;
  type: PublicationType;
  sector: PublicationSector;
  tags: { name: string }[];
  file?: string;
  file_url?: string;
  external_url?: string;
  download_url?: string;
  pages?: number;
  language?: string;
  publisher?: string;
  created_at: string;
  updated_at: string;
}

export interface PublicationFilters {
  category?: PublicationCategory;
  type?: PublicationType;
  sector?: PublicationSector;
  search?: string;
  page?: number;
  page_size?: number;
}

export interface PublicationChoices {
  categories: PublicationCategory[];
  types: PublicationType[];
  sectors: PublicationSector[];
}

export interface PublicationStatistics {
  publications_count: number;
  legal_documents_count: number;
  research_sectors_count: number;
}

export const publicationService = {
  async getAll(filters?: PublicationFilters): Promise<Publication[]> {
    const params = new URLSearchParams();
    
    if (filters?.category) params.append("category", filters.category);
    if (filters?.type) params.append("type", filters.type);
    if (filters?.sector) params.append("sector", filters.sector);
    if (filters?.search) params.append("search", filters.search);
    if (filters?.page) params.append("page", filters.page.toString());
    if (filters?.page_size) params.append("page_size", filters.page_size.toString());
    
    const response = await api.get(`/publications/?${params.toString()}`);
    // Handle paginated responses (DRF format) or direct array
    if (response.data.results && Array.isArray(response.data.results)) {
      return response.data.results;
    }
    if (Array.isArray(response.data)) {
      return response.data;
    }
    // Fallback to empty array if data structure is unexpected
    console.warn("Unexpected publications data structure:", response.data);
    return [];
  },

  async getById(id: number): Promise<Publication> {
    const response = await api.get<Publication>(`/publications/${id}/`);
    return response.data;
  },

  async getChoices(): Promise<PublicationChoices> {
    const response = await api.get<PublicationChoices>("/publications/choices/");
    return response.data;
  },

  async getStatistics(): Promise<PublicationStatistics> {
    const response = await api.get<PublicationStatistics>("/publications/statistics/");
    return response.data;
  },
};
