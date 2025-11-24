import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { mediaService, type MediaCoverageItem } from "../services/mediaService";

const MediaCoverageDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<MediaCoverageItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) {
        setError("No ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await mediaService.getById(id);
        setItem(data);
      } catch (err) {
        console.error("Error fetching media item:", err);
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-forest-green text-xl">Loading article...</div>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold text-dark-gray mb-4">
            Article Not Found
          </h1>
          <p className="text-medium-gray mb-8">
            {error || "The article you're looking for doesn't exist."}
          </p>
          <Link to="/media-coverage" className="btn-primary">
            Back to Media Coverage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to="/media-coverage"
          className="inline-flex items-center text-forest-green hover:text-deep-green mb-8 transition-colors">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Media Coverage
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <span className="px-3 py-1 bg-forest-green text-white rounded-full text-sm font-semibold">
              {item.type}
            </span>
            <span className="text-medium-gray text-sm">
              {new Date(item.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-dark-gray mb-6">
            {item.title}
          </h1>
          {item.author && (
            <p className="text-medium-gray mb-2">
              By <span className="font-semibold">{item.author}</span>
              {item.publication && ` • ${item.publication}`}
            </p>
          )}
        </div>

        {/* YouTube Video */}
        {item.youtube_video_id && (
          <div className="mb-8">
            <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg bg-gray-900">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${item.youtube_video_id}?rel=0&modestbranding=1`}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  border: "none",
                }}></iframe>
            </div>
            <p className="text-xs text-medium-gray mt-2 text-center">
              Video embedded from YouTube
            </p>
          </div>
        )}

        {/* Description */}
        <div className="mb-8">
          <p className="text-lg text-dark-gray leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Article Content */}
        {item.content && (
          <div className="mb-8">
            <div
              className="prose prose-lg max-w-none text-dark-gray"
              dangerouslySetInnerHTML={{ __html: item.content }}
              style={{
                lineHeight: "1.8",
              }}
            />
          </div>
        )}

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-heading font-bold text-dark-gray mb-4">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-light-green text-forest-green rounded-full text-sm font-medium">
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* External Links */}
        {item.external_links && item.external_links.length > 0 && (
          <div className="bg-light-green rounded-lg p-6 mb-8">
            <h3 className="text-xl font-heading font-bold text-dark-gray mb-4">
              Related Links & Resources
            </h3>
            <ul className="space-y-3">
              {item.external_links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-forest-green hover:text-deep-green transition-colors group">
                    <span className="mr-3">{link.title}</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Share Section */}
        <div className="border-t border-light-green pt-8">
          <h3 className="text-lg font-heading font-bold text-dark-gray mb-4">
            Share This Article
          </h3>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-forest-green text-white rounded-lg hover:bg-deep-green transition-colors">
              Share on Facebook
            </button>
            <button className="px-4 py-2 bg-forest-green text-white rounded-lg hover:bg-deep-green transition-colors">
              Share on Twitter
            </button>
            <button className="px-4 py-2 bg-forest-green text-white rounded-lg hover:bg-deep-green transition-colors">
              Share on LinkedIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaCoverageDetails;












