"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  BiAward,
  BiBookOpen,
  BiCheckCircle,
  BiTrendingUp,
} from "react-icons/bi";
import {motion} from "framer-motion";

import { FaBookOpen, FaChartLine, FaUsers, FaPlay } from "react-icons/fa";
import { GiSparkles } from "react-icons/gi";

import localFont from "next/font/local";
import CallToAction from "../components/home/CTA";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const bonVivant = localFont({
  src: "../../public/fonts/BonVivantSerifBold.ttf",
  weight: "700",
});

const CoreValues = [
  {
    icon: <BiCheckCircle className="h-8 w-8 text-blue-600" />,
    title: "Empowerment",
    description:
      "We equip project professionals with the tools, training, and support to lead confidently and grow at every stage.",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    icon: <GiSparkles className="h-8 w-8 text-purple-600" />,
    title: "Excellence",
    description:
      "We pursue the highest standards of excellence in everything we deliver, from training to coaching to community engagement.",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: <FaUsers className="h-8 w-8 text-emerald-600" />,
    title: "Community",
    description:
      "We foster an inclusive, supportive space where connection fuels growth and shared wisdom elevates everyone.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: <BiTrendingUp className="h-8 w-8 text-orange-600" />,
    title: "Client Impact",
    description:
      "We focus on real outcomes- helping professionals advance their careers and lead with purpose.",
    gradient: "from-orange-500 to-red-600",
  },
];

const teamMembers = [
  {
    name: "Olivia McGlothen",
    credentials: ["MBA", "M.Ed.", "PMP®", "CSM", "ATI"],
    role: "Founder & CEO",
    bio: "Blending hands-on leadership in ERP, agile transformation, and education, Olivia has built a community designed to support project professionals.",
    image:
      "/image/olivia.jpeg",
    achievements: "Strategic Leadership & Delivery",
  },
  {
    name: "Angela Ward",
    credentials: ["PMP®", "CSM", "ATI"],
    role: "Senior IT Project Manager & PMI ATP Instructor",
    bio: "With a background as a senior IT project manager, PMI ATP instructor, and entrepreneur, Angela leads Agile initiatives in the public sector while developing future project leaders.",
    image:
      "/image/angela.jpeg",
    achievements: "Agile Delivery & Instruction",
  },
  {
    name: "Toni Merrill",
    credentials: ["MBA", "ACC", "Prosci®"],
    role: "Certified Executive Coach & Change Management Practitioner",
    bio: "With a foundation in HR leadership and executive coaching and change management, Toni supports individuals in navigating transformation with authenticity.",
    image:
      "/image/tony.jpg",
    achievements: "Executive Coaching & Change Leadership",
  },
];

