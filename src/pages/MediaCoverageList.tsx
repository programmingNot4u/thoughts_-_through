import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { MediaType } from "../data/mediaCoverage";
import { mediaCoverage } from "../data/mediaCoverage";

const MediaCoverageList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<MediaType | "All">("All");
  const [sortBy, setSortBy] = useState<"date" | "title">("date");

  const filteredAndSortedItems = useMemo(() => {
    let filtered = mediaCoverage.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesType = typeFilter === "All" || item.type === typeFilter;

      return matchesSearch && matchesType;
    });

    // Sort items
    filtered.sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime(); // Newest first
      } else {
        return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [searchQuery, typeFilter, sortBy]);

  const getTypeIcon = (type: MediaType) => {
    switch (type) {
      case "Article":
        return "📄";
      case "Video":
        return "📺";
      case "News":
        return "📰";
      case "Interview":
        return "🎤";
      case "Event":
        return "🌍";
      default:
        return "📄";
    }
  };

  const getTypeColor = (type: MediaType) => {
    switch (type) {
      case "Article":
        return "bg-blue-500";
      case "Video":
        return "bg-red-500";
      case "News":
        return "bg-green-500";
      case "Interview":
        return "bg-purple-500";
      case "Event":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-dark-gray mb-6">
            Media Coverage & Articles
          </h1>
          <p className="text-xl text-medium-gray max-w-3xl mx-auto">
            Explore our media coverage, research articles, interviews, and news
            features from various publications and platforms.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-light-green rounded-lg p-6 shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-dark-gray mb-2">
                Search Articles
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, description, or tags..."
                  className="w-full px-4 py-3 pl-10 border-2 border-forest-green rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green bg-white"
                />
                <svg
                  className="absolute left-3 top-3.5 w-5 h-5 text-medium-gray"
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
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-dark-gray mb-2">
                Type
              </label>
              <select
                id="type"
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(e.target.value as MediaType | "All")
                }
                className="w-full px-4 py-3 border-2 border-forest-green rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green bg-white">
                <option value="All">All Types</option>
                <option value="Article">Article</option>
                <option value="Video">Video</option>
                <option value="News">News</option>
                <option value="Interview">Interview</option>
                <option value="Event">Event</option>
              </select>
            </div>
          </div>

          {/* Sort */}
          <div className="mt-4 flex items-center space-x-4">
            <span className="text-sm font-medium text-dark-gray">Sort by:</span>
            <button
              onClick={() => setSortBy("date")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                sortBy === "date"
                  ? "bg-forest-green text-white"
                  : "bg-white text-dark-gray hover:bg-forest-green hover:text-white"
              }`}>
              Date
            </button>
            <button
              onClick={() => setSortBy("title")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                sortBy === "title"
                  ? "bg-forest-green text-white"
                  : "bg-white text-dark-gray hover:bg-forest-green hover:text-white"
              }`}>
              Title
            </button>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-medium-gray">
            Showing {filteredAndSortedItems.length} of {mediaCoverage.length}{" "}
            articles
          </div>
        </div>

        {/* Articles Grid */}
        {filteredAndSortedItems.length === 0 ? (
          <div className="bg-light-green rounded-lg p-12 text-center shadow-md">
            <p className="text-xl text-medium-gray mb-4">
              No articles found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setTypeFilter("All");
              }}
              className="btn-outline">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedItems.map((item, index) => (
              <Link
                key={item.id}
                to={`/media-coverage/${item.id}`}
                className="bg-white rounded-lg overflow-hidden shadow-md card-hover"
                data-aos="fade-up"
                data-aos-delay={index * 50}>
                <div className="h-48 bg-gradient-to-br from-forest-green to-deep-green flex items-center justify-center text-6xl text-white relative">
                  {getTypeIcon(item.type)}
                  {/* Type Badge */}
                  <span
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${getTypeColor(
                      item.type
                    )}`}>
                    {item.type}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-dark-gray mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-medium-gray mb-4">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>
                      {new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-medium-gray mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-light-green text-forest-green rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="pt-4 border-t border-light-green">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-forest-green font-medium">
                        Read More
                      </span>
                      <svg
                        className="w-5 h-5 text-forest-green"
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaCoverageList;
