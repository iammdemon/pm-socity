"use client";

import { motion } from "framer-motion";

const SocietyStandard = () => {
  return (
    <div className="w-full py-16 px-4 max-w-7xl mx-auto ">
      
      {/* Premium badge */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-white border border-stone-200 rounded-full px-6 py-3 shadow-lg">
          <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
          <span className="text-sm font-bold text-black tracking-wider uppercase">
            Premium Guarantee
          </span>
          <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Main content */}
      <motion.div 
        className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl border border-stone-200 overflow-hidden"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        whileHover={{ y: -5 }}
      >
        <div className="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 text-center space-y-6 sm:space-y-8 lg:space-y-10">
          
          {/* Headlines */}
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-black leading-tight"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              The Society
              <motion.div 
                className="w-12 sm:w-16 md:w-20 lg:w-24 h-0.5 sm:h-1 bg-black rounded-full mx-auto mt-1 sm:mt-2"
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ duration: 0.8, delay: 1.2 }}
              />
            </motion.h1>
            
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-black leading-tight"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              STANDARD
              <motion.div 
                className="w-16 sm:w-24 md:w-32 lg:w-40 h-1 sm:h-1.5 bg-black rounded-full mx-auto mt-1 sm:mt-2"
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ duration: 0.8, delay: 1.4 }}
              />
            </motion.h1>
          </div>

          {/* Content */}
          <motion.div 
            className="space-y-4 sm:space-y-6 max-w-xs sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed">
              At{" "}
              <motion.span 
                className="font-black text-black text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wider"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                TPMS
              </motion.span>
              , excellence isn&apos;t optional;
            </p>
            
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-black">
              it is{" "}
              <motion.span 
                className="bg-black text-white px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-md sm:rounded-lg inline-block shadow-lg text-base sm:text-lg md:text-xl lg:text-2xl"
                initial={{ rotate: -1 }}
                whileHover={{ rotate: 1, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                the standard
              </motion.span>.
            </p>
          </motion.div>

          {/* Promise section */}
          <motion.div 
            className="bg-gray-50 rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 md:p-8 border border-stone-200"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              <motion.div 
                className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white rounded-md sm:rounded-lg flex items-center justify-center">
                  <motion.div 
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-black text-center sm:text-left">Our Promise</h2>
            </motion.div>
            
            <motion.div 
              className="space-y-3 sm:space-y-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                If you don&apos;t pass the PMP exam on your first attempt, you can rejoin any future cohort at{" "}
                <br />
                <motion.span 
                  className="bg-black text-white px-2 sm:px-3 py-1 rounded-md sm:rounded-lg font-bold text-sm sm:text-base md:text-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  no additional cost
                </motion.span>.
              </p>
              <p className="text-sm sm:text-base text-gray-600 italic">We&apos;re committed to your success, every step of the way.</p>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10 lg:mt-12"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            
            <motion.div 
              className="bg-white border-2 border-stone-200 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg sm:col-span-1"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="text-2xl sm:text-3xl lg:text-4xl font-black text-black mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.0, type: "spring", stiffness: 500 }}
              >
                95%
              </motion.div>
              <div className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wide">First-time Pass Rate</div>
            </motion.div>
            
            <motion.div 
              className="bg-black text-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg sm:col-span-2 lg:col-span-1"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1.05 }}
              transition={{ delay: 2.2, type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.1, rotateY: 5 }}
            >
              <motion.div 
                className="text-2xl sm:text-3xl lg:text-4xl font-black mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.2, type: "spring", stiffness: 500 }}
              >
                100%
              </motion.div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wide">Money-back Guarantee</div>
            </motion.div>
            
            <motion.div 
              className="bg-white border-2 border-stone-200 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg sm:col-span-1 sm:mx-auto lg:mx-0 sm:max-w-xs lg:max-w-none"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="text-2xl sm:text-3xl lg:text-4xl font-black text-black mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.4, type: "spring", stiffness: 500 }}
              >
                24/7
              </motion.div>
              <div className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wide">Support Available</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default SocietyStandard;