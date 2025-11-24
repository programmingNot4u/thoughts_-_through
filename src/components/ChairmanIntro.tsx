import { useEffect, useState } from "react";
import { aboutService, type AboutPageContent } from "../services/aboutService";

const ChairmanIntro = () => {
  const [content, setContent] = useState<AboutPageContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const data = await aboutService.getContent();
        // Find chairman intro content
        const chairmanContent = data.find(
          (item) => item.content_type === "chairman_intro"
        );
        setContent(chairmanContent || null);
      } catch (error) {
        console.error("Error fetching chairman intro:", error);
        setContent(null);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-forest-green text-xl">Loading...</div>
        </div>
      </section>
    );
  }

  if (!content) {
    return null;
  }

  const imagePosition = content.image_position || "left";
  const hasImage = !!content.image;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-gray text-center mb-16">
          {content.title || "Introduction by Chairman"}
        </h2>
        <div
          className={`grid grid-cols-1 ${
            hasImage && imagePosition !== "top" && imagePosition !== "bottom"
              ? "md:grid-cols-2"
              : ""
          } gap-12 items-center ${
            imagePosition === "right" ? "flex-row-reverse" : ""
          }`}>
          {/* Portrait */}
          {hasImage && (
            <div
              className={`flex justify-center ${
                imagePosition === "top" || imagePosition === "bottom"
                  ? "order-1"
                  : ""
              }`}
              data-aos="fade-right">
              <div className="relative">
                <div className="w-64 h-64 rounded-full bg-light-green border-4 border-forest-green overflow-hidden shadow-lg">
                  <img
                    src={content.image}
                    alt={content.title || "Chairman"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Quote Icon Background */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-forest-green/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-forest-green"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v1a1 1 0 11-2 0v-1A5 5 0 0011 9H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Text Content */}
          <div
            className={`space-y-6 ${
              imagePosition === "top" || imagePosition === "bottom"
                ? "order-2"
                : ""
            }`}
            data-aos="fade-left">
            <div className="relative bg-light-green p-8 rounded-lg border-l-4 border-forest-green">
              <svg
                className="absolute top-4 left-4 w-12 h-12 text-forest-green/20"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v1a1 1 0 11-2 0v-1A5 5 0 0011 9H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <div
                className="text-dark-gray text-lg leading-relaxed relative z-10 prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: content.content }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChairmanIntro;
