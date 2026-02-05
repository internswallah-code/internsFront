// const internships =[
//   {
//     id: 0,
//     title: "Tech Intern",
//     company: "Parihar India",
//     location: "Delhi",
//     duration: "3 Months",
//     stipend: 5000,
//     posted: "3 weeks",
//     type: "Internship with job offer",
//   },
//   {
//     title: "Design Intern",
//     company: "Parihar India",
//     location: "Delhi",
//     duration: "3 Months",
//     stipend: 10000,
//     posted: "3 weeks",
//     type: "Internship with job offer",
//   },
//   {
//     title: "Research Intern",
//     company: "Parihar India",
//     location: "Delhi",
//     duration: "3 Months",
//     stipend: 10000,
//     posted: "5 days",
//     type: "Actively hiring",
//   },
//   {
//     title: "Marketing Intern",
//     company: "Parihar India",
//     location: "Delhi",
//     duration: "3 Months",
//     stipend: 12000,
//     posted: "6 days",
//     type: "Internship with job offer",
//   },
// ];

// export default internships;
// Sample internship data with additional properties for filtering
import mongoose from "mongoose";

const internships = [
  {
    createdBy: new mongoose.Types.ObjectId("6883aa5a4cf01e582cc60903"),

    title: "Tech Intern",
    company: "Parihar India",
    location: "Delhi",
    duration: "3 Months",
    stipendValue: 5000,
    isRemote: false,
    isPartTime: false,
    skills: ["JavaScript", "React", "Node.js"],
    description:
      "Join our tech team to work on exciting projects and gain hands-on experience.",

    createdAt: new Date("2025-12-05"),
  },
  {
    createdBy: new mongoose.Types.ObjectId("6883aa5a4cf01e582cc60903"),

    title: "Design Intern",
    company: "Parihar India",
    location: "Delhi",
    duration: "3 Months",
    stipendValue: 10000,
    isRemote: true,
    isPartTime: false,
    skills: ["Figma", "Adobe XD", "UI/UX"],
    description:
      "Design beautiful interfaces for our products and collaborate with our product team.",

    createdAt: new Date("2025-11-20"),
  },
  {
    createdBy: new mongoose.Types.ObjectId("6883aa5a4cf01e582cc60903"),

    title: "Research Intern",
    company: "Parihar India",
    location: "Delhi",
    duration: "3 Months",
    stipendValue: 10000,
    isRemote: false,
    isPartTime: true,
    skills: ["Data Analysis", "Research", "Documentation"],
    description:
      "Conduct market research and help us understand our customers better.",

    createdAt: new Date("2025-12-28"),
  },
  {
    createdBy: new mongoose.Types.ObjectId("6883aa5a4cf01e582cc60903"),

    title: "Marketing Intern",
    company: "Parihar India",
    location: "Delhi",
    duration: "3 Months",
    stipendValue: 12000,
    isRemote: true,
    isPartTime: false,
    skills: ["Social Media", "Content Writing", "SEO"],
    description: "Help us grow our online presence and reach more customers.",

    createdAt: new Date("2025-12-27"),
  },
  {
    createdBy: new mongoose.Types.ObjectId("6980e1113564323d74cc7ca7"),

    title: "Business Development Intern",
    company: "Parihar India",
    location: "Mumbai",
    duration: "6 Months",
    stipendValue: 15000,
    isRemote: false,
    isPartTime: false,
    skills: ["Sales", "Communication", "Negotiation"],
    description: "Help us expand our business and reach new clients.",

    createdAt: new Date("2024-10-10"),
  },
  {
    createdBy: new mongoose.Types.ObjectId("6980e1113564323d74cc7ca7"),

    title: "Content Writing Intern",
    company: "Parihar India",
    location: "Bangalore",
    duration: "2 Months",
    stipendValue: 8000,
    isRemote: true,
    isPartTime: true,
    skills: ["Writing", "Editing", "SEO"],
    description:
      "Create engaging content for our blog and social media channels.",

    createdAt: new Date("2025-12-30"),
  },
  {
    createdBy: new mongoose.Types.ObjectId("6980e1113564323d74cc7ca7"),

    title: "Data Science Intern",
    company: "Parihar India",
    location: "Hyderabad",
    duration: "4 Months",
    stipendValue: 18000,
    isRemote: false,
    isPartTime: false,
    skills: ["Python", "Machine Learning", "Data Analysis"],
    description:
      "Work on real-world data problems and help us make data-driven decisions.",

    createdAt: new Date("2025-12-31"),
  },
];

export default internships;
