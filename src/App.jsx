import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiLinkedin, FiGithub, FiUser, FiCode,
  FiAward, FiFolder, FiTrash2, FiMonitor, FiInfo
} from 'react-icons/fi';
import DesktopIcon from './components/DesktopIcon';
import Sidebar from './components/Sidebar';
import DetailView from './components/DetailView';
import profileImg from './assets/profile.jpg';

function App() {
  const [openApps, setOpenApps] = useState([]);
  const [focusedAppId, setFocusedAppId] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedIcon, setSelectedIcon] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openApp = (app) => {
    if (!openApps.find(a => a.id === app.id)) {
      setOpenApps([...openApps, app]);
    }
    setFocusedAppId(app.id);
  };

  const closeApp = (id) => {
    const newOpenApps = openApps.filter(app => app.id !== id);
    setOpenApps(newOpenApps);
    if (focusedAppId === id) {
      setFocusedAppId(newOpenApps.length > 0 ? newOpenApps[newOpenApps.length - 1].id : null);
    }
  };

  const desktopIcons = [
    { id: 'me', label: 'Tusshar', icon: <FiUser className="text-blue-400" />, title: 'User Profile' },
    { id: 'about', label: 'Computer', icon: <FiMonitor className="text-blue-200" />, title: 'System Information' },
    { id: 'experience', label: 'Documents', icon: <FiFolder className="text-yellow-400" />, title: 'Work Experience' },
    { id: 'skills', label: 'Control Panel', icon: <FiCode className="text-gray-400" />, title: 'Technical Arsenal' },
    { id: 'education', label: 'History', icon: <FiAward className="text-purple-400" />, title: 'Education' },
    { id: 'recycle', label: 'Recycle Bin', icon: <FiTrash2 className="text-gray-400" />, title: 'Recycle Bin' },
  ];

  const renderAppContent = (id) => {
    switch (id) {
      case 'me':
        return (
          <div className="space-y-10">
            <section className="bg-white/5 p-8 rounded-xl border border-white/10">
              <h2 className="text-3xl font-light mb-4 text-blue-300">Profile</h2>
              <p className="text-lg opacity-90 leading-relaxed">
                Prospective Computer Science undergraduate and self-taught technologist with strong interests in software engineering, artificial intelligence, and product design.
                Founder of independent technology initiatives with hands-on experience in full-stack development, AI-driven systems, technical leadership, and large-scale student event infrastructure.
              </p>
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-blue-400">🌍</span> Languages
                </h3>
                <ul className="space-y-2 opacity-80">
                  <li>• English (Fluent)</li>
                  <li>• Tamil (Native)</li>
                  <li>• Malayalam (Native)</li>
                  <li>• Spanish (Elementary)</li>
                </ul>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center">
                <img src={profileImg} alt="Profile" className="w-24 h-24 rounded-full border-2 border-white/20 mb-4 object-cover shadow-xl" />
                <h3 className="text-lg font-bold">Tusshar Shibukumar Harini</h3>
                <p className="text-sm opacity-60">Chennai, India</p>
                <div className="flex gap-4 mt-4">
                  <FiGithub className="cursor-pointer hover:text-blue-400 text-xl" onClick={() => window.open('https://github.com/deitussharrr', '_blank')} />
                  <FiLinkedin className="cursor-pointer hover:text-blue-400 text-xl" onClick={() => window.open('https://linkedin.com/in/tussharshibukumar', '_blank')} />
                </div>
              </div>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="space-y-8">
            <div className="flex items-center gap-6 mb-6">
              <FiMonitor className="text-6xl text-blue-300" />
              <div>
                <h2 className="text-3xl font-light">System Properties</h2>
                <p className="opacity-60 text-sm">Portfolio OS v1.0 • Vista Aero</p>
              </div>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
                <FiInfo /> Summary
              </h3>
              <p className="opacity-80 leading-relaxed">
                Self-taught technologist focused on creating scalable, ethical, and impact-driven technology solutions.
                Experience ranges from full-stack development to orchestrating technical infrastructure for major conferences.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="opacity-50">Email</span>
                  <span className="text-blue-400">tussharshibukumarharini@gmail.com</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="opacity-50">Location</span>
                  <span>Chennai, India</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'experience':
        return (
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-blue-300">Projects & Leadership</h2>
              <div className="space-y-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">Nous</h3>
                    <span className="text-sm opacity-50">2024 — Present</span>
                  </div>
                  <p className="text-blue-400 text-sm mb-4 font-semibold uppercase tracking-wider text-[0.7rem]">Founder & Developer</p>
                  <ul className="space-y-2 text-sm opacity-80">
                    <li>• Built an AI-powered emotion journaling web application</li>
                    <li>• Implemented NLP-based emotion scoring and trend visualization</li>
                    <li>• Designed privacy-first architecture with ethical AI considerations</li>
                  </ul>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">Politicon '25</h3>
                    <span className="text-sm opacity-50">2025</span>
                  </div>
                  <p className="text-blue-400 text-sm mb-4 font-semibold uppercase tracking-wider text-[0.7rem]">USG Technology & Web Developer</p>
                  <ul className="space-y-2 text-sm opacity-80">
                    <li>• Led technical infrastructure and digital systems for the conference</li>
                    <li>• Designed and deployed the official conference website</li>
                    <li>• Moderated international policy debates as ECOSOC Chairperson</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6 text-blue-300">Volunteer Experience</h2>
              <div className="space-y-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">Imperium Ventures</h3>
                    <span className="text-sm opacity-50">2025</span>
                  </div>
                  <p className="text-blue-400 text-sm mb-2 font-semibold uppercase tracking-wider text-[0.7rem]">USG Sponsorships</p>
                  <p className="text-sm opacity-70">Assisted with partnership outreach, sponsor coordination, and event logistics.</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-blue-300">Technical Arsenal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Programming & Web", skills: ["Python", "JavaScript", "React", "Next.js", "Vite"] },
                { title: "Databases & Tools", skills: ["SQL", "MySQL", "MongoDB", "Firebase", "Git", "Vercel"] },
                { title: "AI / Machine Learning", skills: ["NLP", "TensorFlow", "LLMs", "Generative AI"] },
                { title: "Specialized", skills: ["Ethical Hacking", "Cybersecurity", "IoT", "UX Thinking"] }
              ].map((group, i) => (
                <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h3 className="text-lg font-bold mb-4 text-white opacity-90">{group.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map(s => (
                      <span key={s} className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-xs border border-blue-500/20">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'education':
        return (
          <div className="space-y-10">
            <h2 className="text-2xl font-bold text-blue-300">Education</h2>
            <div className="bg-white/5 p-8 rounded-xl border border-white/10 space-y-10">
              <div>
                <h3 className="text-xl font-bold">The Schram Academy</h3>
                <p className="text-blue-300 mb-2">Class XII (CBSE)</p>
                <div className="flex justify-between text-sm opacity-60">
                  <span>2024 — 2026</span>
                  <span>Predicted: 83%</span>
                </div>
              </div>
              <div className="pt-6 border-t border-white/10">
                <h3 className="text-xl font-bold">The Schram Academy</h3>
                <p className="text-blue-300 mb-2">Class X (CBSE)</p>
                <div className="flex justify-between text-sm opacity-60">
                  <span>2022 — 2024</span>
                  <span>Score: 80.6%</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'recycle':
        return (
          <div className="flex flex-col items-center justify-center p-20 opacity-30 grayscale">
            <FiTrash2 className="text-9xl mb-6" />
            <p className="text-xl font-bold">Recycle Bin</p>
            <p className="text-sm opacity-60 mt-2">The folder is empty</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="desktop-surface" onClick={() => setSelectedIcon(null)}>
      <Sidebar />

      <div className="desktop-icons-container">
        {desktopIcons.map(icon => (
          <DesktopIcon
            key={icon.id}
            {...icon}
            isSelected={selectedIcon === icon.id}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIcon(icon.id);
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              openApp(icon);
            }}
          />
        ))}
      </div>

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
            onFocus={() => setFocusedAppId(app.id)}
          >
            {renderAppContent(app.id)}
          </DetailView>
        ))}
      </AnimatePresence>

      <div className="vista-taskbar">
        <motion.div className="start-orb" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <div style={{ fontSize: '1.4rem', color: 'white', textShadow: '0 0 10px white' }}>⊞</div>
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
