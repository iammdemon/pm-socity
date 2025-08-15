import AutoOptInModal from "./components/functions/AutoOptInModal";
import CTA from "./components/home/CTA";
import Hero from "./components/home/Hero";

import OurApproach from "./components/home/OurApproach";
import ParallaxSection from "./components/home/ParallaxSection";
import SocietyStandard from "./components/home/SocietyStandard";

import VideoSection from "./components/home/VideoSection";
import WhatWeOffer from "./components/home/WhatWeOffer";
import WhoWeHelp from "./components/home/WhoWeHelp";
import WhyChoose from "./components/home/WhyChoose";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div>
        <Hero />
        <WhatWeOffer />
        <ParallaxSection />
        <WhyChoose />
        <WhoWeHelp />
        <OurApproach />

        <VideoSection />
        <SocietyStandard/>

        <CTA />

        <AutoOptInModal />
      </div>
      <Footer />
    </>
  );
}
