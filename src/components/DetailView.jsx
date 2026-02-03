import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMinus, FiSquare } from 'react-icons/fi';

const DetailView = ({ isOpen, onClose, title, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2000,
                    padding: '40px'
                }}>
                    {/* Backdrop blur for the desktop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0,0,0,0.3)',
                            backdropFilter: 'blur(5px)'
                        }}
                    />

                    <motion.div
                        className="aero-glass"
                        initial={{ scale: 0.9, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 50 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
                        style={{
                            width: '100%',
                            maxWidth: '1200px',
                            height: '85vh',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Title Bar */}
                        <div className="aero-title-bar">
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '16px', height: '16px', background: 'white', opacity: 0.2, borderRadius: '2px' }} />
                                <span style={{ fontSize: '0.85rem', fontWeight: 500, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>{title}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '1px' }}>
                                <button className="window-control" style={{ padding: '5px 12px' }}><FiMinus /></button>
                                <button className="window-control" style={{ padding: '5px 12px' }}><FiSquare style={{ fontSize: '0.7rem' }} /></button>
                                <button
                                    className="window-control close"
                                    onClick={onClose}
                                    style={{ padding: '5px 15px' }}
                                >
                                    <FiX />
                                </button>
                            </div>
                        </div>

                        {/* Window Content */}
                        <div style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '40px',
                            background: 'rgba(0,0,0,0.4)',
                            scrollbarWidth: 'thin'
                        }}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                style={{ maxWidth: '1000px', margin: '0 auto' }}
                            >
                                {children}
                            </motion.div>
                        </div>

                        {/* Glossy overlay for the whole window */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)',
                            pointerEvents: 'none'
                        }} />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default DetailView;
