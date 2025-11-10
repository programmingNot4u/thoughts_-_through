import FocusWindows from "../components/FocusWindows";
import RelevantLinks from "../components/RelevantLinks";

const ResearchAreas = () => {
  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-dark-gray text-center mb-6">
            Our Research Areas
          </h1>
          <p className="text-xl text-medium-gray text-center max-w-3xl mx-auto mb-16">
            We conduct comprehensive research across multiple domains to drive
            evidence-based solutions for sustainable development and social
            equity.
          </p>
        </div>
      </section>
      <FocusWindows />
      <RelevantLinks />
    </div>
  );
};

export default ResearchAreas;
