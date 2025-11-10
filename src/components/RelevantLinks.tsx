const RelevantLinks = () => {
  const nationalLinks = [
    {
      title: "National Health Research Institute",
      description:
        "Leading health research organization providing evidence-based health policy recommendations.",
      url: "#",
    },
    {
      title: "Environmental Research Council",
      description:
        "Government body overseeing environmental research and policy development.",
      url: "#",
    },
    {
      title: "Social Development Research Center",
      description:
        "Research institution focused on social policy and community development.",
      url: "#",
    },
  ];

  const internationalLinks = [
    {
      title: "World Health Organization Research",
      description: "Global health research and policy guidelines from WHO.",
      url: "#",
    },
    {
      title: "Intergovernmental Panel on Climate Change",
      description:
        "Scientific assessments on climate change impacts and adaptation strategies.",
      url: "#",
    },
    {
      title: "United Nations Research Institute",
      description:
        "UN research initiatives on sustainable development and social equity.",
      url: "#",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-gray text-center mb-12">
          Relevant Links
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* National Links */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-forest-green mb-6">
              National Research Links
            </h3>
            <div className="space-y-4">
              {nationalLinks.map((link, index) => (
                <a
                  key={index}
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
                  key={index}
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
      </div>
    </section>
  );
};

export default RelevantLinks;
