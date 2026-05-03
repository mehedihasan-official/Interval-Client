import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Payment = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { resort, card, searchParams, isPoints, taxInclusivePrice } = location.state || {};

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [billingInfo, setBillingInfo] = useState({
    firstName: "", lastName: "", address1: "", address2: "",
    country: "", city: "", state: "", postalCode: "", phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);

  if (!resort || !card) {
    return <div className="p-6 text-center text-red-500">Error: No payment data. Please go back and try again.</div>;
  }

  const { email } = user || {};

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bookingInfo = {
      resort,
      email,
      paymentMethod: isPoints ? "points" : "cash",
      price: isPoints ? 0 : taxInclusivePrice,
      points: isPoints ? card.points : 0,
      unitType: card.unit,
      startDate: card.startDate || searchParams?.earliestDate,
      endDate: card.endDate || searchParams?.latestDate,
      nights: card.nights,
      billingInfo,
      paymentDetails: !isPoints ? { cardNumber, expiryDate, cvv } : null,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_server_API}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingInfo),
      });

      if (response.ok) {
        setLoading(false);
        navigate("/confirmation", {
          state: { resort, card, isPoints, amount: isPoints ? card.points : taxInclusivePrice },
        });
      } else {
        setLoading(false);
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      alert("An error occurred. Please try again.");
    }
  };

  if (!user) {
    return <div className="p-6 text-center text-red-500">You must be logged in to complete this booking.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#18294B]">
        {isPoints ? 'Confirm Points Redemption' : 'Confirm Payment'}
      </h1>

      {/* Progress */}
      <div className="flex items-center justify-center mb-8">
        {['Select Unit', 'Checkout', 'Payment', 'Confirmation'].map((step, i) => (
          <React.Fragment key={step}>
            <div className={`flex flex-col items-center ${i === 2 ? 'text-[#18294B]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${i === 2 ? 'bg-[#18294B] text-white border-[#18294B]' : i < 2 ? 'bg-gray-300 text-white border-gray-300' : 'border-gray-300'}`}>
                {i < 2 ? '✓' : i + 1}
              </div>
              <p className="text-xs mt-1 hidden sm:block">{step}</p>
            </div>
            {i < 3 && <div className={`flex-1 h-0.5 mx-2 ${i < 2 ? 'bg-gray-300' : 'bg-gray-200'}`}></div>}
          </React.Fragment>
        ))}
      </div>

      {/* Booking Summary */}
      <div className={`mb-6 p-4 rounded-xl border ${isPoints ? 'bg-blue-50 border-blue-200' : 'bg-amber-50 border-amber-200'}`}>
        <h2 className="font-bold text-gray-800 mb-2">Booking Summary</h2>
        <div className="text-sm space-y-1 text-gray-700">
          <p><span className="font-semibold">Resort:</span> {resort.resortName}</p>
          <p><span className="font-semibold">Unit:</span> {card.unit}</p>
          <p><span className="font-semibold">Dates:</span> {new Date(card.startDate || searchParams?.earliestDate).toLocaleDateString()} → {new Date(card.endDate || searchParams?.latestDate).toLocaleDateString()} ({card.nights} nights)</p>
          {isPoints ? (
            <p><span className="font-semibold">Total:</span> <span className="text-[#18294B] font-bold">{card.points?.toLocaleString()} points</span></p>
          ) : (
            <p><span className="font-semibold">Total:</span> <span className="text-amber-600 font-bold">${taxInclusivePrice?.toFixed(2)} USD (tax incl.)</span></p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card details for cash payment only */}
        {!isPoints && (
          <div className="bg-white border rounded-xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">💳 Card Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-amber-300 focus:outline-none text-sm"
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={e => setExpiryDate(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-amber-300 focus:outline-none text-sm"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={e => setCvv(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-amber-300 focus:outline-none text-sm"
                    placeholder="123"
                    maxLength="4"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Points confirmation */}
        {isPoints && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-[#18294B] mb-2">🏅 Points Redemption</h3>
            <p className="text-sm text-gray-600">
              You are about to redeem <strong>{card.points?.toLocaleString()} Interval points</strong> for this vacation.
              No card payment is required.
            </p>
          </div>
        )}

        {/* Billing Information */}
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Billing Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'firstName', placeholder: 'First Name', required: true },
              { name: 'lastName', placeholder: 'Last Name', required: true },
              { name: 'address1', placeholder: 'Address Line 1', required: true },
              { name: 'address2', placeholder: 'Address Line 2 (Optional)', required: false },
              { name: 'country', placeholder: 'Country', required: true },
              { name: 'city', placeholder: 'City', required: true },
              { name: 'state', placeholder: 'State / Province', required: true },
              { name: 'postalCode', placeholder: 'Postal Code', required: true },
              { name: 'phoneNumber', placeholder: 'Phone Number', required: true },
            ].map(field => (
              <input
                key={field.name}
                type="text"
                name={field.name}
                placeholder={field.placeholder}
                value={billingInfo[field.name]}
                onChange={handleBillingChange}
                className="w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
                required={field.required}
              />
            ))}
          </div>
        </div>

        {/* Sticky Submit */}
        <div className="sticky bottom-0 bg-white border-t shadow-lg p-4 -mx-4 md:-mx-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-500">You will be charged</p>
            {isPoints ? (
              <p className="text-xl font-bold text-[#18294B]">{card.points?.toLocaleString()} points</p>
            ) : (
              <p className="text-xl font-bold text-amber-600">${taxInclusivePrice?.toFixed(2)} USD</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full sm:w-auto px-10 py-3 rounded-xl font-bold text-white transition-colors ${
              isPoints
                ? 'bg-[#18294B] hover:bg-[#0f1d35] disabled:bg-gray-300'
                : 'bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300'
            }`}
          >
            {loading ? 'Processing...' : isPoints ? 'Confirm Redemption' : 'Confirm Payment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;
