import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Tile = ({ size = 'medium', color = 'blue', label, children, icon, link, isLive = false, secondaryContent }) => {
  const sizeClass = `tile-${size}`;
  const colorClass = `bg-metro-${color}`;

  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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

  const content = (
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
      {icon && (
        <div className="tile-content" style={{ transform: "translateZ(20px)" }}>
          <div className="tile-icon">{icon}</div>
        </div>
      )}
      {children && <div className="tile-content" style={{ transform: "translateZ(10px)" }}>{children}</div>}
      {label && <div className="tile-label" style={{ transform: "translateZ(30px)" }}>{label}</div>}
    </motion.div>
  );

  const tileBase = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tile ${sizeClass} ${colorClass}`}
      style={{
        perspective: "1000px"
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.95 }}
    >
      {content}
    </motion.div>
  );

  if (link) {
    return (
      <a href={link} className="tile-link-wrapper" style={{ textDecoration: 'none' }}>
        {tileBase}
      </a>
    );
  }

  return tileBase;
};

export default Tile;

