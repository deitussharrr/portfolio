import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="section">
            <div className="container max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

                        {/* Left Column: Narrative */}
                        <div>
                            <h2 className="text-4xl mb-6 text-white">About Me</h2>
                            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                                I am a <strong>Prospective Computer Science Undergraduate</strong> and a self-taught technology advocate based in Chennai, India.
                            </p>
                            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                                My passion lies at the intersection of <strong>Software Engineering, Artificial Intelligence, and Product Design</strong>.
                                I have hands-on experience in full-stack development, AI-driven systems, and large-scale leadership roles.
                                I am driven to build scalable, ethical, and impact-driven technology solutions.
                            </p>

                            <div className="mt-8 pt-8 border-t border-white/5">
                                <h3 className="text-xl font-medium text-white mb-4">Education</h3>
                                <div className="mb-6">
                                    <h4 className="text-lg font-semibold text-white">The Schram Academy</h4>
                                    <p className="text-sm text-gray-500">Class XII (2024–2026) | Predicted: 83%</p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-white">Class X</h4>
                                    <p className="text-sm text-gray-500">2022–2024 | Computer Science Emphasis</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Skills (Clean Minimal List) */}
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/5">
                            <h3 className="text-xl font-medium text-white mb-6">Technical Arsenal</h3>

                            <div className="space-y-8">
                                <div>
                                    <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Languages</span>
                                    <div className="flex flex-wrap gap-2">
                                        {['Python', 'JavaScript', 'HTML/CSS', 'SQL'].map(s => (
                                            <span key={s} className="technical-skill-tag">{s}</span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Web & AI</span>
                                    <div className="flex flex-wrap gap-2">
                                        {['React', 'Next.js', 'TensorFlow', 'NLP (BERT)', 'Three.js'].map(s => (
                                            <span key={s} className="technical-skill-tag">{s}</span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Tools</span>
                                    <div className="flex flex-wrap gap-2">
                                        {['Git', 'Vercel', 'DaVinci Resolve', 'Figma'].map(s => (
                                            <span key={s} className="technical-skill-tag">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
