import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mediaService, type MediaCoverageItem } from "../services/mediaService";

const Media = () => {
  const [mediaItems, setMediaItems] = useState<MediaCoverageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "title">("date");

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const params: any = {};
        if (searchQuery) params.search = searchQuery;
        const data = await mediaService.getAll(params);
        setMediaItems(data);
      } catch (error) {
        console.error("Error fetching media:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, [searchQuery]);

  const filteredAndSortedItems = useMemo(() => {
    let filtered = mediaItems.filter((item) => {
      if (!searchQuery) return true;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some((tag) =>
          tag.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesSearch;
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
  }, [mediaItems, searchQuery, sortBy]);

  const getTypeIcon = (type: string) => {
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

  const getTypeColor = (type: string) => {
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
            Media Coverage & Events
          </h1>
          <p className="text-xl text-medium-gray max-w-3xl mx-auto">
            Stay updated with our latest media appearances, conferences, and
            public events.
          </p>
        </div>

        {/* Search and Sort */}
        <div className="bg-light-green rounded-lg p-6 shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-dark-gray mb-2">
                Search Media
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

            {/* Sort */}
            <div>
              <label
                htmlFor="sort"
                className="block text-sm font-medium text-dark-gray mb-2">
                Sort By
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSortBy("date")}
                  className={`flex-1 px-4 py-3 rounded-lg transition-colors ${
                    sortBy === "date"
                      ? "bg-forest-green text-white"
                      : "bg-white text-dark-gray hover:bg-forest-green hover:text-white border-2 border-forest-green"
                  }`}>
                  Date
                </button>
                <button
                  onClick={() => setSortBy("title")}
                  className={`flex-1 px-4 py-3 rounded-lg transition-colors ${
                    sortBy === "title"
                      ? "bg-forest-green text-white"
                      : "bg-white text-dark-gray hover:bg-forest-green hover:text-white border-2 border-forest-green"
                  }`}>
                  Title
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-medium-gray">
            Showing {filteredAndSortedItems.length} item{filteredAndSortedItems.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Media Items List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-forest-green text-xl">Loading media...</div>
          </div>
        ) : filteredAndSortedItems.length === 0 ? (
          <div className="bg-light-green rounded-lg p-12 text-center shadow-md">
            <p className="text-xl text-medium-gray mb-4">
              No media items found matching your criteria.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="btn-outline">
              Clear Search
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredAndSortedItems.map((item, index) => (
              <Link
                key={item.id}
                to={`/media-coverage/${item.id}`}
                className="bg-white rounded-lg overflow-hidden shadow-md card-hover flex flex-col md:flex-row"
                data-aos="fade-up"
                data-aos-delay={index * 50}>
                {/* Image/Icon Section */}
                <div className="md:w-64 h-48 md:h-auto bg-gradient-to-br from-forest-green to-deep-green flex items-center justify-center text-6xl text-white relative flex-shrink-0">
                  {getTypeIcon(item.type)}
                  {/* Type Badge */}
                  <span
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${getTypeColor(
                      item.type
                    )}`}>
                    {item.type}
                  </span>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6">
                  <h3 className="text-2xl font-heading font-bold text-dark-gray mb-3">
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
                    {item.author && (
                      <>
                        <span className="mx-2">•</span>
                        <span>By {item.author}</span>
                      </>
                    )}
                  </div>
                  <p className="text-medium-gray mb-4 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {item.tags.slice(0, 4).map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-light-green text-forest-green rounded-full text-xs">
                                {tag.name}
                              </span>
                            ))}
                          </div>
                        )}
                  <div className="flex items-center text-forest-green font-medium">
                    <span>Read More</span>
                    <svg
                      className="w-5 h-5 ml-2"
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
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Media;
