import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { surveyService, type Survey } from "../services/surveyService";
import { usePagination } from "../hooks/usePagination";
import Pagination from "../components/Pagination";

const Surveys = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Completed" | "Upcoming"
  >("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        setLoading(true);
        const params: any = {};
        if (statusFilter !== "All") params.status = statusFilter;
        if (categoryFilter !== "All") params.category = categoryFilter;
        if (searchQuery) params.search = searchQuery;
        
        const data = await surveyService.getAll(params);
        setSurveys(data);
      } catch (error) {
        console.error("Error fetching surveys:", error);
        setSurveys([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSurveys();
  }, [statusFilter, categoryFilter, searchQuery]);

  const itemsPerPage = 12;
  const {
    currentPage,
    items: paginatedSurveys,
    totalCount,
    totalPages,
    goToPage,
  } = usePagination<Survey>({
    itemsPerPage,
    data: surveys,
  });

  const categories = useMemo(() => {
    const cats = new Set(surveys.map((survey) => survey.category));
    return Array.from(cats);
  }, [surveys]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-blue-500 text-white";
      case "Completed":
        return "bg-green-600 text-white";
      case "Upcoming":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-light-green/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <div className="bg-forest-green/10 rounded-full p-4">
              <svg
                className="w-16 h-16 text-forest-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-dark-gray mb-6">
            Our Surveys
          </h1>
          <p className="text-xl text-medium-gray max-w-3xl mx-auto">
            Participate in our research surveys and help shape evidence-based solutions. 
            Your voice matters in creating positive change.
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
                Search Surveys
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
                  setStatusFilter(
                    e.target.value as "All" | "Active" | "Completed" | "Upcoming"
                  )
                }
                className="w-full px-4 py-3 border-2 border-forest-green rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green bg-white">
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Upcoming">Upcoming</option>
              </select>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-dark-gray mb-2">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCategoryFilter("All")}
                className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                  categoryFilter === "All"
                    ? "bg-forest-green text-white"
                    : "bg-white text-dark-gray hover:bg-forest-green hover:text-white"
                }`}>
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                    categoryFilter === category
                      ? "bg-forest-green text-white"
                      : "bg-white text-dark-gray hover:bg-forest-green hover:text-white"
                  }`}>
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-medium-gray">
            Showing {paginatedSurveys.length} of {totalCount} survey{totalCount !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Surveys Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-forest-green text-xl">Loading surveys...</div>
          </div>
        ) : surveys.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center shadow-md border-2 border-dashed border-forest-green/30">
            <svg
              className="w-16 h-16 text-forest-green/50 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-xl text-medium-gray mb-4">
              No surveys found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("All");
                setCategoryFilter("All");
              }}
              className="btn-outline">
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedSurveys.map((survey, index) => {
              // Calculate participation progress (mock data for demo)
              const targetParticipants = survey.participants ? survey.participants * 1.5 : 1000;
              const participationRate = survey.participants 
                ? Math.min((survey.participants / targetParticipants) * 100, 100)
                : 0;
              
              return (
                <div
                  key={survey.id}
                  className="bg-white rounded-xl shadow-lg border-2 border-forest-green/20 overflow-hidden card-hover"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}>
                  {/* Survey Header with Form-like Design */}
                  <div className="bg-gradient-to-r from-forest-green to-deep-green p-6 relative">
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${getStatusColor(
                          survey.status
                        )}`}>
                        {survey.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <span className="text-white/90 text-xs font-medium">
                          {survey.category}
                        </span>
                        <div className="text-white text-xs mt-1">
                          {new Date(survey.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white line-clamp-2">
                      {survey.title}
                    </h3>
                  </div>

                  <div className="p-6">
                    <p className="text-sm text-medium-gray mb-6 line-clamp-3 leading-relaxed">
                      {survey.description}
                    </p>

                    {/* Participation Progress Bar */}
                  {survey.participants && survey.participants > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-dark-gray">
                          Participation Progress
                        </span>
                        <span className="text-xs font-semibold text-forest-green">
                          {survey.participants.toLocaleString()} / {targetParticipants.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-light-green rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-forest-green to-deep-green h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${participationRate}%` }}></div>
                      </div>
                      <div className="flex items-center mt-2 text-xs text-medium-gray">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span>{Math.round(participationRate)}% Complete</span>
                      </div>
                    </div>
                  )}

                  {/* Survey Tags */}
                  {survey.tags && survey.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {survey.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-light-green/50 text-forest-green rounded-md text-xs font-medium border border-forest-green/20">
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}

                    {/* Action Button */}
                    <Link
                      to={`/surveys/${survey.id}`}
                      className={`block w-full text-center py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                        survey.status === "Active"
                          ? "bg-forest-green text-white hover:bg-deep-green hover:shadow-lg"
                          : survey.status === "Upcoming"
                          ? "bg-yellow-500 text-white hover:bg-yellow-600"
                          : "bg-light-green text-forest-green hover:bg-forest-green hover:text-white border-2 border-forest-green"
                      }`}>
                      {survey.status === "Active"
                        ? "Participate Now"
                        : survey.status === "Upcoming"
                        ? "Notify Me"
                        : "View Results"}
                    </Link>
                  </div>
                </div>
              );
              })}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                itemsPerPage={itemsPerPage}
                totalItems={totalCount}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Surveys;
