import React from 'react';
import ResortImage from './ResortImage';

const ResortCard = ({resort}) => {
     return (
          <div>
               <div
            key={resort.id}
            className="border p-3 shadow-lg rounded-md overflow-hidden"
          >
            {/* Image */}
            <ResortImage
              src={resort.img}
              alt={resort.resortName || resort.name}
              seed={resort._id || resort.resortName || ""}
              className="w-full h-48 mb-3"
            />
            {/* Resort Name */}
            <h2 className="text-lg font-bold">{resort.resortName}</h2>
            {/* Location */}
            <p className="text-gray-600">{resort.location}</p>
            {/* Symbol */}
            <p className="font-bold uppercase border p-2 mt-3 inline-block">
              {resort.symbol}
            </p>
          </div>
          </div>
     );
};

export default ResortCard;