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

export const healthResearch: ResearchItem[] = [
  {
    id: "mental-health-urban-communities",
    title: "Mental Health Accessibility in Urban Communities",
    date: "2024-03-15",
    description:
      "A comprehensive study examining mental health service accessibility in urban environments, identifying barriers and proposing evidence-based solutions for improved access.",
    content: `
      <p class="mb-4">
        This comprehensive research study examines the accessibility of mental health services in urban communities, identifying key barriers and proposing evidence-based solutions. Conducted over 18 months, the study involved interviews with over 2,000 participants across multiple urban centers.
      </p>
      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Key Findings</h3>
      <ul class="list-disc list-inside space-y-2 mb-4 text-medium-gray">
        <li>Over 60% of respondents reported difficulty accessing mental health services</li>
        <li>Cultural stigma remains a significant barrier in certain demographic groups</li>
        <li>Geographic accessibility and transportation are major limiting factors</li>
        <li>Cost and insurance coverage continue to prevent many from seeking treatment</li>
      </ul>
      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Methodology</h3>
      <p class="mb-4">
        Our research team employed a mixed-methods approach, combining quantitative surveys with qualitative interviews. We engaged with diverse communities to ensure our findings reflect the experiences of various demographic groups.
      </p>
      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Impact</h3>
      <p class="mb-4">
        The findings from this research have been used to inform healthcare policy reforms and have been recognized by the World Health Organization. Several urban centers have implemented community-based mental health programs based on our recommendations.
      </p>
    `,
    tags: ["Mental Health", "Urban Health", "Accessibility", "Public Health"],
    author: "Dr. Sarah Johnson",
    externalLinks: [
      {
        title: "Full Research Report (PDF)",
        url: "https://example.com/mental-health-report",
      },
      {
        title: "Policy Recommendations",
        url: "https://example.com/policy-recommendations",
      },
    ],
  },
  {
    id: "social-health-wellbeing",
    title: "Social Health and Community Wellbeing Assessment",
    date: "2024-02-20",
    description:
      "An assessment of social health indicators and their impact on overall community wellbeing, with focus on social connections and community support systems.",
    content: `
      <p class="mb-4">
        This research explores the relationship between social health indicators and overall community wellbeing. We examined how social connections, community support systems, and social participation contribute to individual and collective health outcomes.
      </p>
      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Research Objectives</h3>
      <ul class="list-disc list-inside space-y-2 mb-4 text-medium-gray">
        <li>Assess social health indicators across diverse communities</li>
        <li>Identify factors that contribute to strong social health</li>
        <li>Develop frameworks for measuring social wellbeing</li>
        <li>Propose interventions to strengthen community social health</li>
      </ul>
    `,
    tags: ["Social Health", "Community Wellbeing", "Social Connections"],
    author: "Dr. Michael Chen",
  },
  {
    id: "physical-mental-health-integration",
    title: "Integrating Physical and Mental Health Services",
    date: "2024-01-10",
    description:
      "Research on integrated healthcare models that address both physical and mental health needs simultaneously, improving patient outcomes and service efficiency.",
    content: `
      <p class="mb-4">
        This study examines integrated healthcare models that address both physical and mental health needs. Our research demonstrates that integrated approaches lead to better patient outcomes and more efficient use of healthcare resources.
      </p>
      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Key Benefits</h3>
      <ul class="list-disc list-inside space-y-2 mb-4 text-medium-gray">
        <li>Improved patient satisfaction and outcomes</li>
        <li>Reduced healthcare costs through coordinated care</li>
        <li>Better identification and treatment of comorbid conditions</li>
        <li>Enhanced patient engagement in their healthcare</li>
      </ul>
    `,
    tags: ["Integrated Care", "Healthcare Models", "Patient Outcomes"],
    author: "Dr. Emily Rodriguez",
  },
];

export const getHealthResearchById = (id: string): ResearchItem | undefined => {
  return healthResearch.find((item) => item.id === id);
};

