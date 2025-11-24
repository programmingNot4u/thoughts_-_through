export interface SurveyItem {
  id: string;
  title: string;
  date: string;
  description: string;
  status: "Active" | "Completed" | "Upcoming";
  category: string;
  participants?: number;
  content?: string;
  image?: string;
  tags?: string[];
  author?: string;
  externalLinks?: {
    title: string;
    url: string;
  }[];
  objectives?: string[];
  methodology?: string;
  findings?: string;
}

export const surveys: SurveyItem[] = [
  {
    id: "urban-mental-health-2024",
    title: "Urban Mental Health Accessibility Survey 2024",
    date: "2024-03-15",
    description:
      "A comprehensive survey examining mental health service accessibility in urban communities, identifying barriers and opportunities for improvement.",
    status: "Completed",
    category: "Health & Mental Health",
    participants: 2500,
    objectives: [
      "Assess mental health service accessibility in urban areas",
      "Identify barriers to accessing mental health care",
      "Evaluate community awareness of available services",
      "Develop recommendations for service improvement",
    ],
    methodology:
      "Mixed-methods approach combining quantitative surveys with qualitative interviews. Data collected from 2,500 participants across 15 urban centers over 6 months.",
    findings:
      "Key findings reveal that 60% of respondents face significant barriers to accessing mental health services. Geographic accessibility and cultural stigma were identified as primary concerns. The survey provides evidence-based recommendations for improving service delivery.",
    content: `
      <p class="mb-4">
        This comprehensive survey examined mental health service accessibility in urban communities, gathering insights from over 2,500 participants across 15 major urban centers. The study employed a mixed-methods approach, combining quantitative surveys with in-depth qualitative interviews.
      </p>
      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Survey Objectives</h3>
      <ul class="list-disc list-inside space-y-2 mb-4 text-medium-gray">
        <li>Assess mental health service accessibility in urban areas</li>
        <li>Identify barriers to accessing mental health care</li>
        <li>Evaluate community awareness of available services</li>
        <li>Develop recommendations for service improvement</li>
      </ul>
      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Key Findings</h3>
      <ul class="list-disc list-inside space-y-2 mb-4 text-medium-gray">
        <li>60% of respondents reported difficulty accessing mental health services</li>
        <li>Geographic accessibility was identified as the primary barrier (45% of respondents)</li>
        <li>Cultural stigma remains a significant concern, particularly in certain demographic groups</li>
        <li>Cost and insurance coverage continue to prevent many from seeking treatment</li>
        <li>Community awareness of available services is lower than expected</li>
      </ul>
      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Recommendations</h3>
      <p class="mb-4">
        Based on the survey findings, we recommend: (1) Expanding community-based mental health centers, (2) Implementing culturally-sensitive outreach programs, (3) Improving transportation access to mental health facilities, (4) Developing public awareness campaigns, and (5) Creating sliding-scale payment options for low-income individuals.
      </p>
      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Impact</h3>
      <p class="mb-4">
        The survey findings have been used to inform healthcare policy reforms and have been recognized by the World Health Organization. Several urban centers have implemented community-based mental health programs based on our recommendations.
      </p>
    `,
    tags: ["Mental Health", "Urban Health", "Accessibility", "Public Health"],
    author: "Dr. Sarah Johnson",
    externalLinks: [
      {
        title: "Full Survey Report (PDF)",
        url: "https://example.com/mental-health-survey-report",
      },
      {
        title: "Executive Summary",
        url: "https://example.com/mental-health-summary",
      },
    ],
  },
  {
    id: "climate-adaptation-rural-2024",
    title: "Climate Change Adaptation in Rural Communities Survey",
    date: "2024-04-20",
    description:
      "Survey assessing how rural communities are adapting to climate change impacts, focusing on agricultural practices and livelihood strategies.",
    status: "Active",
    category: "Climate & Environment",
    participants: 1800,
    objectives: [
      "Assess climate change awareness in rural communities",
      "Evaluate adaptation strategies currently in use",
      "Identify support needs for climate adaptation",
      "Document successful adaptation practices",
    ],
    methodology:
      "Structured surveys and focus group discussions with 1,800 participants from rural agricultural and fishing communities. Data collection ongoing across 12 regions.",
    content: `
      <p class="mb-4">
        This ongoing survey examines how rural communities are adapting to climate change impacts, with particular focus on agricultural and fishing communities. The study aims to document adaptation strategies and identify support needs.
      </p>
      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Preliminary Findings</h3>
      <ul class="list-disc list-inside space-y-2 mb-4 text-medium-gray">
        <li>85% of respondents report experiencing climate change impacts</li>
        <li>Traditional knowledge plays a crucial role in adaptation</li>
        <li>Access to information and resources is a key challenge</li>
        <li>Community-based adaptation strategies show promise</li>
      </ul>
    `,
    tags: ["Climate Change", "Rural Communities", "Adaptation", "Agriculture"],
    author: "Dr. Maria Santos",
  },
  {
    id: "social-inequality-education-2024",
    title: "Social Inequality and Educational Outcomes Survey",
    date: "2024-02-10",
    description:
      "Longitudinal survey investigating how social and economic disparities affect educational achievement and life outcomes for children and families.",
    status: "Completed",
    category: "Social Inequality",
    participants: 3200,
    objectives: [
      "Examine the relationship between socioeconomic status and educational outcomes",
      "Identify factors that contribute to educational inequality",
      "Assess the impact of family support on educational achievement",
      "Develop recommendations for reducing educational disparities",
    ],
    methodology:
      "Longitudinal survey tracking 3,200 families over three years. Data collected through annual surveys, interviews, and educational records analysis.",
    findings:
      "The survey reveals significant correlations between socioeconomic status and educational outcomes. Family support, access to resources, and community factors all play critical roles. The findings inform evidence-based interventions to reduce educational disparities.",
    content: `
      <p class="mb-4">
        This longitudinal survey investigated how social and economic disparities affect educational achievement and life outcomes. The study tracked 3,200 families over three years, providing comprehensive insights into the factors influencing educational success.
      </p>
      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Key Findings</h3>
      <ul class="list-disc list-inside space-y-2 mb-4 text-medium-gray">
        <li>Strong correlation between family income and educational outcomes</li>
        <li>Parental involvement significantly impacts student achievement</li>
        <li>Access to educational resources varies significantly by socioeconomic status</li>
        <li>Community support systems can mitigate some impacts of inequality</li>
        <li>Early intervention programs show promise in reducing disparities</li>
      </ul>
      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Policy Implications</h3>
      <p class="mb-4">
        The survey findings have important implications for education policy. Recommendations include: expanding access to early childhood education, providing additional support for low-income families, improving resource allocation to underserved schools, and developing community-based support programs.
      </p>
    `,
    tags: ["Education", "Social Inequality", "Family", "Policy"],
    author: "Dr. Lisa Anderson",
    externalLinks: [
      {
        title: "Full Survey Report (PDF)",
        url: "https://example.com/education-inequality-report",
      },
    ],
  },
  {
    id: "environmental-health-monitoring-2024",
    title: "Environmental Health Monitoring Community Survey",
    date: "2024-05-01",
    description:
      "Survey assessing community awareness and engagement with environmental health monitoring systems and their impact on public health decision-making.",
    status: "Upcoming",
    category: "Health & Environment",
    participants: 0,
    objectives: [
      "Assess community awareness of environmental health indicators",
      "Evaluate engagement with monitoring systems",
      "Identify information needs and preferences",
      "Develop recommendations for improving public engagement",
    ],
    methodology:
      "Planned survey with 1,500 participants from diverse communities. Will include both online and in-person data collection methods.",
    content: `
      <p class="mb-4">
        This upcoming survey will assess community awareness and engagement with environmental health monitoring systems. The study aims to understand how communities interact with environmental health data and how this information influences public health decision-making.
      </p>
      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Survey Launch</h3>
      <p class="mb-4">
        The survey is scheduled to launch in the coming months. We are currently finalizing the survey instrument and preparing for data collection across multiple communities.
      </p>
    `,
    tags: ["Environmental Health", "Monitoring", "Community Engagement"],
    author: "Dr. Robert Kim",
  },
  {
    id: "family-wellbeing-economic-2024",
    title: "Family Wellbeing and Economic Disparity Survey",
    date: "2024-01-25",
    description:
      "Survey examining how economic disparities affect family wellbeing, relationships, and child development outcomes across different socioeconomic groups.",
    status: "Completed",
    category: "Social Inequality",
    participants: 2100,
    objectives: [
      "Examine the impact of economic disparity on family wellbeing",
      "Assess effects on parent-child relationships",
      "Evaluate child development outcomes",
      "Identify protective factors and support needs",
    ],
    methodology:
      "Comprehensive survey with 2,100 families from diverse economic backgrounds. Included structured surveys, family interviews, and child development assessments.",
    findings:
      "The survey reveals significant impacts of economic disparity on family wellbeing. However, strong family relationships and community support can mitigate some negative effects. The findings highlight the importance of economic support programs and family services.",
    content: `
      <p class="mb-4">
        This survey examined how economic disparities affect family wellbeing, relationships, and child development. The study included 2,100 families from diverse economic backgrounds, providing comprehensive insights into the challenges and strengths of families facing economic hardship.
      </p>
      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Key Findings</h3>
      <ul class="list-disc list-inside space-y-2 mb-4 text-medium-gray">
        <li>Economic stress significantly impacts family relationships</li>
        <li>Strong family bonds can buffer against economic hardship</li>
        <li>Children's development is affected by family economic circumstances</li>
        <li>Community support plays a crucial protective role</li>
        <li>Access to resources and services varies by economic status</li>
      </ul>
      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Recommendations</h3>
      <p class="mb-4">
        Based on the findings, we recommend: (1) Expanding economic support programs for families, (2) Strengthening family support services, (3) Improving access to child development resources, (4) Developing community-based support networks, and (5) Creating programs that strengthen family relationships.
      </p>
    `,
    tags: ["Family", "Economic Disparity", "Child Development", "Wellbeing"],
    author: "Dr. David Martinez",
    externalLinks: [
      {
        title: "Full Survey Report (PDF)",
        url: "https://example.com/family-wellbeing-report",
      },
    ],
  },
];

export const getSurveyById = (id: string): SurveyItem | undefined => {
  return surveys.find((survey) => survey.id === id);
};

