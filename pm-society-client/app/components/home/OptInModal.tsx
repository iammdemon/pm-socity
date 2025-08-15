'use client';

import React, { useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaSpinner, FaTimes } from 'react-icons/fa';


interface OptInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

export default function OptInModal({ isOpen, onClose }: OptInModalProps) {
  const [form, setForm] = useState({ name: '', email: '', interest: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    setTimeout(() => {
      setStatus('success');
      alert('Thanks for signing up!');
      setTimeout(() => {
        setForm({ name: '', email: '', interest: '' });
        setStatus('idle');
        onClose(); // Close modal after success
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 md:p-12 max-w-3xl w-full mx-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Subtle Background Image */}
            <div className="absolute inset-0 opacity-10">
          
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-cyan-200 dark:from-blue-900 dark:to-cyan-900" />
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-cyan-400"
            >
              <FaTimes className="h-6 w-6" />
            </button>

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Elevate Your Career with The PM Society! 
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Join our community of project professionals and get exclusive access to resources, mentorship, and certification support. 
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-1 text-sm text-gray-900 dark:text-white">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-1 text-sm text-gray-900 dark:text-white">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400"
                    />
                  </div>
                </div>
                
                <motion.button
                  type="submit"
                  disabled={status === 'submitting' || status === 'success'}
                  className="w-full flex items-center justify-center gap-2 bg-black text-white font-semibold py-3 rounded-md disabled:opacity-50"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {status === 'submitting' && (
                    <>
                      <FaSpinner className="animate-spin" />
                      Submitting...
                    </>
                  )}
                  {status === 'success' && (
                    <>
                      <FaCheckCircle />
                      Submitted!
                    </>
                  )}
                  {status === 'idle' && 'Get Started Today'}
                </motion.button>
                <p className="text-xs text-center text-gray-600 dark:text-gray-300">
                  By submitting, you agree to our{' '}
                  <a href="#" className="font-medium dark:text-cyan-400 hover:underline">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="#" className="font-medium dark:text-cyan-400 hover:underline">
                    Terms of Service
                  </a>.
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