const certifications = [
  {
    name: "PMP 2025 Instructor",
    color: "bg-gradient-to-br from-blue-600 to-blue-800",
    icon: (
      <svg
        className="w-8 h-8 text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),

    image:
      "https://res.cloudinary.com/dggotjc19/image/upload/v1751971312/Picture1_uwdnnf.png",
  },
  {
    name: "Certified ScrumMaster",
    color: "bg-gradient-to-br from-purple-600 to-purple-800",
    icon: (
      <svg
        className="w-8 h-8 text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),

    image:
      "https://res.cloudinary.com/dggotjc19/image/upload/v1751971312/Picture2_ztxowv.png",
  },
  {
    name: "Project Management Professional (PMP)",
    color: "bg-gradient-to-br from-emerald-600 to-emerald-800",
    icon: (
      <svg
        className="w-8 h-8 text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),

    image:
      "https://res.cloudinary.com/dggotjc19/image/upload/v1751971312/Picture3_umpin5.png",
  },
  {
    name: "Associate Certified Coach (ACC)",
    color: "bg-gradient-to-br from-indigo-600 to-indigo-800",
    icon: (
      <svg
        className="w-8 h-8 text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
      </svg>
    ),

    image:
      "https://res.cloudinary.com/dggotjc19/image/upload/v1752432219/Picture2_dend0y.png", // Placeholder image URL
  },
  {
    name: "Certified Change Practitioner",
    color: "bg-gradient-to-br from-orange-600 to-orange-800",
    icon: (
      <svg
        className="w-8 h-8 text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),

    image:
      "https://res.cloudinary.com/dggotjc19/image/upload/v1752432219/Picture1_vapnqk.png", // Placeholder image URL
  },
];

const stats = [
  {
    number: "100+",
    label: "Hours Invested in Curriculum & Strategy",
    icon: <FaBookOpen className="h-6 w-6" />,
  },
  {
    number: "20+",
    label: "Combined Years of Experience",
    icon: <BiAward className="h-6 w-6" />,
  },
  {
    number: "200+",
    label: "Project Professionals by 2027",
    icon: <FaChartLine className="h-6 w-6" />,
  },
];

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const videoVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen  ">
        {/* Hero Section with Office Background */}
        <section className=" md:min-h-[100vh] relative pt-28 pb-10 md:pt-40 md:pb-20 overflow-hidden">
          {/* Office Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/image/about.jpeg"
              alt="Modern office workspace"
              fill
              className="object-cover"
              sizes="100vw"
              priority
              style={{ objectFit: "cover" }}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-[#0a192f]/50 z-10" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div
              className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="inline-flex items-center px-4 py-2  backdrop-blur-sm rounded-full mb-6 border border-white/20">
                <span className="text-sm font-medium text-white">
                  Transforming Project Management Excellence
                </span>
              </div>

              <h1
                className={`text-3xl md:text-7xl font-bold text-white mb-6  drop-shadow-lg ${bonVivant.className}`}
              >
                About The PM Society
              </h1>

              {/* Stats Row */}
              <div className="grid grid-cols-3  gap-6 mt-12">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl text-white mb-3 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300 border border-white/20">
                      {stat.icon}
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-white">
                      {stat.number}
                    </div>
                    <div className="text-sm text-slate-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20 relative ">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-12">
                <div className="group">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mr-4">
                      <BiBookOpen className="h-6 w-6 text-white" />
                    </div>
                    <h2
                      className={`${bonVivant.className} text-3xl md:text-5xl  text-black`}
                    >
                      Our Mission
                    </h2>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:translate-y-1">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Our mission is to help project professionals obtain
                      certifications and build real-world confidence, careers,
                      and community through training and support.
                    </p>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mr-4">
                      <BiTrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <h2
                      className={`${bonVivant.className} text-3xl md:text-5xl  text-black`}
                    >
                      Our Vision
                    </h2>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:translate-y-1">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Our vision is to become the leading space where project
                      professionals grow together, lead with confidence, and
                      build lasting careers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
                <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50">
                  <Image
                    src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Team collaboration"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2
                className={`${bonVivant.className} text-3xl md:text-5xl  text-black`}
              >
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600">
                These principles guide everything we do and how we serve our
                clients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {CoreValues.map((value, index) => (
                <div key={index} className="group relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${value.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`}
                  ></div>
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                    <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>

                    <div
                      className={`mt-6 w-full h-1 bg-gradient-to-r ${value.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <motion.div
            className="relative h-96 lg:h-[500px] max-w-4xl mx-auto mt-16 rounded-xl overflow-hidden shadow-xl"
            variants={videoVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            {/* Custom Play Button Overlay - Only shown before video starts */}
            {!hasStarted && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-10 bg-black/40 cursor-pointer"
                onClick={() => setHasStarted(true)}
                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                <motion.div
                  className="flex items-center justify-center w-20 h-20 bg-white/90 rounded-full shadow-2xl hover:bg-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaPlay className="w-8 h-8 text-blue-600 ml-1" />
                </motion.div>
              </motion.div>
            )}

            {/* YouTube Video Iframe */}
            <iframe
              src={`https://www.youtube.com/embed/8WTlff0TT_w?${hasStarted ? 'autoplay=1&mute=0' : 'mute=1'}&controls=1&modestbranding=1&rel=0&showinfo=0&fs=1&cc_load_policy=0&iv_load_policy=3&autohide=1`}
              allow="autoplay; encrypted-media; picture-in-picture"
              className="w-full h-full rounded-xl"
              frameBorder="0"
              allowFullScreen
              title="TPMS Training Video"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </motion.div>
        </section>

        {/* Team Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2
                className={`${bonVivant.className} text-3xl md:text-5xl text-black`}
              >
                Meet Our Expert Team
              </h2>
              <p className="text-lg text-gray-600 mt-3">
                Our team brings hands-on experience and active industry
                leadership. We are not just teaching project management; we are
                living it, and we are committed to empowering others to do the
                same.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500"></div>

                  <div className="relative flex flex-col bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 25vw"
                        style={{ objectFit: "cover" }}
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
                        {member.achievements}
                      </div>
                    </div>

                    <div className="flex flex-col flex-1 p-4 min-h-[320px]">
                      <h3 className="text-xl font-bold text-gray-900">
                        {member.name}
                      </h3>

                      {member.credentials && (
                        <div className="flex flex-wrap gap-2 my-2">
                          {member.credentials.map((cred, i) => (
                            <span
                              key={i}
                              className="bg-black text-white text-xs p-2 font-medium rounded-full"
                            >
                              {cred}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="text-black font-medium mb-2">
                        {member.role}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                        {member.bio}
                      </p>

                      <div className="flex-1"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center px-3 py-1.5 bg-slate-200 rounded-full mb-4 border border-orange-200/50">
                <BiAward className="h-4 w-4 text-black mr-2" />
                <span className="text-sm font-medium text-black">
                  Industry Recognized Certifications
                </span>
              </div>
              <h2
                className={`${bonVivant.className} text-2xl md:text-4xl text-black`}
              >
                Our Certifications
              </h2>
              <p className="text-lg text-gray-600">
                We are accredited by leading organizations and certified to
                deliver premium services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="group relative">
                  {/* Animated Background Glow */}
                  <div
                    className={`absolute inset-0 ${cert.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-all duration-700 scale-90 group-hover:scale-100`}
                  ></div>

                  {/* Main Card */}
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-5 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 min-h-[220px] flex flex-col items-center justify-center text-center group-hover:bg-white">
                    {/* Icon */}
                    <div
                      className={`relative w-16 h-16 ${cert.color} rounded-3xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                    >
                      {cert.image ? (
                        <Image
                          src={cert.image}
                          alt={cert.name}
                          width={64}
                          height={64}
                          layout="responsive"
                          className="w-full h-full object-cover rounded-3xl"
                        />
                      ) : (
                        cert.icon
                      )}

                      {/* Sparkle */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-ping"></div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {cert.name}
                    </h3>

                    <div
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 ${cert.color} rounded-full group-hover:w-14 transition-all duration-500`}
                    ></div>

                    <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-5 right-5 w-1 h-1 bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Floating dots */}
                  <div className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-700 animate-bounce"></div>
                  <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-700 animate-bounce delay-300"></div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <div className="inline-flex items-center px-5 py-2 bg-black text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <BiAward className="h-4 w-4 mr-2" />
                <span className="font-semibold text-sm">
                  All certifications maintained with continuous education
                </span>
              </div>
            </div>
          </div>
        </section>

        <CallToAction />
      </div>
      <Footer />
    </>
  );
}
