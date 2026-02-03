import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiShare2, FiGrid, FiSettings, FiHardDrive } from 'react-icons/fi';

const CharmsBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleMouseEnter = (e) => {
        if (e.clientX > window.innerWidth - 20) {
            setIsOpen(true);
        }
    };

    const handleGlobalClick = () => {
        if (isOpen) setIsOpen(false);
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseEnter);
        window.addEventListener('click', handleGlobalClick);
        return () => {
            window.removeEventListener('mousemove', handleMouseEnter);
            window.removeEventListener('click', handleGlobalClick);
        };
    }, [isOpen]);

    const charms = [
        { icon: <FiSearch />, label: 'Search' },
        { icon: <FiShare2 />, label: 'Share' },
        { icon: <FiGrid />, label: 'Start' },
        { icon: <FiHardDrive />, label: 'Devices' },
        { icon: <FiSettings />, label: 'Settings' },
    ];

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className="charms-bar"
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 100, opacity: 0 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                            style={{
                                position: 'fixed',
                                right: 0,
                                top: 0,
                                height: '100vh',
                                width: '100px',
                                backgroundColor: 'black',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '30px',
                                zIndex: 1000,
                            }}
                        >
                            {charms.map((charm, i) => (
                                <div key={i} className="charm-item" style={{ color: 'white', textAlign: 'center', cursor: 'pointer', opacity: 0.7 }}>
                                    <div style={{ fontSize: '1.8rem' }}>{charm.icon}</div>
                                    <div style={{ fontSize: '0.7rem', marginTop: '4px' }}>{charm.label}</div>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div
                            className="charms-time-overlay"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            style={{
                                position: 'fixed',
                                left: '60px',
                                bottom: '60px',
                                zIndex: 999,
                                color: 'white',
                                display: 'flex',
                                alignItems: 'flex-end',
                                gap: '20px',
                                textShadow: '0 0 20px rgba(0,0,0,0.5)'
                            }}
                        >
                            <div style={{ fontSize: '6rem', fontWeight: 300, lineHeight: 0.8 }}>
                                {time.getHours()}:{time.getMinutes().toString().padStart(2, '0')}
                            </div>
                            <div style={{ fontSize: '1.5rem', paddingBottom: '10px' }}>
                                <div style={{ fontWeight: 600 }}>{time.toLocaleDateString('en-US', { weekday: 'long' })}</div>
                                <div style={{ opacity: 0.8 }}>{time.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default CharmsBar;
