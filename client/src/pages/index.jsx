import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Award, Code2, ChevronDown, Phone, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProfile, getProjects, getCertifications, getTraining, getAchievements, getImageUrl } from '../api.js';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 10 }
  },
};

// ─── Shared loading spinner ────────────────────────────────────────────────────
const Spinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem' }}>
    <div style={{
      width: '48px', height: '48px', border: '4px solid rgba(255,255,255,0.1)',
      borderTop: '4px solid var(--accent-blue)', borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// ─── Home ──────────────────────────────────────────────────────────────────────
export const Home = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then(res => setProfile(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="home" className="hero-section container">
      <div className="hero-layout">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hero-content"
        >
          <motion.h2 variants={itemVariants} className="greeting">
            <span className="wave">👋</span> Hello, I am
          </motion.h2>
          <motion.h1 variants={itemVariants} className="name gradient-text">
            {profile?.name || 'Jaydeep Patil'}
          </motion.h1>
          <motion.p variants={itemVariants} className="title">
            {profile?.title || 'Full Stack Developer'}
          </motion.p>
          <motion.p variants={itemVariants} className="bio">
            {profile?.bio || 'Passionate about bridging the gap between elegant user interfaces and robust backend architectures.'}
          </motion.p>
          <motion.div variants={itemVariants} className="action-buttons">
            <Link to="/projects" className="btn-primary">
              View My Work
            </Link>
            <div className="social-links">
              <a href={profile?.github || 'https://github.com/jaydeepbpatil12'} target="_blank" rel="noreferrer" className="social-icon">
                <Github size={24} />
              </a>
              <a href={profile?.linkedin || 'https://linkedin.com/in/jaydeeppatil2005'} target="_blank" rel="noreferrer" className="social-icon">
                <Linkedin size={24} />
              </a>
              <a href={`mailto:${profile?.email || 'jaydeepbpatil12@gmail.com'}`} className="social-icon">
                <Mail size={24} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
          className="hero-image-container"
        >
          <div className="profile-circle">
            <div className="profile-placeholder"></div>
            {profile?.photoId && (
              <img
                src={getImageUrl(profile.photoId)}
                alt={profile.name}
              />
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="scroll-indicator"
      >
        <a href="#skills"><ChevronDown size={32} className="bounce" /></a>
      </motion.div>
    </section>
  );
};

// ─── About ─────────────────────────────────────────────────────────────────────
export const About = () => (
  <section id="about" className="container" style={{ minHeight: '80vh', paddingTop: '150px' }}>
    <motion.h2
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="section-title"
    >
      About <span className="gradient-text">Me</span>
    </motion.h2>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}
    >
      {/* Left Column: Quick Facts */}
      <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <motion.div variants={itemVariants} className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>Quick Facts</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.6rem', borderRadius: '10px', fontSize: '1.2rem' }}>🎓</div>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Education</p>
                <p style={{ color: 'var(--text-primary)', fontWeight: '500', fontSize: '0.95rem' }}>B.Tech in Computer Science (7th Sem), LPU</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.6rem', borderRadius: '10px', fontSize: '1.2rem' }}>💻</div>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Core Stack</p>
                <p style={{ color: 'var(--text-primary)', fontWeight: '500', fontSize: '0.95rem' }}>MERN (MongoDB, Express, React, Node), Java, C++</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.6rem', borderRadius: '10px', fontSize: '1.2rem' }}>🧠</div>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Interests</p>
                <p style={{ color: 'var(--text-primary)', fontWeight: '500', fontSize: '0.95rem' }}>Full-Stack Development, DevOps, AI Integrations</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.6rem', borderRadius: '10px', fontSize: '1.2rem' }}>🏋️</div>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Hobbies</p>
                <p style={{ color: 'var(--text-primary)', fontWeight: '500', fontSize: '0.95rem' }}>Weightlifting, Travel & Exploration</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Column: Detailed Sections */}
      <div style={{ flex: '2 1 600px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <motion.div variants={itemVariants} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--accent-blue)', fontWeight: '600' }}>The Hook</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.05rem' }}>
              Hi, I'm Jaydeep. I'm a Computer Science Engineering student currently in my 7th semester at Lovely Professional University. I specialize in full-stack development, with a strong focus on building scalable, real-world solutions. Whether I'm designing a database architecture or optimizing algorithms, I love the process of turning complex problems into clean, efficient code.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--accent-blue)', fontWeight: '600' }}>Technical Focus & Journey</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '1rem' }}>
              My technical foundation is built on Java and Data Structures & Algorithms, having solved over 200 coding problems across platforms like LeetCode and HackerRank.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '1rem' }}>
              Currently, I spend most of my time working with the MERN stack. I enjoy building impactful platforms—from 'InternMatch,' a web app connecting students with internships, to smart agriculture solutions like 'CropSense' and 'Krishi Sakhi,' an AI-powered app developed for the Smart India Hackathon.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.05rem' }}>
              I'm also actively expanding my skill set into the world of DevOps and Cloud Computing, continuously exploring how to bridge the gap between development and seamless deployment.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--accent-blue)', fontWeight: '600' }}>Beyond the Code (Non-Tech)</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '1rem' }}>
              When I'm not debugging code or learning a new tech stack, you can usually find me in the gym. I've been dedicated to fitness and strength training for the past couple of years, which keeps me disciplined and energized.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.05rem' }}>
              I also love traveling and exploring new places—recent trips to Kedarnath and Badrinath have been incredible experiences for me. I believe that stepping away from the screen to lift weights or travel helps me bring a fresher, more creative perspective back to my projects.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </section>
);

