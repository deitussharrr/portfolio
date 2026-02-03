import React, { useState, useEffect } from 'react';
import Gadget from './Gadget';
import { FiClock, FiActivity, FiImage } from 'react-icons/fi';

const Sidebar = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <aside className="vista-sidebar">
            {/* Clock Gadget */}
            <Gadget title="Clock" icon={<FiClock />}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 600 }}>
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </div>
                    <div style={{ fontSize: '0.6rem', opacity: 0.6 }}>
                        {time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
                    </div>
                </div>
            </Gadget>

            {/* Skills Gadget (CPU Meter lookalike) */}
            <Gadget title="Skills Index" icon={<FiActivity />}>
                <div style={{ spaceY: '5px' }}>
                    {[
                        { label: 'AI', value: 85, color: '#00b4d8' },
                        { label: 'UI', value: 90, color: '#48cae4' },
                        { label: 'React', value: 95, color: '#90e0ef' }
                    ].map(skill => (
                        <div key={skill.label} style={{ marginBottom: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', marginBottom: '2px' }}>
                                <span>{skill.label}</span>
                                <span>{skill.value}%</span>
                            </div>
                            <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{ width: `${skill.value}%`, height: '100%', background: skill.color }} />
                            </div>
                        </div>
                    ))}
                </div>
            </Gadget>

            {/* Picture Slide Show Gadget */}
            <Gadget title="Slide Show" icon={<FiImage />}>
                <div style={{
                    width: '100%',
                    height: '80px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    opacity: 0.5
                }}>
                    Featured Project
                </div>
            </Gadget>
        </aside>
    );
};

export default Sidebar;
