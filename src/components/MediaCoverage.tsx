import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mediaService, type MediaCoverageItem } from "../services/mediaService";

const MediaCoverage = () => {
  const [mediaItems, setMediaItems] = useState<MediaCoverageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const data = await mediaService.getAll();
        // Show all items, or limit to latest 6 if you want to limit
        setMediaItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching media:", error);
        setMediaItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

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

  if (loading) {
    return (
      <section id="media" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-gray text-center mb-12">
            Media Coverage & Published Events
          </h2>
          <div className="text-center py-12">
            <div className="text-forest-green text-xl">Loading media...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="media" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-gray text-center mb-12">
          Media Coverage & Published Events
        </h2>

        {mediaItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-medium-gray text-xl">No media coverage available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaItems.map((item, index) => {
              const CardContent = (
                <>
                  <div className="aspect-square flex items-center justify-center text-8xl">
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white font-heading font-bold text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-light-green text-sm mb-2">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <span className="inline-block px-3 py-1 bg-forest-green text-white rounded-full text-xs w-fit">
                      {item.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    {item.type === "Video" || item.youtube_video_id ? (
                      <svg
                        className="w-8 h-8 text-white/80"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-8 h-8 text-white/80"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </>
              );

              return (
                <Link
                  key={item.id}
                  to={`/media-coverage/${item.id}`}
                  className="relative group overflow-hidden rounded-lg bg-gradient-to-br from-forest-green to-deep-green card-hover block"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}>
                  {CardContent}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default MediaCoverage;
