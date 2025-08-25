"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {

  Mail,
  Phone,
  Send,
  CheckCircle,
  User,
  MessageCircle,
  Sparkles,
 
} from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useSubmitContactFormMutation } from "../redux/services/contactApi";
import { ContactSection } from "../components/connect/ContactSection";
import { useForm } from "react-hook-form";

export interface ContactData {
  name: string;
  email: string;
  phone: string;
  message: string;
}



// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1]},
};

const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-white/20 rounded-full"
        initial={{
          x:
            Math.random() *
            (typeof window !== "undefined" ? window.innerWidth : 1200),
          y:
            Math.random() *
            (typeof window !== "undefined" ? window.innerHeight : 800),
        }}
        animate={{
          x:
            Math.random() *
            (typeof window !== "undefined" ? window.innerWidth : 1200),
          y:
            Math.random() *
            (typeof window !== "undefined" ? window.innerHeight : 800),
        }}
        transition={{
          duration: 20 + Math.random() * 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    ))}
  </div>
);

export default function ContactPage() {
const [submitContactForm] = useSubmitContactFormMutation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactData>();


  const onSubmit = async (data: ContactData) => {
    setIsLoading(true);
    console.log("Submitting contact form:", data);
    try {
      await submitContactForm(data).unwrap();
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error("Failed to submit contact form:", error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <Header />
      <div
        className="min-h-screen relative overflow-hidden"
        style={{ backgroundColor: "#333333" }}
      >
        <FloatingParticles />

        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30" />
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50 "
            style={{
              backgroundImage: `url('/image/connect.webp')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
        </motion.div>

        {/* Hero Section */}
        <section className="relative pt-16 pb-12 z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={fadeInUp}>
                <Badge
                  variant="outline"
                  className="my-6  bg-white/20 backdrop-blur-sm border-black/20 text-black hover:bg-white/30 transition-all duration-300 text-xs sm:text-sm py-1 sm:py-2 px-3 sm:px-4"
                >
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Get in Touch
                </Badge>
              </motion.div>

              <motion.h1
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-300 mb-4 sm:mb-6 leading-tight"
                variants={fadeInUp}
              >
                Let&apos;s Create Something Amazing Together
              </motion.h1>

              <motion.p
                className="  md:text-xl text-gray-300 max-w-xl sm:max-w-2xl mx-auto leading-relaxed"
                variants={fadeInUp}
              >
                Ready to transform your project management journey? Our expert
                team is here to guide you every step of the way.
              </motion.p>
            </motion.div>
          </div>
        </section>

       <section className="relative py-5 z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-7xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {/* Contact Form */}
              <motion.div variants={fadeInUp}>
                <Card className="bg-white/70 backdrop-blur-xl border-white/30 shadow-2xl w-full">
                  <CardContent className="p-6">
                    <AnimatePresence mode="wait">
                      {isSubmitted ? (
                        <motion.div
                          className="text-center py-12"
                          variants={scaleIn}
                          initial="initial"
                          animate="animate"
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          <motion.div
                            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black mb-6 sm:mb-8"
                            animate={{
                              scale: [1, 1.2, 1],
                              rotate: [0, 360],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              repeatDelay: 2,
                            }}
                          >
                            <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                          </motion.div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4">
                            Message Sent! 🚀
                          </h3>
                          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-lg">
                            Thanks for reaching out! We&apos;ll get back to you
                            within 24 hours.
                          </p>
                          <Button
                            onClick={() => setIsSubmitted(false)}
                            className="bg-black hover:bg-gray-800 text-white text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6"
                            size="lg"
                          >
                            Send Another Message
                          </Button>
                        </motion.div>
                      ) : (
                        <motion.form
                          onSubmit={handleSubmit(onSubmit)}
                          variants={fadeInUp}
                          initial="initial"
                          animate="animate"
                          exit={{ opacity: 0, y: -20 }}
                          className="space-y-1"
                        >
                          <CardHeader className="px-0 pt-0">
                            <CardTitle className="text-xl sm:text-3xl font-bold text-black flex items-center py-3.5">
                              <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-black mr-2 sm:mr-3" />
                              Step into the Society
                            </CardTitle>
                          </CardHeader>

                          {/* Name */}
                          <div>
                            <Label className="text-black flex items-center font-medium text-sm sm:text-base">
                              <User className="h-4 w-4 mr-2" />
                              Full Name *
                            </Label>
                            <Input
                              type="text"
                              {...register("name", {
                                required: "Name is required",
                              })}
                              className={`bg-white/50 py-4 sm:py-5 backdrop-blur-sm border-white/30 focus:border-black focus:ring-black/20 focus:bg-white/70 transition-all text-sm sm:text-base ${
                                errors.name ? "border-red-500" : ""
                              }`}
                              placeholder="John Doe"
                            />
                            {errors.name && (
                              <Alert variant="destructive" className="py-2">
                                <AlertDescription className="text-xs sm:text-sm">
                                  {errors.name.message}
                                </AlertDescription>
                              </Alert>
                            )}
                          </div>

                          {/* Email */}
                          <div>
                            <Label className="text-black flex items-center font-medium text-sm sm:text-base">
                              <Mail className="h-4 w-4 mr-2" />
                              Email Address *
                            </Label>
                            <Input
                              type="email"
                              {...register("email", {
                                required: "Email is required",
                                pattern: {
                                  value: /^\S+@\S+\.\S+$/,
                                  message: "Invalid email address",
                                },
                              })}
                              className={`bg-white/50 py-4 sm:py-5 backdrop-blur-sm border-white/30 focus:border-black focus:ring-black/20 focus:bg-white/70 transition-all text-sm sm:text-base ${
                                errors.email ? "border-red-500" : ""
                              }`}
                              placeholder="john@example.com"
                            />
                            {errors.email && (
                              <Alert variant="destructive" className="py-2">
                                <AlertDescription className="text-xs sm:text-sm">
                                  {errors.email.message}
                                </AlertDescription>
                              </Alert>
                            )}
                          </div>

                          {/* Phone (optional) */}
                          <div>
                            <Label className="text-black flex items-center font-medium text-sm sm:text-base">
                              <Phone className="h-4 w-4 mr-2" />
                              Phone Number
                            </Label>
                            <Input
                              type="tel"
                              {...register("phone")}
                              className="bg-white/50 py-4 sm:py-5 backdrop-blur-sm border-white/30 focus:border-black focus:ring-black/20 focus:bg-white/70 transition-all text-sm sm:text-base"
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>

                          {/* Message */}
                          <div>
                            <Label className="text-black flex items-center font-medium text-sm sm:text-base">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Message *
                            </Label>
                            <Textarea
                              rows={4}
                              {...register("message", {
                                required: "Message is required",
                              })}
                              className={`resize-none bg-white/50 py-4 sm:py-5 backdrop-blur-sm border-white/30 focus:border-black focus:ring-black/20 focus:bg-white/70 transition-all text-sm sm:text-base ${
                                errors.message ? "border-red-500" : ""
                              }`}
                              placeholder="Tell us about your project or how we can help you..."
                            />
                            {errors.message && (
                              <Alert variant="destructive" className="py-2">
                                <AlertDescription className="text-xs sm:text-sm">
                                  {errors.message.message}
                                </AlertDescription>
                              </Alert>
                            )}
                          </div>

                          {/* Submit Button */}
                          <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black hover:bg-gray-800 text-white text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6"
                            size="lg"
                          >
                            {isLoading ? (
                              <>
                                <motion.div
                                  className="h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                />
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                Send Message
                              </>
                            )}
                          </Button>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>

              <ContactSection />
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
