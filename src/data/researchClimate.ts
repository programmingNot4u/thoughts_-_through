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

export const climateResearch: ResearchItem[] = [
  {
    id: "climate-health-impacts",
    title: "Climate Change Impacts on Public Health",
    date: "2024-04-10",
    description:
      "Comprehensive analysis of how climate change affects public health, including heat-related illnesses, vector-borne diseases, and air quality impacts.",
    content: `
      <p class="mb-4">
        This research provides a comprehensive analysis of how climate change impacts public health across multiple dimensions. We examined heat-related illnesses, changes in vector-borne disease patterns, air quality impacts, and extreme weather events.
      </p>
      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Key Findings</h3>
      <ul class="list-disc list-inside space-y-2 mb-4 text-medium-gray">
        <li>Rising temperatures correlate with increased heat-related hospitalizations</li>
        <li>Vector-borne diseases are expanding into new geographic regions</li>
        <li>Air quality degradation affects respiratory health outcomes</li>
        <li>Extreme weather events create mental health challenges</li>
      </ul>
      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Adaptation Strategies</h3>
      <p class="mb-4">
        Our research identifies evidence-based adaptation strategies that communities can implement to protect public health in the face of climate change. These include early warning systems, infrastructure improvements, and community resilience programs.
      </p>
    `,
    tags: ["Climate Change", "Public Health", "Adaptation", "Environmental Health"],
    author: "Dr. James Wilson",
    externalLinks: [
      {
        title: "Full Research Report (PDF)",
        url: "https://example.com/climate-health-report",
      },
      {
        title: "Adaptation Guide",
        url: "https://example.com/adaptation-guide",
      },
    ],
  },
  {
    id: "livelihood-resilience",
    title: "Building Livelihood Resilience to Climate Change",
    date: "2024-03-25",
    description:
      "Research on how climate change affects livelihoods, particularly in agricultural and fishing communities, and strategies for building resilience.",
    content: `
      <p class="mb-4">
        This study examines how climate change impacts livelihoods, with particular focus on agricultural and fishing communities. We explore adaptation strategies and resilience-building approaches that help communities maintain their livelihoods in changing environmental conditions.
      </p>
      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Community Case Studies</h3>
      <p class="mb-4">
        Our research includes detailed case studies from agricultural and fishing communities that have successfully adapted to climate challenges. These examples provide practical insights for other communities facing similar challenges.
      </p>
    `,
    tags: ["Climate Change", "Livelihoods", "Resilience", "Agriculture"],
    author: "Dr. Maria Santos",
  },
  {
    id: "environmental-health-monitoring",
    title: "Environmental Health Monitoring Systems",
    date: "2024-02-15",
    description:
      "Development and evaluation of monitoring systems to track environmental health indicators and inform public health decision-making.",
    content: `
      <p class="mb-4">
        This research focuses on developing comprehensive monitoring systems for environmental health indicators. These systems help track changes in environmental conditions and their impacts on public health, enabling proactive responses.
      </p>
      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">System Components</h3>
      <ul class="list-disc list-inside space-y-2 mb-4 text-medium-gray">
        <li>Real-time air quality monitoring</li>
        <li>Water quality tracking systems</li>
        <li>Heat index and extreme weather alerts</li>
        <li>Vector-borne disease surveillance</li>
      </ul>
    `,
    tags: ["Environmental Health", "Monitoring", "Public Health", "Technology"],
    author: "Dr. Robert Kim",
  },
];

export const getClimateResearchById = (id: string): ResearchItem | undefined => {
  return climateResearch.find((item) => item.id === id);
};

