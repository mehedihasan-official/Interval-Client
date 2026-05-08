import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResortImage from "../ResortImage";

// Points per night by unit type based on your provided data
const getPointsPerNight = (unitType) => {
  switch (unitType) {
    case "Studio":
      return 2000;
    case "1/1 Bed":
      return 3500; // Average of 3000-4000
    case "2/2 Bed":
      return 4500; // Average of 4000-5000
    case "3/3 Bed":
      return 6000; // Average of 5000-7000
    case "4/4 Bed":
      return 10000; // Average of 8000-12000
    default:
      return 2000;
  }
};

// Cash price per night by unit type
const getCashPricePerNight = (unitType) => {
  switch (unitType) {
    case "Studio":
      return 50;
    case "1/1 Bed":
      return 60;
    case "2/2 Bed":
      return 72;
    case "3/3 Bed":
      return 80;
    case "4/4 Bed":
      return 100;
    default:
      return 50;
  }
};

// Calculate total points for the stay
const calculatePoints = (unitType, nights) => {
  const pointsPerNight = getPointsPerNight(unitType);
  const totalPoints = pointsPerNight * nights;
  return { totalPoints, pointsPerNight };
};

// Calculate total cash price for the stay
const calculateCashPrice = (unitType, nights) => {
  const pricePerNight = getCashPricePerNight(unitType);
  const totalPrice = pricePerNight * nights;
  return { totalPrice, pricePerNight };
};

const UNIT_TYPES = ["Studio", "1/1 Bed", "2/2 Bed", "3/3 Bed", "4/4 Bed"];

