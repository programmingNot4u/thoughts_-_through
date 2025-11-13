import { Link } from "react-router-dom";
import { relevantLinks } from "../data/relevantLinks";

const RelevantLinks = () => {
  // Get sample links for preview (first 3 national and first 3 international)
  const nationalLinks = relevantLinks
    .filter(
      (link) => link.category === "National" || link.category === "Government"
    )
    .slice(0, 3);

  const internationalLinks = relevantLinks
    .filter((link) => link.category === "International")
    .slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-12">
          <Link
            to="/relevant-links"
            className="text-4xl md:text-5xl font-heading font-bold text-dark-gray text-center hover:text-forest-green transition-colors cursor-pointer group">
            Relevant Links
            <svg
              className="inline-block w-8 h-8 ml-3 text-forest-green group-hover:translate-x-1 transition-transform"
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
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* National Links */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-forest-green mb-6">
              National & Government Links
            </h3>
            <div className="space-y-4">
              {nationalLinks.map((link, index) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-light-green rounded-lg p-6 card-hover group"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-heading font-bold text-dark-gray mb-2 group-hover:text-forest-green transition-colors">
                        {link.title}
                      </h4>
                      <p className="text-medium-gray text-sm leading-relaxed">
                        {link.description}
                      </p>
                    </div>
                    <svg
                      className="w-6 h-6 text-forest-green ml-4 flex-shrink-0"
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
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* International Links */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-forest-green mb-6">
              International Research Links
            </h3>
            <div className="space-y-4">
              {internationalLinks.map((link, index) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-light-green rounded-lg p-6 card-hover group"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-heading font-bold text-dark-gray mb-2 group-hover:text-forest-green transition-colors">
                        {link.title}
                      </h4>
                      <p className="text-medium-gray text-sm leading-relaxed">
                        {link.description}
                      </p>
                    </div>
                    <svg
                      className="w-6 h-6 text-forest-green ml-4 flex-shrink-0"
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
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            to="/relevant-links"
            className="inline-flex items-center px-6 py-3 bg-forest-green text-white rounded-lg font-semibold hover:bg-deep-green transition-colors">
            View All Links
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
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelevantLinks;