// ─── Skills (static - no DB needed) ───────────────────────────────────────────
export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const skillsData = {
    "Languages": [
      { name: "C", percentage: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "C++", percentage: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "Java", percentage: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "JavaScript", percentage: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "HTML and CSS", percentage: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" }
    ],
    "Frameworks": [
      { name: "React.js", percentage: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Node.js", percentage: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express", percentage: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" }
    ],
    "Tools/Platforms": [
      { name: "MySQL", percentage: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "MongoDB", percentage: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Postman", percentage: 80, icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
      { name: "Git", percentage: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", percentage: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "VS Code", percentage: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" }
    ],
    "Soft Skills": [
      { name: "Problem-Solving", percentage: 90, icon: "https://cdn-icons-png.flaticon.com/512/8157/8157580.png" },
      { name: "Time Management", percentage: 85, icon: "https://cdn-icons-png.flaticon.com/512/3652/3652191.png" },
      { name: "Adaptability", percentage: 90, icon: "https://cdn-icons-png.flaticon.com/512/2807/2807185.png" }
    ]
  };

  return (
    <section id="skills" className="container">
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="section-title"
      >
        My <span className="gradient-text">Skills</span>
      </motion.h2>

      <div className="skills-tabs">
        {["All", ...Object.keys(skillsData)].map((category) => (
          <button
            key={category}
            className={`skill-tab-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div
        key={activeCategory}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="skills-grid-new"
      >
        {(activeCategory === "All"
          ? Object.entries(skillsData).flatMap(([cat, skills]) => skills.map(s => ({ ...s, category: cat })))
          : skillsData[activeCategory].map(s => ({ ...s, category: activeCategory }))
        ).map((skill, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="glass-card new-skill-card"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="skill-icon-container">
              <img src={skill.icon} alt={skill.name} />
            </div>
            <div className="skill-info">
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-percentage">{skill.percentage}%</span>
              </div>
              <div className="skill-bar-bg">
                <motion.div
                  className="skill-bar-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: true }}
                ></motion.div>
              </div>
              {activeCategory === "All" && (
                <div style={{ marginTop: '10px' }}>
                  <span style={{ fontSize: '0.75rem', opacity: 0.8, background: 'rgba(59, 130, 246, 0.2)', color: 'var(--accent-blue)', padding: '2px 8px', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>{skill.category}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

// ─── Projects ──────────────────────────────────────────────────────────────────
export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All Projects", "Full Stack", "DevOps"];

  useEffect(() => {
    getProjects()
      .then(res => setProjects(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredProjects = activeCategory === "All Projects"
    ? projects
    : projects.filter(p => p.categories?.includes(activeCategory));

  return (
    <section id="projects" className="container" style={{ minHeight: '80vh', paddingTop: '100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="section-title"
          style={{ marginBottom: '1rem' }}
        >
          Featured <span className="gradient-text">Projects</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}
        >
          A showcase of my work spanning web applications, APIs, and responsive interfaces.
        </motion.p>
      </div>

      <div className="skills-tabs" style={{ marginBottom: '3rem', justifyContent: 'center' }}>
        {categories.map((category) => (
          <button
            key={category}
            className={`skill-tab-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? <Spinner /> : (
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="projects-grid-new"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id || index}
              variants={itemVariants}
              className="glass-card new-project-card"
            >
              <div className="project-image-container">
                <img src={project.image} alt={project.title} className="project-image" />
                <a
                  href={project.sourceCode}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    position: 'absolute', top: '1rem',
                    right: project.featured ? '6.5rem' : '1rem',
                    background: 'var(--glass-bg)', backdropFilter: 'blur(4px)',
                    padding: '0.5rem', borderRadius: '50%',
                    color: 'var(--text-primary)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    zIndex: 2, border: '1px solid var(--glass-border)', transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.color = 'var(--accent-blue)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                >
                  <Github size={20} />
                </a>
                {project.featured && <div className="project-featured-badge">Featured</div>}
                <div className="project-categories">
                  {project.categories?.slice(0, 2).map((cat, i) => (
                    <span key={i} className="project-category-pill">{cat}</span>
                  ))}
                </div>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech-stack">
                  {project.techStack?.map((tech, i) => (
                    <span key={i} className="tech-pill">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

// ─── Training ──────────────────────────────────────────────────────────────────
export const Training = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTraining()
      .then(res => setTrainings(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="training" className="container" style={{ minHeight: '80vh', paddingTop: '100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="section-title"
          style={{ marginBottom: '1rem' }}
        >
          My <span className="gradient-text">Training</span>
        </motion.h2>
      </div>

      {loading ? <Spinner /> : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="projects-grid-new"
        >
          {trainings.map((t, index) => (
            <motion.div
              key={t._id || index}
              variants={itemVariants}
              className="glass-card new-project-card"
              style={{ margin: '0 auto', maxWidth: '650px', width: '100%' }}
            >
              <div className="project-image-container" style={{ height: '280px' }}>
                <img src={t.image} alt={`${t.organization} Certificate`} className="project-image" />
              </div>

              <div className="project-content">
                <h3 className="project-title" style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>{t.organization}</h3>
                <p className="project-role" style={{ marginBottom: '1.5rem', color: 'var(--accent-blue)', fontWeight: 500 }}>{t.role}</p>

                <div className="project-description">
                  <ul style={{ paddingLeft: '20px', margin: 0, textAlign: 'left' }}>
                    {t.description?.map((pt, i) => (
                      <li key={i} style={{ marginBottom: '10px' }}>{pt}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-tech-stack" style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
                  {t.techStack?.map((tech, i) => (
                    <span key={i} className="tech-pill">{tech}</span>
                  ))}
                </div>

                <div className="project-actions" style={{ display: 'flex', justifyContent: 'center' }}>
                  <a href={t.certificateLink} target="_blank" rel="noreferrer" className="btn-primary project-btn" style={{ minWidth: '200px' }}>
                    Certificate
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

// ─── Certification ─────────────────────────────────────────────────────────────
export const Certification = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCertifications()
      .then(res => setCerts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const pillColor = (provider) => {
    const p = provider?.toLowerCase();
    if (p?.includes('coursera')) return { background: '#6366f1' };
    if (p?.includes('oracle')) return { background: '#ef4444' };
    return { background: '#3b82f6' };
  };

  return (
    <section id="certification" className="container" style={{ minHeight: '80vh', paddingTop: '100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="section-title"
          style={{ marginBottom: '1rem' }}
        >
          My <span className="gradient-text">Certifications</span>
        </motion.h2>
      </div>

      {loading ? <Spinner /> : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="cert-grid"
        >
          {certs.map((cert, index) => (
            <motion.a
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              key={cert._id || index}
              variants={itemVariants}
              className="cert-card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="cert-image-container">
                {cert.imageId ? (
                  <img
                    src={getImageUrl(cert.imageId)}
                    alt={cert.title}
                    className="cert-image"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>📜</div>
                )}
                <span className="cert-provider-pill" style={pillColor(cert.provider)}>{cert.provider}</span>
              </div>

              <div className="cert-content">
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-description">{cert.description}</p>

                <div className="cert-footer">
                  <span className="cert-footer-provider">{cert.provider}</span>
                  <span className="cert-footer-date">{cert.date}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      )}
    </section>
  );
};

// ─── Achievements ──────────────────────────────────────────────────────────────
export const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAchievements()
      .then(res => setAchievements(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const IconComponent = ({ icon }) => {
    if (icon === 'code') return <Code2 className="accent-icon" />;
    return <Award className="accent-icon" />;
  };

  return (
    <section id="achievements" className="container">
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="section-title"
      >
        Milestones & <span className="gradient-text">Achievements</span>
      </motion.h2>

      {loading ? <Spinner /> : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="achievements-list"
        >
          {achievements.map((ach, index) => (
            <motion.div
              key={ach._id || index}
              variants={itemVariants}
              whileHover={{ x: 10, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              className="glass-card achievement-item"
              style={{ position: 'relative' }}
            >
              {ach.portfolioLink && (
                <motion.a
                  href={ach.portfolioLink}
                  target="_blank"
                  rel="noreferrer"
                  className="tech-pill"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                  style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', padding: '0.4rem 1rem', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-block', fontWeight: '500' }}
                >
                  Coding Portfolio
                </motion.a>
              )}
              <IconComponent icon={ach.icon} />
              <div style={{ paddingRight: ach.portfolioLink ? '140px' : '0' }}>
                <h4>{ach.title}</h4>
                <p>{ach.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

// ─── Resume (static) ───────────────────────────────────────────────────────────
export const Resume = () => {
  const [activeTab, setActiveTab] = useState("Education");

  const tabs = ["Education", "Skills", "Projects", "Extracurricular", "Certificates"];

  const resumeData = {
    Education: [
      {
        tag: "BACHELOR OF TECHNOLOGY",
        title: "Lovely Professional University",
        date: "August 2023 - Present",
        subtitle: "Punjab, India",
        points: ["Bachelor of Technology - Computer Science and Engineering; CGPA: 6.65"]
      },
      {
        tag: "INTERMEDIATE",
        title: "Disha Public School & Junior College",
        date: "April 2022 - March 2023",
        subtitle: "Wai, Maharashtra",
        points: ["Percentage: 60.67%"]
      },
      {
        tag: "MATRICULATION",
        title: "Navin Adarsh Madhyamik School",
        date: "April 2020 - March 2021",
        subtitle: "Pachora, Maharashtra",
        points: ["Percentage: 87.60%"]
      }
    ],
    Skills: [
      {
        tag: "TECHNICAL SKILLS",
        title: "Languages & Frameworks",
        points: [
          "Languages: Java, C/C++, HTML and CSS, JavaScript.",
          "Frameworks: Node.js, React.js, Express.",
        ]
      },
      {
        tag: "TOOLS & OTHERS",
        title: "Tools, Platforms & Soft Skills",
        points: [
          "Tools/Platforms: MySQL, MongoDB, Postman, Git, GitHub, VS Code.",
          "Soft Skills: Problem-Solving, Time Management, Adaptability.",
        ]
      }
    ],
    Projects: [
      {
        tag: "FULL-STACK WEB APPLICATION",
        title: "InternMatch – Student Internship Platform",
        date: "December 2025",
        subtitle: "GitHub",
        points: [
          "Developed a full-stack web application designed to bridge the gap between students seeking opportunities and recruiters posting internships.",
          "Architected a robust RESTful API using Node.js and Express to manage user authentication, student profiles, and internship application workflows.",
          "Designed a responsive and dynamic frontend using React.js, ensuring a seamless user experience for browsing listings and tracking application status.",
          "Tech: React.js, Node.js, Express.js, MongoDB."
        ]
      },
      {
        tag: "DYNAMIC WEB APPLICATION",
        title: "CropSense – Smart Agriculture Advisory Web Platform",
        date: "April 2025",
        subtitle: "GitHub",
        points: [
          "Developed a dynamic web application that provides personalized crop recommendations based on land type, weather, and farmer preferences.",
          "Integrated a smart \"Analyze\" module to guide farmers with optimal soil, weather conditions, cultivation techniques, and pesticide usage, including error handling for incompatible inputs.",
          "Implemented user authentication with MySQL database, allowing farmers to create accounts, log in, and access tailored agricultural reports and modern farming insights.",
          "Tech: HTML, CSS, JavaScript, MySQL, PHP."
        ]
      },
      {
        tag: "JAVA AWT/SWING",
        title: "Banking System",
        date: "December 2025",
        subtitle: "GitHub",
        points: [
          "Developed a robust banking simulation using Java (AWT/Swing), featuring modular code for transaction handling and user management.",
          "Utilized Maven for rigorous dependency management and project configuration, automating the packaging of the application into portable JAR files.",
          "Collaborated on code integrity using Git for version control, ensuring a structured development workflow from staging to production-ready artifacts.",
          "Tech Stack: Java Core, Swing, MySQL, Maven, Git/GitHub."
        ]
      }
    ],
    Extracurricular: [
      {
        tag: "SUMMER TRAINING",
        title: "CIPHER SCHOOLS (Ed-Tech Company)",
        date: "June 2025",
        subtitle: "Certificate",
        points: [
          "Completed intensive training on Data Structures & Algorithms (DSA), mastering core concepts including Arrays, Linked Lists, Stacks, and Queues.",
          "Designed and implemented a \"Mental Health Simulator\", applying Object-Oriented Programming (OOP) principles to model complex patient scenarios and interactive decision trees."
        ]
      },
      {
        tag: "ACHIEVEMENTS",
        title: "200+ Coding Problems Solved",
        subtitle: "Coding Portfolio",
        points: [
          "Solved 200+ coding problems across platforms like LeetCode, HackerRank, and GeeksforGeeks, thereby strengthening analytical problem-solving skills and enhancing algorithmic thinking."
        ]
      },
      {
        tag: "ACHIEVEMENTS",
        title: "Top 1% Nationally in Krishi Sakhi Hackathon",
        subtitle: "National Level",
        points: [
          "Qualified nationally among top 1% teams competing with 15,000+ participants, by developing \"Krishi Sakhi\", a specialized agricultural assistance application for farmers in Kerala."
        ]
      }
    ],
    Certificates: [
      { tag: "NPTEL", title: "Cloud Computing", date: "November 2025", subtitle: "NPTEL", points: [] },
      { tag: "ORACLE", title: "Oracle Cloud Infrastructure DevOps Professional", date: "October 2025", subtitle: "Oracle", points: [] },
      { tag: "ORACLE", title: "Oracle Cloud Infrastructure Generative AI Professional", date: "October 2025", subtitle: "Oracle", points: [] },
      { tag: "ORACLE", title: "Oracle Cloud Infrastructure AI Foundations Associate", date: "October 2025", subtitle: "Oracle", points: [] },
      { tag: "COURSERA", title: "Fundamentals of Network Communication", date: "September 2024", subtitle: "Coursera", points: [] },
    ]
  };

  return (
    <section className="container" style={{ minHeight: '80vh', paddingTop: '150px' }}>
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="section-title"
      >
        My <span className="gradient-text">Resume</span>
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', padding: '1.5rem 0' }}
      >
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <Mail size={16} /> jaydeepbpatil12@gmail.com
        </div>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <Phone size={16} /> +91-8830498829
        </div>
        <a href="https://linkedin.com/in/jaydeeppatil2005" target="_blank" rel="noreferrer" className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
          <Linkedin size={16} /> LinkedIn
        </a>
        <a href="https://github.com/jaydeepbpatil12" target="_blank" rel="noreferrer" className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
          <Github size={16} /> GitHub
        </a>
      </motion.div>

      <div className="skills-tabs" style={{ marginTop: '2.5rem', justifyContent: 'center' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`skill-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '850px', margin: '2rem auto 0' }}
      >
        {resumeData[activeTab].map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="glass-card new-project-card"
            style={{ padding: '2rem', textAlign: 'left', width: '100%', maxWidth: '100%' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <span className="project-category-pill" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', marginBottom: '0.75rem', display: 'inline-block' }}>{item.tag}</span>
                <h3 className="project-title" style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>{item.title}</h3>
                {item.subtitle && <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>{item.subtitle}</p>}
              </div>
              {item.date && (
                <div style={{ color: 'var(--accent-blue)', fontWeight: '600', fontSize: '0.95rem', paddingTop: '0.2rem' }}>
                  {item.date}
                </div>
              )}
            </div>

            {item.points && item.points.length > 0 && (
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', lineHeight: '1.7', fontSize: '0.95rem' }}>
                {item.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </motion.div>

      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <a
          href="https://drive.google.com/file/d/1XPOc9P-7Q6IF9hdwl1Tzkqc2uyeo1SJf/view?usp=drive_link"
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.1rem' }}
        >
          <FileText size={20} /> Download Resume
        </a>
      </div>
    </section>
  );
};

// ─── Contact (static) ──────────────────────────────────────────────────────────
export const Contact = () => {
  const contactInfo = [
    { icon: <Mail size={20} color="var(--text-primary)" />, label: "Email", value: "jaydeepbpatil12@gmail.com", link: "mailto:jaydeepbpatil12@gmail.com" },
    { icon: <Phone size={20} color="var(--text-primary)" />, label: "Phone", value: "+91-8830498829", link: "tel:+918830498829" },
    { icon: <Linkedin size={20} color="var(--text-primary)" />, label: "LinkedIn", value: "linkedin.com/in/jaydeeppatil2005", link: "https://linkedin.com/in/jaydeeppatil2005" },
    { icon: <Github size={20} color="var(--text-primary)" />, label: "GitHub", value: "github.com/jaydeepbpatil12", link: "https://github.com/jaydeepbpatil12" }
  ];

  return (
    <section id="contact" className="container" style={{ paddingBottom: '100px' }}>
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="section-title"
      >
        Get In <span className="gradient-text">Touch</span>
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="glass-card new-project-card"
        style={{ maxWidth: '480px', margin: '0 auto', padding: '2.5rem', textAlign: 'left' }}
      >
        <h3 style={{ fontSize: '1.4rem', marginBottom: '2.2rem', color: 'var(--accent-blue)', fontWeight: '700' }}>Contact Information</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
          {contactInfo.map((info, idx) => (
            <motion.a
              key={idx}
              href={info.link}
              target="_blank"
              rel="noreferrer"
              variants={itemVariants}
              whileHover={{ x: 5 }}
              style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{
                width: '45px', height: '45px', borderRadius: '50%',
                backgroundColor: 'rgba(59, 130, 246, 0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                {info.icon}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{info.label}</span>
                <span style={{ fontSize: '0.95rem', color: '#a5b4fc', wordBreak: 'break-word', fontWeight: 500 }}>{info.value}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
