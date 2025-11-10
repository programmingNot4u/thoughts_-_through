const ChairmanIntro = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-gray text-center mb-16">
          Introduction by Chairman & MD
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Portrait */}
          <div className="flex justify-center" data-aos="fade-right">
            <div className="relative">
              <div className="w-64 h-64 rounded-full bg-light-green border-4 border-forest-green overflow-hidden shadow-lg">
                <div className="w-full h-full bg-gradient-to-br from-forest-green to-deep-green flex items-center justify-center">
                  <svg
                    className="w-32 h-32 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              {/* Quote Icon Background */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-forest-green/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-forest-green"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v1a1 1 0 11-2 0v-1A5 5 0 0011 9H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6" data-aos="fade-left">
            <div className="relative bg-light-green p-8 rounded-lg border-l-4 border-forest-green">
              <svg
                className="absolute top-4 left-4 w-12 h-12 text-forest-green/20"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v1a1 1 0 11-2 0v-1A5 5 0 0011 9H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-dark-gray text-lg leading-relaxed relative z-10">
                Welcome to Thoughts & Thorough. Our commitment to evidence-based
                research and sustainable solutions drives everything we do.
                Through rigorous surveys, comprehensive studies, and strategic
                consultancy, we aim to create meaningful impact in health,
                environment, and social equity. Together, we can build a more
                sustainable and equitable future for all.
              </p>
            </div>
            <div className="pt-4">
              <p className="text-forest-green font-heading font-bold text-xl mb-2">
                Chairman & Managing Director
              </p>
              <p
                className="text-medium-gray italic"
                style={{ fontFamily: "cursive" }}>
                Thoughts & Thorough
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChairmanIntro;
