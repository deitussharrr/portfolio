import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMail, FiLinkedin, FiGithub, FiUser, FiCode,
  FiAward, FiFolder, FiTrash2, FiMonitor, FiInfo
} from 'react-icons/fi';
import DesktopIcon from './components/DesktopIcon';
import Sidebar from './components/Sidebar';
import DetailView from './components/DetailView';
import profileImg from './assets/profile.jpg';

function App() {
  const [activeApp, setActiveApp] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedIcon, setSelectedIcon] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const closeApp = () => setActiveApp(null);

  const desktopIcons = [
    { id: 'me', label: 'Tusshar', icon: <FiUser className="text-blue-400" />, title: 'User Profile' },
    { id: 'about', label: 'Computer', icon: <FiMonitor className="text-blue-200" />, title: 'System Information' },
    { id: 'experience', label: 'Documents', icon: <FiFolder className="text-yellow-400" />, title: 'Work Experience' },
    { id: 'skills', label: 'Control Panel', icon: <FiCode className="text-gray-400" />, title: 'Technical Arsenal' },
    { id: 'education', label: 'History', icon: <FiAward className="text-purple-400" />, title: 'Education' },
    { id: 'recycle', label: 'Recycle Bin', icon: <FiTrash2 className="text-gray-400" />, title: 'Recycle Bin' },
  ];

  const renderAppContent = () => {
    switch (activeApp?.id) {
      case 'me':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <section className="bg-white/5 p-10 rounded-2xl border border-white/10">
                <h2 className="text-4xl font-light mb-6">Tusshar Shibukumar Harini</h2>
                <p className="text-xl opacity-80 leading-relaxed">
                  I'm a technology advocate and builder focused on the intersection of **AI Architecture** and **Human-Centric Design**.
                </p>
              </section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "AI Orchestration", desc: "Building scalable pipelines with LLMs.", icon: "🤖" },
                  { title: "Product Strategy", desc: "Defining vision for startups.", icon: "📈" }
                ].map((focus, i) => (
                  <div key={i} className="bg-white/5 p-8 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="text-3xl mb-4">{focus.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{focus.title}</h3>
                    <p className="opacity-60 text-sm">{focus.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex flex-col items-center p-10 bg-white/5 rounded-2xl text-center border border-white/10">
                <img src={profileImg} alt="Profile" className="w-48 h-48 rounded-full border-4 border-white/20 mb-6 object-cover" />
                <h3 className="text-2xl font-bold">Tusshar Shibukumar</h3>
                <p className="opacity-80 mt-2">Chennai, India</p>
                <button
                  onClick={() => window.location.href = 'mailto:tussharshibukumarharini@gmail.com'}
                  className="mt-8 px-8 py-3 bg-blue-600/50 hover:bg-blue-600 text-white rounded border border-white/20 transition-all"
                >
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="p-10 space-y-8">
            <div className="flex items-center gap-6 mb-10">
              <FiMonitor className="text-6xl text-blue-300" />
              <div>
                <h2 className="text-4xl font-light">System Properties</h2>
                <p className="opacity-60">Windows Vista™ Portfolio Edition</p>
              </div>
            </div>
            <div className="bg-white/5 p-8 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-2">Computer Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="opacity-60">Developer</span>
                  <span>Tusshar Shibukumar</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">Experience Level</span>
                  <span>Intermediate / Architect</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">Memory</span>
                  <span>Infinite Learning Capacity</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'experience':
        return (
          <div className="space-y-8 p-10">
            {[
              { role: "Tech Lead", org: "Politicon '25", period: "2024 - Present", desc: "Architecting conference systems." },
              { role: "Founder", org: "Nous", period: "2023 - Present", desc: "AI sentiment journaling platform." }
            ].map((exp, idx) => (
              <div key={idx} className="bg-white/5 p-8 rounded-xl border border-white/10">
                <h3 className="text-2xl font-bold">{exp.role}</h3>
                <p className="text-xl text-blue-400">{exp.org}</p>
                <p className="opacity-60 font-mono text-sm">{exp.period}</p>
                <p className="mt-4 opacity-80">{exp.desc}</p>
              </div>
            ))}
          </div>
        );
      case 'recycle':
        return (
          <div className="flex flex-col items-center justify-center h-full p-20 opacity-40">
            <FiTrash2 className="text-9xl mb-6" />
            <p className="text-2xl">Recycle Bin is empty.</p>
          </div>
        );
      default:
        return <div className="p-20 text-center opacity-40">Application Content Missing</div>;
    }
  };

  return (
    <div className="desktop-surface" onClick={() => setSelectedIcon(null)}>
      {/* Sidebar Gadgets */}
      <Sidebar />

      {/* Main Desktop Grid */}
      <div className="desktop-icons-container">
        {desktopIcons.map(icon => (
          <DesktopIcon
            key={icon.id}
            {...icon}
            isSelected={selectedIcon === icon.id}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIcon(icon.id);
              setActiveApp(icon);
            }}
            onDoubleClick={() => setActiveApp(icon)}
          />
        ))}
      </div>

      {/* Application Window */}
      <DetailView
        isOpen={!!activeApp}
        onClose={closeApp}
        title={activeApp?.title}
      >
        {renderAppContent()}
      </DetailView>

      {/* Taskbar */}
      <div className="vista-taskbar">
        <motion.div
          className="start-orb"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div style={{ fontSize: '1.4rem', color: 'white', textShadow: '0 0 10px white' }}>⊞</div>
        </motion.div>

        <div className="taskbar-items">
          {activeApp && (
            <div className="task-button active">
              <span style={{ fontSize: '1.2rem' }}>{desktopIcons.find(i => i.id === activeApp.id)?.icon}</span>
              <span>{activeApp.title}</span>
            </div>
          )}
          <div className="task-button" onClick={() => setActiveApp(desktopIcons[2])}>
            <FiFolder />
            <span>Documents</span>
          </div>
        </div>

        <div className="system-tray">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>{currentTime.toLocaleDateString([], { month: '2-digit', day: '2-digit', year: 'numeric' })}</span>
          </div>
          <div className="flex gap-2 text-lg">
            <FiGithub className="cursor-pointer hover:text-white" onClick={() => window.open('https://github.com/deitussharrr', '_blank')} />
            <FiLinkedin className="cursor-pointer hover:text-white" onClick={() => window.open('https://linkedin.com/in/tussharshibukumar', '_blank')} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
