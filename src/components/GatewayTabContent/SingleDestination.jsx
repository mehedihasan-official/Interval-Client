import { useContext, useState } from "react"; // SLOW-MODE (remove later)
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { runSlowModeAction } from "../../utils/slowMode.jsx"; // SLOW-MODE (remove later)

const SingleDestination = () => {
  const { allResortData } = useContext(AuthContext);
  const navigate = useNavigate();

  const [destinationInput, setDestinationInput] = useState("");
  const [earliestDate, setEarliestDate] = useState("");
  const [latestDate, setLatestDate] = useState("");

  const handleDestinationInputChange = (e) => {
    setDestinationInput(e.target.value);
  };

  const handleEarliestDateChange = (e) => {
    setEarliestDate(e.target.value);
  };

  const handleLatestDateChange = (e) => {
    setLatestDate(e.target.value);
  };

  // Enhanced search function with better matching
  const performSearch = (query, data) => {
    if (!query.trim()) return [];

    const queryLower = query.toLowerCase();
    return data.filter((resort) => {
      const resortName = resort.resortName?.toLowerCase() || "";
      const placeName = resort.place_name?.toLowerCase() || "";
      const location = resort.location?.toLowerCase() || "";
      
      return (
        resortName.includes(queryLower) ||
        placeName.includes(queryLower) ||
        location.includes(queryLower)
      );
    });
  };

  const handleSearch = () => { // SLOW-MODE (remove later)
    if (!destinationInput.trim()) {
      alert("Please enter a destination");
      return;
    }

    const filteredResorts = performSearch(destinationInput, allResortData || []);

    runSlowModeAction("search", () => // SLOW-MODE (remove later)
      navigate("/search", { // SLOW-MODE (remove later)
        state: { results: filteredResorts }, // SLOW-MODE (remove later)
        search: `?q=${encodeURIComponent(destinationInput)}` + // SLOW-MODE (remove later)
                `${earliestDate ? `&from=${earliestDate}` : ''}` + // SLOW-MODE (remove later)
                `${latestDate ? `&to=${latestDate}` : ''}` // SLOW-MODE (remove later)
      }) // SLOW-MODE (remove later)
    ); // SLOW-MODE (remove later)
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mt-8 px-4">
      {/* Destination Input */}
      <label htmlFor="destination" className="block text-gray-700 font-medium mb-2">
        Destination
      </label>
      <input
        id="destination"
        type="text"
        placeholder="Enter city, resort name, or location"
        className="input input-bordered w-full"
        value={destinationInput}
        onChange={handleDestinationInputChange}
        onKeyPress={handleKeyPress}
      />

      {/* Travel Dates */}
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <div className="w-full">
          <label htmlFor="earliest-date" className="block text-gray-700 font-medium mb-2">
            Earliest Travel Date
          </label>
          <input 
            id="earliest-date" 
            type="date" 
            className="input input-bordered w-full"
            value={earliestDate}
            onChange={handleEarliestDateChange}
          />
        </div>
        <div className="w-full">
          <label htmlFor="latest-date" className="block text-gray-700 font-medium mb-2">
            Latest Travel Date
          </label>
          <input 
            id="latest-date" 
            type="date" 
            className="input input-bordered w-full"
            value={latestDate}
            onChange={handleLatestDateChange}
            min={earliestDate} // Ensure latest date isn't before earliest date
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        className="w-full bg-blue-500 rounded text-white font-medium py-3 mt-6 hover:bg-blue-600 transition-colors"
        onClick={handleSearch}
      >
        Find Getaway
      </button>
    </div>
  );
};

export default SingleDestination;