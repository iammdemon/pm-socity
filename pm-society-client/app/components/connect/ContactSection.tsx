import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, Facebook, Linkedin } from 'lucide-react';


const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const ContactSection = () => {
  return (
    <motion.div variants={fadeInUp} initial="initial" animate="animate">
      <Card className="bg-white/70 backdrop-blur-xl border-white/30 shadow-xl w-full max-w-2xl mx-auto">
        <CardContent className="p-4 sm:p-7">
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-3 text-center sm:text-left">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed text-center sm:text-left">
            Ready to elevate your project management skills? Let&apos;s connect.
          </p>

          <div className="space-y-3">
            {[
              {
                icon: Mail,
                title: "Email",
                content: "contact@thepmsociety.com",
                href: "mailto:contact@thepmsociety.com",
                hover: "hover:bg-blue-600",
              },
              {
                icon: Phone,
                title: "Phone",
                content: "832-535-5064",
                href: "tel:8325355064",
                hover: "hover:bg-green-600",
              },
              {
                icon: Instagram,
                title: "Instagram",
                content: "@thepmsociety",
                href: "https://www.instagram.com/thepmsociety",
                hover: "hover:bg-purple-600",
              },
              {
                icon: Facebook,
                title: "Facebook",
                content: "@thepmsociety",
                href: "https://www.facebook.com/thepmsociety",
                hover: "hover:bg-blue-600",
              },
              {
                icon: Linkedin,
                title: "LinkedIn",
                content: "@thepmsociety",
                href: "https://www.linkedin.com/company/thepmsociety",
                hover: "hover:bg-blue-800",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start group cursor-pointer"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <motion.div
                    className={`w-8 sm:w-10 h-8 sm:h-10 bg-black ${item.hover} rounded-lg flex items-center justify-center transition-colors`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <item.icon className="h-4 sm:h-5 w-4 sm:w-5 text-white" />
                  </motion.div>
                </div>
                <div className="ml-3">
                  <h3 className="text-base sm:text-lg font-semibold text-black mb-0.5">
                    {item.title}
                  </h3>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black transition-colors text-xs sm:text-sm"
                  >
                    {item.content}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};