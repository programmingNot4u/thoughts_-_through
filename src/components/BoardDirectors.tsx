const BoardDirectors = () => {
  const directors = [
    {
      name: "Dr. Patricia Williams",
      designation: "Chairman",
      bio: "Leading expert in public health research with over 25 years of experience in evidence-based policy development.",
      photo: "👩‍💼",
    },
    {
      name: "Dr. David Martinez",
      designation: "Vice Chairman",
      bio: "Renowned environmental scientist specializing in climate change impacts and sustainable development strategies.",
      photo: "👨‍💼",
    },
    {
      name: "Dr. Jennifer Lee",
      designation: "Director of Research",
      bio: "Expert in social health research and data analytics, with a focus on inequality and community well-being.",
      photo: "👩‍🔬",
    },
    {
      name: "Dr. Thomas Brown",
      designation: "Director of Operations",
      bio: "Strategic consultant with extensive experience in research project management and organizational development.",
      photo: "👨‍💼",
    },
  ];

  return (
    <section id="board-directors" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-gray text-center mb-16">
          Board of Directors
        </h2>

        {/* Directors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {directors.map((director, index) => (
            <div
              key={index}
              className="bg-light-green rounded-lg p-8 card-hover"
              data-aos="fade-up"
              data-aos-delay={index * 100}>
              <div className="flex items-start space-x-6">
                <div className="w-20 h-20 rounded-full bg-forest-green flex items-center justify-center text-3xl flex-shrink-0">
                  {director.photo}
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold text-dark-gray mb-2">
                    {director.name}
                  </h3>
                  <p className="text-forest-green font-semibold mb-3">
                    {director.designation}
                  </p>
                  <p className="text-medium-gray leading-relaxed">
                    {director.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Organogram */}
        <div className="bg-white border-2 border-forest-green rounded-lg p-8">
          <h3 className="text-3xl font-heading font-bold text-dark-gray text-center mb-12">
            Organizational Structure
          </h3>
          <div className="flex flex-col items-center">
            {/* Top Level - Chairman */}
            <div className="mb-8">
              <div className="bg-forest-green text-white px-6 py-3 rounded-lg font-heading font-bold">
                Chairman & MD
              </div>
            </div>

            {/* Connector */}
            <div className="w-1 h-8 bg-forest-green mb-8"></div>

            {/* Second Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 w-full max-w-4xl">
              <div className="text-center">
                <div className="bg-light-green border-2 border-forest-green px-4 py-2 rounded-lg font-heading font-semibold mb-4">
                  Vice Chairman
                </div>
                <div className="w-1 h-6 bg-forest-green mx-auto mb-4"></div>
                <div className="space-y-2">
                  <div className="bg-white border border-forest-green px-3 py-2 rounded text-sm">
                    Research Division
                  </div>
                  <div className="bg-white border border-forest-green px-3 py-2 rounded text-sm">
                    Operations Division
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-light-green border-2 border-forest-green px-4 py-2 rounded-lg font-heading font-semibold mb-4">
                  Director of Research
                </div>
                <div className="w-1 h-6 bg-forest-green mx-auto mb-4"></div>
                <div className="space-y-2">
                  <div className="bg-white border border-forest-green px-3 py-2 rounded text-sm">
                    Health Research
                  </div>
                  <div className="bg-white border border-forest-green px-3 py-2 rounded text-sm">
                    Environmental Research
                  </div>
                  <div className="bg-white border border-forest-green px-3 py-2 rounded text-sm">
                    Social Research
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoardDirectors;
