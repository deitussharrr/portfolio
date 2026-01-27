import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
    {
        role: 'USG Technology',
        organization: "Politicon '25",
        date: '2025',
        description: 'Led digital systems and deployed official website for large-scale MUN.'
    },
    {
        role: 'Founder',
        organization: 'Astraeus Media',
        date: 'Feb 2025 – Present',
        description: 'Founded media initiative for startups; directed cinematic promotional content.'
    },
    {
        role: 'Founder & Developer',
        organization: 'Nous',
        date: '2024 – Present',
        description: 'Built AI emotion journaling app with NLP-based scoring and privacy focus.'
    },
    {
        role: 'Vice Chairperson',
        organization: "Politicon '24",
        date: '2024',
        description: 'Moderated ECOSOC committee and assisted in delegate training.'
    }
];

const Experience = () => {
    return (
        <section id="experience" className="section">
            <div className="container max-w-5xl mx-auto px-6">
                <h2 className="text-4xl mb-12 text-white">Experience</h2>

                <div className="border-l border-white/10 ml-3 md:ml-0 space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            className="relative pl-8 md:pl-12"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="absolute top-2 left-[-5px] w-2.5 h-2.5 bg-purple-500 rounded-full border-4 border-[#050505]"></div>

                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                                <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                                <span className="text-sm text-gray-500 font-mono">{exp.date} • {exp.organization}</span>
                            </div>
                            <p className="text-gray-400 max-w-2xl">{exp.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
