import LegalDocuments from "../components/LegalDocuments";
import Publications from "../components/Publications";

const PublicationsPage = () => {
  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-dark-gray text-center mb-6">
            Publications & Reports
          </h1>
          <p className="text-xl text-medium-gray text-center max-w-3xl mx-auto mb-16">
            Access our comprehensive research publications, reports, and
            documents.
          </p>
        </div>
      </section>
      <Publications />
      <LegalDocuments />
    </div>
  );
};

export default PublicationsPage;
