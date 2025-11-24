import api from "./api";

export type DocumentType = "Certificate" | "Audit Report" | "Approval" | "License";

export interface LegalDocument {
  id: number;
  title: string;
  description?: string;
  document_type: DocumentType;
  year: string;
  file?: string;
  file_url?: string;
  external_url?: string;
  download_url?: string;
  issued_by?: string;
  issue_date?: string;
  expiry_date?: string;
  is_active: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface LegalDocumentFilters {
  type?: DocumentType;
  year?: string;
  search?: string;
}

export const legalDocumentService = {
  async getAll(filters?: LegalDocumentFilters): Promise<LegalDocument[]> {
    const params = new URLSearchParams();
    
    if (filters?.type) params.append("type", filters.type);
    if (filters?.year) params.append("year", filters.year);
    if (filters?.search) params.append("search", filters.search);
    
    const response = await api.get(`/legal-documents/?${params.toString()}`);
    // Handle paginated responses (DRF format) or direct array
    if (response.data.results && Array.isArray(response.data.results)) {
      return response.data.results;
    }
    if (Array.isArray(response.data)) {
      return response.data;
    }
    // Fallback to empty array if data structure is unexpected
    console.warn("Unexpected legal documents data structure:", response.data);
    return [];
  },

  async getById(id: number): Promise<LegalDocument> {
    const response = await api.get<LegalDocument>(`/legal-documents/${id}/`);
    return response.data;
  },
};

