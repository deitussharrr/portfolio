import React from 'react';
import { motion } from 'framer-motion';
import profileImg from '../assets/profile.jpg';

const Hero = () => {
    return (
        <section id="hero" className="hero-section">
            <motion.div
                className="hero-content"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <img src={profileImg} alt="Tussh Harshibukumar Harini" className="profile-img" />
                <h1 className="hero-title">Tusshar Shibukumar Harini</h1>
                <p className="hero-subtitle">Prospective CS Undergraduate • AI & Product Design • Founder</p>
                <a href="#projects" className="cta-button">View My Projects</a>
            </motion.div>
        </section>
    );
};

export default Hero;
