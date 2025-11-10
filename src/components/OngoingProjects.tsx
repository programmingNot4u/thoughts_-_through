const OngoingProjects = () => {
  const projects = [
    {
      title: "Mental Health Impact Assessment in Urban Communities",
      description:
        "A comprehensive study examining the mental health challenges faced by urban populations and developing evidence-based intervention strategies.",
      image: "🧠",
    },
    {
      title: "Climate Change Adaptation in Rural Agriculture",
      description:
        "Research project analyzing the impact of climate change on agricultural livelihoods and developing sustainable adaptation frameworks.",
      image: "🌾",
    },
    {
      title: "Social Inequality and Educational Outcomes",
      description:
        "Longitudinal study investigating how social and economic disparities affect educational achievement and life outcomes.",
      image: "📚",
    },
    {
      title: "Environmental Health Monitoring System",
      description:
        "Development of a comprehensive monitoring system to track environmental health indicators and inform policy decisions.",
      image: "🌿",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-light-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-gray text-center mb-12">
          Ongoing Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md card-hover min-w-[280px] md:min-w-0"
              data-aos="fade-up"
              data-aos-delay={index * 100}>
              <div className="h-48 bg-gradient-to-br from-forest-green to-deep-green flex items-center justify-center text-8xl">
                {project.image}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-dark-gray mb-3">
                  {project.title}
                </h3>
                <p className="text-medium-gray text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <button className="w-full btn-outline text-sm py-2">
                  Read Full Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OngoingProjects;
