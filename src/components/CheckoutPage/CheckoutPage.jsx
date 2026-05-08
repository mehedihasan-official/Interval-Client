import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import ResortImage from "../ResortImage";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resort, card, searchParams } = location.state || {};
  const { user, role } = useContext(AuthContext);
  const [checkinAs, setCheckinAs] = useState("Member");

  if (!resort || !card) {
    return (
      <div className="p-6 text-center text-red-500">
        Error: No booking information found. Please go back and try again.
      </div>
    );
  }

  const isPoints = card.vacationType === "Exchange";

  // Tax-inclusive price for cash
  const getTaxPrice = (base) => {
    if (base === 309) return 329.08;
    if (base === 339) return 361.02;
    return 403.63; // 379
  };

  const taxInclusivePrice = !isPoints ? getTaxPrice(card.price) : null;

  const handleContinue = () => {
    if (role === "admin") {
      alert("Admins cannot make bookings.");
      navigate("/admin-panel/admin-overview");
      return;
    }
    if (!user) {
      navigate("/login");
      return;
    }

    navigate("/payment", {
      state: {
        resort,
        card: {
          ...card,
          price: isPoints ? 0 : taxInclusivePrice,
          points: isPoints ? card.points : 0,
        },
        searchParams,
        isPoints,
        taxInclusivePrice,
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#18294B]">
        Checkout
      </h1>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-8">
        {["Select Unit", "Checkout", "Payment", "Confirmation"].map(
          (step, i) => (
            <React.Fragment key={step}>
              <div
                className={`flex flex-col items-center ${i === 1 ? "text-[#18294B]" : "text-gray-400"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${i === 1 ? "bg-[#18294B] text-white border-[#18294B]" : i < 1 ? "bg-gray-300 text-white border-gray-300" : "border-gray-300"}`}
                >
                  {i < 1 ? "✓" : i + 1}
                </div>
                <p className="text-xs mt-1 hidden sm:block">{step}</p>
              </div>
              {i < 3 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${i < 1 ? "bg-gray-300" : "bg-gray-200"}`}
                ></div>
              )}
            </React.Fragment>
          ),
        )}
      </div>

      {/* Payment Mode Badge */}
      <div
        className={`mb-6 p-4 rounded-xl ${isPoints ? "bg-blue-50 border border-blue-200" : "bg-blue-50 border border-[#0077be]/20"}`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${isPoints ? "bg-[#18294B] text-white" : "bg-[#0077be] text-white"}`}
          >
            {isPoints ? "🏅" : "💳"}
          </div>
          <div>
            <h2 className="font-bold text-gray-800">
              {isPoints
                ? "Points Exchange Booking"
                : "Getaway Vacation Booking"}
            </h2>
            <p className="text-sm text-gray-600">
              {isPoints
                ? "You are redeeming your Interval points for this vacation."
                : "You are paying with card for this exclusive member rate."}
            </p>
          </div>
        </div>
      </div>

      {/* Resort & Booking Summary */}
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row">
          <ResortImage
            src={resort.img}
            alt={resort.resortName}
            seed={resort._id || resort.resortName || ""}
            className="w-full sm:w-40 h-40 flex-shrink-0"
          />
          <div className="p-4 flex-grow">
            <h3 className="text-lg font-bold text-[#18294B]">
              {resort.resortName}
            </h3>
            <p className="text-gray-500 text-sm mb-3">{resort.location}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <p>
                <span className="font-semibold">Unit:</span> {card.unit}
              </p>
              <p>
                <span className="font-semibold">Nights:</span> {card.nights}
              </p>
              <p>
                <span className="font-semibold">Check-in:</span>{" "}
                {new Date(card.startDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Check-out:</span>{" "}
                {new Date(card.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Cost Summary */}
        <div
          className={`p-4 border-t ${isPoints ? "bg-blue-50" : "bg-blue-50/50"}`}
        >
          {isPoints ? (
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Base points ({card.pointsPerNight?.toLocaleString()} ×{" "}
                  {card.nights} nights)
                </span>
                <span className="font-semibold">
                  {card.points?.toLocaleString()} pts
                </span>
              </div>
              <div className="flex justify-between font-bold text-base border-t pt-2 mt-2">
                <span>Total Points</span>
                <span className="text-[#18294B]">
                  {card.points?.toLocaleString()} pts
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Base price (${card.pricePerNight?.toFixed(2)} × {card.nights}{" "}
                  nights)
                </span>
                <span className="font-semibold">${card.price?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax & Fees</span>
                <span>$20.00</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t pt-2 mt-2">
                <span>Total (tax inclusive)</span>
                <span className="text-[#0077be]">
                  ${(card.price + 20).toFixed(2)} USD
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Who's checking in */}
      <div className="bg-white border rounded-xl p-4 mb-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-3">
          Who's Checking In?
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {["Member", "Guest"].map((opt) => (
            <button
              key={opt}
              onClick={() => setCheckinAs(opt)}
              className={`py-3 rounded-lg border-2 font-semibold text-sm transition-all ${
                checkinAs === opt
                  ? isPoints
                    ? "border-[#18294B] bg-[#18294B] text-white"
                    : "border-[#0077be] bg-[#0077be] text-white"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {opt === "Member" ? "👤 " : "🧑‍🤝‍🧑 "}
              {opt}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          {checkinAs === "Member"
            ? "You (the member) will check in for this vacation."
            : "A guest will check in for this vacation."}
        </p>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="sticky bottom-0 bg-white border-t shadow-lg p-4 -mx-4 md:-mx-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-center sm:text-left">
          <p className="text-xs text-gray-500">Total amount</p>
          {isPoints ? (
            <p className="text-xl font-bold text-[#18294B]">
              {card.points?.toLocaleString()}{" "}
              <span className="text-sm">points</span>
            </p>
          ) : (
            <p className="text-xl font-bold text-[#0077be]">
              ${(card.price + 20).toFixed(2)}{" "}
              <span className="text-sm text-gray-500">USD</span>
            </p>
          )}
        </div>
        <button
          className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white transition-colors ${
            isPoints
              ? "bg-[#18294B] hover:bg-[#0f1d35]"
              : "bg-[#0077be] hover:bg-[#005a8e]"
          }`}
          onClick={handleContinue}
        >
          {isPoints ? "Continue to Redeem Points" : "Continue to Payment"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
