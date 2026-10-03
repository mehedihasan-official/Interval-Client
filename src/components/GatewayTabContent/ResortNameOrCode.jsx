import { useContext, useState } from "react"; // SLOW-MODE (remove later)
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { AuthContext } from "../../providers/AuthProvider";
import { runSlowModeAction } from "../../utils/slowMode.jsx"; // SLOW-MODE (remove later)

const ResortNameOrCode = () => {
  const { allResortData } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook for navigation
  const [resortInput, setResortInput] = useState(""); // State to manage resort name or code input

  // Handle resort input change
  const handleResortInputChange = (e) => {
    setResortInput(e.target.value);
  };

  // Handle search functionality
  const handleSearch = () => {
    console.log("Resort Input:", resortInput);
    console.log("All Resort Data:", allResortData);

    // Check if resort input is empty
    if (!resortInput.trim()) {
      alert("Please enter a resort name or code.");
      return;
    }

    // Filter resorts based on the resort input (matches resortName or symbol)
    const filteredResorts = allResortData.filter(
      (resort) =>
        resort.resortName.toLowerCase().includes(resortInput.toLowerCase()) ||
        resort.symbol.toLowerCase().includes(resortInput.toLowerCase())
    );

    console.log("Filtered Resorts:", filteredResorts);

    // Navigate to the SearchPage with the filtered results
    if (filteredResorts.length === 0) {
      alert("No matching resorts found.");
    } else {
      runSlowModeAction("search", () => // SLOW-MODE (remove later)
        navigate("/search", { state: { results: filteredResorts } }) // SLOW-MODE (remove later)
      ); // SLOW-MODE (remove later)
    }
  };

  return (
    <div className="mt-8">
      {/* Resort Name or Code Input */}
      <label
        htmlFor="resortInput"
        className="block text-gray-700 font-medium mb-2"
      >
        Resort Name or Code
      </label>
      <input
        id="resortInput"
        type="text"
        placeholder="Enter resort name or code"
        className="input input-bordered w-full"
        value={resortInput}
        onChange={handleResortInputChange}
      />

      {/* Submit Button */}
      <button
        className="w-full bg-blue-500 rounded text-white font-medium py-3 mt-6 hover:bg-blue-600"
        onClick={handleSearch}
      >
        Find Resort
      </button>
    </div>
  );
};

export default ResortNameOrCode;
