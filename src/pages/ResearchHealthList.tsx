import { useState, useCallback } from "react";
import { researchService, type ResearchItem, type PaginatedResponse } from "../services/researchService";
import ResearchSearchResults from "../components/ResearchSearchResults";
import { usePagination } from "../hooks/usePagination";

const ResearchHealthList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const fetchResearch = useCallback(async (page: number, pageSize: number) => {
    try {
      const params: Record<string, string | number> = { 
        area: "health",
        page,
        page_size: pageSize,
      };
      if (searchQuery) params.search = searchQuery;
      
      const data = await researchService.getAll(params);
      
      // Handle both paginated and non-paginated responses
      if (Array.isArray(data)) {
        // Non-paginated response - return all items
        return {
          items: data,
          totalCount: data.length,
          currentPage: page,
          totalPages: Math.ceil(data.length / pageSize),
        };
      } else {
        // Paginated response from DRF
        const paginated = data as PaginatedResponse<ResearchItem>;
        const items = paginated.results || [];
        const totalCount = paginated.count || 0;
        
        // Calculate totalPages based on count
        let totalPages = Math.ceil(totalCount / pageSize);
        
        // Use next/previous links to determine actual total pages
        // If there's no next link, we're on the last page
        if (!paginated.next) {
          // No next page means current page is the last page
          totalPages = page;
        }
        // If there's a next link, the calculated totalPages should be correct
        
        return {
          items,
          totalCount,
          currentPage: page,
          totalPages,
        };
      }
    } catch (error) {
      console.error("Error fetching research:", error);
      return {
        items: [],
        totalCount: 0,
        currentPage: page,
        totalPages: 0,
      };
    }
  }, [searchQuery]);

  const {
    currentPage,
    items: paginatedItems,
    totalCount,
    totalPages,
    goToPage,
    loading,
  } = usePagination<ResearchItem>({
    itemsPerPage,
    fetchFunction: fetchResearch,
  });

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    // Reset to page 1 when search changes
    if (currentPage !== 1) {
      goToPage(1);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    // Reset to page 1 when clearing search
    if (currentPage !== 1) {
      goToPage(1);
    }
  };

  return (
    <ResearchSearchResults
      heading="Health, Mental Health & Social Health Research"
      description="Comprehensive research on physical, mental, and social well-being to inform evidence-based health policies and interventions."
      searchQuery={searchQuery}
      onSearchChange={handleSearchChange}
      onClear={handleClear}
      loading={loading}
      results={paginatedItems}
      buildLink={(item) => `/research/health/${item.id}`}
      metaBadge="Health Research"
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={totalCount}
      itemsPerPage={itemsPerPage}
      onPageChange={goToPage}
      showPagination={totalPages > 1}
    />
  );
};

export default ResearchHealthList;

