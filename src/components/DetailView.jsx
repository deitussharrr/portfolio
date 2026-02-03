import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';

const DetailView = ({ isOpen, onClose, title, color = 'blue', children }) => {
    const colorClass = `bg-metro-${color}`;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={`app-detail-view ${colorClass}`}
                    initial={{ scale: 0.8, opacity: 0, borderRadius: '20px' }}
                    animate={{ scale: 1, opacity: 1, borderRadius: '0px' }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 2000,
                        padding: '40px',
                        color: 'white',
                        overflowY: 'auto',
                    }}
                >
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <header style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                            <motion.button
                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                style={{
                                    background: 'none',
                                    border: '2px solid white',
                                    borderRadius: '50%',
                                    width: '50px',
                                    height: '50px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '1.5rem'
                                }}
                            >
                                <FiArrowLeft />
                            </motion.button>
                            <h1 style={{ fontSize: '3rem', fontWeight: 300 }}>{title}</h1>
                        </header>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {children}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DetailView;
