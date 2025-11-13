export interface WebinarParticipant {
  name: string;
  role: string;
  affiliation: string;
  image?: string;
}

export type WebinarStatus = "Upcoming" | "Ongoing" | "Completed";

export interface Webinar {
  id: string;
  title: string;
  topics: string[];
  date: string;
  time: {
    gmt: string;
    bdTime: string;
  };
  presenter: WebinarParticipant;
  moderator: WebinarParticipant;
  discussants: WebinarParticipant[];
  welcomeSpeech?: WebinarParticipant;
  closingRemarks?: WebinarParticipant;
  organizer: string;
  location: string;
  description?: string;
  status: WebinarStatus;
}

export const webinars: Webinar[] = [
  {
    id: "ttrc-research-webinar-2021",
    title: "TTRC RESEARCH WEBINAR",
    topics: [
      "FAO' definition of forest, and agroforestry",
      "Land sharing vs land sparing for agricultural production and conservation",
    ],
    date: "November 12, 2021, Friday",
    time: {
      gmt: "8:30am",
      bdTime: "2:30pm",
    },
    presenter: {
      name: "Syed Ajijur Rahman, PhD",
      role: "Research Presenter",
      affiliation: "Research Professor, Peking University, China",
    },
    moderator: {
      name: "Mr. Rezaul Karim Siddique",
      role: "Moderator",
      affiliation: "Renowned TV Host and Argo-Sector Analyst",
    },
    discussants: [
      {
        name: "Mr. Anwar Faruque",
        role: "Discussant",
        affiliation: "Former Secretary, Ministry of Agriculture",
      },
      {
        name: "Lucia Morales-Barquero, PhD",
        role: "Discussant",
        affiliation:
          "Joint Remote Sensing Research Program, School of Environment and Earth Sciences, The University of Queensland, Australia",
      },
      {
        name: "Md. Ahsanur Rahman, PhD",
        role: "Discussant",
        affiliation:
          "Divisional Officer, Bangladesh Forest Protection Division, Chattogram, Bangladesh",
      },
      {
        name: "Yusuf B Samsudin",
        role: "Discussant",
        affiliation:
          "Researcher, WildCRU, University of Oxford, UK & CIFOR, Indonesia",
      },
    ],
    welcomeSpeech: {
      name: "Ishrat Jahan Dilruba",
      role: "Welcome Speech",
      affiliation: "Chairman, TTRC",
    },
    closingRemarks: {
      name: "Md. Taufikuzzaman, PhD",
      role: "Closing Remarks",
      affiliation: "Managing Director, TTRC",
    },
    organizer: "Thoughts & Thorough",
    location: "Dhaka, Bangladesh",
    description:
      "A comprehensive research webinar exploring forest definitions, agroforestry practices, and the critical debate between land sharing and land sparing strategies for sustainable agricultural production and conservation.",
    status: "Completed",
  },
  {
    id: "environmental-impact-assessment-2023",
    title: "Webinar: Environmental Impact Assessment",
    topics: [
      "Environmental Impact Assessment methodologies",
      "Climate change adaptation strategies",
      "Sustainable development practices",
    ],
    date: "December 20, 2023, Wednesday",
    time: {
      gmt: "10:00am",
      bdTime: "4:00pm",
    },
    presenter: {
      name: "Dr. Sarah Johnson",
      role: "Research Presenter",
      affiliation: "Senior Research Director, Thoughts & Thorough",
    },
    moderator: {
      name: "Dr. Michael Chen",
      role: "Moderator",
      affiliation: "Environmental Health Specialist",
    },
    discussants: [
      {
        name: "Dr. Emily Rodriguez",
        role: "Discussant",
        affiliation: "Mental Health Researcher",
      },
      {
        name: "Dr. James Wilson",
        role: "Discussant",
        affiliation: "Data Analytics Lead",
      },
    ],
    organizer: "Thoughts & Thorough",
    location: "Dhaka, Bangladesh",
    description:
      "An in-depth exploration of environmental impact assessment methodologies and their application in climate change adaptation and sustainable development.",
    status: "Completed",
  },
  {
    id: "climate-health-webinar-2024",
    title: "Climate Change and Public Health",
    topics: [
      "Climate change impacts on public health",
      "Adaptation strategies for health systems",
      "Community resilience building",
    ],
    date: "March 15, 2024, Friday",
    time: {
      gmt: "9:00am",
      bdTime: "3:00pm",
    },
    presenter: {
      name: "Dr. Patricia Williams",
      role: "Research Presenter",
      affiliation: "Public Health Research Director",
    },
    moderator: {
      name: "Dr. David Martinez",
      role: "Moderator",
      affiliation: "Environmental Health Specialist",
    },
    discussants: [
      {
        name: "Dr. Jennifer Lee",
        role: "Discussant",
        affiliation: "Social Health Researcher",
      },
    ],
    organizer: "Thoughts & Thorough",
    location: "Dhaka, Bangladesh",
    description:
      "Exploring the intersection of climate change and public health, focusing on adaptation strategies and community resilience.",
    status: "Upcoming",
  },
  {
    id: "mental-health-research-2024",
    title: "Mental Health Research Symposium",
    topics: [
      "Mental health in urban environments",
      "Accessibility of mental health services",
      "Community-based interventions",
    ],
    date: "April 20, 2024, Saturday",
    time: {
      gmt: "10:30am",
      bdTime: "4:30pm",
    },
    presenter: {
      name: "Dr. Emily Rodriguez",
      role: "Research Presenter",
      affiliation: "Mental Health Researcher",
    },
    moderator: {
      name: "Dr. Lisa Anderson",
      role: "Moderator",
      affiliation: "Social Impact Consultant",
    },
    discussants: [
      {
        name: "Dr. Robert Taylor",
        role: "Discussant",
        affiliation: "Climate Policy Analyst",
      },
    ],
    organizer: "Thoughts & Thorough",
    location: "Dhaka, Bangladesh",
    description:
      "A comprehensive discussion on mental health research, focusing on urban environments and community interventions.",
    status: "Upcoming",
  },
];

export const getWebinarById = (id: string): Webinar | undefined => {
  return webinars.find((webinar) => webinar.id === id);
};
