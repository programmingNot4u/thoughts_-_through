const VisionMission = () => {
  const sections = [
    {
      title: "Vision",
      items: [
        "To be a leading research organization that drives evidence-based decision making",
        "Creating sustainable solutions for global challenges",
        "Fostering environmental consciousness and social equity",
      ],
    },
    {
      title: "Mission",
      items: [
        "Conduct rigorous surveys and research across health, environment, and social sectors",
        "Provide consultancy services grounded in data and scientific evidence",
        "Bridge the gap between research and policy implementation",
      ],
    },
    {
      title: "Goals",
      items: [
        "Advance knowledge in health, mental health, and social well-being",
        "Address climate change impacts through actionable research",
        "Promote social justice and reduce inequality",
      ],
    },
    {
      title: "Objectives",
      items: [
        "Publish high-quality research reports and publications",
        "Collaborate with national and international research institutions",
        "Provide evidence-based consultancy to governments and organizations",
        "Build capacity through knowledge sharing and training",
      ],
    },
  ];

  return (
    <section id="about" className="py-20 bg-light-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-gray text-center mb-16">
          Vision, Mission, Goals & Objectives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 shadow-sm"
              data-aos="fade-up"
              data-aos-delay={index * 100}>
              <h3 className="text-3xl font-heading font-bold text-forest-green mb-6">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-forest-green mr-3 flex-shrink-0 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-dark-gray leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
