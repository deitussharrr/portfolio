import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

const Tile = ({ size = 'medium', color = 'blue', label, children, icon, link, isLive = false, secondaryContent, interval = 5000, onClick }) => {
  const sizeClass = `tile-${size}`;
  const colorClass = `bg-metro-${color}`;

  const [showSecondary, setShowSecondary] = useState(false);
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  useEffect(() => {
    if (isLive && secondaryContent) {
      const timer = setInterval(() => {
        setShowSecondary(prev => !prev);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [isLive, secondaryContent, interval]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (e) => {
    if (onClick) onClick(e);
    // Generic "App Launch" feedback if no link or specific onClick provided?
    // For now, we'll just ensure the whileTap animation handles the visual side.
  };

  const tileBase = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`tile ${sizeClass} ${colorClass}`}
      style={{
        perspective: "1000px"
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
      whileHover={{ outline: "2px solid rgba(255, 255, 255, 0.5)" }}
    >
      <motion.div
        className="tile-inner"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          width: '100%',
          height: '100%'
        }}
      >
        <AnimatePresence mode="wait">
          {!showSecondary ? (
            <motion.div
              key="primary"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
            >
              <div style={{ transform: 'translateZ(10px)', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                {icon && <div className="tile-icon" style={{ transform: 'translateZ(10px)' }}>{icon}</div>}
                {children}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="secondary"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
              <div style={{ transform: 'translateZ(15px)', padding: '10px' }}>
                {secondaryContent}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {label && <div className="tile-label" style={{ transform: "translateZ(30px)" }}>{label}</div>}
      </motion.div>
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

