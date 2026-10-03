import { useContext, useState } from "react"; // SLOW-MODE (remove later)
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { runSlowModeAction } from "../../utils/slowMode.jsx"; // SLOW-MODE (remove later)

const SearchAllDestinations = () => {
  const { allResortData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [destinationInput, setDestinationInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Enhanced search function with exact matching for resortName
  const performSearch = (query, data) => {
    if (!query.trim()) return [];

    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter(word => word.length > 0);
    
    return data.map(item => {
      let score = 0;
      let matchedWords = [];
      let matchedFields = [];
      
      // Check for exact match in resortName first (highest priority)
      const resortNameLower = item.resortName?.toLowerCase() || '';
      if (resortNameLower === queryLower) {
        score += 10; // Very high score for exact match
        matchedWords.push(queryLower);
        matchedFields.push('resortName-exact');
      }
      
      // Check each query word against relevant fields
      queryWords.forEach(word => {
        // Resort name partial match
        if (resortNameLower.includes(word)) {
          score += 3;
          matchedWords.push(word);
          matchedFields.push('resortName');
        }
        
        // Location matches
        const locationLower = item.location?.toLowerCase() || '';
        if (locationLower.includes(word)) {
          score += 2;
          if (!matchedWords.includes(word)) matchedWords.push(word);
          matchedFields.push('location');
        }
        
        // City matches
        const cityLower = item.city?.toLowerCase() || '';
        if (cityLower.includes(word)) {
          score += 2;
          if (!matchedWords.includes(word)) matchedWords.push(word);
          matchedFields.push('city');
        }
        
        // Country matches
        const countryLower = item.country?.toLowerCase() || '';
        if (countryLower.includes(word)) {
          score += 1;
          if (!matchedWords.includes(word)) matchedWords.push(word);
          matchedFields.push('country');
        }
      });
      
      return { 
        ...item, 
        score, 
        matchedWordsCount: matchedWords.length,
        matchedFields: [...new Set(matchedFields)] // Remove duplicates
      };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => {
      // Highest priority to exact matches
      const aExact = a.matchedFields.includes('resortName-exact');
      const bExact = b.matchedFields.includes('resortName-exact');
      if (aExact && !bExact) return -1;
      if (bExact && !aExact) return 1;
      
      // Then sort by score (descending)
      if (b.score !== a.score) return b.score - a.score;
      
      // Then by number of matched words
      if (b.matchedWordsCount !== a.matchedWordsCount) {
        return b.matchedWordsCount - a.matchedWordsCount;
      }
      
      // Then prioritize resort name matches
      const aNameMatch = a.matchedFields.some(f => f.includes('resortName'));
      const bNameMatch = b.matchedFields.some(f => f.includes('resortName'));
      if (bNameMatch && !aNameMatch) return 1;
      if (aNameMatch && !bNameMatch) return -1;
      
      return 0;
    });
  };

  // Generate search suggestions
  const generateSuggestions = (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const results = performSearch(query, allResortData);
    const uniqueSuggestions = [];
    
    // Get unique resort names, locations, cities that match
    results.slice(0, 5).forEach(item => {
      if (item.resortName && !uniqueSuggestions.includes(item.resortName)) {
        uniqueSuggestions.push(item.resortName);
      }
      if (item.location && !uniqueSuggestions.includes(item.location)) {
        uniqueSuggestions.push(item.location);
      }
      if (item.city && !uniqueSuggestions.includes(item.city)) {
        uniqueSuggestions.push(item.city);
      }
    });
    
    setSuggestions(uniqueSuggestions);
  };

  // Handle destination input change
  const handleDestinationInputChange = (e) => {
    const value = e.target.value;
    setDestinationInput(value);
    generateSuggestions(value);
    setShowSuggestions(true);
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => { // SLOW-MODE (remove later)
    setDestinationInput(suggestion);
    setShowSuggestions(false);
    // Trigger search immediately when suggestion is clicked
    const filteredResorts = performSearch(suggestion, allResortData);
    runSlowModeAction("search", () => // SLOW-MODE (remove later)
      navigate("/search", { // SLOW-MODE (remove later)
        state: { results: filteredResorts }, // SLOW-MODE (remove later)
        search: `?q=${encodeURIComponent(suggestion)}` // SLOW-MODE (remove later)
      }) // SLOW-MODE (remove later)
    ); // SLOW-MODE (remove later)
  };

  // Handle search functionality
  const handleSearch = () => { // SLOW-MODE (remove later)
    if (!destinationInput.trim()) {
      alert("Please enter a destination.");
      return;
    }

    const filteredResorts = performSearch(destinationInput, allResortData);

    if (filteredResorts.length === 0) {
      alert("No matching destinations found.");
    } else {
      runSlowModeAction("search", () => // SLOW-MODE (remove later)
        navigate("/search", { // SLOW-MODE (remove later)
          state: { results: filteredResorts }, // SLOW-MODE (remove later)
          search: `?q=${encodeURIComponent(destinationInput)}` // SLOW-MODE (remove later)
        }) // SLOW-MODE (remove later)
      ); // SLOW-MODE (remove later)
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mt-8 relative">
      {/* Destination Input */}
      <label htmlFor="destination" className="block text-gray-700 font-medium mb-2">
        Destination
      </label>
      <div className="relative">
        <input
          id="destination"
          type="text"
          placeholder="Enter resort name, city, or location"
          className="input input-bordered w-full"
          value={destinationInput}
          onChange={handleDestinationInputChange}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Submit Button */}
      <button
        className="w-full bg-blue-500 rounded text-white font-medium py-3 mt-6 hover:bg-blue-600"
        onClick={handleSearch}
      >
        Find Getaway
      </button>
    </div>
  );
};

export default SearchAllDestinations;