const AvailableUnit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resort, searchParams } = location.state || {};
  const vacationType = searchParams?.vacationType || "Getaways";
  const isPoints = vacationType === "Exchange";

  const [selectedUnit, setSelectedUnit] = useState(null);

  // Theme colors
  const theme = {
    primary: "#18294B", // Deep Navy
    secondary: "#0077be", // Interval Blue
    accent: "#f39c12", // Professional Orange/Gold
    pointsBg: "bg-[#18294B]",
    cashBg: "bg-[#0077be]", // Changed from amber to a more professional blue
    pointsBorder: "border-[#18294B]",
    cashBorder: "border-[#0077be]",
    pointsText: "text-[#18294B]",
    cashText: "text-[#0077be]",
  };

  if (!resort || !searchParams) {
    return (
      <div className="p-6 text-center text-red-500 font-medium">
        Error: Missing booking data. Please go back and try again.
      </div>
    );
  }

  const { earliestDate, latestDate, adults, children } = searchParams;

  const nights = Math.max(
    1,
    Math.ceil(
      (new Date(latestDate) - new Date(earliestDate)) / (1000 * 60 * 60 * 24),
    ),
  );

  const handleSelectUnit = (unitType) => {
    const card = {
      unit: unitType,
      usage: new Date(earliestDate).getFullYear().toString(),
      status: "Available",
      size: `${unitType} | Full Kitchen | Sleeps ${
        unitType === "Studio"
          ? 2
          : unitType === "1/1 Bed"
            ? 4
            : unitType === "2/2 Bed"
              ? 6
              : 8
      } total`,
      startDate: earliestDate,
      endDate: latestDate,
      nights,
      vacationType,
    };

    if (isPoints) {
      const pointsInfo = calculatePoints(unitType, nights);
      card.points = pointsInfo.totalPoints;
      card.pointsPerNight = pointsInfo.pointsPerNight;
    } else {
      const cashInfo = calculateCashPrice(unitType, nights);
      card.price = cashInfo.totalPrice;
      card.pricePerNight = cashInfo.pricePerNight;
    }

    navigate("/checkout", { state: { resort, card, searchParams } });
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div
        className={`mb-8 p-6 rounded-2xl shadow-lg transition-all ${isPoints ? theme.pointsBg : theme.cashBg} text-white`}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
            {isPoints ? (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            )}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {isPoints ? "Points Exchange" : "Getaway Vacation"}
            </h1>
            <p className="text-sm opacity-90 font-medium">
              {isPoints
                ? "Redeem your Interval points for this exclusive stay"
                : "Book with our competitive member rates"}
            </p>
          </div>
        </div>
      </div>

      {/* Travel Info */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-800 text-lg">
            Reservation Details
          </h2>
          <span className="px-3 py-1 bg-blue-50 text-[#0077be] text-xs font-bold rounded-full uppercase">
            Confirmed Availability
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4">
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">
              Check-in
            </p>
            <p className="font-bold text-gray-800 mt-1">
              {new Date(earliestDate).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4">
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">
              Check-out
            </p>
            <p className="font-bold text-gray-800 mt-1">
              {new Date(latestDate).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4">
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">
              Duration
            </p>
            <p className="font-bold text-gray-800 mt-1">{nights} Nights</p>
          </div>
          <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4">
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">
              Occupancy
            </p>
            <p className="font-bold text-gray-800 mt-1">
              {adults + children} Guests
            </p>
          </div>
        </div>
      </div>

      {/* Resort Summary */}
      {resort && (
        <div className="w-full border border-gray-100 rounded-2xl overflow-hidden mb-8 shadow-sm bg-white">
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-56 h-48 sm:h-auto flex-shrink-0">
              <ResortImage
                src={resort.img}
                alt={resort.resortName}
                seed={resort._id || resort.resortName || ""}
                className="w-full h-48 sm:h-full"
              />
            </div>
            <div className="p-6 flex-grow flex flex-col justify-center">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {resort.resortName}
                  </h3>
                  <p className="text-gray-500 text-sm flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
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
                    {resort.location}
                  </p>
                </div>
                <span className="bg-gray-800 text-white px-3 py-1 rounded text-[10px] font-black tracking-widest uppercase">
                  {resort.symbol}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unit Cards */}
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-[#0077be] rounded-full"></span>
        Select Available Unit
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {UNIT_TYPES.map((unitType) => {
          const pts = isPoints ? calculatePoints(unitType, nights) : null;
          const cash = !isPoints ? calculateCashPrice(unitType, nights) : null;

          return (
            <div
              key={unitType}
              className={`group border-2 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-xl ${
                selectedUnit === unitType
                  ? isPoints
                    ? "border-[#18294B] ring-4 ring-[#18294B]/5"
                    : "border-[#0077be] ring-4 ring-[#0077be]/5"
                  : "border-white bg-white shadow-md hover:border-gray-200"
              }`}
              onClick={() => setSelectedUnit(unitType)}
            >
              {/* Card Header */}
              <div
                className={`py-4 px-4 text-white text-center font-bold tracking-wide uppercase text-sm ${isPoints ? theme.pointsBg : theme.cashBg} transition-colors group-hover:opacity-90`}
              >
                {unitType}
              </div>

              {/* Card Body */}
              <div className="p-6 bg-white">
                <div className="text-center mb-6">
                  {isPoints ? (
                    <>
                      <p className="text-3xl font-black text-[#18294B]">
                        {pts.totalPoints.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">
                        total points
                      </p>
                      <div className="mt-4 text-[11px] text-gray-500 bg-gray-50 rounded-lg p-3 border border-gray-100">
                        <span className="font-bold text-[#18294B]">
                          {pts.pointsPerNight.toLocaleString()}
                        </span>{" "}
                        pts/night × {nights} nights
                      </div>
                    </>
                  ) : (
                    <>
                      <p className={`text-3xl font-black ${theme.cashText}`}>
                        ${cash.totalPrice.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">
                        total price
                      </p>
                      <div className="mt-4 text-[11px] text-gray-500 bg-gray-50 rounded-lg p-3 border border-gray-100">
                        <span className={`font-bold ${theme.cashText}`}>
                          ${cash.pricePerNight.toLocaleString()}
                        </span>
                        /night × {nights} nights
                      </div>
                    </>
                  )}
                </div>

                <div className="text-[11px] text-gray-600 mb-6 space-y-2 border-t border-gray-50 pt-4">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Status:{" "}
                      <span className="font-bold text-green-600">
                        Immediate Confirmation
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-blue-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Unit: Full Kitchen Facilities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Usage Year: {new Date(earliestDate).getFullYear()}
                    </span>
                  </div>
                </div>

                <button
                  className={`w-full py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all duration-300 shadow-sm hover:shadow-md ${
                    isPoints
                      ? "bg-[#18294B] text-white hover:bg-[#0f1d35]"
                      : "bg-[#0077be] text-white hover:bg-[#005a8e]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectUnit(unitType);
                  }}
                >
                  Select Unit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailableUnit;
