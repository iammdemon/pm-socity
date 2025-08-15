import Image from "next/image";
import Link from "next/link";

import {
  LuFacebook,
  LuLinkedin,
  LuMail,
  LuMapPin,
  LuPhone,
  LuTwitter,
} from "react-icons/lu";

export default function Footer() {
  return (
    <footer className="bg-black  lg:px-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Logo and Description */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src="/logo-2.png"
                alt="The PM Society Logo"
                width={80}
                height={80}
                className="h-16 w-16  "
              />
            </Link>
            <p className="text-sm text-white mb-4">
              More Than a Certificate — Build a Career, Community, and Real
              Confidence.
            </p>
            <div className="flex space-x-4 text-white mt-4">
              <SocialIcon
                icon={<LuFacebook size={18} />}
                href="#"
                label="Facebook"
              />
              <SocialIcon
                icon={<LuLinkedin size={18} />}
                href="#"
                label="LinkedIn"
              />
              <SocialIcon
                icon={<LuTwitter size={18} />}
                href="#"
                label="Twitter"
              />
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 font-medium text-white">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/services">Services</FooterLink>

              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-white">
              <li>PMP Certification</li>
              <li>Executive Coaching</li>
              <li>Group Mentorship</li>
              <li>1-on-1 Guidance</li>
              <li>Corporate Training</li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-white">
              <li className="flex items-center">
                <LuPhone className="h-5 w-5  mr-2" />
                <span className="text-sm">832-535-5064</span>
              </li>
              <li className="flex items-center">
                <LuMail className="h-5 w-5  mr-2" />
                <span className="text-sm">contact@thepmsociety.com</span>
              </li>
              <li className="flex items-start">
                <LuMapPin className="h-5 w-5  mr-2 mt-0.5" />
                <span className="text-sm">
                  3120 Southwest Fwy Ste 101 #341344 Houston, Tx 77098-4520
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-sm /60 flex flex-col md:flex-row justify-center items-center text-white">
          <p>
            © {new Date().getFullYear()} The PM Society Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link href={href} className="text-sm hover: transition-colors">
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({
  icon,
  href,
  label,
}: {
  icon: React.ReactNode;
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="bg-white/10 hover:bg-[#38bdf8]/20 p-2 rounded-full transition-colors"
    >
      {icon}
    </Link>
  );
}
