import { useState } from "react";

const ResourcePanel = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const expertiseTags = [
    "research methods",
    "data analysis",
    "environmental impact",
    "mental health",
    "social health",
    "climate change",
    "public health",
    "statistics",
  ];

  const experts = [
    {
      name: "Dr. Sarah Johnson",
      designation: "Senior Research Director",
      expertise: ["research methods", "data analysis", "statistics"],
      photo: "👩‍🔬",
    },
    {
      name: "Dr. Michael Chen",
      designation: "Environmental Health Specialist",
      expertise: ["environmental impact", "climate change", "public health"],
      photo: "👨‍🔬",
    },
    {
      name: "Dr. Emily Rodriguez",
      designation: "Mental Health Researcher",
      expertise: ["mental health", "social health", "research methods"],
      photo: "👩‍⚕️",
    },
    {
      name: "Dr. James Wilson",
      designation: "Data Analytics Lead",
      expertise: ["data analysis", "statistics", "research methods"],
      photo: "👨‍💻",
    },
    {
      name: "Dr. Lisa Anderson",
      designation: "Social Impact Consultant",
      expertise: ["social health", "research methods", "public health"],
      photo: "👩‍🏫",
    },
    {
      name: "Dr. Robert Taylor",
      designation: "Climate Policy Analyst",
      expertise: ["climate change", "environmental impact", "data analysis"],
      photo: "👨‍🌾",
    },
  ];

  const filteredExperts =
    selectedTag === null
      ? experts
      : experts.filter((expert) => expert.expertise.includes(selectedTag));

  return (
    <section id="resource-panel" className="py-20 bg-light-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-gray text-center mb-12">
          Resource Panel
        </h2>

        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-full border-2 transition-all ${
              selectedTag === null
                ? "bg-forest-green text-white border-forest-green"
                : "bg-white text-forest-green border-forest-green hover:bg-forest-green hover:text-white"
            }`}>
            All
          </button>
          {expertiseTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full border-2 transition-all ${
                selectedTag === tag
                  ? "bg-forest-green text-white border-forest-green"
                  : "bg-white text-forest-green border-forest-green hover:bg-forest-green hover:text-white"
              }`}>
              {tag}
            </button>
          ))}
        </div>

        {/* Experts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperts.map((expert, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md card-hover"
              data-aos="fade-up"
              data-aos-delay={index * 50}>
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-24 h-24 rounded-full bg-light-green flex items-center justify-center text-4xl mb-4 border-2 border-forest-green">
                  {expert.photo}
                </div>
                <h3 className="text-xl font-heading font-bold text-dark-gray mb-1">
                  {expert.name}
                </h3>
                <p className="text-medium-gray text-sm mb-4">
                  {expert.designation}
                </p>
              </div>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {expert.expertise.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs border border-forest-green text-forest-green rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <button className="w-full btn-outline text-sm py-2">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcePanel;
