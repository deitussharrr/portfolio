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

  const closeApp = () => setActiveApp(null);

  const renderAppContent = () => {
    switch (activeApp?.id) {
      case 'me':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4">Background</h2>
                <p className="text-lg opacity-90">Prospective Computer Science Undergraduate with a deep-rooted passion for AI Architecture and Product User Experience. Based in Chennai, India, I bridge the gap between complex backend logic and intuitive frontend design.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold mb-4">Focus Areas</h2>
                <ul className="list-disc list-inside space-y-2 text-lg opacity-90">
                  <li>Scalable AI Solutions & LLM Orchestration</li>
                  <li>Ethical AI Frameworks & Bias Mitigation</li>
                  <li>Human-Centric UI/UX Design Systems</li>
                  <li>Startup Ecosystem Advocacy</li>
                </ul>
              </section>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img src={profileImg} alt="Profile" className="w-64 h-64 rounded-full border-8 border-white/20 shadow-2xl mb-6" />
              <div className="text-center">
                <p className="text-xl font-medium">Tusshar Shibukumar Harini</p>
                <p className="opacity-70 text-lg">Tech Advocate & Founder</p>
              </div>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="space-y-12">
            <section className="bg-white/10 p-8 rounded-2xl backdrop-blur-md">
              <h2 className="text-3xl font-light mb-6">Our Mission</h2>
              <p className="text-xl leading-relaxed">I am a self-taught tech advocate on a mission to democratize technology. My journey started with a curiosity about how things work, which blossomed into a career focused on building tools that empower others. I believe technology should be an equalizer, not a barrier.</p>
            </section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white/5 rounded-xl">
                <h3 className="text-xl font-bold mb-3">Transparency</h3>
                <p>Ensuring AI decisions are explainable and ethical for all users.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl">
                <h3 className="text-xl font-bold mb-3">Scalability</h3>
                <p>Architecting systems that grow seamlessly with user needs.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl">
                <h3 className="text-xl font-bold mb-3">Empathy</h3>
                <p>Designing interfaces that respect and understand human emotion.</p>
              </div>
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { category: "Frontend", skills: ["React", "Next.js", "Framer Motion", "Tailwind CSS"] },
              { category: "Backend & AI", skills: ["Python", "Node.js", "BERT", "NLP Frameworks"] },
              { category: "Design", skills: ["Figma", "Design Systems", "Product Strategy", "User Research"] }
            ].map((group, idx) => (
              <div key={idx} className="bg-white/10 p-10 rounded-3xl border border-white/20">
                <h3 className="text-3xl font-light mb-6 border-b border-white/30 pb-4">{group.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {group.skills.map(s => <span key={s} className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        );
      case 'experience':
        return (
          <div className="space-y-8">
            {[
              { role: "USG Tech & Chair", org: "Politicon '25", period: "2024 - Present", desc: "Leading the digital transformation of one of the largest MUN conferences. Moderating the ECOSOC committee and overseeing all tech-infrastructure for 500+ delegates." },
              { role: "Founder & Lead Developer", org: "Nous", period: "2023 - Present", desc: "Spearheaded the development of a mood-based journaling application using BERT for emotional analysis. Achieved significant engagement by focusing on user privacy and mental health." },
              { role: "Founder & Director", org: "Astraeus Media", period: "2022 - Present", desc: "Directing cinematic promotional content for emerging startups, helping them tell their stories through high-quality visual media." }
            ].map((exp, idx) => (
              <div key={idx} className="flex gap-8 items-start bg-white/5 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                <div className="w-32 pt-2 text-sm opacity-60 font-mono tracking-widest">{exp.period}</div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                  <p className="text-xl text-white/70 mb-4">{exp.org}</p>
                  <p className="text-lg leading-relaxed opacity-90">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return <p>Launching application...</p>;
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
        <h1>Start</h1>
      </motion.div>

      <motion.div
        className="tiles-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Personal & Info Group */}
        <motion.div className="tile-group" variants={groupVariants}>
          <div className="group-title">Me</div>
          <Tile
            size="large"
            color="blue"
            label="Tusshar Shibukumar Harini"
            isLive={true}
            onClick={() => setActiveApp({ id: 'me', title: 'Profile', color: 'blue' })}
            secondaryContent={
              <div style={{ textAlign: 'left', fontSize: '0.9rem' }}>
                <p><strong>Status:</strong> Prospective CS Undergrad</p>
                <p><strong>Focus:</strong> AI Architecture & UX</p>
                <p><strong>Location:</strong> Chennai, India</p>
                <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  <span className="technical-skill-tag" style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '2px 6px', fontSize: '0.7rem' }}>Founder</span>
                  <span className="technical-skill-tag" style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '2px 6px', fontSize: '0.7rem' }}>AI Dev</span>
                </div>
              </div>
            }
          >
            <div className="flex flex-col items-center gap-4">
              <img
                src={profileImg}
                alt="Profile"
                style={{ width: '100px', height: '100px', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.2)', transform: 'translateZ(40px)' }}
              />
              <div style={{ textAlign: 'center', whiteSpace: 'normal', fontSize: '0.85rem', transform: 'translateZ(20px)' }}>
                Prospective CS Undergraduate • AI & Product Design
              </div>
            </div>
          </Tile>
          <Tile
            size="medium"
            color="teal"
            label="About Me"
            icon={<FiUser />}
            isLive={true}
            onClick={() => setActiveApp({ id: 'about', title: 'About Me', color: 'teal' })}
            secondaryContent={
              <p style={{ fontSize: '0.85rem', whiteSpace: 'normal' }}>
                Self-taught tech advocate building scalable and ethical AI solutions.
              </p>
            }
          />
          <div className="flex gap-2">
            <Tile size="small" color="purple" label="Education" icon={<FiAward />} onClick={() => setActiveApp({ id: 'experience', title: 'Experience & Education', color: 'purple' })} />
            <Tile size="small" color="orange" label="Skills" icon={<FiCode />} onClick={() => setActiveApp({ id: 'skills', title: 'Technical Arsenal', color: 'orange' })} />
          </div>
        </motion.div>

        {/* Projects Group */}
        <motion.div className="tile-group" variants={groupVariants}>
          <div className="group-title">Select Work</div>
          <Tile
            size="wide"
            color="red"
            label="Nous - AI Emotion Journaling"
            link="https://thenous.vercel.app"
            isLive={true}
            secondaryContent={
              <div style={{ fontSize: '0.85rem', whiteSpace: 'normal' }}>
                <p><strong>Stack:</strong> React, NLP, BERT Core</p>
                <p style={{ marginTop: '8px' }}>Mental well-being via privacy-focused AI scoring.</p>
              </div>
            }
          >
            <div className="flex items-center gap-4" style={{ width: '100%' }}>
              <div style={{ fontSize: '3rem', transform: 'translateZ(30px)' }}><FiCode /></div>
              <div style={{ whiteSpace: 'normal', transform: 'translateZ(10px)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Nous</h3>
                <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>AI-powered web app for mental well-being.</p>
              </div>
            </div>
          </Tile>
          <div className="flex gap-2">
            <Tile
              size="medium"
              color="orange"
              label="Politicon '25"
              link="https://politicon25.vercel.app"
              isLive={true}
              secondaryContent={
                <div style={{ fontSize: '0.85rem' }}>
                  <p>Digital Infrastructure Lead</p>
                  <p>Next.js • High Performance Site</p>
                </div>
              }
            >
              <FiExternalLink style={{ transform: 'translateZ(20px)', fontSize: '2rem' }} />
            </Tile>
            <Tile size="medium" color="pink" label="Astraeus Media" onClick={() => setActiveApp({ id: 'experience', title: 'Astraeus Media', color: 'pink' })}>
              <span style={{ transform: 'translateZ(10px)' }}>Media initiative for startups.</span>
            </Tile>
          </div>
        </motion.div>

        {/* Experience Group */}
        <motion.div className="tile-group" variants={groupVariants}>
          <div className="group-title">Experience</div>
          <Tile
            size="medium"
            color="amber"
            label="Politicon '25"
            isLive={true}
            onClick={() => setActiveApp({ id: 'experience', title: 'Career Track', color: 'amber' })}
            secondaryContent={<p style={{ fontSize: '0.85rem' }}>Moderated ECOSOC committee & led tech systems.</p>}
          >
            USG Tech & Chair
          </Tile>
          <Tile
            size="medium"
            color="blue"
            label="Nous"
            isLive={true}
            onClick={() => setActiveApp({ id: 'experience', title: 'Career Track', color: 'blue' })}
            secondaryContent={<p style={{ fontSize: '0.85rem' }}>Built AI journaling app with NLP-based scoring.</p>}
          >
            Founder & Dev
          </Tile>
          <Tile
            size="medium"
            color="teal"
            label="Astraeus Media"
            isLive={true}
            onClick={() => setActiveApp({ id: 'experience', title: 'Career Track', color: 'teal' })}
            secondaryContent={<p style={{ fontSize: '0.85rem' }}>Directed cinematic promotional content for startups.</p>}
          >
            Founder
          </Tile>
          <Tile
            size="medium"
            color="purple"
            label="Politicon '24"
            isLive={true}
            onClick={() => setActiveApp({ id: 'experience', title: 'Career Track', color: 'purple' })}
            secondaryContent={<p style={{ fontSize: '0.85rem' }}>Moderated ECOSOC and assisted in delegate training.</p>}
          >
            Vice Chairperson
          </Tile>
        </motion.div>

        {/* Social & Contact Group */}
        <motion.div className="tile-group" variants={groupVariants}>
          <div className="group-title">Connect</div>
          <Tile size="medium" color="blue" label="LinkedIn" link="https://www.linkedin.com/in/tussharshibukumarharini" icon={<FiLinkedin />} />
          <Tile size="medium" color="steel" label="GitHub" link="https://github.com/deitussharrr" icon={<FiGithub />} />
          <Tile size="medium" color="red" label="Email" link="mailto:tussharshibukumarharini@gmail.com" icon={<FiMail />} />
          <Tile size="medium" color="teal" label="Say Hello" link="mailto:tussharshibukumarharini@gmail.com" icon={<FiSend />} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;


