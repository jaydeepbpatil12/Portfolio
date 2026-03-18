import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import LightPillar from './LightPillar';
import { Home, About, Skills, Projects, Training, Certification, Achievements, Resume, Contact } from './pages/index.jsx';

const CursorFollower = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 500, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 20);
      mouseY.set(e.clientY - 20);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="cursor-follower"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    />
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();

  // Handle scrolling to hash and top of page smoothly
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  // Handle theme mode globally on the body tag
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  return (
    <div className="portfolio-wrapper">
      {/* Custom Cursor Follower */}
      <CursorFollower />

      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }}>
        <LightPillar
          topColor="#5227FF"
          bottomColor="#FF9FFC"
          intensity={1}
          rotationSpeed={0.8}
          glowAmount={0.002}
          pillarWidth={3}
          pillarHeight={0.4}
          noiseIntensity={0.5}
          pillarRotation={70}
          interactive={false}
          mixBlendMode={isDarkMode ? "screen" : "multiply"}
          className={!isDarkMode ? "light-mode-pillar-filter" : ""}
          quality="medium"
        />
      </div>

      <div className="bg-gradient-mesh"></div>
      <div className="bg-glow float-anim"></div>
      <div className="bg-glow-2 float-anim-reverse"></div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="container nav-content">
          <Link to="/" className="logo">JP.</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/#skills">Skills</Link></li>
              <li><Link to="/#projects">Projects</Link></li>
              <li><Link to="/#training">Training</Link></li>
              <li><Link to="/#certification">Certification</Link></li>
              <li><Link to="/#achievements">Achievements</Link></li>
              <li><Link to="/resume">Resume</Link></li>
              <li><Link to="/#contact">Contact</Link></li>
            </ul>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={
            <div className="portfolio-sections" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <Home />
              <Skills />
              <Projects />
              <Training />
              <Certification />
              <Achievements />
              <Contact />
            </div>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <p>© 2026 Jaydeep Patil. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
