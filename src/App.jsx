import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiLinkedin, FiGithub, FiUser, FiCode,
  FiAward, FiFolder, FiTrash2, FiMonitor, FiInfo, FiActivity,
  FiMail, FiPower, FiRotateCcw, FiGlobe
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

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openApp = (app) => {
    if (!openApps.find(a => a.id === app.id)) {
      setOpenApps([...openApps, app]);
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
                      onClick={() => window.open('https://linkedin.com/in/tussharshibukumar', '_blank')}
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
              <h3 className="resume-heading">Certifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "Harvard CS50x / P / AI", provider: "Harvard University" },
                  { title: "Deep Learning Specialization", provider: "DeepLearning.AI" },
                  { title: "Intro to Responsible AI", provider: "Google Cloud" },
                  { title: "Ethical Hacker (Foundational)", provider: "Self-Paced" },
                  { title: "Digital Skills: AI", provider: "Accenture" }
                ].map((cert, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-center border-l-4 border-l-blue-500/50">
                    <h5 className="font-bold text-sm leading-tight text-white/90">{cert.title}</h5>
                    <p className="text-[0.65rem] opacity-40 uppercase tracking-widest mt-1 font-semibold">{cert.provider}</p>
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
                    { l: "Build Version", v: "2026.02.04" },
                    { l: "Environment", v: "React, Framer Motion, Tailwind" },
                    { l: "Developer", v: "Tusshar Shibukumar Harini" }
                  ].map(row => (
                    <div key={row.l} className="system-info-row">
                      <span className="system-info-label">{row.l}:</span>
                      <span className="system-info-value">{row.v}</span>
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
          <div className="flex flex-col items-center justify-center p-20 opacity-20 grayscale">
            <FiTrash2 className="text-[12rem] mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]" />
            <p className="text-2xl font-light tracking-widest uppercase">The Bin is empty</p>
            <p className="text-xs font-mono mt-4 opacity-50">0 Items Deleted</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="desktop-surface" onClick={() => {
      setSelectedIcon(null);
      setIsStartMenuOpen(false);
    }}>
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
        {openApps.map((app, index) => (
          <DetailView
            key={app.id}
            isOpen={true}
            onClose={() => closeApp(app.id)}
            title={app.title}
            icon={app.icon}
            initialX={100 + (index * 30)}
            initialY={100 + (index * 30)}
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
                <div className="start-menu-item" onClick={() => window.open('https://linkedin.com/in/tussharshibukumar', '_blank')}>
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
              <button className="power-button" title="Shut Down"><FiPower style={{ fontSize: '0.9rem', color: '#ff4d4d' }} /></button>
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
              className={`task-button ${focusedAppId === app.id ? 'active' : ''}`}
              onClick={() => setFocusedAppId(app.id)}
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
            <FiLinkedin className="cursor-pointer hover:text-white" onClick={() => window.open('https://linkedin.com/in/tussharshibukumar', '_blank')} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
