import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Routes
import profileRoutes from './routes/profile.js';
import projectsRoutes from './routes/projects.js';
import certificationsRoutes from './routes/certifications.js';
import trainingRoutes from './routes/training.js';
import achievementsRoutes from './routes/achievements.js';
import imageRoutes from './routes/image.js';

dotenv.config();

const app = express();

// ── Middleware ─────────────────────────────────────────────────────────────────
app.use(cors({
  origin: '*', // Allow all origins in production (Vercel)
  credentials: true,
}));
app.use(express.json());

// ── Routes ─────────────────────────────────────────────────────────────────────
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/certifications', certificationsRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/image', imageRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// ── MongoDB Connection (cached for serverless) ─────────────────────────────────
let isConnected = false;

export async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
  console.log('✅ Connected to MongoDB');
  await seedDatabase();
}

// ── Seed Data ──────────────────────────────────────────────────────────────────
async function seedDatabase() {
  const { default: Profile } = await import('./models/Profile.js');
  const { default: Project } = await import('./models/Project.js');
  const { default: Certification } = await import('./models/Certification.js');
  const { default: Training } = await import('./models/Training.js');
  const { default: Achievement } = await import('./models/Achievement.js');

  const existingProfile = await Profile.findOne();
  if (!existingProfile) {
    await Profile.create({
      name: 'Jaydeep Patil',
      title: 'Full Stack Developer',
      bio: 'Passionate about bridging the gap between elegant user interfaces and robust backend architectures. Always eager to solve complex problems and build impactful digital experiences.',
      photoId: '1qaFlRFlHUpnLSUrQITsS69c9Zf0jddly',
      github: 'https://github.com/jaydeepbpatil12',
      linkedin: 'https://linkedin.com/in/jaydeeppatil2005',
      email: 'jaydeepbpatil12@gmail.com',
      phone: '+91-8830498829',
      resumeLink: 'https://drive.google.com/file/d/1XPOc9P-7Q6IF9hdwl1Tzkqc2uyeo1SJf/view?usp=drive_link',
    });
    console.log('  ✅ Profile seeded');
  }

  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany([
      {
        title: 'InternMatch',
        description: 'Full-stack web application bridging the gap between students and recruiters. Architected secure RESTful APIs and built a dynamic frontend for application tracking.',
        techStack: ['React.js', 'Node.js', 'Express', 'MongoDB'],
        categories: ['Full Stack'],
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
        liveDemo: '#',
        sourceCode: 'https://github.com/jaydeepbpatil12/internmatch',
        featured: false, order: 1,
      },
      {
        title: 'CropSense',
        description: 'Provides personalized crop recommendations using land type and weather data. Includes a smart "Analyze" module with integrated error handling.',
        techStack: ['HTML/CSS/JS', 'PHP', 'MySQL'],
        categories: ['Full Stack'],
        image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
        liveDemo: '#',
        sourceCode: 'https://github.com/jaydeepbpatil12/cropsense-frontend-project',
        featured: false, order: 2,
      },
      {
        title: 'Banking System',
        description: 'Robust banking simulation built with Java Swing. Features modular transaction handling and utilizes Maven for dependency management.',
        techStack: ['Java Core', 'Swing', 'MySQL', 'Maven'],
        categories: ['DevOps'],
        image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=800&q=80',
        liveDemo: '#',
        sourceCode: 'https://github.com/jaydeepbpatil12/bank-management-system-and-atm-simulation-',
        featured: false, order: 3,
      },
    ]);
    console.log('  ✅ Projects seeded');
  }

  const certCount = await Certification.countDocuments();
  if (certCount === 0) {
    await Certification.insertMany([
      { title: 'Cloud Computing', provider: 'NPTEL', date: 'November 2025', description: 'Highlights a strong foundation in cloud architectures, virtualization, and distributed systems, with expertise in managing scalable cloud resources.', imageId: '1CriIn_Hy3H82J-tinvWcMJk9Uc2qNLiU', link: 'https://drive.google.com/file/d/1CriIn_Hy3H82J-tinvWcMJk9Uc2qNLiU/view?usp=drive_link', order: 1 },
      { title: 'Oracle Cloud Infrastructure Generative AI Professional', provider: 'Oracle', date: 'October 2025', description: 'Validates proficiency in designing and deploying Large Language Models (LLMs) and building intelligent applications using OCI Generative AI services.', imageId: '1vfydqZ2WBSjIr5tp0MSGpgYpo_C8rpVw', link: 'https://drive.google.com/file/d/1vfydqZ2WBSjIr5tp0MSGpgYpo_C8rpVw/view?usp=drive_link', order: 2 },
      { title: 'Oracle Cloud Infrastructure DevOps Professional', provider: 'Oracle', date: 'October 2025', description: 'Demonstrates expertise in CI/CD pipelines, Infrastructure as Code (IaC), and automating secure, scalable cloud-native deployments on OCI.', imageId: '1lzd_sO5q28IZ3_tKsmsW2RrW2nAl2o9f', link: 'https://drive.google.com/file/d/1lzd_sO5q28IZ3_tKsmsW2RrW2nAl2o9f/view?usp=drive_link', order: 3 },
      { title: 'Oracle Cloud Infrastructure AI Foundations Associate', provider: 'Oracle', date: 'October 2025', description: 'Demonstrates core knowledge of AI, machine learning, and deep learning principles to support data-driven cloud solutions.', imageId: '1lF3BvYyIRCVexwk_jeSDUbf0ZrWPqvIa', link: 'https://drive.google.com/file/d/1lF3BvYyIRCVexwk_jeSDUbf0ZrWPqvIa/view?usp=drive_link', order: 4 },
      { title: 'Fundamentals of Network Communication', provider: 'Coursera', date: 'September 2024', description: 'Validates essential knowledge of network architectures, including OSI and TCP/IP protocols, required for managing modern cloud communications.', imageId: '1DLKbYiKYUlVjeofTyBnz6fX0jM_0mFYT', link: 'https://drive.google.com/file/d/1DLKbYiKYUlVjeofTyBnz6fX0jM_0mFYT/view?usp=drive_link', order: 5 },
    ]);
    console.log('  ✅ Certifications seeded');
  }

  const trainingCount = await Training.countDocuments();
  if (trainingCount === 0) {
    await Training.create({
      organization: 'CIPHER SCHOOLS', role: 'Data Structures & Algorithms',
      description: ['Completed intensive training on Data Structures & Algorithms (DSA), mastering core concepts including Arrays, Linked Lists, Stacks, and Queues.'],
      techStack: ['DSA', 'OOP', 'Java / C++'],
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      certificateLink: 'https://www.cipherschools.com/certificate/preview?id=688714acca64e035786b29a0',
      order: 1,
    });
    console.log('  ✅ Training seeded');
  }

  const achCount = await Achievement.countDocuments();
  if (achCount === 0) {
    await Achievement.insertMany([
      { title: '250+ Coding Problems Solved', description: 'Sharpened analytical and algorithmic skills across LeetCode, HackerRank, and GeeksforGeeks.', portfolioLink: 'https://codolio.com/profile/jay2005', icon: 'code', order: 1 },
      { title: 'Top 1% Nationally in Krishi Sakhi Hackathon', description: 'Developed an agricultural assistance application for farmers, competing globally against 15,000+ participants.', icon: 'award', order: 2 },
    ]);
    console.log('  ✅ Achievements seeded');
  }
}

export default app;
