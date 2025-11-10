const LegalDocuments = () => {
  const documents = [
    {
      title: "Certificate of Incorporation",
      year: "2020",
      type: "Certificate",
    },
    {
      title: "Tax Registration Certificate",
      year: "2020",
      type: "Certificate",
    },
    {
      title: "Annual Audit Report 2023",
      year: "2023",
      type: "Audit Report",
    },
    {
      title: "Annual Audit Report 2022",
      year: "2022",
      type: "Audit Report",
    },
    {
      title: "Annual Audit Report 2021",
      year: "2021",
      type: "Audit Report",
    },
    {
      title: "Research Ethics Approval",
      year: "2021",
      type: "Approval",
    },
  ];

  return (
    <section id="documents" className="py-20 bg-light-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-gray text-center mb-12">
          Legal Documents / Certifications / Audit Reports
        </h2>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-deep-green text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-heading font-semibold">
                    Document Title
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
                {documents.map((doc, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-light-green transition-colors">
                    <td className="px-6 py-4 text-dark-gray font-medium">
                      {doc.title}
                    </td>
                    <td className="px-6 py-4 text-medium-gray">{doc.year}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-light-green text-forest-green rounded-full text-sm">
                        {doc.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="btn-primary text-sm py-2 px-4">
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalDocuments;
