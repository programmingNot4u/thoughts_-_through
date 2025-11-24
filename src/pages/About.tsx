import { useEffect, useState } from "react";
import BoardDirectors from "../components/BoardDirectors";
import ChairmanIntro from "../components/ChairmanIntro";
import VisionMission from "../components/VisionMission";
import { aboutService, type AboutPageContent } from "../services/aboutService";

const About = () => {
  const [additionalContent, setAdditionalContent] = useState<AboutPageContent[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await aboutService.getContent();
        // Filter out chairman intro as it's handled separately
        const additional = data.filter(
          (item) => item.content_type !== "chairman_intro"
        );
        setAdditionalContent(additional);
      } catch (error) {
        console.error("Error fetching additional content:", error);
      }
    };
    fetchContent();
  }, []);

  return (
    <div className="pt-20">
      <VisionMission />
      <ChairmanIntro />
      {additionalContent.map((content) => (
        <section key={content.id} className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {content.title && (
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-gray text-center mb-16">
                {content.title}
              </h2>
            )}
            <div
              className={`grid grid-cols-1 ${
                content.image && content.image_position !== "top" && content.image_position !== "bottom"
                  ? "md:grid-cols-2"
                  : ""
              } gap-12 items-center`}>
              {content.image && (
                <div
                  className={`${
                    content.image_position === "right" ? "order-2" : ""
                  }`}>
                  <img
                    src={content.image}
                    alt={content.title || "Content"}
                    className="w-full rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </div>
              )}
              <div
                className={`prose prose-lg max-w-none ${
                  content.image_position === "right" ? "order-1" : ""
                }`}
                dangerouslySetInnerHTML={{ __html: content.content }}
              />
            </div>
          </div>
        </section>
      ))}
      <BoardDirectors />
    </div>
  );
};

export default About;
