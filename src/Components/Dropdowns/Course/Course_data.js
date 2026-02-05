import mongoose from "mongoose";

const courses = [
  {
    createdBy: new mongoose.Types.ObjectId("6883aa5a4cf01e582cc60903"),

    title: "Web Development",
    company: "Internswallah Trainings",
    description:
      "Master HTML, CSS, JavaScript, and React to build modern, responsive websites from scratch.",
    location: "Online",
    duration: "6 Weeks",
    fees: 3499,
    type: "Beginner Friendly",

    createdAt: new Date("2025-12-12"),
  },
  {
    createdBy: new mongoose.Types.ObjectId("6883aa5a4cf01e582cc60903"),

    title: "Data Science",
    company: "Internswallah Trainings",
    description:
      "Learn Python, machine learning, and data visualization to extract insights from complex datasets.",
    location: "Online",
    duration: "8 Weeks",
    fees: 4499,
    type: "Certificate Course",

    createdAt: new Date("2025-11-28"),
  },
  {
    createdBy: new mongoose.Types.ObjectId("6883aa5a4cf01e582cc60903"),

    title: "Python Programming",
    company: "Internswallah Trainings",
    description:
      "Build a strong foundation in Python programming with hands-on projects and real-world applications.",
    location: "Online",
    duration: "6 Weeks",
    fees: 2999,
    type: "Project Based",

    createdAt: new Date("2025-08-15"),
  },
  {
    createdBy: new mongoose.Types.ObjectId("6883aa5a4cf01e582cc60903"),

    title: "Digital Marketing",
    company: "Internswallah Trainings",
    description:
      "Master SEO, social media marketing, and Google Ads to grow businesses in the digital age.",
    location: "Online",
    duration: "6 Weeks",
    fees: 3499,
    type: "Beginner Friendly",

    createdAt: new Date("2025-12-20"),
  },
  {
    createdBy: new mongoose.Types.ObjectId("6883aa5a4cf01e582cc60903"),

    title: "Android App Development",
    company: "Internswallah Trainings",
    description:
      "Create native Android applications using Java and Kotlin with industry-standard practices.",
    location: "Online",
    duration: "8 Weeks",
    fees: 4499,
    type: "Certificate Course",

    createdAt: new Date("2025-12-18"),
  },

  {
    createdBy: new mongoose.Types.ObjectId("6980e1113564323d74cc7ca7"),

    title: "UI/UX Design",
    company: "Internswallah Trainings",
    description:
      "Design intuitive user interfaces and experiences using Figma, Adobe XD, and design thinking principles.",
    location: "Online",
    duration: "6 Weeks",
    fees: 3799,
    type: "Project Based",

    createdAt: new Date("2024-11-10"),
  },
  {
    createdBy: new mongoose.Types.ObjectId("6980e1113564323d74cc7ca7"),

    title: "Ethical Hacking",
    company: "Internswallah Trainings",
    description:
      "Learn cybersecurity fundamentals and penetration testing to protect systems from security threats.",
    location: "Online",
    duration: "8 Weeks",
    fees: 4999,
    type: "Certificate Course",

    createdAt: new Date("2025-12-25"),
  },
  {
    createdBy: new mongoose.Types.ObjectId("6980e1113564323d74cc7ca7"),

    title: "AutoCAD for Engineers",
    company: "Internswallah Trainings",
    description:
      "Master 2D and 3D technical drawing and design using AutoCAD for engineering applications.",
    location: "Online",
    duration: "6 Weeks",
    fees: 3299,
    type: "Industry Oriented",

    createdAt: new Date("2024-09-05"),
  },
];

export default courses;
