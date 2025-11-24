import { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import type { ResearchItem } from "../services/researchService";
import Pagination from "./Pagination";

interface ResearchSearchResultsProps {
  heading: string;
  description: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onClear?: () => void;
  searchPlaceholder?: string;
  loading: boolean;
  results: ResearchItem[];
  buildLink: (item: ResearchItem) => string;
  emptyState?: {
    title: string;
    description: string;
  };
  metaBadge?: string;
  // Pagination props
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  showPagination?: boolean;
}

const ResultCard = ({
  item,
  href,
}: {
  item: ResearchItem;
  href: string;
}) => {
  const publishedDate = new Date(item.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      to={href}
      className="group flex flex-col md:flex-row gap-6 rounded-3xl border border-light-green/60 bg-white/80 backdrop-blur-sm p-5 shadow-lg shadow-forest-green/5 transition hover:-translate-y-1 hover:border-forest-green/70">
      <div className="md:w-64 w-full">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-forest-green to-deep-green">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-white text-4xl">
              📘
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-medium-gray mb-2">
            {item.area} • {publishedDate}
          </p>
          <h3 className="text-2xl font-heading font-bold text-dark-gray leading-tight mb-3 group-hover:text-forest-green">
            {item.title}
          </h3>
          <p className="text-base text-medium-gray line-clamp-3">
            {item.description}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-light-green pt-4">
          <div className="flex flex-wrap gap-2">
            {item.tags?.slice(0, 3).map((tag, idx) => (
              <span
                key={`${tag.name}-${idx}`}
                className="px-3 py-1 rounded-full bg-light-green text-forest-green text-xs font-medium">
                {tag.name}
              </span>
            ))}
          </div>
          <div className="flex items-center text-forest-green font-semibold text-sm">
            View details
            <svg
              className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ResearchSearchResults = ({
  heading,
  description,
  searchQuery,
  onSearchChange,
  onClear,
  searchPlaceholder = "Search by title, description, or tags...",
  loading,
  results,
  buildLink,
  emptyState = {
    title: "No research found",
    description: "Try adjusting your search terms or clearing the filters.",
  },
  metaBadge,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  showPagination = false,
}: ResearchSearchResultsProps) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  // Use totalItems if available, otherwise fall back to results.length
  const displayCount = totalItems !== undefined ? totalItems : results.length;

  return (
    <section className="pt-20 min-h-screen bg-gradient-to-b from-white via-slate-50 to-light-green/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-[32px] border border-light-green/70 bg-white/90 shadow-2xl shadow-forest-green/10 p-8 mb-10">
          {metaBadge && (
            <span className="inline-flex px-4 py-1.5 rounded-full bg-forest-green text-white text-xs uppercase tracking-[0.3em] mb-4">
              {metaBadge}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-dark-gray mb-4">
            {heading}
          </h1>
          <p className="text-lg text-medium-gray max-w-3xl mb-8">{description}</p>

          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder={searchPlaceholder}
              className="w-full px-5 py-4 pl-14 rounded-2xl border-2 border-forest-green/30 focus:border-forest-green focus:ring-2 focus:ring-forest-green/20 bg-white text-dark-gray"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-forest-green"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={onClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-forest-green font-semibold">
                Clear
              </button>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-medium-gray">
            <span className="inline-flex items-center gap-2 rounded-full border border-light-green px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-forest-green"></span>
              {displayCount} result{displayCount !== 1 ? "s" : ""}
              {currentPage && totalPages && totalPages > 1 && (
                <span className="ml-2 text-xs">
                  (Page {currentPage} of {totalPages})
                </span>
              )}
            </span>
            {searchQuery && (
              <span className="inline-flex items-center gap-2 rounded-full border border-light-green px-3 py-1">
                Searching for “{searchQuery}”
              </span>
            )}
          </div>
        </div>

        {loading ? (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row gap-6 rounded-3xl border border-light-green/40 bg-white/70 p-5 animate-pulse">
                <div className="md:w-64 w-full aspect-[4/3] bg-light-green/50 rounded-2xl" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-light-green/60 rounded w-1/3" />
                  <div className="h-6 bg-light-green/60 rounded w-3/4" />
                  <div className="h-6 bg-light-green/40 rounded w-2/3" />
                  <div className="h-16 bg-light-green/30 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-3xl border border-light-green/70 bg-white/90 text-center p-12 shadow-2xl shadow-forest-green/10">
            <h2 className="text-2xl font-heading font-bold text-dark-gray mb-4">
              {emptyState.title}
            </h2>
            <p className="text-medium-gray mb-6">{emptyState.description}</p>
            {onClear && (
              <button onClick={onClear} className="btn-outline">
                Reset search
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {results.map((item) => (
                <ResultCard key={item.id} item={item} href={buildLink(item)} />
              ))}
            </div>
            {showPagination &&
              currentPage &&
              totalPages &&
              onPageChange && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                  itemsPerPage={itemsPerPage}
                  totalItems={totalItems}
                />
              )}
          </>
        )}
      </div>
    </section>
  );
};

export default ResearchSearchResults;

