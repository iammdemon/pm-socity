'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import localFont from 'next/font/local';

const bonVivant = localFont({
  src: '../../../public/fonts/BonVivantSerifBold.ttf',})

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Senior Project Manager',
    company: 'TechCorp Inc.',
    imageUrl:
      'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=300',
    quote:
      'The PMP training from TPMS was instrumental in my career growth. I passed my exam on the first attempt and have since been promoted twice. Their mentorship program continues to guide my professional development.',
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Program Director',
    company: 'Global Solutions',
    imageUrl:
      'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=300',
    quote:
      'As someone who had been in project management for years, I was skeptical about what more I could learn. The executive coaching at TPMS transformed my leadership approach and helped me secure a director-level position.',
  },
  {
    id: 3,
    name: 'Priya Patel',
    role: 'PMO Lead',
    company: 'FinTech Innovations',
    imageUrl:
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
    quote:
      "The mentorship I received through TPMS gave me the confidence to lead our company's PMO transformation. Their practical, real-world approach to project management challenges is refreshing and effective.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const pauseAuto = () => {
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  return (
    <section className=" text-black py-20 px-6 bg-[#F8EEEA]">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className={`text-3xl md:text-5xl font-extrabold mb-4 ${bonVivant.className}`}>Success Stories</h2>
        <p className="text-lg  mb-12">
          Hear from professionals who have transformed their careers with TPMS.
        </p>

        <div className="relative bg-white backdrop-blur-md rounded-xl p-8 md:p-12 shadow-2xl">
          <div className="transition-opacity duration-700 ease-in-out">
            <p className="text-xl italic mb-8">&quot;{testimonials[index].quote}&quot;</p>
              <Image
                src={testimonials[index].imageUrl}
                alt={testimonials[index].name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-[#161819] flex justify-center mx-auto mb-4 transition-transform duration-500 hover:scale-110"
              />
              <div className="text-center">
                <h4 className="font-semibold text-lg">{testimonials[index].name}</h4>
                <p className="text-sm ">
                  {testimonials[index].role}, {testimonials[index].company}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => {
                pauseAuto();
                setIndex((index - 1 + testimonials.length) % testimonials.length);
              }}
              className="text-black hover:scale-110 transition-transform"
              aria-label="Previous"
            >
              ◀
            </button>
            <button
              onClick={() => {
                pauseAuto();
                setIndex((index + 1) % testimonials.length);
              }}
              className="text-black hover:scale-110 transition-transform"
              aria-label="Next"
            >
              ▶
            </button>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === index ? 'bg-black w-6' : 'bg-white/30'
                }`}
              ></span>
            ))}
          </div>
        </div>
     
    </section>
  );
}