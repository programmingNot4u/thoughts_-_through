import MediaCoverage from "../components/MediaCoverage";

const Media = () => {
  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-dark-gray text-center mb-6">
            Media Coverage & Events
          </h1>
          <p className="text-xl text-medium-gray text-center max-w-3xl mx-auto mb-16">
            Stay updated with our latest media appearances, conferences, and
            public events.
          </p>
        </div>
      </section>
      <MediaCoverage />
    </div>
  );
};

export default Media;
