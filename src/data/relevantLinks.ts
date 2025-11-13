export type LinkCategory =
  | "National"
  | "International"
  | "Government"
  | "Research"
  | "NGO"
  | "Academic";

export interface RelevantLink {
  id: string;
  title: string;
  description: string;
  url: string;
  category: LinkCategory;
  tags: string[];
}

export const relevantLinks: RelevantLink[] = [
  {
    id: "national-health-research-institute",
    title: "National Health Research Institute",
    description:
      "Leading health research organization providing evidence-based health policy recommendations.",
    url: "https://example.com/nhri",
    category: "National",
    tags: ["Health", "Research", "Policy"],
  },
  {
    id: "environmental-research-council",
    title: "Environmental Research Council",
    description:
      "Government body overseeing environmental research and policy development.",
    url: "https://example.com/erc",
    category: "Government",
    tags: ["Environment", "Policy", "Government"],
  },
  {
    id: "social-development-research-center",
    title: "Social Development Research Center",
    description:
      "Research institution focused on social policy and community development.",
    url: "https://example.com/sdrc",
    category: "Research",
    tags: ["Social", "Development", "Community"],
  },
  {
    id: "world-health-organization-research",
    title: "World Health Organization Research",
    description: "Global health research and policy guidelines from WHO.",
    url: "https://www.who.int",
    category: "International",
    tags: ["Health", "Global", "Policy"],
  },
  {
    id: "intergovernmental-panel-climate-change",
    title: "Intergovernmental Panel on Climate Change",
    description:
      "Scientific assessments on climate change impacts and adaptation strategies.",
    url: "https://www.ipcc.ch",
    category: "International",
    tags: ["Climate", "Environment", "Science"],
  },
  {
    id: "united-nations-research-institute",
    title: "United Nations Research Institute",
    description:
      "UN research initiatives on sustainable development and social equity.",
    url: "https://www.un.org",
    category: "International",
    tags: ["Development", "Global", "Sustainability"],
  },
  {
    id: "bangladesh-bureau-statistics",
    title: "Bangladesh Bureau of Statistics",
    description:
      "Official statistical organization providing comprehensive data on Bangladesh's economy and society.",
    url: "https://www.bbs.gov.bd",
    category: "Government",
    tags: ["Statistics", "Data", "Government"],
  },
  {
    id: "icddr-b",
    title: "icddr,b - International Centre for Diarrhoeal Disease Research",
    description:
      "Leading global health research institute based in Bangladesh, focusing on infectious diseases and public health.",
    url: "https://www.icddrb.org",
    category: "Research",
    tags: ["Health", "Research", "Public Health"],
  },
  {
    id: "bangladesh-rural-advancement-committee",
    title: "BRAC - Bangladesh Rural Advancement Committee",
    description:
      "World's largest development organization, working on poverty alleviation and social development.",
    url: "https://www.brac.net",
    category: "NGO",
    tags: ["Development", "NGO", "Social"],
  },
  {
    id: "dhaka-university",
    title: "University of Dhaka",
    description:
      "Premier academic institution in Bangladesh, conducting extensive research across multiple disciplines.",
    url: "https://www.du.ac.bd",
    category: "Academic",
    tags: ["Education", "Research", "Academic"],
  },
  {
    id: "ministry-health-family-welfare",
    title: "Ministry of Health and Family Welfare",
    description:
      "Government ministry responsible for health policy, planning, and implementation in Bangladesh.",
    url: "https://www.mohfw.gov.bd",
    category: "Government",
    tags: ["Health", "Government", "Policy"],
  },
  {
    id: "world-bank-bangladesh",
    title: "World Bank - Bangladesh",
    description:
      "World Bank's operations and research in Bangladesh, focusing on development and poverty reduction.",
    url: "https://www.worldbank.org/en/country/bangladesh",
    category: "International",
    tags: ["Development", "Finance", "Global"],
  },
];

export const getLinkById = (id: string): RelevantLink | undefined => {
  return relevantLinks.find((link) => link.id === id);
};

export const getLinksByCategory = (category: LinkCategory): RelevantLink[] => {
  return relevantLinks.filter((link) => link.category === category);
};
