
import { EventData, Collaboration, Member, Department } from './types';

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
  },
  {
    id: 'cosmic-quest',
    name: 'COSMIC QUEST',
    tagline: 'Dive into the Astral Realm',
    description: 'An orchestration that transcended expectations, blending entertainment and education for diverse forms of cosmic exploration.',
    metrics: {
      reach: 126000,
      reachLabel: '126K+',
      ambassadors: 340,
      participants: 1264
    },
    demographics: {
      ageRange: '12 - 22',
      geoDhaka: 58,
      geoChattogram: 14,
      geoSylhet: 7,
      geoRajshahi: 6,
      geoKhulna: 5,
      geoBarishal: 4,
      geoRangpur: 3,
      geoMymensingh: 3,
      eduSchool: 35,
      eduCollege: 40,
      eduUndergrad: 20,
      eduPostgrad: 5
    },
    image: 'https://i.postimg.cc/v8X1sLPm/485180030-651196477640727-5766733535341963819-n.jpg',
    year: '2022'
  },
  {
    id: 'brush-flash',
    name: 'BRUSH & FLASH',
    tagline: 'Nagad Presents | Powered by Valiant 360°',
    description: 'A seamless integration of art and photography, celebrating the artistic prowess of participants through a dynamic platform.',
    metrics: {
      reach: 86000,
      reachLabel: '86K+',
      ambassadors: 42,
      participants: 352
    },
    demographics: {
      ageRange: '16 - 25',
      geoDhaka: 81,
      geoChattogram: 6,
      geoSylhet: 4,
      geoRajshahi: 3,
      geoKhulna: 2,
      geoBarishal: 2,
      geoRangpur: 1,
      geoMymensingh: 1,
      eduSchool: 5,
      eduCollege: 20,
      eduUndergrad: 60,
      eduPostgrad: 15
    },
    image: 'https://i.postimg.cc/HxsSP9ZQ/472338910-602616829123761-2863321119488148611-n.jpg',
    year: '2022'
  }
];

export const GALLERY_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=2070', caption: 'Vanguard Strategy Meeting' },
  { url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071', caption: 'Skill Forge Workshop' },
  { url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2070', caption: 'Digital Literacy Campaign' },
  { url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2070', caption: 'Cosmic Quest Outreach' },
  { url: 'https://images.unsplash.com/photo-1523240715632-d984bb4b970e?auto=format&fit=crop&q=80&w=2070', caption: 'Annual Distinction Award' }
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
    role: "Campus Ambassador", 
    impact: "Working with Forte-FY provided exposure to well organized event operations. Their systems were reliable and efficient.", 
    image: 'https://i.postimg.cc/MpCtwTRz/485146929-652411014185940-2123160853129889170-n-(1).jpg' 
  },
  { 
    name: "Durrah Mehnaz Arshi ", 
    role: "Senior Associate of Human Resources", 
    impact: "Serving in the HR department for three years has taught me the importance of structure and strong communication. Fort-FY has always upheld these standards with consistency.", 
    image: 'https://i.postimg.cc/gkwTb1Qd/1000206343.jpg'
  },
  { 
    name: "Hamim Neogi Omi", 
    role: "Organising Secretary of BAFSD Science Club ", 
    impact: "The backbone of every transformative endeavor since May 26, 2022.", 
    image: 'https://images.unsplash.com/photo-1529070538774-1844bbd08b05?auto=format&fit=crop&q=80&w=800'
  }
];

export const DEPARTMENTS: Department[] = [
  { name: "Human Resources", lead: "Recruitment Lead", description: "Straightforward yet comprehensive approach to volunteer integration.", icon: "Users" },
  { name: "Public Relations", lead: "Communications Lead", description: "Managing official social media and external narratives.", icon: "Megaphone" },
  { name: "Information Tech", lead: "Digital Architect", description: "Developing the technical spine for all youth platforms.", icon: "Code" },
  { name: "Academic", lead: "Curriculum Head", description: "Ensuring each participant emerges equipped with mastery.", icon: "BookOpen" }
];

export const COLLABORATIONS: Collaboration[] = [
  { name: 'Lets Know The World', event: '1st National Quiz Showdown 2023', date: 'November, 2023' },
  { name: 'IITC-BAFSK', event: 'Wave of IT', date: 'November, 2023' },
  { name: 'OVILASHI', event: 'Intraspirant Leadership Conference', date: 'November, 2023' },
  { name: 'BAFSK QC', event: 'Trivia Quizzes', date: 'November, 2023' },
  { name: 'Scientific Intelligence Forum', event: 'BRAINIAC', date: 'November, 2023' },
  { name: 'ACPS Astronomy & Space Research Club', event: 'ACPS National Astro Carnival', date: 'November, 2023' }
];

export const AWARDS = [
  { title: "Best Partner Award - ASRCA", subtitle: "Presents First ACPS National Astro Carnival 2023" },
  { title: "Best Club Partner", subtitle: "1st National Quiz Showdown 2023" },
  { title: "ILC 2.0 : Intraspirant Leadership Conference - 2023 by Ovilashi", subtitle: "" },
  { title: "Trivia Quizzes", subtitle: "" }
];

export const AUDIENCE_STATS = {
  location: [
    { label: 'Dhaka', value: 51.9, color: '#ff3e3e' },
    { label: 'Chittagong', value: 14.5, color: '#3b82f6' },
    { label: 'Sylhet', value: 11.9, color: '#10b981' },
    { label: 'Others', value: 21.7, color: '#6366f1' }
  ],
  skillSynthesis: [
    { label: 'Art & Photography', value: 65, color: '#ff3e3e' },
    { label: 'Cosmic Exploration', value: 24, color: '#3b82f6' },
    { label: 'IT & Leadership', value: 11, color: '#10b981' }
  ],
  retentionPulse: [
    { label: 'Volunteer Growth', value: 92 },
    { label: 'Partner Synergy', value: 85 },
    { label: 'Alumni Success', value: 74 }
  ]
};
