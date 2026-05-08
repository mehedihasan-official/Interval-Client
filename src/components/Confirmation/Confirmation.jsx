import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Loading';
import { AuthContext } from '../../providers/AuthProvider';

const Confirmation = () => {
  const { allBookingsData } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { resort, card, isPoints, amount } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [matchingBooking, setMatchingBooking] = useState(null);

  useEffect(() => {
    if (allBookingsData && resort) {
      const bookingsArray = Array.isArray(allBookingsData) ? allBookingsData : [allBookingsData];
      // Match by resortName since resort_ID may not exist in interval data
      const found = bookingsArray
        .filter(b => {
          const bName = b?.resort?.resortName || b?.resort?.place_name;
          const rName = resort?.resortName || resort?.place_name;
          return bName === rName;
        })
        .sort((a, b) => new Date(b.createdAt || b.bookingDate || 0) - new Date(a.createdAt || a.bookingDate || 0))[0];
      setMatchingBooking(found || null);
    }
    // Even if no match found, stop loading after 1.5s to show fallback
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, [allBookingsData, resort]);

  useEffect(() => {
    if (matchingBooking) setLoading(false);
  }, [matchingBooking]);

  if (loading) return <Loading />;

  if (!resort) {
    return <div className="p-6 text-center text-red-500">Error: Resort data is not available.</div>;
  }

  const billing = matchingBooking?.billingInfo || {};
  const paymentDetails = matchingBooking?.paymentDetails || {};

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      {/* Success Banner */}
      <div className={`mb-8 p-6 rounded-2xl text-white text-center ${isPoints ? 'bg-[#18294B]' : 'bg-green-600'}`}>
        <div className="text-5xl mb-3">{isPoints ? '🏅' : '✅'}</div>
        <h1 className="text-2xl md:text-3xl font-bold mb-1">
          {isPoints ? 'Points Redeemed Successfully!' : 'Payment Confirmed!'}
        </h1>
        <p className="text-sm opacity-90">
          Your vacation booking is confirmed. A confirmation email will be sent shortly.
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-center mb-8">
        {['Select Unit', 'Checkout', 'Payment', 'Confirmation'].map((step, i) => (
          <React.Fragment key={step}>
            <div className={`flex flex-col items-center ${i === 3 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${i <= 3 ? 'bg-gray-300 text-white border-gray-300' : 'border-gray-300'} ${i === 3 ? '!bg-green-600 !border-green-600' : ''}`}>
                ✓
              </div>
              <p className="text-xs mt-1 hidden sm:block">{step}</p>
            </div>
            {i < 3 && <div className="flex-1 h-0.5 mx-2 bg-gray-300"></div>}
          </React.Fragment>
        ))}
      </div>

      {/* Resort & Booking */}
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row">
          <img src={resort.img} alt={resort.resortName} className="w-full sm:w-40 h-40 object-cover flex-shrink-0" />
          <div className="p-4 flex-grow">
            <h3 className="text-lg font-bold text-[#18294B]">{resort.resortName}</h3>
            <p className="text-gray-500 text-sm mb-3">{resort.location}</p>
            {card && (
              <div className="text-sm space-y-1 text-gray-700">
                <p><span className="font-semibold">Unit:</span> {card.unit}</p>
                {card.startDate && <p><span className="font-semibold">Check-in:</span> {new Date(card.startDate).toLocaleDateString()}</p>}
                {card.endDate && <p><span className="font-semibold">Check-out:</span> {new Date(card.endDate).toLocaleDateString()}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Payment total */}
        <div className={`p-4 border-t ${isPoints ? 'bg-blue-50' : 'bg-green-50'}`}>
          {isPoints ? (
            <p className="font-bold text-[#18294B]">Points Redeemed: {(amount || card?.points || 0).toLocaleString()} Interval Points</p>
          ) : (
            <p className="font-bold text-green-700">Total Paid: ${Number(amount || card?.price || 0).toFixed(2)} USD (tax incl.)</p>
          )}
        </div>
      </div>

      {/* Billing Info */}
      {matchingBooking && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-3">📋 Billing Information</h2>
            <div className="space-y-1 text-sm text-gray-700">
              {[
                ['Name', `${billing.firstName || ''} ${billing.lastName || ''}`.trim() || 'N/A'],
                ['Address', billing.address1 || 'N/A'],
                ['City', billing.city || 'N/A'],
                ['State', billing.state || 'N/A'],
                ['Country', billing.country || 'N/A'],
                ['Postal Code', billing.postalCode || 'N/A'],
                ['Phone', billing.phoneNumber || 'N/A'],
              ].map(([label, val]) => (
                <p key={label}><span className="font-semibold">{label}:</span> {val}</p>
              ))}
            </div>
          </div>

          {!isPoints && paymentDetails?.cardNumber && (
            <div className="bg-white border rounded-xl p-4 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-3">💳 Payment Information</h2>
              <div className="space-y-1 text-sm text-gray-700">
                <p><span className="font-semibold">Card:</span> **** **** **** {paymentDetails.cardNumber?.slice(-4)}</p>
                <p><span className="font-semibold">Expiry:</span> {paymentDetails.expiryDate || 'N/A'}</p>
                <p><span className="font-semibold">CVV:</span> ***</p>
                <p><span className="font-semibold">Method:</span> Credit Card</p>
              </div>
            </div>
          )}

          {isPoints && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h2 className="text-lg font-bold text-[#18294B] mb-3">🏅 Points Summary</h2>
              <div className="space-y-1 text-sm text-gray-700">
                <p><span className="font-semibold">Email:</span> {matchingBooking.email}</p>
                <p><span className="font-semibold">Points Redeemed:</span> {(amount || card?.points)?.toLocaleString()}</p>
                <p><span className="font-semibold">Payment Method:</span> Interval Points</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
        <button
          className="px-6 py-3 bg-[#18294B] text-white rounded-xl font-bold hover:bg-[#0f1d35] transition-colors"
          onClick={() => navigate('/')}
        >
          Go to Homepage
        </button>
        <button
          className="px-6 py-3 bg-gray-100 text-gray-700 border rounded-xl font-bold hover:bg-gray-200 transition-colors"
          onClick={() => navigate('/dashboard/my-bookings')}
        >
          View My Bookings
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
