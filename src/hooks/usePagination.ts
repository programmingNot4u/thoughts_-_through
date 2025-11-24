import { useState, useMemo, useEffect } from "react";

export interface PaginationData<T> {
  items: T[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}

interface UsePaginationOptions<T> {
  itemsPerPage?: number;
  initialPage?: number;
  fetchFunction?: (page: number, pageSize: number) => Promise<PaginationData<T>>;
  data?: T[]; // For client-side pagination
}

export const usePagination = <T>({
  itemsPerPage = 10,
  initialPage = 1,
  fetchFunction,
  data,
}: UsePaginationOptions<T>) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<T[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  // Client-side pagination
  const paginatedData = useMemo(() => {
    if (!data) return { items: [], totalCount: 0 };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = data.slice(startIndex, endIndex);

    return {
      items: paginated,
      totalCount: data.length,
    };
  }, [data, currentPage, itemsPerPage]);

  // Server-side pagination
  useEffect(() => {
    if (fetchFunction && !data) {
      const loadData = async () => {
        try {
          setLoading(true);
          setError(null);
          const result = await fetchFunction(currentPage, itemsPerPage);
          setItems(result.items);
          setTotalCount(result.totalCount);
        } catch (err) {
          setError(err instanceof Error ? err : new Error("Failed to load data"));
          setItems([]);
          setTotalCount(0);
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }
  }, [currentPage, itemsPerPage, fetchFunction, data]);

  // Use server-side data if fetchFunction is provided, otherwise use client-side paginated data
  const finalItems = fetchFunction && !data ? items : paginatedData.items;
  const finalTotalCount = fetchFunction && !data ? totalCount : paginatedData.totalCount;
  // For server-side pagination, totalPages comes from the fetchFunction result
  // For client-side, calculate it
  const finalTotalPages = fetchFunction && !data 
    ? Math.ceil(finalTotalCount / itemsPerPage) 
    : Math.ceil(finalTotalCount / itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= finalTotalPages) {
      setCurrentPage(page);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const nextPage = () => {
    if (currentPage < finalTotalPages) {
      goToPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  // Reset to page 1 if current page is out of bounds
  useEffect(() => {
    if (finalTotalPages > 0 && currentPage > finalTotalPages) {
      setCurrentPage(1);
    }
  }, [finalTotalPages, currentPage]);

  return {
    currentPage,
    items: finalItems,
    totalCount: finalTotalCount,
    totalPages: finalTotalPages,
    itemsPerPage,
    loading,
    error,
    goToPage,
    nextPage,
    previousPage,
    hasNextPage: currentPage < finalTotalPages,
    hasPreviousPage: currentPage > 1,
  };
};

