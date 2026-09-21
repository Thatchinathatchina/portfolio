import vhrmsWeb from "../assets/vhrms.png";
import vhrmsApp from "../assets/vhrms app.png";
import englishWeb from "../assets/english-web.png";
import englishApp1 from "../assets/english-app1.png";
import englishApp2 from "../assets/english-app2.png";

export const projects = [
  {
    id: "hrms",
    color: "#3b82f6", // Blue
    name: "HRMS — Employee Management Platform",
    summary:
      "A multi-company HR platform covering attendance, leave, payroll and role-based access.",
    images: [
      vhrmsWeb, 
      vhrmsApp
    ],
    tech: ["Laravel", "PHP", "Livewire", "PostgreSQL", "REST API"],
    features: [
      "Employee management",
      "Attendance tracking",
      "Leave management",
      "Payroll processing",
      "Role-based access control",
      "Multi-company architecture",
      "API integration",
      "Geofencing-based attendance",
    ],
    overview:
      "An internal HR system built for organizations managing multiple companies and branches under one account.",
    problem:
      "Teams were tracking attendance, leave and payroll across spreadsheets and disconnected tools, with no single source of truth per company.",
    solution:
      "A single Laravel + Livewire platform with company-scoped data, role-based permissions and a REST API layer for integrations.",
    contribution:
      "Designed the multi-company data model, built the attendance and leave modules, and implemented geofencing-based check-ins with role-based access control.",
    challenges:
      "Keeping data properly scoped per company while sharing a single codebase, and designing geofencing that stayed reliable across device types.",
    architecture: ["React / Livewire", "Laravel", "Business Logic", "PostgreSQL"],
    github: "https://github.com/thatchinamoorthi",
    demo: null,
  },
  {
    id: "ai-speaking",
    color: "#ffffff", // White
    name: "AI English Speaking Application",
    summary:
      "A mobile app for speaking practice using AI conversation, speech recognition and text-to-speech.",
    images: [
      englishWeb,
      englishApp1,
      englishApp2
    ],
    tech: ["React Native", "AI API", "Speech Recognition", "Text-to-Speech"],
    features: [
      "AI conversation",
      "Speaking practice sessions",
      "Pronunciation-focused interaction",
      "Text-to-speech responses",
      "Voice input",
      "Interactive speaking UI",
    ],
    overview:
      "A React Native application that lets users practice spoken English through interactive, voice-driven conversations.",
    problem:
      "Learners needed a low-pressure way to practice speaking English without needing a live conversation partner available.",
    solution:
      "A mobile app that combines speech recognition, an AI conversation layer and text-to-speech to create an interactive back-and-forth practice session.",
    contribution:
      "Built the React Native app end to end — the voice input flow, the conversational UI, and the integration between speech recognition, the AI API and text-to-speech playback.",
    challenges:
      "Handling voice input reliably across devices, and keeping the conversation flow responsive despite network and API latency.",
    architecture: ["React Native", "AI / Speech API", "Business Logic", "Conversation State"],
    github: "https://github.com/thatchinamoorthi",
    demo: null,
  },
  {
    id: "salon",
    color: "#ef4444", // Red
    name: "Salon Management System",
    summary:
      "A management system for salon operations built with Laravel and Livewire.",
    tech: ["Laravel", "PHP", "PostgreSQL", "Livewire"],
    features: [
      "Service and staff management",
      "Booking and scheduling",
      "Customer records",
    ],
    overview:
      "A Laravel-based system for managing day-to-day salon operations — services, staff and bookings.",
    problem:
      "Manual booking and record-keeping made it difficult to track schedules and customer history consistently.",
    solution:
      "A Livewire-driven admin system backed by PostgreSQL, giving staff a live, reactive interface without a separate frontend build step.",
    contribution:
      "Built the core Laravel application, the Livewire components for booking and scheduling, and the underlying database schema.",
    challenges:
      "Keeping the scheduling UI reactive and consistent using Livewire's server-driven component model.",
    architecture: ["React / Livewire", "Laravel", "Database"],
    github: "https://github.com/thatchinamoorthi",
    demo: null,
  },
  {
    id: "job-recruitment-app",
    color: "#eab308", // Yellow
    name: "School Job Application & Recruitment App",
    summary:
      "Developed a mobile recruitment platform for job search, filtering, applications, job tracking, and user profile management.",
    tech: ["React Native", "JavaScript", "REST APIs", "OTP", "Bearer Tokens"],
    features: [
      "Job search and filtering",
      "Job tracking and applications",
      "User profile management",
      "OTP authentication",
      "Secure Bearer & Refresh Tokens"
    ],
    overview:
      "A mobile recruitment platform for job search, filtering, applications, job tracking, and user profile management.",
    problem:
      "Streamlining the job application process with secure and reliable authentication.",
    solution:
      "Implemented a React Native mobile app with OTP authentication and secure Bearer Token and Refresh Token mechanisms.",
    contribution:
      "React Native Developer. Developed the mobile platform and implemented OTP authentication with secure Bearer Token and Refresh Token mechanisms.",
    challenges:
      "Implementing secure and seamless authentication using OTP and managing token lifecycles.",
    architecture: ["React Native", "REST API", "Authentication"],
    github: "https://github.com/thatchinamoorthi",
    demo: null,
  }
];
