import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLinkedin, FiGithub, FiUser, FiCode, FiAward, FiSend, FiExternalLink } from 'react-icons/fi';
import Tile from './components/Tile';
import CharmsBar from './components/CharmsBar';
import DetailView from './components/DetailView';
import profileImg from './assets/profile.jpg';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const groupVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

function App() {
  const [activeApp, setActiveApp] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const closeApp = () => setActiveApp(null);

  const renderAppContent = () => {
    switch (activeApp?.id) {
      case 'me':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <section className="bg-white/5 p-10 rounded-[40px] border border-white/10">
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
                  <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="text-3xl mb-4">{focus.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{focus.title}</h3>
                    <p className="opacity-60 text-sm">{focus.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex flex-col items-center p-10 bg-white/5 rounded-[40px] text-center border border-white/10">
                <img src={profileImg} alt="Profile" className="w-48 h-48 rounded-full border-4 border-white/20 mb-6 object-cover" />
                <h3 className="text-2xl font-bold">Tusshar Shibukumar</h3>
                <p className="opacity-80 mt-2">Chennai, India</p>
              </div>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="space-y-12">
            <section className="bg-white/10 p-8 rounded-2xl backdrop-blur-md">
              <h2 className="text-3xl font-light mb-6">Our Mission</h2>
              <p className="text-xl leading-relaxed">I am a self-taught tech advocate on a mission to democratize technology. I believe technology should be an equalizer, not a barrier.</p>
            </section>
          </div>
        );
      case 'experience':
        const experienceData = [
          { role: "Tech Lead", org: "Politicon '25", period: "2024 - Present", desc: "Architecting conference systems." },
          { role: "Founder", org: "Nous", period: "2023 - Present", desc: "AI sentiment journaling platform." }
        ];
        return (
          <div className="space-y-8">
            {experienceData.map((exp, idx) => (
              <div key={idx} className="bg-white/5 p-8 rounded-3xl border border-white/10">
                <h3 className="text-2xl font-bold">{exp.role}</h3>
                <p className="text-xl text-blue-400">{exp.org}</p>
                <p className="opacity-60">{exp.period}</p>
                <p className="mt-4 opacity-80">{exp.desc}</p>
              </div>
            ))}
          </div>
        );
      case 'skills':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-white/5 p-10 rounded-3xl border border-white/10">
              <h3 className="text-2xl font-bold mb-6">Technologies</h3>
              <div className="flex flex-wrap gap-4">
                {["React", "Python", "Node.js", "AI/NLP"].map(s => (
                  <span key={s} className="px-4 py-2 bg-white/10 rounded-lg">{s}</span>
                ))}
              </div>
            </section>
          </div>
        );
      default:
        return <p>Loading...</p>;
    }
  };

  return (
    <div className="start-screen">
      <CharmsBar />

      <DetailView
        isOpen={!!activeApp}
        onClose={closeApp}
        title={activeApp?.title}
        color={activeApp?.color}
      >
        {renderAppContent()}
      </DetailView>

      <motion.div
        className="start-header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1>Workspace</h1>
      </motion.div>

      <motion.div
        className="tiles-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Featured Group */}
        <motion.div className="tile-group" variants={groupVariants}>
          <div className="group-title">Me</div>
          <Tile
            size="large"
            color="blue"
            label="Profile"
            icon={<FiSmile className="w-16 h-16" />}
            onClick={() => setActiveApp({ id: 'me', title: 'Biography' })}
          />
        </motion.div>

        {/* Work Group */}
        <motion.div className="tile-group" variants={groupVariants}>
          <div className="group-title">Selection</div>
          <Tile
            size="wide"
            color="blue"
            label="Politicon '25"
            isLive={true}
            onClick={() => setActiveApp({ id: 'about', title: 'Politicon Mission' })}
            secondaryContent="Managing tech for 500+ delegates."
          >
            <FiZap className="text-5xl" />
          </Tile>
          <div className="flex gap-2">
            <Tile
              size="medium"
              color="teal"
              label="Films"
              isLive={true}
              onClick={() => setActiveApp({ id: 'experience', title: 'Astraeus Media' })}
              secondaryContent="Cinematic production."
            />
            <Tile
              size="medium"
              color="blue"
              label="AI Research"
              isLive={true}
              onClick={() => setActiveApp({ id: 'skills', title: 'Nous Lab' })}
              secondaryContent="BERT Emotional scoring."
            />
          </div>
        </motion.div>

        {/* Career Timeline */}
        <motion.div className="tile-group" variants={groupVariants}>
          <div className="group-title">Career</div>
          <Tile
            size="large"
            color="amber"
            label="Timeline"
            icon={<FiAward />}
            onClick={() => setActiveApp({ id: 'experience', title: 'Full Career Timeline' })}
          />
        </motion.div>

        {/* Contact */}
        <motion.div className="tile-group" variants={groupVariants}>
          <div className="group-title">Connect</div>
          <div className="flex gap-2">
            <Tile size="medium" color="blue" label="GitHub" icon={<FiGithub />} link="https://github.com/deitussharrr" />
            <Tile size="medium" color="blue" label="LinkedIn" icon={<FiLinkedin />} link="https://linkedin.com/in/tussharshibukumar" />
          </div>
          <Tile size="medium" color="blue" label="Email" icon={<FiMail />} onClick={() => window.location.href = 'mailto:tussharshibukumarharini@gmail.com'} />
        </motion.div>
      </motion.div>

      {/* Vista Taskbar */}
      <div className="taskbar">
        <motion.div
          className="start-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div style={{ fontSize: '1.2rem', color: 'white', textShadow: '0 0 10px white' }}>⊞</div>
        </motion.div>

        <div style={{ flex: 1 }} />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          color: 'white',
          fontSize: '0.8rem',
          paddingRight: '20px',
          opacity: 0.8
        }}>
          <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span>{currentTime.toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
