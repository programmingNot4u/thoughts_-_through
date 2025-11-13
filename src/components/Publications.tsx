import { useMemo, useState } from "react";
import type {
  PublicationCategory,
  PublicationSector,
  PublicationType,
} from "../data/publications";
import { publications } from "../data/publications";

const Publications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterYear, setFilterYear] = useState<string>("All");
  const [filterCategory, setFilterCategory] = useState<
    PublicationCategory | "All"
  >("All");
  const [filterSector, setFilterSector] = useState<PublicationSector | "All">(
    "All"
  );
  const [filterType, setFilterType] = useState<PublicationType | "All">("All");
  const [sortBy, setSortBy] = useState<"date" | "title" | "category">("date");

  // Extract unique values for filters
  const years = useMemo(() => {
    const yearSet = new Set(publications.map((pub) => pub.date.split("-")[0]));
    return ["All", ...Array.from(yearSet).sort().reverse()];
  }, []);

  const categories: PublicationCategory[] = [
    "Research Report",
    "Policy Brief",
    "Journal Article",
    "Working Paper",
    "Case Study",
    "Methodology",
    "Annual Report",
  ];

  const sectors: PublicationSector[] = [
    "Health",
    "Social",
    "Environment",
    "Research",
    "Policy",
  ];
  const types: PublicationType[] = ["PDF", "DOCX", "XLSX", "PPTX", "Link"];

  const filteredAndSortedPublications = useMemo(() => {
    let filtered = publications.filter((pub) => {
      const matchesSearch =
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.authors.some((author) =>
          author.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        pub.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const year = pub.date.split("-")[0];
      const matchesYear = filterYear === "All" || year === filterYear;
      const matchesCategory =
        filterCategory === "All" || pub.category === filterCategory;
      const matchesSector =
        filterSector === "All" || pub.sector === filterSector;
      const matchesType = filterType === "All" || pub.type === filterType;

      return (
        matchesSearch &&
        matchesYear &&
        matchesCategory &&
        matchesSector &&
        matchesType
      );
    });

    // Sort publications
    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime(); // Newest first
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else {
        const categoryCompare = a.category.localeCompare(b.category);
        if (categoryCompare !== 0) return categoryCompare;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return filtered;
  }, [
    searchQuery,
    filterYear,
    filterCategory,
    filterSector,
    filterType,
    sortBy,
  ]);

  const getTypeIcon = (type: PublicationType) => {
    switch (type) {
      case "PDF":
        return (
          <svg
            className="w-6 h-6 text-red-600"
            fill="currentColor"
            viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "DOCX":
        return (
          <svg
            className="w-6 h-6 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-6 h-6 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  const getCategoryColor = (category: PublicationCategory) => {
    switch (category) {
      case "Research Report":
        return "bg-blue-100 text-blue-800";
      case "Policy Brief":
        return "bg-purple-100 text-purple-800";
      case "Journal Article":
        return "bg-green-100 text-green-800";
      case "Working Paper":
        return "bg-yellow-100 text-yellow-800";
      case "Case Study":
        return "bg-pink-100 text-pink-800";
      case "Methodology":
        return "bg-indigo-100 text-indigo-800";
      case "Annual Report":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSectorColor = (sector: PublicationSector) => {
    switch (sector) {
      case "Health":
        return "bg-red-50 text-red-700 border-red-200";
      case "Social":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Environment":
        return "bg-green-50 text-green-700 border-green-200";
      case "Research":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Policy":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <section id="publications" className="py-20 bg-light-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Statistics Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-forest-green mb-2">
              {publications.length}
            </div>
            <div className="text-sm text-medium-gray">Total Publications</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-forest-green mb-2">
              {new Set(publications.map((p) => p.date.split("-")[0])).size}
            </div>
            <div className="text-sm text-medium-gray">Years Covered</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-forest-green mb-2">
              {categories.length}
            </div>
            <div className="text-sm text-medium-gray">Categories</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-forest-green mb-2">
              {filteredAndSortedPublications.length}
            </div>
            <div className="text-sm text-medium-gray">Filtered Results</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-dark-gray mb-2">
              Search Publications
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author, description, or tags..."
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

          {/* Filters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-dark-gray mb-2">
                Year
              </label>
              <select
                id="year"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="w-full px-4 py-2 border-2 border-forest-green rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green bg-white">
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-dark-gray mb-2">
                Category
              </label>
              <select
                id="category"
                value={filterCategory}
                onChange={(e) =>
                  setFilterCategory(
                    e.target.value as PublicationCategory | "All"
                  )
                }
                className="w-full px-4 py-2 border-2 border-forest-green rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green bg-white">
                <option value="All">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="sector"
                className="block text-sm font-medium text-dark-gray mb-2">
                Sector
              </label>
              <select
                id="sector"
                value={filterSector}
                onChange={(e) =>
                  setFilterSector(e.target.value as PublicationSector | "All")
                }
                className="w-full px-4 py-2 border-2 border-forest-green rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green bg-white">
                <option value="All">All Sectors</option>
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-dark-gray mb-2">
                File Type
              </label>
              <select
                id="type"
                value={filterType}
                onChange={(e) =>
                  setFilterType(e.target.value as PublicationType | "All")
                }
                className="w-full px-4 py-2 border-2 border-forest-green rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green bg-white">
                <option value="All">All Types</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-dark-gray">Sort by:</span>
            <button
              onClick={() => setSortBy("date")}
              className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                sortBy === "date"
                  ? "bg-forest-green text-white"
                  : "bg-light-green text-dark-gray hover:bg-forest-green hover:text-white"
              }`}>
              Date
            </button>
            <button
              onClick={() => setSortBy("title")}
              className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                sortBy === "title"
                  ? "bg-forest-green text-white"
                  : "bg-light-green text-dark-gray hover:bg-forest-green hover:text-white"
              }`}>
              Title
            </button>
            <button
              onClick={() => setSortBy("category")}
              className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                sortBy === "category"
                  ? "bg-forest-green text-white"
                  : "bg-light-green text-dark-gray hover:bg-forest-green hover:text-white"
              }`}>
              Category
            </button>
          </div>
        </div>

        {/* Publications Grid */}
        {filteredAndSortedPublications.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center shadow-md">
            <p className="text-xl text-medium-gray mb-4">
              No publications found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterYear("All");
                setFilterCategory("All");
                setFilterSector("All");
                setFilterType("All");
              }}
              className="btn-outline">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedPublications.map((pub, index) => (
              <div
                key={pub.id}
                className="bg-white rounded-lg overflow-hidden shadow-md card-hover"
                data-aos="fade-up"
                data-aos-delay={index * 50}>
                {/* Header with Type Icon */}
                <div className="bg-gradient-to-br from-forest-green to-deep-green p-6 flex items-center justify-between">
                  <div className="text-white">
                    <div className="text-sm font-medium opacity-90">
                      {new Date(pub.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </div>
                    <div className="text-xs opacity-75 mt-1">
                      {pub.pages ? `${pub.pages} pages` : ""}
                    </div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    {getTypeIcon(pub.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                        pub.category
                      )}`}>
                      {pub.category}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getSectorColor(
                        pub.sector
                      )}`}>
                      {pub.sector}
                    </span>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-dark-gray mb-3 line-clamp-2">
                    {pub.title}
                  </h3>

                  <p className="text-medium-gray text-sm leading-relaxed mb-4 line-clamp-3">
                    {pub.description}
                  </p>

                  {/* Authors */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-dark-gray mb-1">
                      Authors:
                    </div>
                    <div className="text-xs text-medium-gray">
                      {pub.authors.join(", ")}
                    </div>
                  </div>

                  {/* Tags */}
                  {pub.tags.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {pub.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-light-green text-forest-green text-xs rounded">
                            {tag}
                          </span>
                        ))}
                        {pub.tags.length > 3 && (
                          <span className="px-2 py-1 bg-light-green text-forest-green text-xs rounded">
                            +{pub.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-light-green">
                    {pub.downloadUrl ? (
                      <a
                        href={pub.downloadUrl}
                        className="flex-1 btn-primary text-sm py-2 text-center">
                        Download
                      </a>
                    ) : (
                      <button className="flex-1 btn-primary text-sm py-2">
                        Download
                      </button>
                    )}
                    <button className="flex-1 btn-outline text-sm py-2">
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Publications;
