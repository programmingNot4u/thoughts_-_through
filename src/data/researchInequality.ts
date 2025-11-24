export interface ResearchItem {
  id: string;
  title: string;
  date: string;
  description: string;
  content?: string;
  image?: string;
  tags?: string[];
  author?: string;
  externalLinks?: {
    title: string;
    url: string;
  }[];
  youtubeVideoId?: string;
}

export const inequalityResearch: ResearchItem[] = [
  {
    id: "social-inequality-families",
    title: "Social Inequality and Family Well-being",
    date: "2024-01-30",
    description:
      "Longitudinal study investigating how economic and social disparities affect families and communities, with focus on creating equitable pathways forward.",
    content: `
      <p class="mb-4">
        This longitudinal study, conducted over three years, investigates how economic and social disparities affect families and communities. We tracked families across different socioeconomic backgrounds to understand the long-term impacts of inequality.
      </p>
      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Key Findings</h3>
      <ul class="list-disc list-inside space-y-2 mb-4 text-medium-gray">
        <li>Economic inequality significantly impacts children's educational outcomes</li>
        <li>Social disparities affect family stability and mental health</li>
        <li>Intergenerational transmission of inequality requires targeted interventions</li>
        <li>Community support systems can mitigate some impacts of inequality</li>
      </ul>
      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Policy Recommendations</h3>
      <p class="mb-4">
        Based on our findings, we propose evidence-based policy recommendations aimed at reducing inequality and creating more equitable opportunities for families. These include educational interventions, economic support programs, and community development initiatives.
      </p>
    `,
    tags: ["Social Inequality", "Family Well-being", "Economic Disparities", "Policy"],
    author: "Dr. Lisa Anderson",
    externalLinks: [
      {
        title: "Full Research Report (PDF)",
        url: "https://example.com/inequality-report",
      },
      {
        title: "Executive Summary",
        url: "https://example.com/inequality-summary",
      },
    ],
  },
  {
    id: "familial-impacts-economic-disparity",
    title: "Familial Impacts of Economic Disparity",
    date: "2024-03-05",
    description:
      "Research examining how economic disparities within and between families affect family dynamics, child development, and intergenerational outcomes.",
    content: `
      <p class="mb-4">
        This research examines how economic disparities affect family dynamics, child development, and intergenerational outcomes. We explore the mechanisms through which economic inequality impacts family functioning and propose interventions to support families facing economic challenges.
      </p>
      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Impact Areas</h3>
      <ul class="list-disc list-inside space-y-2 mb-4 text-medium-gray">
        <li>Parent-child relationships and family communication</li>
        <li>Children's educational and developmental outcomes</li>
        <li>Mental health and stress levels within families</li>
        <li>Access to resources and opportunities</li>
      </ul>
    `,
    tags: ["Economic Disparity", "Family Dynamics", "Child Development"],
    author: "Dr. David Martinez",
  },
  {
    id: "community-equity-pathways",
    title: "Creating Equitable Pathways in Communities",
    date: "2024-02-10",
    description:
      "Study of community-based interventions designed to create more equitable pathways for families and individuals, reducing the impact of social and economic disparities.",
    content: `
      <p class="mb-4">
        This study evaluates community-based interventions designed to create more equitable pathways. We examine programs that address educational access, economic opportunities, and social support systems to reduce the impact of inequality.
      </p>
      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Successful Interventions</h3>
      <p class="mb-4">
        Our research identifies several successful intervention models that have effectively reduced inequality and created more equitable opportunities. These models can be adapted and scaled to benefit other communities facing similar challenges.
      </p>
    `,
    tags: ["Equity", "Community Interventions", "Social Justice"],
    author: "Dr. Jennifer Lee",
  },
];

export const getInequalityResearchById = (id: string): ResearchItem | undefined => {
  return inequalityResearch.find((item) => item.id === id);
};

