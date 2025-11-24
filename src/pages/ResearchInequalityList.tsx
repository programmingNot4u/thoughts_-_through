import { useState, useEffect } from "react";
import { researchService, type ResearchItem, type PaginatedResponse } from "../services/researchService";
import ResearchSearchResults from "../components/ResearchSearchResults";
import { usePagination } from "../hooks/usePagination";

const ResearchInequalityList = () => {
  const [allResearch, setAllResearch] = useState<ResearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        setLoading(true);
        const params: any = { area: "social" };
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
      heading="Social, familial and individual impact of economic stress and inequality"
      description="Investigating how economic and social disparities affect families and communities, with a focus on creating equitable pathways forward."
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onClear={() => setSearchQuery("")}
      loading={loading}
      results={paginatedItems}
      buildLink={(item) => `/research/social/${item.id}`}
      metaBadge="Social Research"
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={totalCount}
      itemsPerPage={itemsPerPage}
      onPageChange={goToPage}
      showPagination={totalPages > 1}
    />
  );
};

export default ResearchInequalityList;

