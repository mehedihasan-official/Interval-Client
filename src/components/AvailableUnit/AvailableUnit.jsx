import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
      return 309;
    case "1/1 Bed":
      return 339;
    default:
      return 379; // 2/2, 3/3, 4/4
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

  if (!resort || !searchParams) {
    return (
      <div className="p-6 text-center text-red-500">
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
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div
        className={`mb-6 p-4 rounded-xl ${isPoints ? "bg-[#18294B] text-white" : "bg-amber-500 text-white"}`}
      >
        <h1 className="text-xl sm:text-2xl font-bold">
          {isPoints
            ? "🏅 Points Exchange — Select Your Unit"
            : "💳 Getaway Vacation — Select Your Unit"}
        </h1>
        <p className="text-sm opacity-90 mt-1">
          {isPoints
            ? "Redeem your Interval points for this vacation"
            : "Book with cash at our competitive rates"}
        </p>
      </div>

      {/* Travel Info */}
      <div className="bg-white border rounded-xl p-4 mb-6 shadow-sm">
        <h2 className="font-semibold text-gray-700 mb-3">
          Your Travel Details
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-500 text-xs uppercase font-medium">
              Check-in
            </p>
            <p className="font-semibold mt-1">
              {new Date(earliestDate).toLocaleDateString()}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-500 text-xs uppercase font-medium">
              Check-out
            </p>
            <p className="font-semibold mt-1">
              {new Date(latestDate).toLocaleDateString()}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-500 text-xs uppercase font-medium">
              Nights
            </p>
            <p className="font-semibold mt-1">{nights}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-500 text-xs uppercase font-medium">
              Guests
            </p>
            <p className="font-semibold mt-1">
              {adults} adults, {children} children
            </p>
          </div>
        </div>
      </div>

      {/* Resort Summary */}
      {resort && (
        <div className="w-full border rounded-xl overflow-hidden mb-6 shadow-sm bg-white">
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-44 h-40 sm:h-auto flex-shrink-0">
              <img
                src={resort.img}
                alt={resort.resortName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex-grow">
              <h3 className="text-lg font-bold text-[#18294B] mb-1">
                {resort.resortName}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{resort.location}</p>
              <span className="inline-block bg-gray-100 px-2 py-1 rounded text-xs font-bold text-gray-700 border">
                {resort.symbol}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Unit Cards */}
      <h2 className="text-lg font-bold text-gray-800 mb-4">Available Units</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {UNIT_TYPES.map((unitType) => {
          const pts = isPoints ? calculatePoints(unitType, nights) : null;
          const cash = !isPoints ? calculateCashPrice(unitType, nights) : null;

          return (
            <div
              key={unitType}
              className={`border-2 rounded-xl overflow-hidden transition-all cursor-pointer hover:shadow-lg ${
                selectedUnit === unitType
                  ? isPoints
                    ? "border-[#18294B] shadow-md"
                    : "border-amber-500 shadow-md"
                  : "border-gray-200 hover:border-gray-400"
              }`}
              onClick={() => setSelectedUnit(unitType)}
            >
              {/* Card Header */}
              <div
                className={`py-3 px-4 text-white text-center font-bold ${isPoints ? "bg-[#18294B]" : "bg-amber-500"}`}
              >
                {unitType}
              </div>

              {/* Card Body */}
              <div className="p-4 bg-white">
                <div className="text-center mb-4">
                  {isPoints ? (
                    <>
                      <p className="text-2xl font-bold text-[#18294B]">
                        {pts.totalPoints.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">total points</p>
                      <div className="mt-2 text-xs text-gray-600 space-y-1 text-center bg-gray-50 rounded p-2">
                        <p>
                          {pts.pointsPerNight.toLocaleString()} pts/night ×{" "}
                          {nights} nights
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-amber-600">
                        ${cash.totalPrice.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">total price</p>
                      <div className="mt-2 text-xs text-gray-600 space-y-1 text-center bg-gray-50 rounded p-2">
                        <p>
                          ${cash.pricePerNight.toLocaleString()}/night ×{" "}
                          {nights} nights
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div className="text-xs text-gray-600 mb-4 space-y-1">
                  <p>
                    ✓ Status:{" "}
                    <span className="font-semibold text-green-600">
                      Available
                    </span>
                  </p>
                  <p>✓ Full Kitchen</p>
                  <p>✓ Year: {new Date(earliestDate).getFullYear()}</p>
                </div>

                <button
                  className={`w-full py-2.5 rounded-lg font-bold text-sm transition-colors ${
                    isPoints
                      ? "bg-[#18294B] text-white hover:bg-[#0f1d35]"
                      : "bg-amber-500 text-white hover:bg-amber-600"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectUnit(unitType);
                  }}
                >
                  {isPoints ? "Redeem Points" : "Book Now"}
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
