import React from 'react';
import { FiMail, FiLinkedin, FiGithub, FiUser, FiCode, FiAward, FiSend, FiExternalLink } from 'react-icons/fi';
import Tile from './components/Tile';
import profileImg from './assets/profile.jpg';

function App() {
  return (
    <div className="start-screen">
      <div className="start-header">
        <h1>Start</h1>
      </div>

      <div className="tiles-container">
        {/* Personal & Info Group */}
        <div className="tile-group">
          <div className="group-title">Me</div>
          <Tile size="large" color="blue" label="Tusshar Shibukumar Harini">
            <div className="flex flex-col items-center gap-4">
              <img
                src={profileImg}
                alt="Profile"
                style={{ width: '120px', height: '120px', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.2)' }}
              />
              <div style={{ textAlign: 'center', whiteSpace: 'normal', fontSize: '0.9rem' }}>
                Prospective CS Undergraduate • AI & Product Design
              </div>
            </div>
          </Tile>
          <Tile size="medium" color="teal" label="About Me" icon={<FiUser />} />
          <div className="flex gap-2">
            <Tile size="small" color="purple" label="Education" icon={<FiAward />} />
            <Tile size="small" color="orange" label="Skills" icon={<FiCode />} />
          </div>
        </div>

        {/* Projects Group */}
        <div className="tile-group">
          <div className="group-title">Select Work</div>
          <Tile size="wide" color="red" label="Nous - AI Emotion Journaling" link="https://thenous.vercel.app">
            <div className="flex items-center gap-4" style={{ width: '100%' }}>
              <div style={{ fontSize: '3rem' }}><FiCode /></div>
              <div style={{ whiteSpace: 'normal' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Nous</h3>
                <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>AI-powered web app for mental well-being using NLP & BERT core.</p>
              </div>
            </div>
          </Tile>
          <div className="flex gap-2">
            <Tile size="medium" color="orange" label="Politicon '25" link="https://politicon25.vercel.app">
              <FiExternalLink />
            </Tile>
            <Tile size="medium" color="pink" label="Astraeus Media">
              Founder & Director
            </Tile>
          </div>
        </div>

        {/* Experience Group */}
        <div className="tile-group">
          <div className="group-title">Experience</div>
          <Tile size="medium" color="amber" label="Politicon '25">
            USG Tech & Chair
          </Tile>
          <Tile size="medium" color="blue" label="Nous">
            Founder & Dev
          </Tile>
          <Tile size="medium" color="teal" label="Astraeus Media">
            Founder
          </Tile>
          <Tile size="medium" color="purple" label="Politicon '24">
            Vice Chairperson
          </Tile>
        </div>

        {/* Social & Contact Group */}
        <div className="tile-group">
          <div className="group-title">Connect</div>
          <Tile size="medium" color="blue" label="LinkedIn" link="https://www.linkedin.com/in/tussharshibukumarharini" icon={<FiLinkedin />} />
          <Tile size="medium" color="steel" label="GitHub" link="https://github.com/deitussharrr" icon={<FiGithub />} />
          <Tile size="medium" color="red" label="Email" link="mailto:tussharshibukumarharini@gmail.com" icon={<FiMail />} />
          <Tile size="medium" color="teal" label="Say Hello" link="mailto:tussharshibukumarharini@gmail.com" icon={<FiSend />} />
        </div>
      </div>
    </div>
  );
}

export default App;

