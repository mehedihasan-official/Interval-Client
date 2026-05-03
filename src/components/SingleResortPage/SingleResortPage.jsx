import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import TabContent from "./TabContent/TabContent";
import ExchangeGetaways from "./ExchangeGetaways/ExchangeGetaways";
import Loading from "../Loading";

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
            // Conditionally include images
            const images = [foundResort.img, foundResort.img2, foundResort.img3];
            if (foundResort.img4) {
                images.push(foundResort.img4);
            }
            setImages(images);
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

  if (loading || !resort) {
    return <Loading />; // Show the Loading component while data is being fetched
  }

  const { resortName, location, symbol } = resort;

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-6xl">
      {/* Image Carousel */}
      <div className="my-6">
        <div className="relative group">
          <img
            src={images[currentImage]}
            alt="Resort"
            className="w-full h-[300px] md:h-[450px] object-cover rounded-lg shadow-md transition-all duration-500"
          />
          
          {/* Navigation Arrows */}
          <button 
            onClick={() => setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Thumbnails */}
          <div className="flex justify-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 md:w-20 md:h-20 flex-shrink-0 object-cover cursor-pointer rounded-md border-2 transition-all ${
                  index === currentImage ? "border-blue-500 scale-105" : "border-gray-300 hover:border-blue-300"
                }`}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Resort Info */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl text-[#0077be] font-bold mb-2">{resortName}</h1>
            <p className="text-gray-600 text-lg flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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
      <div className="flex items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="mt-5 bg-blue-500 text-white px-5 py-2 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default SingleResortPage;
