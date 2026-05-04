import { useContext } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const ResortDirectory = () => {
  const { allResortData } = useContext(AuthContext);
  const navigate = useNavigate();

  // Dynamically extract unique countries from allResortData
  const countries = allResortData
    ? [
        ...new Set(
          allResortData.map((resort) => resort.country).filter(Boolean),
        ),
      ].sort()
    : [];

  const handleCountryClick = (country) => {
    // Find the country in allResortData
    const countryData = allResortData?.find(
      (resort) => resort.country === country,
    );

    if (countryData && countryData.region?.length > 0) {
      // If the country has regions, navigate to the Region page
      navigate(`/region/${encodeURIComponent(country)}`);
    } else {
      // Otherwise, navigate to the Resort page
      navigate(`/resort-page/${encodeURIComponent(country)}`);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-[#0077BE] mb-8 border-b pb-4">
        Resort Directory
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.map((country, index) => (
          <div
            key={index}
            onClick={() => handleCountryClick(country)}
            className="bg-white border rounded-xl p-5 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex justify-between items-center group"
          >
            <span className="text-lg font-medium text-gray-700 group-hover:text-blue-600">
              {country}
            </span>
            <IoIosArrowForward className="text-xl text-orange-500 group-hover:translate-x-1 transition-transform" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResortDirectory;
