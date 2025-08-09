"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HomePage = () => {
  const [stats, setStats] = useState({ projects: 0, clients: 0, years: 0 });

  useEffect(() => {
    // Simulate animated stats
    const interval = setInterval(() => {
      setStats((prev) => ({
        projects: Math.min(prev.projects + 1, 3),
        clients: Math.min(prev.clients + 1, 3),
        years: Math.min(prev.years + 1, 1),
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <main className="bg-gray-50 relative overflow-hidden">
      {/* Background Animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 opacity-20"
        animate={{ scale: 1.5 }}
        transition={{ duration: 15, ease: "easeInOut", loop: Infinity }}
      />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-md py-4 sticky top-0 z-50"
      >
        <div className="container mx-auto flex justify-between items-center px-6">
          <span className="text-2xl font-bold text-gray-800">My Portfolio</span>
          <nav className="hidden md:flex space-x-6">
            <a href="#about" className="text-gray-600 hover:text-gray-800">
              About
            </a>
            <a href="#skills" className="text-gray-600 hover:text-gray-800">
              Skills
            </a>
            <a href="#projects" className="text-gray-600 hover:text-gray-800">
              Projects
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-gray-800"
            >
              Testimonials
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-800">
              Contact
            </a>
          </nav>
          <button onClick={handleLogout} className="text-gray-800">
            Logout
          </button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white py-20 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto text-center px-6"
        >
          <h1 className="text-5xl font-bold">
            {`Hi, I'm`} <span className="text-yellow-300">Sahil</span>
          </h1>
          <p className="mt-4 text-lg">
            A passionate developer and designer, creating modern web
            experiences.
          </p>
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 inline-block bg-yellow-300 text-blue-800 px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-400"
          >
            View My Work
          </motion.a>
        </motion.div>
      </section>

      {/* Stats Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="bg-white py-16 relative"
      >
        <div className="container mx-auto px-6 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Completed Projects", value: stats.projects },
              { label: "Happy Clients", value: stats.clients },
              { label: "Years of Experience", value: stats.years },
            ].map((stat, index) => (
              <motion.div variants={fadeIn} key={index} className="p-4">
                <h3 className="text-4xl font-bold text-blue-600">
                  {stat.value}
                </h3>
                <p className="text-gray-600 mt-2">{stat.label}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <motion.div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${stat.value * 2}%` }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      {/* Projects Section */}
      <motion.section
        id="skills"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="bg-gray-100 py-16 relative"
      >
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-gray-800"
          >
            My Skills
          </motion.h2>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              {
                name: "HTML5",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
              },
              {
                name: "CSS3",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
              },
              {
                name: "JavaScript",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
              },
              {
                name: "React",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
              },
              {
                name: "Node.js",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
              },
              {
                name: "Git",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
              },
            ].map((skill, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{
                  scale: 1.1,
                  rotateY: 20, // Rotate on hover for 3D effect
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="bg-white p-6 rounded-lg shadow-md transform transition-all"
              >
                <div className="relative transform perspective-800px">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="h-12 mx-auto transition-transform transform hover:scale-110"
                  />
                  <p className="text-gray-600 mt-4">{skill.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="bg-gray-100 py-16 relative"
      >
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-gray-800"
          >
            My Projects
          </motion.h2>
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {[
              { title: "Project One", description: "An amazing project!" },
              { title: "Project Two", description: "Another great project!" },
              { title: "Project Three", description: "A fantastic design!" },
            ].map((project, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold text-gray-800">
                  {project.title}
                </h3>
                <p className="text-gray-600 mt-2">{project.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        id="testimonials"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="bg-white py-16 relative"
      >
        <div className="container mx-auto px-6">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-gray-800 text-center"
          >
            Testimonials
          </motion.h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { quote: "Incredible developer!", author: "John Doe" },
              { quote: "A pleasure to work with!", author: "Jane Smith" },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="p-6 bg-gray-100 rounded-lg shadow-md">
                <p className="italic text-gray-600">{`"${testimonial.quote}"`}</p>
                <p className="mt-4 text-gray-800 font-bold">
                  - {testimonial.author}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      {/* Contact Section */}
      <motion.section
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="bg-gray-100 py-16 relative"
      >
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-gray-800"
          >
            Get In Touch
          </motion.h2>
          <motion.p variants={fadeIn} className="text-lg text-gray-600 mt-4">
            {`I'd love to hear from you! Whether it's a project or a question,
            feel free to reach out.`}
          </motion.p>
          <form className="mt-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full p-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full p-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                className="w-full p-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-lg hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </motion.section>
      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-gray-800 text-white py-4 text-center"
      >
        <p>&copy; 2024 Sahil. All Rights Reserved.</p>
      </motion.footer>
    </main>
  );
};

export default HomePage;
