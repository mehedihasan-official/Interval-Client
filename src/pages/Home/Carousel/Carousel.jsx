import { useEffect, useState } from "react";
import slidImg1 from "../../../assets/images/home-slider-1.jpg";
import slidImg2 from "../../../assets/images/home-slider-2.jpg";
import slidImg3 from "../../../assets/images/home-slider-3.jpg";
import slidImg4 from "../../../assets/images/home-slider-4.jpg";
import bannerImg from "../../../assets/images/interval_travel-banner.jpg";

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(1);

  // Automatically switch slides every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === 5 ? 1 : prev + 1));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Function to handle navigation
  const goToSlide = (slide) => {
    setActiveSlide(slide);
  };

  const goNext = () => {
    setActiveSlide((prev) => (prev === 5 ? 1 : prev + 1));
  };

  const goPrev = () => {
    setActiveSlide((prev) => (prev === 1 ? 5 : prev - 1));
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Unified Carousel for both Mobile and Desktop */}
      <div className="relative group">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${(activeSlide - 1) * 100}%)` }}
        >
          {[bannerImg, slidImg1, slidImg2, slidImg3, slidImg4].map(
            (img, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                />
              </div>
            ),
          )}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 btn btn-circle bg-black/30 text-white border-none hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex"
        >
          ❮
        </button>
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 btn btn-circle bg-black/30 text-white border-none hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex"
        >
          ❯
        </button>

        {/* Dot Navigation */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
          {[1, 2, 3, 4, 5].map((slide) => (
            <button
              key={slide}
              onClick={() => goToSlide(slide)}
              className={`w-3 h-3 rounded-full transition-all ${
                activeSlide === slide
                  ? "bg-white scale-125 shadow-md"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
