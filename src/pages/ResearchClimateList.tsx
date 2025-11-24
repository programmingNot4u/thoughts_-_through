import { useState, useEffect } from "react";
import { researchService, type ResearchItem, type PaginatedResponse } from "../services/researchService";
import ResearchSearchResults from "../components/ResearchSearchResults";
import { usePagination } from "../hooks/usePagination";

const ResearchClimateList = () => {
  const [allResearch, setAllResearch] = useState<ResearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        setLoading(true);
        const params: any = { area: "climate" };
        if (searchQuery) params.search = searchQuery;
        const data = await researchService.getAll(params);
        
        // Handle both paginated and non-paginated responses
        if (Array.isArray(data)) {
          setAllResearch(data);
        } else {
          const paginated = data as PaginatedResponse<ResearchItem>;
          setAllResearch(paginated.results || []);
        }
      } catch (error) {
        console.error("Error fetching research:", error);
        setAllResearch([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResearch();
  }, [searchQuery]);

  const {
    currentPage,
    items: paginatedItems,
    totalCount,
    totalPages,
    goToPage,
  } = usePagination<ResearchItem>({
    itemsPerPage,
    data: allResearch,
  });

  return (
    <ResearchSearchResults
      heading="Climate Change Impacts on Health & Livelihood"
      description="Analyzing the intersection of environmental change and human well-being to develop resilient communities and sustainable solutions."
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onClear={() => setSearchQuery("")}
      loading={loading}
      results={paginatedItems}
      buildLink={(item) => `/research/climate/${item.id}`}
      metaBadge="Climate Research"
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={totalCount}
      itemsPerPage={itemsPerPage}
      onPageChange={goToPage}
      showPagination={totalPages > 1}
    />
  );
};

export default ResearchClimateList;

