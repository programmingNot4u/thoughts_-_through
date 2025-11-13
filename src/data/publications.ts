export type PublicationType = "PDF" | "DOCX" | "XLSX" | "PPTX" | "Link";
export type PublicationCategory =
  | "Research Report"
  | "Policy Brief"
  | "Journal Article"
  | "Working Paper"
  | "Case Study"
  | "Methodology"
  | "Annual Report";
export type PublicationSector =
  | "Health"
  | "Social"
  | "Environment"
  | "Research"
  | "Policy";

export interface Publication {
  id: string;
  title: string;
  description: string;
  authors: string[];
  date: string;
  category: PublicationCategory;
  type: PublicationType;
  sector: PublicationSector;
  tags: string[];
  url?: string;
  downloadUrl?: string;
  pages?: number;
  language?: string;
  publisher?: string;
}

export const publications: Publication[] = [
  {
    id: "mental-health-climate-urban-2024",
    title: "Mental Health Impact of Climate Change in Urban Areas",
    description:
      "A comprehensive study examining the psychological and mental health effects of climate change on urban populations, with focus on vulnerable communities and adaptation strategies.",
    authors: ["Dr. Sarah Johnson", "Dr. Michael Chen", "Dr. Emily Rodriguez"],
    date: "2024-03-15",
    category: "Research Report",
    type: "PDF",
    sector: "Health",
    tags: ["Mental Health", "Climate Change", "Urban", "Public Health"],
    pages: 145,
    language: "English",
    publisher: "Thoughts & Thorough Research Center",
  },
  {
    id: "social-inequality-family-wellbeing-2024",
    title: "Social Inequality and Family Well-being: A Longitudinal Study",
    description:
      "Longitudinal research tracking the relationship between social inequality and family well-being across different socioeconomic groups over a five-year period.",
    authors: ["Dr. Jennifer Lee", "Dr. David Martinez"],
    date: "2024-02-20",
    category: "Research Report",
    type: "PDF",
    sector: "Social",
    tags: ["Social Inequality", "Family", "Longitudinal Study", "Well-being"],
    pages: 98,
    language: "English",
  },
  {
    id: "environmental-health-assessment-2023",
    title: "Environmental Health Assessment Report 2023",
    description:
      "Annual assessment of environmental health indicators, pollution levels, and their impact on public health in Bangladesh.",
    authors: ["Dr. Patricia Williams", "Dr. James Wilson"],
    date: "2024-01-10",
    category: "Annual Report",
    type: "PDF",
    sector: "Environment",
    tags: ["Environmental Health", "Assessment", "Pollution", "Public Health"],
    pages: 203,
    language: "English",
  },
  {
    id: "data-analysis-methods-public-health-2023",
    title: "Data Analysis Methods in Public Health Research",
    description:
      "A methodological guide for researchers on advanced data analysis techniques and statistical methods used in public health research.",
    authors: ["Dr. Robert Taylor", "Dr. Lisa Anderson"],
    date: "2023-12-05",
    category: "Methodology",
    type: "DOCX",
    sector: "Research",
    tags: ["Data Analysis", "Methodology", "Statistics", "Research Methods"],
    pages: 67,
    language: "English",
  },
  {
    id: "climate-adaptation-rural-communities-2023",
    title: "Climate Change Adaptation Strategies for Rural Communities",
    description:
      "Research report on effective adaptation strategies for rural communities facing climate change impacts, with case studies from Bangladesh.",
    authors: ["Dr. Thomas Brown", "Dr. Maria Garcia"],
    date: "2023-11-18",
    category: "Research Report",
    type: "PDF",
    sector: "Environment",
    tags: ["Climate Adaptation", "Rural", "Community", "Sustainability"],
    pages: 156,
    language: "English",
  },
  {
    id: "mental-health-services-accessibility-2023",
    title: "Mental Health Services Accessibility Study",
    description:
      "Comprehensive study on the accessibility and availability of mental health services in urban and rural areas, identifying barriers and recommendations.",
    authors: ["Dr. Emily Rodriguez", "Dr. Sarah Johnson"],
    date: "2023-10-22",
    category: "Research Report",
    type: "PDF",
    sector: "Health",
    tags: [
      "Mental Health",
      "Accessibility",
      "Healthcare Services",
      "Urban",
      "Rural",
    ],
    pages: 112,
    language: "English",
  },
  {
    id: "health-policy-brief-2024",
    title: "Universal Health Coverage: Policy Recommendations for Bangladesh",
    description:
      "Policy brief outlining key recommendations for achieving universal health coverage in Bangladesh, based on comprehensive research and analysis.",
    authors: ["Dr. Patricia Williams", "Dr. Michael Chen"],
    date: "2024-04-10",
    category: "Policy Brief",
    type: "PDF",
    sector: "Policy",
    tags: [
      "Health Policy",
      "Universal Health Coverage",
      "Policy Recommendations",
    ],
    pages: 24,
    language: "English",
  },
  {
    id: "social-protection-systems-2023",
    title: "Social Protection Systems in South Asia: A Comparative Analysis",
    description:
      "Comparative analysis of social protection systems across South Asian countries, identifying best practices and policy implications.",
    authors: ["Dr. Jennifer Lee", "Dr. David Martinez"],
    date: "2023-09-15",
    category: "Working Paper",
    type: "PDF",
    sector: "Social",
    tags: ["Social Protection", "Comparative Analysis", "South Asia", "Policy"],
    pages: 89,
    language: "English",
  },
  {
    id: "environmental-policy-case-study-2023",
    title: "Community-Based Environmental Management: A Case Study",
    description:
      "Case study examining successful community-based environmental management initiatives and their replicability in other contexts.",
    authors: ["Dr. James Wilson", "Dr. Thomas Brown"],
    date: "2023-08-20",
    category: "Case Study",
    type: "PDF",
    sector: "Environment",
    tags: ["Environmental Management", "Community-Based", "Case Study"],
    pages: 45,
    language: "English",
  },
  {
    id: "journal-article-health-equity-2024",
    title: "Health Equity in Urban Slums: Evidence from Dhaka",
    description:
      "Peer-reviewed journal article examining health equity issues in urban slums, published in the Journal of Public Health Research.",
    authors: ["Dr. Sarah Johnson", "Dr. Emily Rodriguez", "Dr. Michael Chen"],
    date: "2024-05-01",
    category: "Journal Article",
    type: "PDF",
    sector: "Health",
    tags: ["Health Equity", "Urban Slums", "Journal Article", "Public Health"],
    pages: 18,
    language: "English",
    publisher: "Journal of Public Health Research",
  },
];

export const getPublicationById = (id: string): Publication | undefined => {
  return publications.find((pub) => pub.id === id);
};

export const getPublicationsByCategory = (
  category: PublicationCategory
): Publication[] => {
  return publications.filter((pub) => pub.category === category);
};

export const getPublicationsBySector = (
  sector: PublicationSector
): Publication[] => {
  return publications.filter((pub) => pub.sector === sector);
};
