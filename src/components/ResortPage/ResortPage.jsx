import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import ResortCard from "../ResortCard";
import Loading from "../Loading";

const ResortPage = () => {
  const { id } = useParams(); // `id` can be country or region
  const [filteredResorts, setFilteredResorts] = useState([]);
  const { allResortData, loading } = useContext(AuthContext); // Accessing resort data from AuthContext

  useEffect(() => {
    if (allResortData?.length) {
      // Filter resorts by either country or region
      const filtered = allResortData.filter(
        (resort) => resort.country === id || resort.region === id
      );
      setFilteredResorts(filtered);
    }
  }, [id, allResortData]);

  if (loading) {
    return <Loading />; // Display the loading spinner while data is being fetched
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold text-center my-8 text-[#18294B]">{id} Resorts</h1>
      
      {filteredResorts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResorts.map((resort) => (
            <Link to={`/single-resort-page/${resort._id}`} key={resort._id}>
              <ResortCard resort={resort} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <p className="text-lg font-medium">No resorts found in this location.</p>
          <Link to="/resort-directory" className="mt-4 text-blue-600 hover:underline font-bold">Return to Directory</Link>
        </div>
      )}
    </div>
  );
};

export default ResortPage;
