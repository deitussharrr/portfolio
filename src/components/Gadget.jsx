import React from 'react';
import { motion } from 'framer-motion';

const Gadget = ({ title, children, icon }) => {
    return (
        <motion.div
            className="gadget"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', opacity: 0.7, fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                {icon && <span>{icon}</span>}
                {title}
            </div>
            <div className="gadget-content">
                {children}
            </div>
        </motion.div>
    );
};

export default Gadget;
