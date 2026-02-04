import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { FiX, FiMinus, FiSquare } from 'react-icons/fi';

const AeroWindow = ({ isOpen, onClose, title, children, icon, initialX = 100, initialY = 100, isFocused, onFocus }) => {
    const [size, setSize] = useState({
        width: typeof window !== 'undefined' && window.innerWidth < 768 ? window.innerWidth - 20 : 800,
        height: typeof window !== 'undefined' && window.innerHeight < 768 ? window.innerHeight - 100 : 600
    });
    const [isMaximized, setIsMaximized] = useState(false);
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
    const dragControls = useDragControls();
    const windowRef = useRef(null);

    // Track mobile view
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            // Don't force maximize anymore, let the user move it
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Resizing logic
    const [isResizing, setIsResizing] = useState(false);

    const startResizing = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onFocus(); // Focus the window when resizing starts
        setIsResizing(true);
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isResizing) return;

            const newWidth = Math.max(400, e.clientX - windowRef.current.offsetLeft);
            const newHeight = Math.max(300, e.clientY - windowRef.current.offsetTop);

            setSize({ width: newWidth, height: newHeight });
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    if (!isOpen) return null;

    return (
        <motion.div
            ref={windowRef}
            className="aero-glass window-animate"
            onPointerDown={onFocus} // Focus the window when clicked
            initial={{ opacity: 0, scale: 0.95, x: initialX, y: initialY }}
            animate={{
                opacity: 1,
                scale: 1,
                width: isMaximized ? '100vw' : size.width,
                height: isMaximized ? 'calc(100vh - 40px)' : size.height,
                x: isMaximized ? 0 : initialX,
                y: isMaximized ? 0 : initialY,
                zIndex: isFocused ? 3000 : 2000
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileDrag={{ scale: 1.02, opacity: 0.9 }}
            drag={!isMaximized}
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            onDragStart={onFocus}
            onDragEnd={(e, info) => {
                if (info.point.y <= 10) {
                    setIsMaximized(true);
                }
            }}
            style={{
                position: 'fixed',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                pointerEvents: 'auto'
            }}
        >
            {/* Title Bar - Draggable Area */}
            <div
                className="aero-title-bar"
                onPointerDown={(e) => dragControls.start(e)}
                style={{ cursor: isMaximized ? 'default' : 'move', userSelect: 'none' }}
                onDoubleClick={() => setIsMaximized(!isMaximized)}
            >
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 500, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>{title}</span>
                </div>
                <div className="window-controls">
                    <button className="window-control" title="Minimize"><FiMinus /></button>
                    <button
                        className="window-control"
                        title={isMaximized ? "Restore" : "Maximize"}
                        onClick={() => setIsMaximized(!isMaximized)}
                    >
                        <FiSquare style={{ fontSize: '0.7rem' }} />
                    </button>
                    <button
                        className="window-control close"
                        onClick={onClose}
                        title="Close"
                    >
                        <FiX />
                    </button>
                </div>
            </div>

            {/* Window Content */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '30px',
                background: 'rgba(0,0,0,0.4)',
                scrollbarWidth: 'thin',
                color: 'white'
            }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    {children}
                </div>
            </div>

            {/* Resize Handle */}
            {!isMaximized && (
                <div
                    onMouseDown={startResizing}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: '15px',
                        height: '15px',
                        cursor: 'nwse-resize',
                        zIndex: 10,
                        background: 'linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.2) 50%)'
                    }}
                />
            )}

            {/* Glossy Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '50px',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 100%)',
                pointerEvents: 'none'
            }} />
        </motion.div>
    );
};

export default AeroWindow;
