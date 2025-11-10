const FocusWindows = () => {
  const focusAreas = [
    {
      title: "Health, Mental Health & Social Health",
      description:
        "Comprehensive research on physical, mental, and social well-being to inform evidence-based health policies and interventions.",
      icon: (
        <svg
          className="w-12 h-12 text-forest-green"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
    {
      title: "Climate Change Impacts on Health & Livelihood",
      description:
        "Analyzing the intersection of environmental change and human well-being to develop resilient communities and sustainable solutions.",
      icon: (
        <svg
          className="w-12 h-12 text-forest-green"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          />
        </svg>
      ),
    },
    {
      title: "Social & Familial Impacts of Inequality",
      description:
        "Investigating how economic and social disparities affect families and communities, with a focus on creating equitable pathways forward.",
      icon: (
        <svg
          className="w-12 h-12 text-forest-green"
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
      ),
    },
  ];

  return (
    <section id="research-areas" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {focusAreas.map((area, index) => (
            <div
              key={index}
              className="bg-white border-2 border-forest-green rounded-lg p-8 card-hover"
              data-aos="fade-up"
              data-aos-delay={index * 100}>
              <div className="mb-6">{area.icon}</div>
              <h3 className="text-2xl font-heading font-bold text-dark-gray mb-4">
                {area.title}
              </h3>
              <p className="text-medium-gray leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusWindows;
