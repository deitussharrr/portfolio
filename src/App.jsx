import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiLinkedin, FiGithub, FiUser, FiCode,
  FiAward, FiFolder, FiTrash2, FiMonitor, FiInfo, FiActivity,
  FiMail, FiPower, FiRotateCcw, FiGlobe, FiCheckCircle, FiExternalLink
} from 'react-icons/fi';
import DesktopIcon from './components/DesktopIcon';
import Sidebar from './components/Sidebar';
import DetailView from './components/DetailView';
import profileImg from './assets/profile.jpg';
import startOrbImg from './assets/start-orb.png';
import userIcon from './assets/vista-user.png';
import computerIcon from './assets/vista-computer.png';
import docsIcon from './assets/vista-documents.png';
import controlIcon from './assets/vista-control-panel.png';
import historyIcon from './assets/vista-history.png';
import recycleIcon from './assets/vista-recycle-bin.png';

function App() {
  const [openApps, setOpenApps] = useState([]);
  const [focusedAppId, setFocusedAppId] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isBSOD, setIsBSOD] = useState(false);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [buildClicks, setBuildClicks] = useState(0);
  const [shutDownClicks, setShutDownClicks] = useState(0);
  const [binClicks, setBinClicks] = useState(0);
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [selection, setSelection] = useState(null); // { startX, startY, currentX, currentY }
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  const handleMouseDown = (e) => {
    // Only start selection if clicking directly on the desktop surface
    if (e.target.classList.contains('desktop-surface') || e.target.classList.contains('desktop-icons-container')) {
      setSelection({
        startX: e.clientX,
        startY: e.clientY,
        currentX: e.clientX,
        currentY: e.clientY
      });
      setSelectedIcon(null);
      setIsStartMenuOpen(false);
    }
  };

  const handleMouseMove = (e) => {
    if (selection) {
      setSelection(prev => ({
        ...prev,
        currentX: e.clientX,
        currentY: e.clientY
      }));
    }
  };

  const handleMouseUp = () => {
    setSelection(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const pressedKey = e.key.toLowerCase();

      setKonamiIndex(prevIndex => {
        const targetKey = konamiCode[prevIndex].toLowerCase();
        if (pressedKey === targetKey) {
          const nextIndex = prevIndex + 1;
          if (nextIndex === konamiCode.length) {
            setIsMatrixMode(m => !m);
            return 0;
          }
          return nextIndex;
        } else {
          return pressedKey === konamiCode[0].toLowerCase() ? 1 : 0;
        }
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openApp = (app) => {
    const existingApp = openApps.find(a => a.id === app.id);
    if (!existingApp) {
      setOpenApps([...openApps, { ...app, isMinimized: false }]);
    } else if (existingApp.isMinimized) {
      setOpenApps(openApps.map(a =>
        a.id === app.id ? { ...a, isMinimized: false } : a
      ));
    }
    setFocusedAppId(app.id);
    setIsStartMenuOpen(false);
  };

  const closeApp = (id) => {
    const newOpenApps = openApps.filter(app => app.id !== id);
    setOpenApps(newOpenApps);
    if (focusedAppId === id) {
      setFocusedAppId(newOpenApps.length > 0 ? newOpenApps[newOpenApps.length - 1].id : null);
    }
  };

  const minimizeApp = (id) => {
    setOpenApps(openApps.map(app =>
      app.id === id ? { ...app, isMinimized: true } : app
    ));
    setFocusedAppId(null);
  };

  const toggleAppVisibility = (id) => {
    const app = openApps.find(a => a.id === id);
    if (!app) return;

    if (app.isMinimized || focusedAppId !== id) {
      setOpenApps(openApps.map(a =>
        a.id === id ? { ...a, isMinimized: false } : a
      ));
      setFocusedAppId(id);
    } else {
      setOpenApps(openApps.map(app =>
        app.id === id ? { ...app, isMinimized: true } : app
      ));
      setFocusedAppId(null);
    }
  };

  const desktopIcons = [
    { id: 'me', label: 'Tusshar', icon: <img src={userIcon} alt="" className="vista-icon-img" />, title: 'User Profile' },
    { id: 'about', label: 'Computer', icon: <img src={computerIcon} alt="" className="vista-icon-img" />, title: 'System Information' },
    { id: 'experience', label: 'Documents', icon: <img src={docsIcon} alt="" className="vista-icon-img" />, title: 'Work Experience' },
    { id: 'skills', label: 'Control Panel', icon: <img src={controlIcon} alt="" className="vista-icon-img" />, title: 'Technical Arsenal' },
    { id: 'education', label: 'History', icon: <img src={historyIcon} alt="" className="vista-icon-img" />, title: 'Education' },
    { id: 'recycle', label: 'Recycle Bin', icon: <img src={recycleIcon} alt="" className="vista-icon-img" />, title: 'Recycle Bin' },
  ];

  const renderAppContent = (id) => {
    switch (id) {
      case 'me':
        return (
          <div className="space-y-6">
            <header className="flex flex-col md:flex-row gap-8 items-center border-b border-white/10 pb-8 mb-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <img src={profileImg} alt="Profile" className="relative w-32 h-32 rounded-full border-2 border-white/20 object-cover shadow-2xl" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-bold tracking-tight mb-2">Tusshar Shibukumar Harini</h2>
                <p className="text-xl text-blue-300 font-light mb-4 italic">Self-Taught Technologist & Problem Solver</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <a href="mailto:tussharshibukumarharini@gmail.com" className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity">
                    <FiInfo className="text-blue-400" /> tussharshibukumarharini@gmail.com
                  </a>
                  <span className="flex items-center gap-2 text-sm opacity-70">
                    <span className="text-blue-400">📍</span> Chennai, India
                  </span>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <section>
                  <h3 className="resume-heading">Profile</h3>
                  <p className="text-lg leading-relaxed opacity-90 font-light">
                    Prospective Computer Science undergraduate and self-taught technologist with strong interests in software engineering, artificial intelligence, and product design.
                    Founder of independent technology initiatives with hands-on experience in full-stack development, AI-driven systems, technical leadership, and large-scale student event infrastructure.
                  </p>
                </section>

                <section>
                  <h3 className="resume-heading">What I'm Building</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { icon: "⚡", title: "Scalable Systems", desc: "Orchestrating robust digital infrastructures." },
                      { icon: "🎨", title: "Product Design", desc: "Merging functionality with premium aesthetics." }
                    ].map((item, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-2xl mb-2 block">{item.icon}</span>
                        <h4 className="font-bold text-blue-200 mb-1">{item.title}</h4>
                        <p className="text-sm opacity-60 leading-tight">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <section className="resume-section">
                  <h3 className="resume-heading text-lg">Social Links</h3>
                  <div className="space-y-4">
                    <button
                      onClick={() => window.open('https://github.com/deitussharrr', '_blank')}
                      className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group"
                    >
                      <div className="flex items-center gap-3">
                        <FiGithub className="text-xl text-blue-300" />
                        <span className="font-semibold">GitHub</span>
                      </div>
                      <span className="text-xs opacity-40 group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                    <button
                      onClick={() => window.open('https://www.linkedin.com/in/tussharshibukumarharini', '_blank')}
                      className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group"
                    >
                      <div className="flex items-center gap-3">
                        <FiLinkedin className="text-xl text-blue-300" />
                        <span className="font-semibold">LinkedIn</span>
                      </div>
                      <span className="text-xs opacity-40 group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </section>

                <section>
                  <h3 className="resume-heading text-lg"><FiGlobe className="text-blue-400" /> Languages</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { l: "English", v: "Fluent / Professional", p: 95, icon: "🇬🇧", tag: "C2" },
                      { l: "Tamil", v: "Native / Bilingual", p: 100, icon: "🇮🇳", tag: "Native" },
                      { l: "Malayalam", v: "Native / Billingual", p: 100, icon: "🌴", tag: "Native" },
                      { l: "Spanish", v: "Elementary", p: 30, icon: "🇪🇸", tag: "A1" }
                    ].map(lang => (
                      <div key={lang.l} className="resume-section mb-0 p-4 relative group overflow-hidden border-l-2 border-l-blue-500/50">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{lang.icon}</span>
                            <div>
                              <h4 className="font-bold text-sm leading-tight">{lang.l}</h4>
                              <p className="text-[0.65rem] opacity-50 uppercase tracking-tighter">{lang.v}</p>
                            </div>
                          </div>
                          <span className="text-[0.6rem] font-mono bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/20">
                            {lang.tag}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${lang.p}%` }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                            />
                          </div>
                        </div>
                        {/* Glass Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-12">
            <section>
              <h3 className="resume-heading">Experience & Projects</h3>
              <div className="space-y-0">
                <div className="timeline-item">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                    <h4 className="text-xl font-bold">GestureGlide</h4>
                    <span className="text-sm font-mono text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">Nov 2025 — Present</span>
                  </div>
                  <p className="text-lg text-blue-200 font-medium mb-4 italic">Lead Developer</p>
                  <p className="opacity-80 leading-relaxed mb-4">Elevate your desktop experience with GestureGlide. Control your music, videos, and system volume using intuitive hand gestures through your webcam. No buttons, no touch—just pure motion.</p>
                  <div className="flex flex-wrap gap-2">
                    {["Computer Vision", "OpenCV", "Gesture Recognition", "Python"].map(t => <span key={t} className="skill-tag text-[0.7rem]">{t}</span>)}
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                    <h4 className="text-xl font-bold">Nous - The AI Emotional Mirror</h4>
                    <span className="text-sm font-mono text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">Mar 2025 — Present</span>
                  </div>
                  <p className="text-lg text-blue-200 font-medium mb-4 italic">Founder & Developer</p>
                  <p className="opacity-80 leading-relaxed mb-4">Nous is an AI-powered emotional mirror that helps you reflect on your feelings, understand your mental state, and track emotional patterns through intelligent journaling and visualization.</p>
                  <div className="flex flex-wrap gap-2">
                    {["Sentiment Analysis", "Generative AI", "NLP", "React", "Python"].map(t => <span key={t} className="skill-tag text-[0.7rem]">{t}</span>)}
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                    <h4 className="text-xl font-bold">Stegone</h4>
                    <span className="text-sm font-mono text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">Oct 2025 — Feb 2026</span>
                  </div>
                  <p className="text-lg text-blue-200 font-medium mb-4 italic">Developer</p>
                  <p className="opacity-80 leading-relaxed mb-4">Stegone is a secure steganography tool that hides secret messages inside images using advanced cryptographic techniques.</p>
                  <div className="flex flex-wrap gap-2">
                    {["Steganography", "Cryptography", "Public Key Cryptography"].map(t => <span key={t} className="skill-tag text-[0.7rem]">{t}</span>)}
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                    <h4 className="text-xl font-bold">Politicon '25</h4>
                    <span className="text-sm font-mono text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">2025</span>
                  </div>
                  <p className="text-lg text-blue-200 font-medium mb-4 italic">USG Technology & Web Developer</p>
                  <ul className="space-y-3 opacity-80 text-base leading-relaxed mb-6">
                    <li className="flex gap-3"><span className="text-blue-400">•</span> Led technical infrastructure and digital systems for a major school-led conference.</li>
                  </ul>
                </div>

                <div className="timeline-item">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                    <h4 className="text-xl font-bold">Astraeus — Media</h4>
                    <span className="text-sm font-mono text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">2025</span>
                  </div>
                  <p className="text-lg text-blue-200 font-medium mb-4 italic">Founder</p>
                  <p className="opacity-80 leading-relaxed mb-4">Founded a student-led creative and technology-focused initiative for startups and academic institutions.</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="resume-heading">Volunteer Work</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="resume-section mb-0">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-bold">Imperium Ventures</h4>
                    <span className="text-xs opacity-50 font-mono">2025</span>
                  </div>
                  <p className="text-blue-300 text-sm mb-3">USG Sponsorships</p>
                  <p className="text-xs opacity-60">Coordinating with sponsors and managing event logistics for partnership outreach.</p>
                </div>
                <div className="resume-section mb-0">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-bold">Mind4Youth</h4>
                    <span className="text-xs opacity-50 font-mono">2024</span>
                  </div>
                  <p className="text-blue-300 text-sm mb-3">Volunteer</p>
                  <p className="text-xs opacity-60">Supported initiatives focusing on youth-centric mental health awareness campaigns.</p>
                </div>
              </div>
            </section>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-12">
            <section>
              <h3 className="resume-heading">Technical Arsenal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Programming & Web",
                    skills: ["Python", "JavaScript", "React", "Next.js", "Node.js", "Vite", "Tailwind CSS"],
                    icon: <FiCode className="text-blue-400" />
                  },
                  {
                    title: "AI / Machine Learning",
                    skills: ["NLP", "TensorFlow", "Large Language Models", "Generative AI", "Sentiment Analysis"],
                    icon: <FiActivity className="text-cyan-400" />
                  },
                  {
                    title: "Databases & DevOps",
                    skills: ["SQL", "MySQL", "MongoDB", "Firebase", "Git", "Vercel", "Linux"],
                    icon: <FiMonitor className="text-blue-300" />
                  },
                  {
                    title: "Cyber & Specialized",
                    skills: ["Ethical Hacking", "Internet of Things", "UI/UX Design", "Public Speaking", "Strategic Planning"],
                    icon: <FiInfo className="text-purple-400" />
                  }
                ].map((group, i) => (
                  <div key={i} className="resume-section mb-0 flex flex-col h-full">
                    <h4 className="flex items-center gap-3 font-bold text-lg mb-6 border-b border-white/5 pb-3">
                      {group.icon} {group.title}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map(s => <span key={s} className="skill-tag">{s}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="resume-heading"><FiAward className="text-yellow-400" /> Professional Certifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Harvard CS50x / P / AI", provider: "Harvard University", date: "2024", id: "CS50-Verified" },
                  { title: "Deep Learning Specialization", provider: "DeepLearning.AI", date: "2024", id: "DL-SPECIAL" },
                  { title: "Intro to Responsible AI", provider: "Google Cloud", date: "2023", id: "GC-AI-900" },
                  { title: "Ethical Hacker (Foundational)", provider: "Self-Paced / CompTIA", date: "2024", id: "EH-FOUND" },
                  { title: "Digital Skills: AI", provider: "Accenture", date: "2024", id: "ACC-AI-2024" }
                ].map((cert, i) => (
                  <div key={i} className="group relative overflow-hidden p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 border-l-4 border-l-yellow-500/50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="font-bold text-base leading-tight text-white mb-1 group-hover:text-yellow-400 transition-colors">{cert.title}</h5>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[0.65rem] opacity-50 uppercase tracking-widest font-semibold">{cert.provider}</span>
                          <span className="w-1 h-1 rounded-full bg-white/20"></span>
                          <span className="text-[0.65rem] opacity-50 font-mono tracking-tighter text-blue-300">{cert.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-[0.6rem] font-mono bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/20">
                            <FiCheckCircle className="text-[0.7rem]" /> VERIFIED
                          </span>
                          <span className="text-[0.55rem] font-mono opacity-30 uppercase">ID: {cert.id}</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 opacity-60 group-hover:opacity-100 group-hover:rotate-12 transition-all">
                        <FiAward className="text-2xl" />
                      </div>
                    </div>
                    {/* Subtle Holographic Effect */}
                    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-yellow-400/5 rounded-full blur-2xl group-hover:bg-yellow-400/10 transition-all pointer-events-none" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-8">
            <h3 className="resume-heading">Academic Journey</h3>
            <div className="space-y-6">
              <div className="resume-section border-l-4 border-l-blue-500/80">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
                  <div>
                    <h4 className="text-2xl font-bold">The Schram Academy</h4>
                    <p className="text-blue-300 font-medium">Chennai, India</p>
                  </div>
                  <div className="bg-blue-500/20 px-4 py-2 rounded-xl text-center md:text-right mt-4 md:mt-0">
                    <p className="text-xs opacity-50 uppercase font-mono tracking-widest">Class XII (CBSE)</p>
                    <p className="text-xl font-bold text-blue-400">Predicted Score: 83%</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="system-info-row">
                    <span className="system-info-label font-mono"><FiActivity className="inline mr-2" />Timeline</span>
                    <span className="system-info-value">2024 — 2026</span>
                  </div>
                  <div className="system-info-row">
                    <span className="system-info-label font-mono"><FiAward className="inline mr-2" />Relevant Subjects</span>
                    <span className="system-info-value">Physics, Chemistry, Mathematics, Computer Science, Mass Media Studies</span>
                  </div>
                </div>
              </div>

              <div className="resume-section border-l-4 border-l-blue-500/40 opacity-80">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
                  <div>
                    <h4 className="text-xl font-bold">The Schram Academy</h4>
                    <p className="text-blue-300/80 font-medium">Class X (CBSE)</p>
                  </div>
                  <div className="bg-blue-500/10 px-4 py-2 rounded-xl text-center md:text-right mt-4 md:mt-0">
                    <p className="text-xs opacity-50 uppercase font-mono tracking-widest">Graduated</p>
                    <p className="text-lg font-bold text-blue-400/80">Score: 80.6%</p>
                  </div>
                </div>
                <div className="system-info-row border-none">
                  <span className="system-info-label font-mono">Period</span>
                  <span className="system-info-value">2022 — 2024</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-8">
            <section className="flex items-center gap-10 p-10 bg-gradient-to-br from-blue-900/30 to-black/30 rounded-3xl border border-white/10 shadow-inner">
              <FiMonitor className="text-9xl text-blue-400/50 drop-shadow-[0_0_20px_rgba(78,168,222,0.3)]" />
              <div>
                <h2 className="text-5xl font-black tracking-tighter mb-2 italic">AERO VERSION 6.0</h2>
                <p className="text-xl text-blue-300 opacity-60 font-light tracking-widest uppercase">Tusshar Desktop OS Portfolio Edition</p>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="resume-section">
                <h4 className="resume-heading text-lg">System Info</h4>
                <div className="space-y-1">
                  {[
                    { l: "Operating System", v: "Windows Vista Portfolio v1.0" },
                    {
                      l: "Build Version",
                      v: buildClicks >= 5 ? "DEV_MODE_ENABLED_777" : "2026.02.04",
                      onClick: () => {
                        setBuildClicks(c => c + 1);
                        if (buildClicks === 4) alert("Developer Mode Unlocked! Try the Konami Code on your keyboard...");
                      }
                    },
                    { l: "Environment", v: "React, Framer Motion, Tailwind" },
                    { l: "Developer", v: "Tusshar Shibukumar Harini" }
                  ].map(row => (
                    <div
                      key={row.l}
                      className={`system-info-row ${row.onClick ? 'cursor-help' : ''}`}
                      onClick={row.onClick}
                    >
                      <span className="system-info-label">{row.l}:</span>
                      <span className={`system-info-value ${row.l === "Build Version" && buildClicks >= 5 ? 'text-green-400 font-mono animate-pulse' : ''}`}>{row.v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="resume-section">
                <h4 className="resume-heading text-lg">Status</h4>
                <p className="text-sm opacity-60 leading-relaxed italic">
                  "Building highly functional, aesthetically pleasing digital systems that empower users through elegant AI integration and human-centric design."
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-2 flex-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[88%] bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                  </div>
                  <span className="text-[0.6rem] font-mono opacity-40 uppercase tracking-tighter">Capacity Loaded</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'recycle':
        return (
          <div className="flex flex-col items-center justify-center h-full p-20">
            <motion.div
              className={`flex flex-col items-center transition-all ${binClicks >= 5 ? 'opacity-100 grayscale-0 scale-110' : 'opacity-20 grayscale'}`}
              onClick={() => setBinClicks(c => c + 1)}
              whileTap={{ scale: 0.9 }}
            >
              <FiTrash2 className="text-[12rem] mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-pointer" />
              <p className="text-2xl font-light tracking-widest uppercase">
                {binClicks >= 5 ? "DISK CLEANUP IN PROGRESS" : "The Bin is empty"}
              </p>
              {binClicks >= 5 && (
                <div className="w-64 h-2 bg-white/10 rounded-full mt-6 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)]"
                  />
                </div>
              )}
              <p className="text-xs font-mono mt-4 opacity-50">
                {binClicks >= 5 ? "Deleting system cache... (just kidding)" : `0 Items Deleted (Clicks: ${binClicks}/5)`}
              </p>
            </motion.div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`desktop-wrapper ${isMatrixMode ? 'matrix-mode' : ''}`}>
      {isBSOD && (
        <div className="bsod-container" onClick={() => {
          setIsBSOD(false);
          setShutDownClicks(0);
          window.location.reload();
        }}>
          <div className="bsod-content">
            <div className="bsod-title">VISTA_SYSTEM_FAILURE</div>
            <p>A problem has been detected and Windows has been shut down to prevent damage to your computer.</p>
            <br />
            <p>The problem seems to be caused by the following file: PORTFOLIO.SYS</p>
            <br />
            <p>If this is the first time you've seen this Stop error screen, restart your computer. If this screen appears again, follow these steps:</p>
            <br />
            <p>Check to make sure any new hardware or software is properly installed. If this is a new installation, ask your hardware or software manufacturer for any Windows updates you might need.</p>
            <br />
            <p>Technical Information:</p>
            <br />
            <p>*** STOP: 0x000000ED (0x80F128D0, 0xc000009c, 0x00000000, 0x00000000)</p>
            <br />
            <p>Click anywhere to restart...</p>
          </div>
        </div>
      )}

      <div
        className="desktop-surface"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {selection && (
          <div
            className="selection-marquee"
            style={{
              left: Math.min(selection.startX, selection.currentX),
              top: Math.min(selection.startY, selection.currentY),
              width: Math.abs(selection.currentX - selection.startX),
              height: Math.abs(selection.currentY - selection.startY)
            }}
          />
        )}
        <div className="desktop-icons-container">
          {desktopIcons.map(icon => (
            <DesktopIcon
              key={icon.id}
              {...icon}
              isSelected={selectedIcon === icon.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIcon(icon.id);
                setIsStartMenuOpen(false);
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                openApp(icon);
              }}
            />
          ))}
        </div>

        <Sidebar />

        {/* Render Multiple Windows */}
        <AnimatePresence>
          {openApps.filter(app => !app.isMinimized).map((app, index) => (
            <DetailView
              key={app.id}
              isOpen={true}
              onClose={() => closeApp(app.id)}
              onMinimize={() => minimizeApp(app.id)}
              title={app.title}
              icon={app.icon}
              initialX={window.innerWidth < 768 ? 5 + (index * 5) : 100 + (index * 30)}
              initialY={window.innerWidth < 768 ? 5 + (index * 5) : 100 + (index * 30)}
              isFocused={focusedAppId === app.id}
              onFocus={() => {
                setFocusedAppId(app.id);
                setIsStartMenuOpen(false);
              }}
            >
              {renderAppContent(app.id)}
            </DetailView>
          ))}
        </AnimatePresence>

        {/* Start Menu */}
        <AnimatePresence>
          {isStartMenuOpen && (
            <motion.div
              className="start-menu"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="start-menu-main">
                <div className="start-menu-left">
                  {desktopIcons.slice(0, 5).map(app => (
                    <div key={app.id} className="start-menu-item" onClick={() => openApp(app)}>
                      <div className="start-menu-item-icon">{app.icon}</div>
                      <span className="start-menu-item-label">{app.label}</span>
                    </div>
                  ))}
                  <div className="start-menu-separator" />
                  <div className="start-menu-item" onClick={() => window.open('https://github.com/deitussharrr', '_blank')}>
                    <div className="start-menu-item-icon"><FiGithub /></div>
                    <span className="start-menu-item-label">All Programs</span>
                  </div>
                </div>
                <div className="start-menu-right">
                  <div className="start-menu-item" onClick={() => openApp(desktopIcons[0])}>
                    <div className="start-menu-item-icon">{desktopIcons[0].icon}</div>
                    <span className="start-menu-item-label">Tusshar</span>
                  </div>
                  <div className="start-menu-item" onClick={() => openApp(desktopIcons[2])}>
                    <div className="start-menu-item-icon">{desktopIcons[2].icon}</div>
                    <span className="start-menu-item-label">Documents</span>
                  </div>
                  <div className="start-menu-separator" />
                  <div className="start-menu-item" onClick={() => window.location.href = 'mailto:tussharshibukumarharini@gmail.com'}>
                    <div className="start-menu-item-icon"><FiMail className="text-blue-300" /></div>
                    <span className="start-menu-item-label">Email Me</span>
                  </div>
                  <div className="start-menu-item" onClick={() => window.open('https://www.linkedin.com/in/tussharshibukumarharini', '_blank')}>
                    <div className="start-menu-item-icon"><FiLinkedin className="text-blue-300" /></div>
                    <span className="start-menu-item-label">LinkedIn</span>
                  </div>
                  <div className="start-menu-item" onClick={() => window.open('https://github.com/deitussharrr', '_blank')}>
                    <div className="start-menu-item-icon"><FiGithub className="text-blue-300" /></div>
                    <span className="start-menu-item-label">GitHub</span>
                  </div>
                  <div className="start-menu-separator" />
                  <div className="start-menu-item" onClick={() => openApp(desktopIcons[3])}>
                    <div className="start-menu-item-icon">{desktopIcons[3].icon}</div>
                    <span className="start-menu-item-label">Control Panel</span>
                  </div>
                  <div className="start-menu-item" onClick={() => openApp(desktopIcons[1])}>
                    <div className="start-menu-item-icon">{desktopIcons[1].icon}</div>
                    <span className="start-menu-item-label">Computer</span>
                  </div>
                </div>
              </div>
              <div className="start-menu-footer">
                <button className="power-button" title="Lock"><FiRotateCcw style={{ fontSize: '0.8rem' }} /></button>
                <button
                  className="power-button"
                  title="Shut Down"
                  onClick={() => {
                    setShutDownClicks(prev => prev + 1);
                    if (shutDownClicks >= 2) {
                      setIsBSOD(true);
                    } else {
                      alert("System shutdown blocked. Please save your work first.");
                    }
                  }}
                >
                  <FiPower style={{ fontSize: '0.9rem', color: '#ff4d4d' }} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="vista-taskbar">
          <motion.div
            className="start-orb"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsStartMenuOpen(!isStartMenuOpen);
            }}
          >
            <img src={startOrbImg} alt="Start" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </motion.div>

          <div className="taskbar-items">
            {openApps.map(app => (
              <div
                key={app.id}
                className={`task-button ${focusedAppId === app.id && !app.isMinimized ? 'active' : ''}`}
                onClick={() => toggleAppVisibility(app.id)}
              >
                <span className="text-lg">{app.icon}</span>
                <span className="truncate max-w-[100px]">{app.label}</span>
              </div>
            ))}
            {openApps.length === 0 && (
              <div className="task-button" onClick={() => openApp(desktopIcons[2])}>
                <FiFolder />
                <span>Documents</span>
              </div>
            )}
          </div>

          <div className="system-tray">
            <div className="flex flex-col items-end">
              <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <span className="text-[0.6rem] opacity-60">
                {currentTime.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <div className="flex gap-2 text-lg opacity-80">
              <FiGithub className="cursor-pointer hover:text-white" onClick={() => window.open('https://github.com/deitussharrr', '_blank')} />
              <FiLinkedin className="cursor-pointer hover:text-white" onClick={() => window.open('https://www.linkedin.com/in/tussharshibukumarharini', '_blank')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
