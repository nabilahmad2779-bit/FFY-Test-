
import { EventData, Collaboration, Member, Department, Alumni } from './types';

export const HERO_IMAGE_URL = 'https://i.postimg.cc/Nf2dQJwn/IMG_7751.jpg?auto=format&fit=crop&q=80&w=1920';

export const FORTE_EVENTS: EventData[] = [
  {
    id: 'mosaic-stories',
    name: 'THE MOSAIC STORIES',
    tagline: 'Capturing the Rich Tapestry of Creativity',
    description: '“Great things are not done by impulse but by a series of small things brought together.” — Vincent Van Gogh. A profound illustration of impactful synergy where diverse narratives converge.',
    metrics: {
      reach: 150000,
      reachLabel: '150K+',
      ambassadors: 321,
      participants: 1850
    },
    demographics: {
      ageRange: '14 - 24',
      geoDhaka: 62,
      geoChattogram: 12,
      geoSylhet: 8,
      geoRajshahi: 5,
      geoKhulna: 5,
      geoBarishal: 3,
      geoRangpur: 3,
      geoMymensingh: 2,
      eduSchool: 15,
      eduCollege: 55,
      eduUndergrad: 25,
      eduPostgrad: 5
    },
    image: 'https://i.postimg.cc/YSw2ghnB/486159563-654990023928039-8078855627441230445-n.jpg', 
    year: '2024',
    segments: ["Literature Quiz", "Digital Art", "Short-Story Writing", "MemeCon"]
  },
  {
    id: 'spiritual-quest',
    name: 'THE SPIRITUAL QUEST',
    tagline: 'A Soulful Journey this Ramadan',
    description: '“We believe that what you seek is seeking you.” — Rumi. Dive into the beauty of Islamic teachings and traditions on a path of spiritual discovery.',
    metrics: {
      reach: 95000,
      reachLabel: '95K+',
      ambassadors: 110,
      participants: 840
    },
    demographics: {
      ageRange: '15 - 28',
      geoDhaka: 74,
      geoChattogram: 8,
      geoSylhet: 5,
      geoRajshahi: 4,
      geoKhulna: 4,
      geoBarishal: 2,
      geoRangpur: 2,
      geoMymensingh: 1,
      eduSchool: 10,
      eduCollege: 30,
      eduUndergrad: 50,
      eduPostgrad: 10
    },
    image: 'https://i.postimg.cc/7YGqWgdQ/487141776-659246366835738-2625351654236584058-n.jpg',
    year: '2024'
  }
];

export const DEPARTMENTS: Department[] = [
  {
    id: 'hr',
    name: "Human Resources",
    icon: 'Users',
    tagline: "Cultivating Talent",
    description: "Directing the recruitment pipeline and volunteer lifecycle management.",
    fullDescription: "The HR department at Forte-FY is the architect of our community. We focus on systemic recruitment, rigorous onboarding, and maintaining the high-fidelity organizational culture that defines our collective. Our mission is to ensure every member finds their 'Forte' and excels within it.",
    colorClass: "text-[#bf00ff] border-[#bf00ff]/20 bg-[#bf00ff]/5 shadow-[#bf00ff]/10",
    accent: "#bf00ff",
    goals: ["Optimize Volunteer Lifecycle", "Enhance Internal Synergy", "Systemic Talent Acquisition"]
  },
  {
    id: 'pr',
    name: "Public Relations",
    icon: 'Megaphone',
    tagline: "Voice of Forte-FY",
    description: "Managing external communications and official digital presence.",
    fullDescription: "PR is the bridge between Forte-FY's internal innovations and the global stage. We orchestrate our digital narrative, manage institutional partnerships, and ensure that our message of 'Manifesting Tomorrow' resonates across all demographics.",
    colorClass: "text-[#ff0000] border-[#ff0000]/20 bg-[#ff0000]/5 shadow-[#ff0000]/10",
    accent: "#ff0000",
    goals: ["Expand Digital Footprint", "Strategic Brand Positioning", "Crisis & Media Management"]
  },
  {
    id: 'academics',
    name: "Academics",
    icon: 'GraduationCap',
    tagline: "Knowledge Forge",
    description: "Ensuring educational excellence through high-impact curriculum orchestration.",
    fullDescription: "The Academics department designs the rigorous skill-elevation programs that are at the core of our mission. From digital literacy to leadership synthesis, we provide the structured learning paths that turn raw potential into professional excellence.",
    colorClass: "text-[#00a2ff] border-[#00a2ff]/20 bg-[#00a2ff]/5 shadow-[#00a2ff]/10",
    accent: "#00a2ff",
    goals: ["Curriculum Innovation", "Impactful Mentorship", "Learning Outcome Optimization"]
  },
  {
    id: 'it',
    name: "Information Tech",
    icon: 'Laptop',
    tagline: "Technical Backbone",
    description: "Architecting the digital infrastructure to power youth-led initiatives.",
    fullDescription: "IT is the engine room of our organization. We build and maintain the digital platforms, data analysis tools, and communication systems that allow Forte-FY to operate with speed and precision in a digital-first world.",
    colorClass: "text-[#00f7ff] border-[#00f7ff]/20 bg-[#00f7ff]/5 shadow-[#00f7ff]/10",
    accent: "#00f7ff",
    goals: ["Platform Reliability", "Data-Driven Insights", "Infrastructure Scaling"]
  }
];

