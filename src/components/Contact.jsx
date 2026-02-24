import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiGithub, FiSend, FiCheck, FiUser, FiMessageSquare, FiAlertCircle } from 'react-icons/fi';
import { supabase } from '../supabaseClient';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const { error: supabaseError } = await supabase
            .from('contact_messages')
            .insert([{
                name: formData.name,
                email: formData.email,
                message: formData.message
            }]);

        if (supabaseError) {
            setError(supabaseError.message);
            setIsSubmitting(false);
            return;
        }

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });

        setTimeout(() => setIsSubmitted(false), 3000);
    };

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

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 mb-10 text-left">
                        <div className="space-y-6">
                            {error && (
                                <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                                    <FiAlertCircle /> {error}
                                </div>
                            )}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                    <FiUser className="inline mr-2" />Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    <FiMail className="inline mr-2" />Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                    <FiMessageSquare className="inline mr-2" />Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                                    placeholder="Your message..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-bold text-white shadow-lg hover:shadow-purple-500/50 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="animate-spin">⟳</span> Sending...
                                    </>
                                ) : isSubmitted ? (
                                    <>
                                        <FiCheck /> Message Sent!
                                    </>
                                ) : (
                                    <>
                                        <FiSend /> Send Message
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

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
