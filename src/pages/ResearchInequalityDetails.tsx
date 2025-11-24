import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ResearchDetailsLayout from "../components/ResearchDetailsLayout";
import { researchService, type ResearchItem } from "../services/researchService";

const ResearchInequalityDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<ResearchItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await researchService.getById(id);
        setItem(data);
      } catch (error) {
        console.error("Error fetching research:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-forest-green text-xl">Loading...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold text-dark-gray mb-4">
            Research Not Found
          </h1>
          <p className="text-medium-gray mb-8">
            The research item you're looking for doesn't exist.
          </p>
          <Link to="/research/social" className="btn-primary">
            Back to Social Research
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ResearchDetailsLayout
      item={item}
      backHref="/research/social"
      backLabel="Back to Social Research"
      categoryLabel="Social, familial and individual impact of economic stress and inequality"
      categoryDescription="Research exploring systemic inequities, community resilience, and pathways toward inclusive social progress."
    />
  );
};

export default ResearchInequalityDetails;

