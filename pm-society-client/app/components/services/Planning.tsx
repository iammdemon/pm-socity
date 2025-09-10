import localFont from "next/font/local";

const bonVivant = localFont({
  src: "../../../public/fonts/BonVivantSerifBold.ttf",
});

const Planning = () => {
  const process = [
    {
      step: "01",
      title: "Initiate",
      description:
        "Enroll in a Society program, define your vision, and set the foundation for success.",
    },
    {
      step: "02",
      title: "Plan",
      description:
        "Strengthen skills through structured learning, resources, and peer engagement.",
    },
    {
      step: "03",
      title: "Execute",
      description:
        "Apply knowledge through coaching, practice, and real-world scenarios.",
    },
    {
      step: "04",
      title: "Monitor & Elevate",
      description:
        "Stay accountable and sharpen your edge with mentorship and growth strategies.",
    },
    {
      step: "05",
      title: "Close",
      description:
        "Transition into leadership, achieve career impact, and give back to the community.",
    },
  ];

  return (
    <div>
      {/* Process Section */}
      <section className="py-16 bg-[#ECE8E1]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2
                className={`${bonVivant.className} text-2xl md:text-4xl font-black text-black mb-4`}
              >
                The Society Lifecycle
              </h2>
              <p className="text-gray-600 text-lg">
                Our framework mirrors the PMI project lifecycle—so members not
                only prepare for certification but also experience the
                discipline in action.
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
                  <p className="text-gray-600">{item.description}</p>
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
