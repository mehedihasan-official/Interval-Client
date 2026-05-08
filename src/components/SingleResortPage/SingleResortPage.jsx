import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Loading from "../Loading";
import ResortImage from "../ResortImage";
import { resolveImage } from "../../utils/resortImages";
import ExchangeGetaways from "./ExchangeGetaways/ExchangeGetaways";
import TabContent from "./TabContent/TabContent";

const SingleResortPage = () => {
  const { id } = useParams(); // Resort ID from the URL
  const { allResortData, loading } = useContext(AuthContext); // Fetch resort data from context
  const navigate = useNavigate();

  const [resort, setResort] = useState(null);
  const [currentImage, setCurrentImage] = useState(0); // For image carousel
  const [activeTab, setActiveTab] = useState("description"); // For tab navigation

  // Declare images before useEffect
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (allResortData?.length) {
      // Find the resort with the matching ID
      const foundResort = allResortData.find((r) => r._id === id);
      setResort(foundResort);

      if (foundResort) {
        // Conditionally include images — resolve each to a fallback if empty/broken
        const seed = foundResort._id || foundResort.resortName || "";
        const rawImages = [foundResort.img, foundResort.img2, foundResort.img3];
        if (foundResort.img4) rawImages.push(foundResort.img4);
        // Filter out nullish slots but keep at least 1 image via resolveImage
        const resolvedImages = rawImages
          .filter((_, i) => i === 0 || rawImages[i]) // always keep slot 0
          .map((url, i) => resolveImage(url, `${seed}-${i}`));
        setImages(resolvedImages);
      }
    }
  }, [id, allResortData]);

  // Carousel Auto-Change Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval); // Cleanup
  }, [images]);

  if (loading) {
    return <Loading />; // Show the Loading component while data is being fetched
  }

  if (!resort) {
    return (
      <div className="container mx-auto p-4 md:p-8 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center max-w-md">
          <svg
            className="w-20 h-20 text-red-100 mx-auto mb-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Resort Not Found
          </h2>
          <p className="text-gray-500 mb-6">
            The resort you are looking for doesn't exist or has been removed
            from our directory.
          </p>
          <button
            onClick={() => navigate("/resort-directory")}
            className="w-full bg-[#0077be] text-white font-bold py-3 rounded-xl hover:bg-[#005a8e] transition-colors"
          >
            Back to Directory
          </button>
        </div>
      </div>
    );
  }

  const { resortName, location, symbol } = resort;

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-6xl">
      {/* Image Carousel */}
      <div className="my-6">
        <div className="relative group">
          <ResortImage
            src={images[currentImage]}
            alt="Resort"
            seed={`${resort._id || resort.resortName || ""}-${currentImage}`}
            className="w-full h-[300px] md:h-[450px] rounded-lg shadow-md transition-all duration-500"
          />

          {/* Navigation Arrows */}
          <button
            onClick={() =>
              setCurrentImage((prev) =>
                prev === 0 ? images.length - 1 : prev - 1,
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() =>
              setCurrentImage((prev) => (prev + 1) % images.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Thumbnails */}
          <div className="flex justify-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((img, index) => (
              <ResortImage
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                seed={`${resort._id || resort.resortName || ""}-thumb-${index}`}
                onClick={() => setCurrentImage(index)}
                className={`w-16 h-16 md:w-20 md:h-20 flex-shrink-0 cursor-pointer rounded-md border-2 transition-all ${
                  index === currentImage
                    ? "border-blue-500 scale-105"
                    : "border-gray-300 hover:border-blue-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Resort Info */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl text-[#0077be] font-bold mb-2">
              {resortName}
            </h1>
            <p className="text-gray-600 text-lg flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {location}
            </p>
          </div>
          <div className="flex-shrink-0">
            <p className="font-bold uppercase bg-blue-50 text-blue-700 px-4 py-2 rounded border border-blue-200 inline-block">
              Symbol: {symbol}
            </p>
          </div>
        </div>
      </div>

      {/* Exchange and Getaways */}
      <ExchangeGetaways resort={resort} />

      {/* Tab Content */}
      <TabContent
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        resort={resort}
      />

      {/* Back Button */}
      <div className="flex items-center justify-center pb-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#0077be] font-bold transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Results
        </button>
      </div>
    </div>
  );
};

export default SingleResortPage;