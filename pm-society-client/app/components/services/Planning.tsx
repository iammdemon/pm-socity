import localFont from "next/font/local";

const bonVivant = localFont({
  src: '../../../public/fonts/BonVivantSerifBold.ttf',
});

const Planning = () => {
  const process = [
    { step: '01', title: 'Enroll', description: 'Join our program and kickstart your project management journey.' },
    { step: '02', title: 'Learn', description: 'Master key skills through interactive, expert-designed courses.' },
    { step: '03', title: 'Coach', description: 'Receive personalized guidance from experienced PMP coaches.' },
    { step: '04', title: 'Mentor', description: 'Build confidence with one-on-one mentorship for exam success.' },
    { step: '05', title: 'Thrive', description: 'Earn your PMP certification and excel in your career.' },
  ];

  return (
    <div>
      {/* Process Section */}
      <section className="py-16 bg-[#ECE8E1]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`${bonVivant.className} text-2xl md:text-4xl font-black text-black mb-4`}>
                Our Proven Process
              </h2>
              <p className="text-gray-600 text-lg">
                A transformative journey to project management excellence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {process.map((item, index) => (
                <div key={index} className="text-center relative">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-black transform -translate-x-20"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Planning;