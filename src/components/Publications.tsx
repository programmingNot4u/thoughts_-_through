import { useState } from "react";

const Publications = () => {
  const publications = [
    {
      title: "Mental Health Impact of Climate Change in Urban Areas",
      date: "2024-03-15",
      category: "Health Research",
      type: "PDF",
      sector: "Health",
    },
    {
      title: "Social Inequality and Family Well-being: A Longitudinal Study",
      date: "2024-02-20",
      category: "Social Research",
      type: "PDF",
      sector: "Social",
    },
    {
      title: "Environmental Health Assessment Report 2023",
      date: "2024-01-10",
      category: "Environmental Research",
      type: "PDF",
      sector: "Environment",
    },
    {
      title: "Data Analysis Methods in Public Health Research",
      date: "2023-12-05",
      category: "Methodology",
      type: "DOCX",
      sector: "Research",
    },
    {
      title: "Climate Change Adaptation Strategies for Rural Communities",
      date: "2023-11-18",
      category: "Environmental Research",
      type: "PDF",
      sector: "Environment",
    },
    {
      title: "Mental Health Services Accessibility Study",
      date: "2023-10-22",
      category: "Health Research",
      type: "PDF",
      sector: "Health",
    },
  ];

  const [filterYear, setFilterYear] = useState<string>("All");
  const [filterSector, setFilterSector] = useState<string>("All");
  const [filterType, setFilterType] = useState<string>("All");

  const years = ["All", "2024", "2023"];
  const sectors = ["All", "Health", "Social", "Environment", "Research"];
  const types = ["All", "PDF", "DOCX"];

  const filteredPublications = publications.filter((pub) => {
    const year = pub.date.split("-")[0];
    return (
      (filterYear === "All" || year === filterYear) &&
      (filterSector === "All" || pub.sector === filterSector) &&
      (filterType === "All" || pub.type === filterType)
    );
  });

  return (
    <section id="publications" className="py-20 bg-light-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-gray text-center mb-12">
          Documents, Publications & Reports
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="px-4 py-2 border-2 border-forest-green rounded-lg bg-white text-dark-gray">
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            value={filterSector}
            onChange={(e) => setFilterSector(e.target.value)}
            className="px-4 py-2 border-2 border-forest-green rounded-lg bg-white text-dark-gray">
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border-2 border-forest-green rounded-lg bg-white text-dark-gray">
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPublications.map((pub, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md card-hover"
              data-aos="fade-up"
              data-aos-delay={index * 50}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-heading font-bold text-dark-gray mb-2">
                    {pub.title}
                  </h3>
                  <p className="text-sm text-medium-gray mb-2">
                    {new Date(pub.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <span className="inline-block px-3 py-1 bg-light-green text-forest-green rounded-full text-xs font-medium">
                    {pub.category}
                  </span>
                </div>
                <div className="ml-4">
                  {pub.type === "PDF" ? (
                    <svg
                      className="w-8 h-8 text-red-600"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 btn-primary text-sm py-2">
                  Download
                </button>
                <button className="flex-1 btn-outline text-sm py-2">
                  Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;