export const HALL_OF_FAME: Member[] = [
  { 
    name: "Solaiman Shukhon", 
    role: "Director of Innovation & Insights", 
    impact: "Forte-FY ignites the inner spark within humanity, dedicating a profound focus that sets them apart.", 
    image: "https://i.postimg.cc/SRxH9sgK/1712504343797.jpg" 
  },
  { 
    name: "Tasnim Mahi", 
    role: "Founding Strategic Lead", 
    impact: "The foundational architect of our event operations. Under her guidance, Forte-FY scaled from a vision to a multi-national reach initiative.", 
    image: 'https://i.postimg.cc/MpCtwTRz/485146929-652411014185940-2123160853129889170-n-(1).jpg' 
  },
  { 
    name: "Durrah Mehnaz Arshi ", 
    role: "Distinguished HR Senior Associate", 
    impact: "Her three-year tenure redefined our internal structure, setting the gold standard for volunteer management and communication excellence.", 
    image: 'https://i.postimg.cc/gkwTb1Qd/1000206343.jpg'
  },
  { 
    name: "Hamim Neogi Omi", 
    role: "Founding Operational Core", 
    impact: "A key pillar of our technical and logistical triumphs since May 26, 2022. Instrumental in every systemic achievement.", 
    image: 'https://i.postimg.cc/Nf2dQJwn/IMG_7751.jpg'
  }
];

export const ALUMNI: Alumni[] = [
  { name: "Rafid Ahmed", image: "https://i.pravatar.cc/300?u=rafid", designation: "Software Engineer", university: "Bangladesh University of Engineering and Technology (BUET)" },
  { name: "Naila Islam", image: "https://i.pravatar.cc/300?u=naila", designation: "Brand Manager", university: "Institute of Business Administration (IBA), DU" },
  { name: "Zayeed Khan", image: "https://i.pravatar.cc/300?u=zayeed", designation: "Data Scientist", university: "Brac University" },
  { name: "Sumaiya Tasnim", image: "https://i.pravatar.cc/300?u=sumaiya", designation: "Public Health Researcher", university: "North South University" }
];

export const COLLABORATIONS: Collaboration[] = [
  { name: 'Lets Know The World', event: '1st National Quiz Showdown 2023', date: 'November, 2023' },
  { name: 'IITC-BAFSK', event: 'Wave of IT', date: 'November, 2023' }
];

export const AWARDS = [
  { title: "Best Partner Award - ASRCA", subtitle: "Presents First ACPS National Astro Carnival 2023" },
  { title: "Best Club Partner", subtitle: "1st National Quiz Showdown 2023" }
];

export const SPONSORS = [
  { name: 'Nagad', imageUrl: 'https://i.postimg.cc/pTXrrLWm/images.png' },
  { name: 'Valiant 360 Solution', imageUrl: 'https://via.placeholder.com/400x160/000000/00f7ff?text=Valiant+360+Solution' },
];

export const PARTNER_LOGOS = [
  { name: 'Tanzimul Ummah Science Club', imageUrl: 'https://i.postimg.cc/7ZMSJjNM/Tanzimul_Ummah_Science_Club.jpg' },
  { name: 'Sadhin Foundation Bangladesh', imageUrl: 'https://via.placeholder.com/240x240/111111/00f7ff?text=Sadhin' }
];
