import { useMemo, useState } from "react";
import type { LinkCategory } from "../data/relevantLinks";
import { relevantLinks } from "../data/relevantLinks";

const RelevantLinksList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<LinkCategory | "All">(
    "All"
  );
  const [sortBy, setSortBy] = useState<"title" | "category">("title");

  const categories: LinkCategory[] = [
    "National",
    "International",
    "Government",
    "Research",
    "NGO",
    "Academic",
  ];

  const filteredAndSortedLinks = useMemo(() => {
    let filtered = relevantLinks.filter((link) => {
      const matchesSearch =
        link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        categoryFilter === "All" || link.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });

    // Sort links
    filtered.sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else {
        const categoryCompare = a.category.localeCompare(b.category);
        if (categoryCompare !== 0) return categoryCompare;
        return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [searchQuery, categoryFilter, sortBy]);

  const getCategoryColor = (category: LinkCategory) => {
    switch (category) {
      case "National":
        return "bg-blue-500 text-white";
      case "International":
        return "bg-purple-500 text-white";
      case "Government":
        return "bg-green-600 text-white";
      case "Research":
        return "bg-orange-500 text-white";
      case "NGO":
        return "bg-pink-500 text-white";
      case "Academic":
        return "bg-indigo-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-light-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-dark-gray mb-6">
            Relevant Links
          </h1>
          <p className="text-xl text-medium-gray max-w-3xl mx-auto">
            Explore our curated collection of relevant research, government, and
            organizational links across various categories.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-dark-gray mb-2">
                Search Links
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, description, or tags..."
                  className="w-full px-4 py-3 pl-10 border-2 border-forest-green rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
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

            {/* Category Filter */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-dark-gray mb-2">
                Category
              </label>
              <select
                id="category"
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(e.target.value as LinkCategory | "All")
                }
                className="w-full px-4 py-3 border-2 border-forest-green rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green bg-white">
                <option value="All">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort */}
          <div className="mt-4 flex items-center space-x-4">
            <span className="text-sm font-medium text-dark-gray">Sort by:</span>
            <button
              onClick={() => setSortBy("title")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                sortBy === "title"
                  ? "bg-forest-green text-white"
                  : "bg-light-green text-dark-gray hover:bg-forest-green hover:text-white"
              }`}>
              Title
            </button>
            <button
              onClick={() => setSortBy("category")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                sortBy === "category"
                  ? "bg-forest-green text-white"
                  : "bg-light-green text-dark-gray hover:bg-forest-green hover:text-white"
              }`}>
              Category
            </button>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-medium-gray">
            Showing {filteredAndSortedLinks.length} of {relevantLinks.length}{" "}
            links
          </div>
        </div>

        {/* Links Grid */}
        {filteredAndSortedLinks.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center shadow-md">
            <p className="text-xl text-medium-gray mb-4">
              No links found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setCategoryFilter("All");
              }}
              className="btn-outline">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedLinks.map((link, index) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg overflow-hidden shadow-md card-hover"
                data-aos="fade-up"
                data-aos-delay={index * 50}>
                <div className="h-48 bg-gradient-to-br from-forest-green to-deep-green flex items-center justify-center text-6xl text-white relative">
                  🔗
                  {/* Category Badge */}
                  <span
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                      link.category
                    )}`}>
                    {link.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-dark-gray mb-3 line-clamp-2">
                    {link.title}
                  </h3>
                  <p className="text-medium-gray text-sm leading-relaxed mb-4 line-clamp-3">
                    {link.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {link.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-light-green text-forest-green text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                    {link.tags.length > 3 && (
                      <span className="px-2 py-1 bg-light-green text-forest-green text-xs rounded-full">
                        +{link.tags.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="pt-4 border-t border-light-green">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-forest-green font-medium">
                        Visit Link
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
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RelevantLinksList;
