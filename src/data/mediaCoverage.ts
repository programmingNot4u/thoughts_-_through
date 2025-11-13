export type MediaType = "Article" | "Video" | "News" | "Interview" | "Event";

export interface MediaCoverageItem {
  id: string;
  title: string;
  date: string;
  type: MediaType;
  description: string;
  content?: string; // Full article content
  youtubeVideoId?: string; // YouTube video ID for embedding
  externalLinks?: {
    title: string;
    url: string;
  }[];
  author?: string;
  publication?: string;
  image?: string;
  tags?: string[];
}

export const mediaCoverage: MediaCoverageItem[] = [
  {
    id: "health-research-findings-2023",
    title: "Media Coverage: Health Research Findings",
    date: "2023-11-12",
    type: "Article",
    description:
      "Comprehensive coverage of our latest health research findings published in leading medical journals and featured across various media platforms.",
    content: `
      <p class="mb-4">
        Our recent research on mental health accessibility in urban environments has garnered significant attention from media outlets and research communities worldwide. The study, conducted over a period of 18 months, examined the barriers to mental health services in densely populated urban areas.
      </p>
      <p class="mb-4">
        The findings reveal critical insights into how socioeconomic factors, cultural barriers, and infrastructure limitations impact access to mental health care. Our research team interviewed over 2,000 participants across multiple urban centers, providing a comprehensive view of the challenges faced by communities.
      </p>
      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Key Findings</h3>
      <ul class="list-disc list-inside space-y-2 mb-4 text-medium-gray">
        <li>Over 60% of respondents reported difficulty accessing mental health services within their communities</li>
        <li>Cultural stigma remains a significant barrier, particularly in certain demographic groups</li>
        <li>Geographic accessibility and transportation are major limiting factors</li>
        <li>Cost and insurance coverage continue to prevent many from seeking treatment</li>
      </ul>
      <p class="mb-4">
        The research has been published in the Journal of Public Health Research and has been cited by several policy-making bodies considering healthcare reforms. Our team continues to work on developing evidence-based solutions to address these critical gaps in mental health service delivery.
      </p>
      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Impact and Recognition</h3>
      <p class="mb-4">
        This research has been recognized by the World Health Organization and has been featured in multiple international conferences. The findings are being used to inform policy decisions at both local and national levels, demonstrating the real-world impact of evidence-based research.
      </p>
    `,
    youtubeVideoId: "dQw4w9WgXcQ", // Example video ID - replace with actual
    externalLinks: [
      {
        title: "Journal of Public Health Research - Full Article",
        url: "https://example.com/article",
      },
      {
        title: "WHO Research Brief",
        url: "https://example.com/who-brief",
      },
      {
        title: "National Health Journal Coverage",
        url: "https://example.com/national-health",
      },
    ],
    author: "Dr. Emily Rodriguez",
    publication: "Thoughts & Thorough Research Division",
    tags: ["Mental Health", "Urban Health", "Accessibility", "Research"],
  },
  {
    id: "climate-health-conference-2024",
    title: "Climate Health Research Conference 2024",
    date: "2024-04-10",
    type: "Event",
    description:
      "Our team presented groundbreaking research on climate change impacts on public health at the annual Climate Health Research Conference.",
    content: `
      <p class="mb-4">
        The 2024 Climate Health Research Conference brought together leading researchers, policymakers, and practitioners to discuss the intersection of climate change and public health. Our team presented three major research papers covering different aspects of this critical topic.
      </p>
      <p class="mb-4">
        The conference featured keynote presentations, panel discussions, and interactive workshops. Our presentations focused on adaptation strategies, community resilience, and policy recommendations for addressing climate-related health challenges.
      </p>
    `,
    youtubeVideoId: "dQw4w9WgXcQ",
    externalLinks: [
      {
        title: "Conference Proceedings",
        url: "https://example.com/conference",
      },
    ],
    tags: ["Climate Change", "Public Health", "Conference"],
  },
  {
    id: "research-director-interview-2024",
    title: "Interview with Research Director on Mental Health",
    date: "2024-03-25",
    type: "Interview",
    description:
      "An in-depth conversation with our Research Director exploring the latest findings in mental health research, accessibility challenges, and evidence-based solutions for improving mental health services in urban communities.",
    content: `
      <p class="mb-4">
        In this exclusive interview, Dr. Emily Rodriguez, Research Director at Thoughts & Thorough, discusses groundbreaking findings from our recent mental health accessibility study. The conversation delves into the challenges facing urban communities, the role of evidence-based research in policy development, and the organization's vision for creating more accessible mental health services.
      </p>

      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Interview Highlights</h3>

      <div class="space-y-6 mb-6">
        <div>
          <h4 class="text-xl font-heading font-semibold text-forest-green mb-2">Q: What were the most surprising findings from your recent mental health accessibility study?</h4>
          <p class="text-medium-gray mb-4">
            "One of the most striking findings was that over 60% of respondents reported significant barriers to accessing mental health services, even in well-resourced urban areas. What surprised us most was that cost wasn't always the primary barrier - geographic accessibility and cultural stigma played equally important roles. This suggests we need multi-faceted approaches to address these challenges."
          </p>
        </div>

        <div>
          <h4 class="text-xl font-heading font-semibold text-forest-green mb-2">Q: How does your research inform policy decisions?</h4>
          <p class="text-medium-gray mb-4">
            "Our research provides policymakers with concrete, evidence-based data they can use to make informed decisions. We've seen our findings directly influence healthcare policy reforms in several regions. For instance, our recommendations on community-based mental health centers have been incorporated into urban planning initiatives. The key is translating research into actionable policy recommendations."
          </p>
        </div>

        <div>
          <h4 class="text-xl font-heading font-semibold text-forest-green mb-2">Q: What role does cultural sensitivity play in mental health accessibility?</h4>
          <p class="text-medium-gray mb-4">
            "Cultural sensitivity is absolutely critical. Our research shows that cultural barriers often prevent people from seeking help, even when services are available. We need mental health professionals who understand the cultural contexts of the communities they serve. This includes language accessibility, understanding cultural perceptions of mental health, and creating safe spaces where people feel comfortable seeking help."
          </p>
        </div>

        <div>
          <h4 class="text-xl font-heading font-semibold text-forest-green mb-2">Q: What are the next steps for your research team?</h4>
          <p class="text-medium-gray mb-4">
            "We're currently working on a longitudinal study tracking the impact of community-based interventions over a three-year period. We're also developing partnerships with local health systems to implement and evaluate pilot programs based on our research findings. Our goal is to create a model that can be replicated across different urban contexts."
          </p>
        </div>

        <div>
          <h4 class="text-xl font-heading font-semibold text-forest-green mb-2">Q: How can communities get involved in improving mental health accessibility?</h4>
          <p class="text-medium-gray mb-4">
            "Community involvement is essential. We're working with community leaders, local organizations, and healthcare providers to develop grassroots solutions. Communities know their own needs best, and our role is to provide the research evidence and support to help them implement effective programs. We're also training community health workers to serve as bridges between communities and formal mental health services."
          </p>
        </div>
      </div>

      <h3 class="text-2xl font-heading font-bold text-dark-gray mb-3 mt-6">Key Takeaways</h3>
      <ul class="list-disc list-inside space-y-2 mb-4 text-medium-gray">
        <li>Mental health accessibility requires addressing multiple barriers simultaneously - cost, geography, and culture</li>
        <li>Evidence-based research directly influences policy and can drive real-world change</li>
        <li>Community involvement is crucial for developing effective mental health interventions</li>
        <li>Cultural sensitivity must be integrated into mental health service delivery</li>
        <li>Longitudinal studies are needed to understand the long-term impact of interventions</li>
      </ul>

      <p class="mb-4">
        This interview provides valuable insights into the current state of mental health research and the path forward for creating more accessible, culturally-sensitive mental health services. Dr. Rodriguez's expertise and passion for evidence-based solutions shine through, offering hope for communities struggling with mental health accessibility challenges.
      </p>
    `,
    youtubeVideoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
    externalLinks: [
      {
        title: "Full Interview Transcript (PDF)",
        url: "https://example.com/interview-transcript",
      },
      {
        title: "Mental Health Today - Article Coverage",
        url: "https://example.com/mental-health-today",
      },
      {
        title: "Public Health Journal - Research Summary",
        url: "https://example.com/public-health-journal",
      },
      {
        title: "National Health Network - Interview Feature",
        url: "https://example.com/national-health-network",
      },
      {
        title: "Research Findings Publication",
        url: "https://example.com/research-publication",
      },
    ],
    author: "Interview by Media Team",
    publication: "Thoughts & Thorough Communications",
    tags: [
      "Interview",
      "Mental Health",
      "Research",
      "Accessibility",
      "Public Health",
      "Policy",
    ],
  },
  {
    id: "annual-research-symposium-2024",
    title: "Annual Research Symposium",
    date: "2024-02-15",
    type: "Event",
    description:
      "Our annual research symposium showcased the year's most significant research findings across health, environment, and social sciences.",
    content: `
      <p class="mb-4">
        The Annual Research Symposium is our flagship event, bringing together researchers, stakeholders, and community members to share and discuss our latest findings. This year's event featured presentations on mental health, climate adaptation, and social inequality.
      </p>
    `,
    tags: ["Symposium", "Research", "Annual Event"],
  },
  {
    id: "publication-launch-inequality-2024",
    title: "Publication Launch: Social Inequality Report",
    date: "2024-01-30",
    type: "News",
    description:
      "Launch of our comprehensive report on social inequality and its impacts on family well-being, featuring key findings and policy recommendations.",
    content: `
      <p class="mb-4">
        We are proud to announce the launch of our comprehensive report on social inequality and family well-being. This longitudinal study, conducted over three years, provides critical insights into how economic and social disparities affect families and communities.
      </p>
      <p class="mb-4">
        The report includes detailed analysis, case studies, and evidence-based recommendations for policymakers, researchers, and community organizations working to address inequality.
      </p>
    `,
    externalLinks: [
      {
        title: "Download Full Report (PDF)",
        url: "https://example.com/report",
      },
      {
        title: "Executive Summary",
        url: "https://example.com/summary",
      },
    ],
    tags: ["Social Inequality", "Report", "Publication"],
  },
];

export const getMediaCoverageById = (
  id: string
): MediaCoverageItem | undefined => {
  return mediaCoverage.find((item) => item.id === id);
};
