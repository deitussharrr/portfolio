import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiArrowUpRight } from 'react-icons/fi';

const projects = [
    {
        title: 'Nous',
        subtitle: 'Emotion Journaling',
        description: 'AI-powered web app for mental well-being. Uses NLP & BERT for emotion scoring and privacy-focused data visualization.',
        tags: ['React', 'NLP', 'BERT'],
        link: 'https://thenous.vercel.app',
    },
    {
        title: "Politicon '25",
        subtitle: 'Official Conference Site',
        description: 'Designed and deployed the digital infrastructure for a large-scale MUN conference. Built with Next.js for high performance.',
        tags: ['Next.js', 'React', 'Design'],
        link: 'https://politicon25.vercel.app',
    },
    {
        title: 'Astraeus Media',
        subtitle: 'Founder & Director',
        description: 'Student-led media initiative serving startups. Directed cinematic content and managed end-to-end digital production.',
        tags: ['Media', 'Leadership', 'Strategy'],
        link: '#',
    },
];

const Projects = () => {
    return (
        <section id="projects" className="section">
            <div className="container max-w-5xl mx-auto px-6">
                <h2 className="text-4xl mb-12 text-white">Select Work</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.a
                            key={index}
                            href={project.link !== '#' ? project.link : undefined}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block group relative p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-300 ${project.link === '#' ? 'cursor-default' : 'cursor-pointer'}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
                                    <span className="text-sm text-purple-400 font-medium">{project.subtitle}</span>
                                </div>
                                {project.link !== '#' && (
                                    <FiArrowUpRight className="text-gray-500 group-hover:text-white transition-colors" size={24} />
                                )}
                            </div>

                            <p className="text-gray-400 mb-8 text-sm leading-relaxed">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-xs text-gray-500 border border-white/10 px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
