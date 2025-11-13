import { useMemo, useState } from "react";

type DocumentType = "Certificate" | "Audit Report" | "Approval" | "License";

interface LegalDocument {
  id: string;
  title: string;
  year: string;
  type: DocumentType;
  description?: string;
  downloadUrl?: string;
}

const LegalDocuments = () => {
  const documents: LegalDocument[] = [
    {
      id: "certificate-incorporation-2020",
      title: "Certificate of Incorporation",
      year: "2020",
      type: "Certificate",
      description:
        "Official certificate of incorporation from the Registrar of Joint Stock Companies and Firms",
    },
    {
      id: "tax-registration-2020",
      title: "Tax Registration Certificate",
      year: "2020",
      type: "Certificate",
      description:
        "Tax Identification Number (TIN) registration certificate from National Board of Revenue",
    },
    {
      id: "annual-audit-report-2023",
      title: "Annual Audit Report 2023",
      year: "2023",
      type: "Audit Report",
      description:
        "Comprehensive annual audit report for fiscal year 2023, prepared by certified auditors",
    },
    {
      id: "annual-audit-report-2022",
      title: "Annual Audit Report 2022",
      year: "2022",
      type: "Audit Report",
      description:
        "Comprehensive annual audit report for fiscal year 2022, prepared by certified auditors",
    },
    {
      id: "annual-audit-report-2021",
      title: "Annual Audit Report 2021",
      year: "2021",
      type: "Audit Report",
      description:
        "Comprehensive annual audit report for fiscal year 2021, prepared by certified auditors",
    },
    {
      id: "research-ethics-approval-2021",
      title: "Research Ethics Approval",
      year: "2021",
      type: "Approval",
      description:
        "Ethics approval certificate for research activities from the Institutional Review Board",
    },
  ];

  const [filterYear, setFilterYear] = useState<string>("All");
  const [filterType, setFilterType] = useState<DocumentType | "All">("All");
  const [sortBy, setSortBy] = useState<"year" | "title" | "type">("year");

  const years = useMemo(() => {
    const yearSet = new Set(documents.map((doc) => doc.year));
    return ["All", ...Array.from(yearSet).sort().reverse()];
  }, []);

  const types: DocumentType[] = [
    "Certificate",
    "Audit Report",
    "Approval",
    "License",
  ];

  const filteredAndSortedDocuments = useMemo(() => {
    let filtered = documents.filter((doc) => {
      const matchesYear = filterYear === "All" || doc.year === filterYear;
      const matchesType = filterType === "All" || doc.type === filterType;
      return matchesYear && matchesType;
    });

    // Sort documents
    filtered.sort((a, b) => {
      if (sortBy === "year") {
        return parseInt(b.year) - parseInt(a.year); // Newest first
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else {
        const typeCompare = a.type.localeCompare(b.type);
        if (typeCompare !== 0) return typeCompare;
        return parseInt(b.year) - parseInt(a.year);
      }
    });

    return filtered;
  }, [filterYear, filterType, sortBy]);

  const getTypeColor = (type: DocumentType) => {
    switch (type) {
      case "Certificate":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Audit Report":
        return "bg-green-100 text-green-800 border-green-200";
      case "Approval":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "License":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <section id="documents" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-gray text-center mb-12">
          Legal Documents & Certifications
        </h2>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-light-green rounded-lg p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-forest-green mb-2">
              {documents.length}
            </div>
            <div className="text-sm text-medium-gray">Total Documents</div>
          </div>
          <div className="bg-light-green rounded-lg p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-forest-green mb-2">
              {new Set(documents.map((d) => d.year)).size}
            </div>
            <div className="text-sm text-medium-gray">Years Covered</div>
          </div>
          <div className="bg-light-green rounded-lg p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-forest-green mb-2">
              {filteredAndSortedDocuments.length}
            </div>
            <div className="text-sm text-medium-gray">Filtered Results</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-light-green rounded-lg p-6 shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="doc-year"
                className="block text-sm font-medium text-dark-gray mb-2">
                Year
              </label>
              <select
                id="doc-year"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="w-full px-4 py-2 border-2 border-forest-green rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green bg-white">
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="doc-type"
                className="block text-sm font-medium text-dark-gray mb-2">
                Document Type
              </label>
              <select
                id="doc-type"
                value={filterType}
                onChange={(e) =>
                  setFilterType(e.target.value as DocumentType | "All")
                }
                className="w-full px-4 py-2 border-2 border-forest-green rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green bg-white">
                <option value="All">All Types</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-gray mb-2">
                Sort by
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortBy("year")}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors text-sm ${
                    sortBy === "year"
                      ? "bg-forest-green text-white"
                      : "bg-white text-dark-gray hover:bg-forest-green hover:text-white border-2 border-forest-green"
                  }`}>
                  Year
                </button>
                <button
                  onClick={() => setSortBy("title")}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors text-sm ${
                    sortBy === "title"
                      ? "bg-forest-green text-white"
                      : "bg-white text-dark-gray hover:bg-forest-green hover:text-white border-2 border-forest-green"
                  }`}>
                  Title
                </button>
                <button
                  onClick={() => setSortBy("type")}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors text-sm ${
                    sortBy === "type"
                      ? "bg-forest-green text-white"
                      : "bg-white text-dark-gray hover:bg-forest-green hover:text-white border-2 border-forest-green"
                  }`}>
                  Type
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-deep-green text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-heading font-semibold">
                    Document Title
                  </th>
                  <th className="px-6 py-4 text-left font-heading font-semibold">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left font-heading font-semibold">
                    Year
                  </th>
                  <th className="px-6 py-4 text-left font-heading font-semibold">
                    Type
                  </th>
                  <th className="px-6 py-4 text-center font-heading font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedDocuments.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-medium-gray">
                      No documents found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedDocuments.map((doc, index) => (
                    <tr
                      key={doc.id}
                      className={`border-b border-gray-200 hover:bg-light-green transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}>
                      <td className="px-6 py-4">
                        <div className="font-medium text-dark-gray">
                          {doc.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-medium-gray max-w-md">
                          {doc.description || "—"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-medium-gray font-medium">
                          {doc.year}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium border ${getTypeColor(
                            doc.type
                          )}`}>
                          {doc.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {doc.downloadUrl ? (
                          <a
                            href={doc.downloadUrl}
                            className="btn-primary text-sm py-2 px-4 inline-block">
                            Download
                          </a>
                        ) : (
                          <button className="btn-primary text-sm py-2 px-4">
                            Download
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalDocuments;
