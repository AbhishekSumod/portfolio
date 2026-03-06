import loanManagementCover from '../assets/loan_managment.jpg'
import movieTicketCover from '../assets/movie_ticketbooking.png'
import qreatCover from '../assets/Qreat.jpg'
import aiTutorCover from '../assets/AI Language Trainer.jpg'

export const skills = [
  // Replace or add your skills here
  { name: 'React', iconKey: 'react' },
  { name: 'MongoDB', iconKey: 'mongodb' },
  { name: 'Java', iconKey: 'java' },
  { name: 'Spring Boot', iconKey: 'springboot' },
  { name: 'JavaScript', iconKey: 'javascript' },
  { name: 'Git', iconKey: 'git' },
  { name: 'Flutter', iconKey: 'flutter' },
  { name: 'Python', iconKey: 'python' },
]

export const projects = [
  // Replace or add your projects here
  {
    id: 1,
    title: 'Loan Management System (LMS)',
    shortDescription:
      'A full-stack application that automates loan applications, KYC verification, and approval workflow for banks.',
    // Replace project details here
    fullDescription:
      'A full-stack web application developed to simplify and automate the loan processing workflow for banks and financial institutions. Users can apply for loans, upload KYC documents, and track application status, while administrators can review, approve, or reject applications. The system includes customer profile verification, KYC validation, document handling, and EMI eligibility checks. Business rules like the 40% income-based EMI rule are enforced to ensure responsible lending. The backend is built with Java and Spring Boot for secure REST APIs and business logic. MongoDB stores customer data, loan details, and document metadata, while uploaded documents are stored in the server filesystem. The frontend is built with React for a responsive and user-friendly interface.',
    keyFeatures: [
      'Loan application workflow with status tracking for users',
      'KYC document upload, validation, and secure handling',
      'Admin review flow to approve or reject applications',
      'EMI eligibility validation using 40% income-based business rule',
      'Customer profile verification and document metadata management',
      'Responsive React frontend with secure Spring Boot REST APIs',
    ],
    techStack: ['React', 'Java', 'Spring Boot', 'MongoDB', 'REST APIs', 'Git'],
    github: 'https://github.com/AbhishekSumod/loan_managment_application',
    coverImage: loanManagementCover,
  },
  {
    id: 2,
    title: 'Movie Ticket Booking System',
    shortDescription:
      'A full-stack web app where users browse movies, book tickets, view bookings, and cancel bookings with live seat management.',
    // Replace project details here
    fullDescription:
      'The Movie Ticket Booking System is a web-based application designed for users to browse movies, book tickets, view their bookings, and cancel bookings while the system automatically manages seat availability. The frontend is built using React (Vite + JSX) with custom CSS and includes Login, Register, Home, Booking Modal, and Your Bookings pages. The backend is built with Spring Boot and exposes REST APIs for auth, movie listing, booking creation, and booking cancellation. Business logic validates seat limits before booking and updates available seats in real time.',
    keyFeatures: [
      'Browse movies in scrollable cards',
      'User login and registration',
      'Ticket booking with seat availability validation',
      'View and cancel user bookings',
      'REST API integration across frontend and backend',
      'Controller, Service, Repository layered architecture',
    ],
    techStack: [
      'React (Vite + JSX)',
      'JavaScript',
      'CSS',
      'Spring Boot',
      'Spring Web MVC',
      'Spring Data JPA',
      'MySQL',
      'REST APIs',
    ],
    github: '#',
    coverImage: movieTicketCover,
  },
  {
    id: 3,
    title: 'QREAT - QR Code Based Food Ordering System',
    shortDescription:
      'A smart restaurant ordering platform where customers scan table QR codes, browse menu items, and place orders instantly.',
    // Replace project details here
    fullDescription:
      'QREAT (QR Code to Eat) is a smart restaurant ordering system that allows customers to scan a QR code placed on a table to access a digital menu and place food orders directly from their mobile devices. The system eliminates traditional waiter-based ordering and improves restaurant efficiency. The application is built with Flutter for a smooth cross-platform mobile interface. The backend is developed using Node.js and Express.js to handle API requests, order processing, and database communication. MongoDB stores menu items, orders, and user-related data, and backend services are deployed on Render for reliable cloud hosting.',
    keyFeatures: [
      'QR code based table access to digital menu',
      'Mobile ordering flow with cart and instant order placement',
      'Real-time order handling for restaurant operations',
      'REST API communication between Flutter app and backend',
      'Cloud deployment of backend services on Render',
    ],
    techStack: ['Flutter', 'Node.js', 'Express.js', 'MongoDB', 'Render', 'REST APIs', 'QR Code System'],
    github: 'https://github.com/AbhishekSumod/QREAT_',
    coverImage: qreatCover,
  },
  {
    id: 4,
    title: 'AI Language Tutor (AI Personalized Learning)',
    shortDescription:
      'An AI-powered language learning platform with conversation practice, personalized paths, and progress tracking.',
    // Replace project details here
    fullDescription:
      'AI Language Tutor is an intelligent web application that helps users learn and practice new languages using artificial intelligence. The platform provides personalized language learning experiences, including AI conversation practice, vocabulary exercises, and progress tracking. It is built using Next.js, React, TypeScript, and Tailwind CSS, and integrates AI capabilities with the Vercel AI SDK to deliver interactive language assistance. Users can choose a language, practice conversations with AI, complete exercises, and track learning progress over time.',
    keyFeatures: [
      'AI conversation practice for real-time speaking and writing improvement',
      'Personalized learning paths based on proficiency level',
      'Interactive vocabulary and grammar exercises',
      'Progress tracking with learning performance insights',
      'Multi-language support',
      'Responsive experience across desktop and mobile',
    ],
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Vercel AI SDK',
      'Next.js API Routes',
    ],
    github: 'https://github.com/AbhishekSumod/Ai_Personalized_Learning',
    coverImage: aiTutorCover,
  },
]
