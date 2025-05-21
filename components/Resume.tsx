"use client";
import { motion } from "framer-motion";
import { ArrowDownCircle } from "lucide-react";

export default function Resume() {
  return (
    <div className=" px-6 py-6 mt-4 text-white text-center h-[300px]">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6"
      >
        Download My Resume
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-gray-300 mb-8"
      >
        Interested in my work? Download my resume to learn more about my skills & experience.
      </motion.p>

      <motion.a
        href="/resume.pdf"
        download="Resume.pdf"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold transition-all "
      >
        

          <ArrowDownCircle className="w-6 h-6 mr-2" />
        Download Resume
        
      </motion.a>
    </div>
  );
}
