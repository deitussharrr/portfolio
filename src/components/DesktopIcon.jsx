import React from 'react';
import { motion } from 'framer-motion';

const DesktopIcon = ({ icon, label, onClick, isSelected, id, title, onDoubleClick }) => {
    return (
        <motion.div
            className={`desktop-icon ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <div className="desktop-icon-image">
                {typeof icon === 'string' ? <span>{icon}</span> : icon}
            </div>
            <div className="desktop-icon-label">{label}</div>
        </motion.div>
    );
};

export default DesktopIcon;
