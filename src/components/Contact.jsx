import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiGithub } from 'react-icons/fi';

const Contact = () => {
    return (
        <section id="contact" className="section py-20 min-h-[60vh] flex items-center justify-center">
            <div className="container max-w-2xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold mb-6">Let's Connect</h2>
                    <p className="text-xl text-gray-400 mb-10">
                        Currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div className="flex justify-center gap-8 mb-12">
                        <a
                            href="mailto:tussharshibukumarharini@gmail.com"
                            className="p-4 glass-card rounded-full text-white hover:text-purple-400 hover:scale-110 transition-all"
                            aria-label="Email"
                        >
                            <FiMail size={28} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/tussharshibukumarharini"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 glass-card rounded-full text-white hover:text-blue-400 hover:scale-110 transition-all"
                            aria-label="LinkedIn"
                        >
                            <FiLinkedin size={28} />
                        </a>
                        <a
                            href="https://github.com/deitussharrr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 glass-card rounded-full text-white hover:text-gray-400 hover:scale-110 transition-all"
                            aria-label="GitHub"
                        >
                            <FiGithub size={28} />
                        </a>
                    </div>

                    <a
                        href="mailto:tussharshibukumarharini@gmail.com"
                        className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold text-white shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
                    >
                        Say Hello
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
