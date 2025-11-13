import chairmanPhoto from "../assets/images/chairman.jpg";
import mdPhoto from "../assets/images/md.jpg";
import rashedaPhoto from "../assets/images/Rasheda_Begum _Director.jpg";

const BoardDirectors = () => {
  const directors = [
    {
      name: "Ishrat Jahan Dilruba",
      designation: "Chairman",
      bio: "Leading the organization with strategic vision and commitment to excellence in research and consultancy services.",
      photo: chairmanPhoto,
      hasImage: true,
    },
    {
      name: "Md Taufikuzzaman",
      designation: "Managing Director",
      bio: "Overseeing day-to-day operations and driving organizational growth through innovative research methodologies and strategic partnerships.",
      photo: mdPhoto,
      hasImage: true,
    },
    {
      name: "Kazi Mohammad Azizul Islam",
      designation: "Director",
      bio: "Contributing expertise in research development and strategic planning to advance the organization's mission and objectives.",
      photo: "👨‍💼",
      hasImage: false,
    },
    {
      name: "Rasheda Begum",
      designation: "Director",
      bio: "Providing strategic guidance and oversight to ensure the organization's continued success and impact in research and consultancy.",
      photo: rashedaPhoto,
      hasImage: true,
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
                {director.hasImage ? (
                  <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-forest-green">
                    <img
                      src={director.photo}
                      alt={director.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-forest-green flex items-center justify-center text-3xl flex-shrink-0">
                    {director.photo}
                  </div>
                )}
                <div className="flex-1">
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
                Chairman
              </div>
            </div>

            {/* Connector */}
            <div className="w-1 h-8 bg-forest-green mb-8"></div>

            {/* Second Level */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 w-full max-w-5xl">
              <div className="text-center">
                <div className="bg-light-green border-2 border-forest-green px-4 py-2 rounded-lg font-heading font-semibold mb-4">
                  Managing Director
                </div>
              </div>
              <div className="text-center">
                <div className="bg-light-green border-2 border-forest-green px-4 py-2 rounded-lg font-heading font-semibold mb-4">
                  Director
                </div>
              </div>
              <div className="text-center">
                <div className="bg-light-green border-2 border-forest-green px-4 py-2 rounded-lg font-heading font-semibold mb-4">
                  Director
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
