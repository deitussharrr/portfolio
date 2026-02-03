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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <section className="bg-white/5 p-10 rounded-[40px] border border-white/10">
                <h2 className="text-4xl font-light mb-6">Tusshar Shibukumar Harini</h2>
                <p className="text-xl opacity-80 leading-relaxed">
                  I'm a technology advocate and builder focused on the intersection of **AI Architecture** and **Human-Centric Design**.
                  My work revolves around creating systems that are not only powerful but also intuitive and ethical.
                </p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "AI Orchestration", desc: "Building scalable pipelines with LLMs and custom transformers.", icon: "🤖" },
                  { title: "Product Strategy", desc: "Defining vision and growth for tech-driven startups.", icon: "📈" },
                  { title: "UI/UX Architecture", desc: "Crafting design systems that prioritize user emotion and flow.", icon: "🎨" },
                  { title: "Ethical Advocacy", desc: "Ensuring transparency and fairness in automated systems.", icon: "⚖️" }
                ].map((focus, i) => (
                  <div key={i} className="bg-white/5 p-8 rounded-3xl border-b-4 border-metro-blue hover:bg-white/10 transition-colors">
                    <div className="text-3xl mb-4">{focus.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{focus.title}</h3>
                    <p className="opacity-60 text-sm">{focus.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex flex-col items-center p-10 bg-metro-blue rounded-[40px] text-center shadow-2xl">
                <img src={profileImg} alt="Profile" className="w-48 h-48 rounded-full border-8 border-white/20 mb-6 object-cover" />
                <h3 className="text-2xl font-bold">Available for Collaboration</h3>
                <p className="opacity-80 mt-2">Chennai, India • Remote Global</p>
                <button
                  onClick={() => window.location.href = 'mailto:tussharshibukumarharini@gmail.com'}
                  className="mt-8 px-8 py-3 bg-white text-metro-blue rounded-full font-bold hover:scale-105 transition-transform"
                >
                  Get in Touch
                </button>
              </div>

              <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                <h4 className="text-xs uppercase font-bold opacity-40 mb-6 tracking-widest">Personal Stats</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <span className="opacity-60">Status</span>
                    <span className="font-bold">Prospective CS Undergrad</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <span className="opacity-60">Projects Built</span>
                    <span className="font-bold">12+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="opacity-60">Lines of Code</span>
                    <span className="font-bold">50K+</span>
                  </div>
                </div>
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
          <div className="space-y-12 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <section className="bg-white/5 p-10 rounded-[40px] border-t-8 border-metro-blue">
                <h3 className="text-3xl font-light mb-8 flex items-center gap-4">
                  <FiCode className="text-metro-blue" /> Frontend Engineering
                </h3>
                <div className="flex flex-wrap gap-4">
                  {["React", "Next.js", "Framer Motion", "Tailwind CSS", "TypeScript", "Vite"].map(s => (
                    <span key={s} className="px-6 py-3 bg-metro-blue/20 rounded-xl text-lg font-medium border border-metro-blue/30">
                      {s}
                    </span>
                  ))}
                </div>
                <p className="mt-8 opacity-60 text-sm leading-relaxed">
                  Specialized in building high-performance, interactive user interfaces with a focus on motion design and accessibility.
                </p>
              </section>

              <section className="bg-white/5 p-10 rounded-[40px] border-t-8 border-metro-teal">
                <h3 className="text-3xl font-light mb-8 flex items-center gap-4">
                  <FiAward className="text-metro-teal" /> Backend & AI
                </h3>
                <div className="space-y-4">
                  {[
                    { name: "Python / Node.js", level: "90%" },
                    { name: "NLP / BERT Architecture", level: "85%" },
                    { name: "Scalable Microservices", level: "80%" },
                    { name: "Database Design (SQL/NoSQL)", level: "85%" }
                  ].map(s => (
                    <div key={s.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{s.name}</span>
                        <span className="opacity-50">{s.level}</span>
                      </div>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-metro-teal"
                          initial={{ width: 0 }}
                          animate={{ width: s.level }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center">
                <div className="text-4xl mb-4">🎨</div>
                <h4 className="text-xl font-bold mb-2">Design Systems</h4>
                <p className="text-sm opacity-60">Figma, Adobe Suite, Atomic Design</p>
              </div>
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h4 className="text-xl font-bold mb-2">DevOps</h4>
                <p className="text-sm opacity-60">Docker, Vercel, CI/CD, AWS</p>
              </div>
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center">
                <div className="text-4xl mb-4">📊</div>
                <h4 className="text-xl font-bold mb-2">Analytics</h4>
                <p className="text-sm opacity-60">Google Analytics, Mixpanel, Hotjar</p>
              </div>
            </div>
          </div>
        );
      case 'experience':
        const experienceData = [
          {
            role: "USG Tech & Digital Infrastructure Lead",
            org: "Politicon '25",
            period: "2024 - Present",
            type: "Leadership",
            color: "amber",
            desc: "Architected the digital foundation for a 500+ delegate international summit. Managing a team of developers and designers to deliver real-time conference systems.",
            highlights: ["Managed 15+ member tech team", "Real-time voting & registration systems", "Zero-downtime infrastructure management"]
          },
          {
            role: "Founder & Lead Developer",
            org: "Nous",
            period: "2023 - Present",
            type: "Core Tech",
            color: "blue",
            desc: "Developed a privacy-first AI journaling platform using BERT transformers for sentiment and emotion analysis. Integrated localized storage and encrypted data pipelines.",
            stack: ["React", "NLP", "BERT", "Tailwind"],
            highlights: ["Developed custom NLP scoring algorithm", "Privacy-first architecture design", "Cross-platform accessibility"]
          },
          {
            role: "Founder & Creative Director",
            org: "Astraeus Media",
            period: "2022 - Present",
            type: "Creative",
            color: "teal",
            desc: "Directing cinematic promotional content for high-growth startups. Specialized in storytelling through advanced visual media and motion design.",
            highlights: ["Directed 10+ startup launch films", "95% client retention rate", "Advanced 3D motion integration"]
          },
          {
            role: "Vice Chairperson (ECOSOC)",
            org: "Politicon '24",
            period: "2023 - 2024",
            type: "Diplomatic Leadership",
            color: "purple",
            desc: "Moderated advanced economic and social council sessions. Spearheaded delegate training programs for emerging MUN participants.",
            highlights: ["Moderated sessions for 100+ delegates", "Authored official conference study guides", "Awarded 'Best Moderator' citation"]
          }
        ];

        return (
          <div className="space-y-12 pb-20">
            {experienceData.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ x: idx % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.15 + 0.3 }}
                className="relative"
              >
                <div className={`flex flex-col md:flex-row gap-8 items-start bg-white/5 p-10 rounded-3xl border-l-[12px] border-metro-${exp.color} hover:bg-white/10 transition-all group`}>
                  <div className="md:w-1/4">
                    <div className="text-sm font-mono tracking-widest opacity-50 mb-2">{exp.period}</div>
                    <div className={`inline-block px-3 py-1 rounded-sm bg-metro-${exp.color} text-[10px] uppercase font-bold tracking-tighter text-white mb-4`}>
                      {exp.type}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-light mb-2 group-hover:translate-x-2 transition-transform">{exp.role}</h3>
                    <p className={`text-xl font-bold mb-6 text-metro-${exp.color}`}>{exp.org}</p>
                    <p className="text-lg leading-relaxed opacity-80 mb-8 max-w-3xl">{exp.desc}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="space-y-3">
                        <h4 className="text-xs uppercase font-bold opacity-40">Key Achievements</h4>
                        <ul className="space-y-2">
                          {exp.highlights.map((h, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm">
                              <span className={`w-1.5 h-1.5 rounded-full bg-metro-${exp.color}`} />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {exp.stack && (
                        <div className="space-y-3">
                          <h4 className="text-xs uppercase font-bold opacity-40">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.stack.map(s => (
                              <span key={s} className="px-2 py-1 bg-white/10 rounded text-xs">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
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


