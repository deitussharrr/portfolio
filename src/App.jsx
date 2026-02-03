import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiGithub, FiUser, FiCode, FiAward, FiSend, FiExternalLink } from 'react-icons/fi';
import Tile from './components/Tile';
import CharmsBar from './components/CharmsBar';
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
  return (
    <div className="start-screen">
      <CharmsBar />

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
            secondaryContent={
              <p style={{ fontSize: '0.85rem', whiteSpace: 'normal' }}>
                Self-taught tech advocate building scalable and ethical AI solutions.
              </p>
            }
          />
          <div className="flex gap-2">
            <Tile size="small" color="purple" label="Education" icon={<FiAward />} />
            <Tile size="small" color="orange" label="Skills" icon={<FiCode />} />
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
            <Tile size="medium" color="pink" label="Astraeus Media">
              <span style={{ transform: 'translateZ(10px)' }}>Media initiative for startups.</span>
            </Tile>
          </div>
        </motion.div>

        {/* Experience Group */}
        <motion.div className="tile-group" variants={groupVariants}>
          <div className="group-title">Experience</div>
          <Tile size="medium" color="amber" label="Politicon '25" isLive={true} secondaryContent={<p style={{ fontSize: '0.85rem' }}>Moderated ECOSOC committee & led tech systems.</p>}>
            USG Tech & Chair
          </Tile>
          <Tile size="medium" color="blue" label="Nous" isLive={true} secondaryContent={<p style={{ fontSize: '0.85rem' }}>Built AI journaling app with NLP-based scoring.</p>}>
            Founder & Dev
          </Tile>
          <Tile size="medium" color="teal" label="Astraeus Media" isLive={true} secondaryContent={<p style={{ fontSize: '0.85rem' }}>Directed cinematic promotional content for startups.</p>}>
            Founder
          </Tile>
          <Tile size="medium" color="purple" label="Politicon '24" isLive={true} secondaryContent={<p style={{ fontSize: '0.85rem' }}>Moderated ECOSOC and assisted in delegate training.</p>}>
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

