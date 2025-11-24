import { useState, useEffect } from "react";
import LegalDocuments from "../components/LegalDocuments";
import Publications from "../components/Publications";
import { publicationService, type PublicationStatistics } from "../services/publicationService";

const PublicationsPage = () => {
  const [activeTab, setActiveTab] = useState<"publications" | "documents">(
    "publications"
  );
  const [statistics, setStatistics] = useState<PublicationStatistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const data = await publicationService.getStatistics();
        setStatistics(data);
      } catch (error) {
        console.error("Error fetching publication statistics:", error);
        // Set default values on error
        setStatistics({
          publications_count: 0,
          legal_documents_count: 0,
          research_sectors_count: 0,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStatistics();
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-forest-green to-deep-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Publications & Reports
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Access our comprehensive collection of research publications,
              reports, policy briefs, and legal documents
            </p>
            {loading ? (
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                  <div className="font-bold text-lg">...</div>
                  <div className="text-white/80">Loading...</div>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                  <div className="font-bold text-lg">
                    {statistics?.publications_count || 0}+
                  </div>
                  <div className="text-white/80">Research Publications</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                  <div className="font-bold text-lg">
                    {statistics?.legal_documents_count || 0}+
                  </div>
                  <div className="text-white/80">Legal Documents</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                  <div className="font-bold text-lg">
                    {statistics?.research_sectors_count || 0}+
                  </div>
                  <div className="text-white/80">Research Sectors</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tab Toggle */}
      <section className="py-8 bg-white border-b-2 border-light-green sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="inline-flex bg-light-green rounded-lg p-1 shadow-md">
              <button
                onClick={() => setActiveTab("publications")}
                className={`px-8 py-3 rounded-lg font-heading font-semibold transition-all duration-300 ${
                  activeTab === "publications"
                    ? "bg-forest-green text-white shadow-md"
                    : "text-dark-gray hover:text-forest-green"
                }`}>
                Publications
              </button>
              <button
                onClick={() => setActiveTab("documents")}
                className={`px-8 py-3 rounded-lg font-heading font-semibold transition-all duration-300 ${
                  activeTab === "documents"
                    ? "bg-forest-green text-white shadow-md"
                    : "text-dark-gray hover:text-forest-green"
                }`}>
                Legal Documents & Certifications
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Conditional Content */}
      {activeTab === "publications" ? <Publications /> : <LegalDocuments />}
    </div>
  );
};

export default PublicationsPage;
