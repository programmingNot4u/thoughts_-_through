import { Link } from "react-router-dom";
import { webinars } from "../data/webinars";

const WebinarsList = () => {
  return (
    <section className="py-20 bg-light-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-gray text-center mb-12">
          Research Webinars
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {webinars.map((webinar, index) => (
            <Link
              key={webinar.id}
              to={`/webinars/${webinar.id}`}
              className="bg-white rounded-lg overflow-hidden shadow-md card-hover"
              data-aos="fade-up"
              data-aos-delay={index * 100}>
              <div className="h-48 bg-gradient-to-br from-forest-green to-deep-green flex items-center justify-center text-6xl text-white">
                💻
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-dark-gray mb-3">
                  {webinar.title}
                </h3>
                <p className="text-sm text-medium-gray mb-4">
                  {new Date(webinar.date.split(",")[0]).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
                <div className="space-y-2 mb-4">
                  {webinar.topics.slice(0, 2).map((topic, idx) => (
                    <p key={idx} className="text-xs text-medium-gray">
                      • {topic}
                    </p>
                  ))}
                  {webinar.topics.length > 2 && (
                    <p className="text-xs text-forest-green">
                      +{webinar.topics.length - 2} more topics
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-light-green">
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebinarsList;


