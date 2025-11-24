import { useState, useEffect, useMemo } from "react";
import { resourcePanelService, type ResourcePanelMember } from "../services/resourcePanelService";

const ResourcePanel = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [experts, setExperts] = useState<ResourcePanelMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        setLoading(true);
        const data = await resourcePanelService.getAll();
        // Ensure data is an array
        if (Array.isArray(data)) {
          setExperts(data);
        } else {
          console.error("Resource panel data is not an array:", data);
          setExperts([]);
        }
      } catch (error) {
        console.error("Error fetching resource panel members:", error);
        setExperts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchExperts();
  }, []);

  // Extract unique expertise tags from all experts
  const expertiseTags = useMemo(() => {
    if (!Array.isArray(experts) || experts.length === 0) {
      return [];
    }
    const tagSet = new Set<string>();
    experts.forEach((expert) => {
      if (expert.expertise && Array.isArray(expert.expertise)) {
        expert.expertise.forEach((tag) => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }, [experts]);

  const filteredExperts =
    selectedTag === null
      ? experts
      : experts.filter((expert) => expert.expertise.includes(selectedTag));

  if (loading) {
    return (
      <section id="resource-panel" className="py-20 bg-light-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-forest-green text-xl">Loading resource panel...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="resource-panel" className="py-20 bg-light-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-gray text-center mb-12">
          Resource Panel
        </h2>

        {/* Filter Tags */}
        {expertiseTags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full border-2 transition-all ${
                selectedTag === null
                  ? "bg-forest-green text-white border-forest-green"
                  : "bg-white text-forest-green border-forest-green hover:bg-forest-green hover:text-white"
              }`}>
              All
            </button>
            {expertiseTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full border-2 transition-all ${
                  selectedTag === tag
                    ? "bg-forest-green text-white border-forest-green"
                    : "bg-white text-forest-green border-forest-green hover:bg-forest-green hover:text-white"
                }`}>
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Experts Grid */}
        {filteredExperts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-medium-gray text-lg">No resource panel members found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperts.map((expert, index) => (
              <div
                key={expert.id}
                className="bg-white rounded-lg p-6 shadow-md card-hover"
                data-aos="fade-up"
                data-aos-delay={index * 50}>
                <div className="flex flex-col items-center text-center mb-4">
                  {expert.image ? (
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-forest-green"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-light-green flex items-center justify-center text-4xl mb-4 border-2 border-forest-green">
                      👤
                    </div>
                  )}
                  <h3 className="text-xl font-heading font-bold text-dark-gray mb-1">
                    {expert.name}
                  </h3>
                  <p className="text-medium-gray text-sm mb-4">
                    {expert.title}
                  </p>
                </div>

                {/* Bio */}
                {expert.bio && (
                  <p className="text-medium-gray text-sm mb-4 text-center line-clamp-3">
                    {expert.bio}
                  </p>
                )}

                {/* Expertise Tags */}
                {expert.expertise.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {expert.expertise.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs border border-forest-green text-forest-green rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <button className="w-full btn-outline text-sm py-2">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ResourcePanel;
