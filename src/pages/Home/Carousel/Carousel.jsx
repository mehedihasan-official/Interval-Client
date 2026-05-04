import { useEffect, useState } from "react";

// Desktop slider images (940x296)
const desktopSlides = [
  {
    type: 'custom',
    content: (
      <div className="w-full h-[320px] bg-[#6db3e2] flex items-center relative overflow-hidden">
        {/* Background graphics (simulated) */}
        <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-40">
          <img src="/Interval50-Pub.svg" alt="" className="w-full h-full object-contain object-right-bottom translate-x-1/4 translate-y-1/4 scale-150" />
        </div>
        
        <div className="max-w-[980px] mx-auto w-full px-12 relative z-10">
          <div className="max-w-[500px]">
            <h2 className="text-white text-4xl font-bold leading-tight mb-4">
              50 years of looking forward.
            </h2>
            <p className="text-white text-lg mb-8 leading-snug">
              Head to our 50th celebration page for the stories and experiences that brought us here.
            </p>
            <button className="bg-[#1a6fa8] hover:bg-[#155a8a] text-white font-bold py-3 px-8 rounded-md transition shadow-lg">
              Celebrate With Us
            </button>
          </div>
        </div>
      </div>
    )
  },
  {
    src: "https://www.intervalworld.com/iimedia/images/prelogin/Slider_940x296.jpg",
    alt: "Your next Getaway is here",
  },
  {
    src: "https://www.intervalworld.com/iimedia/images/slider/getaway_prelogin_slider_940x296.jpg",
    alt: "Getaways",
  },
];

// Mobile slider images (640x288)
const mobileSlides = [
  "https://www.intervalworld.com/iimedia/images/2026_Promotions/April_Exchange/US/Mobile_Slider_banner_640x288_English.jpg",
  "https://www.intervalworld.com/iimedia/images/Resortfee_transparency/launch-prelogin_slider_banner_mobile_640x288.jpg",
  "https://www.intervalworld.com/iimedia/images/mobile_slider/GetawaysMobileSLider640x288_FN.jpg",
  "https://www.intervalworld.com/iimedia/images/mobile_slider/cruise_mobileslider.jpg",
  "https://www.intervalworld.com/iimedia/images/prelogin/Mobile_pre-login_Slider_640x288.jpg",
];

const Carousel = () => {
  const [activeDesktop, setActiveDesktop] = useState(0);
  const [activeMobile, setActiveMobile] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDesktop((prev) => (prev + 1) % desktopSlides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMobile((prev) => (prev + 1) % mobileSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* DESKTOP SLIDER */}
      <div className="hidden md:block relative w-full overflow-hidden bg-gray-100">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeDesktop * 100}%)` }}
        >
          {desktopSlides.map((slide, i) => (
            <div key={i} className="w-full flex-shrink-0">
              {slide.type === 'custom' ? (
                slide.content
              ) : (
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-[320px] object-cover"
                />
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => setActiveDesktop((prev) => (prev === 0 ? desktopSlides.length - 1 : prev - 1))}
          className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition text-4xl font-light z-20"
        >
          &#10094;
        </button>
        <button
          onClick={() => setActiveDesktop((prev) => (prev + 1) % desktopSlides.length)}
          className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition text-4xl font-light z-20"
        >
          &#10095;
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {desktopSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveDesktop(i)}
              className={`w-3 h-3 rounded-full border-2 border-white transition-all ${
                activeDesktop === i ? "bg-[#18294B] border-[#18294B]" : "bg-transparent"
              }`}
            />
          ))}
        </div>
      </div>

      {/* MOBILE SLIDER */}
      <div className="md:hidden relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeMobile * 100}%)` }}
        >
          {mobileSlides.map((src, i) => (
            <div key={i} className="w-full flex-shrink-0">
              <img src={src} alt={`Slide ${i + 1}`} className="w-full object-cover" />
            </div>
          ))}
        </div>

        <button
          onClick={() => setActiveMobile((prev) => (prev === 0 ? mobileSlides.length - 1 : prev - 1))}
          className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm"
        >
          &#10094;
        </button>
        <button
          onClick={() => setActiveMobile((prev) => (prev + 1) % mobileSlides.length)}
          className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm"
        >
          &#10095;
        </button>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          {mobileSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveMobile(i)}
              className={`w-2.5 h-2.5 rounded-full border border-gray-400 transition-all ${activeMobile === i ? "bg-gray-700" : "bg-white/70"}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Carousel;
