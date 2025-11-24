import DetailsPageTemplate, {
  type DetailsPageData,
} from "./DetailsPageTemplate";
import type { ResearchItem } from "../services/researchService";

interface ResearchDetailsLayoutProps {
  item: ResearchItem;
  categoryLabel: string;
  categoryDescription?: string;
  backHref: string;
  backLabel?: string;
}

const ResearchDetailsLayout = ({
  item,
  categoryLabel,
  categoryDescription,
  backHref,
  backLabel = "Back to research",
}: ResearchDetailsLayoutProps) => {
  // Transform ResearchItem to DetailsPageData format
  const templateData: DetailsPageData = {
    id: item.id,
    title: item.title,
    date: item.date,
    description: item.description,
    content: item.content,
    author: item.author || "Thoughts & Thorough Research Team",
    categoryLabel,
    categoryDescription,
    tags: item.tags,
    external_links: item.external_links,
    youtube_video_id: item.youtube_video_id,
    images: item.images,
    image_layout: item.image_layout || "gallery",
  };

  return (
    <DetailsPageTemplate
      data={templateData}
      backHref={backHref}
      backLabel={backLabel}
    />
  );
};

export default ResearchDetailsLayout;

