import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { WebinarStatus } from "../data/webinars";
import { webinars } from "../data/webinars";

const Webinars = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<WebinarStatus | "All">(
    "All"
  );
  const [sortBy, setSortBy] = useState<"date" | "title">("date");

  const filteredAndSortedWebinars = useMemo(() => {
    let filtered = webinars.filter((webinar) => {
      const matchesSearch =
        webinar.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        webinar.topics.some((topic) =>
          topic.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        webinar.presenter.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || webinar.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    // Sort webinars
    filtered.sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.date.split(",")[0]);
        const dateB = new Date(b.date.split(",")[0]);
        return dateB.getTime() - dateA.getTime(); // Newest first
      } else {
        return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [searchQuery, statusFilter, sortBy]);

  const getStatusColor = (status: WebinarStatus) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-500 text-white";
      case "Ongoing":
        return "bg-yellow-500 text-white";
      case "Completed":
        return "bg-green-600 text-white";
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
            Research Webinars
          </h1>
          <p className="text-xl text-medium-gray max-w-3xl mx-auto">
            Explore our collection of research webinars covering various topics
            in health, environment, and social sciences.
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
                Search Webinars
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, topic, or presenter..."
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

            {/* Status Filter */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-dark-gray mb-2">
                Status
              </label>
              <select
                id="status"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as WebinarStatus | "All")
                }
                className="w-full px-4 py-3 border-2 border-forest-green rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green bg-white">
                <option value="All">All Status</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
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
                  : "bg-light-green text-dark-gray hover:bg-forest-green hover:text-white"
              }`}>
              Date
            </button>
            <button
              onClick={() => setSortBy("title")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                sortBy === "title"
                  ? "bg-forest-green text-white"
                  : "bg-light-green text-dark-gray hover:bg-forest-green hover:text-white"
              }`}>
              Title
            </button>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-medium-gray">
            Showing {filteredAndSortedWebinars.length} of {webinars.length}{" "}
            webinars
          </div>
        </div>

        {/* Webinars Grid */}
        {filteredAndSortedWebinars.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center shadow-md">
            <p className="text-xl text-medium-gray mb-4">
              No webinars found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("All");
              }}
              className="btn-outline">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedWebinars.map((webinar, index) => (
              <Link
                key={webinar.id}
                to={`/webinars/${webinar.id}`}
                className="bg-white rounded-lg overflow-hidden shadow-md card-hover"
                data-aos="fade-up"
                data-aos-delay={index * 50}>
                <div className="h-48 bg-gradient-to-br from-forest-green to-deep-green flex items-center justify-center text-6xl text-white relative">
                  💻
                  {/* Status Badge */}
                  <span
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      webinar.status
                    )}`}>
                    {webinar.status}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-dark-gray mb-3 line-clamp-2">
                    {webinar.title}
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
                      {new Date(webinar.date.split(",")[0]).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      {webinar.time.gmt} GMT / {webinar.time.bdTime} BD
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    {webinar.topics.slice(0, 2).map((topic, idx) => (
                      <p
                        key={idx}
                        className="text-xs text-medium-gray line-clamp-1">
                        • {topic}
                      </p>
                    ))}
                    {webinar.topics.length > 2 && (
                      <p className="text-xs text-forest-green font-medium">
                        +{webinar.topics.length - 2} more topics
                      </p>
                    )}
                  </div>
                  <div className="pt-4 border-t border-light-green">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-forest-green font-medium">
                        View Details
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

export default Webinars;
