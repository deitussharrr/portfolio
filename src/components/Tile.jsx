import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

const Tile = ({ size = 'medium', color = 'blue', label, children, icon, link, isLive = false, secondaryContent, interval = 5000, onClick }) => {
  const sizeClass = `tile-${size}`;
  const [showSecondary, setShowSecondary] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (isLive && secondaryContent) {
      const timer = setInterval(() => {
        setShowSecondary(prev => !prev);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [isLive, secondaryContent, interval]);

  const handleClick = (e) => {
    if (onClick) onClick(e);
  };

  const tileBase = (
    <motion.div
      ref={ref}
      onClick={handleClick}
      className={`tile ${sizeClass}`}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="tile-inner">
        <AnimatePresence mode="wait">
          {!showSecondary ? (
            <motion.div
              key="primary"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            >
              {icon && <div className="tile-icon">{icon}</div>}
              <div style={{ width: '100%', textAlign: 'center', marginTop: icon ? '10px' : '0' }}>
                {children}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="secondary"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '10px' }}
            >
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                {secondaryContent}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {label && (
          <div className="tile-label">
            {label}
          </div>
        )}
      </div>

      {/* Glossy reflection overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '50%',
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 100%)',
        pointerEvents: 'none'
      }} />
    </motion.div>
  );

  if (link) {
    return (
      <a href={link} className="tile-link-wrapper" style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
        {tileBase}
      </a>
    );
  }

  return tileBase;
};


export default Tile;

