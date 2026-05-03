import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Link } from 'react-router-dom';

const MyBookings = () => {
  const { user, bookingsData } = useContext(AuthContext);

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      {/* User Info */}
      <div className="flex items-center gap-4 mb-8 p-4 bg-white border rounded-xl shadow-sm">
        {user?.photoURL ? (
          <img src={user.photoURL} alt="User" className="w-14 h-14 rounded-full object-cover" />
        ) : (
          <div className="w-14 h-14 rounded-full bg-[#18294B] flex items-center justify-center text-white text-2xl font-bold">
            {(user?.displayName || user?.email || '?')[0].toUpperCase()}
          </div>
        )}
        <div>
          <h2 className="text-lg font-bold text-[#18294B]">{user?.displayName || 'Member'}</h2>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-[#18294B] mb-6">My Bookings</h1>

      {!bookingsData || bookingsData.length === 0 ? (
        <div className="text-center py-16 bg-white border rounded-xl">
          <div className="text-5xl mb-4">🏖️</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No bookings yet</h3>
          <p className="text-gray-500 text-sm mb-6">Start exploring and book your next vacation!</p>
          <Link to="/resort-directory" className="inline-block px-6 py-2.5 bg-[#18294B] text-white rounded-lg font-semibold hover:bg-[#0f1d35] transition-colors text-sm">
            Browse Resorts
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {bookingsData.map((booking, index) => {
            const isPoints = booking.paymentMethod === 'points';
            const billing = booking.billingInfo || {};

            return (
              <div key={index} className="bg-white rounded-xl border shadow-sm overflow-hidden">
                {/* Status bar */}
                <div className={`h-1.5 ${isPoints ? 'bg-[#18294B]' : 'bg-amber-500'}`}></div>

                <div className="p-4 md:p-5">
                  {/* Resort */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    {booking.resort?.img && (
                      <img
                        src={booking.resort.img}
                        alt={booking.resort.resortName}
                        className="w-full sm:w-36 h-36 sm:h-28 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${isPoints ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                          {isPoints ? '🏅 Points' : '💳 Cash'}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#18294B]">{booking.resort?.resortName}</h3>
                      <p className="text-gray-500 text-sm">{booking.resort?.location}</p>
                    </div>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm border-t pt-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">📅 Booking Dates</h4>
                      <p className="text-gray-600">
                        <span className="font-medium">Check-in:</span> {booking.startDate ? new Date(booking.startDate).toLocaleDateString() : 'N/A'}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Check-out:</span> {booking.endDate ? new Date(booking.endDate).toLocaleDateString() : 'N/A'}
                      </p>
                      {booking.unitType && <p className="text-gray-600"><span className="font-medium">Unit:</span> {booking.unitType}</p>}
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">💰 Payment</h4>
                      {isPoints ? (
                        <p className="text-[#18294B] font-semibold">{booking.points?.toLocaleString()} points redeemed</p>
                      ) : (
                        <p className="text-amber-600 font-semibold">${typeof booking.price === 'number' ? booking.price.toFixed(2) : booking.price} USD</p>
                      )}
                    </div>

                    {(billing.firstName || billing.address1) && (
                      <div className="sm:col-span-2 border-t pt-3 mt-1">
                        <h4 className="font-semibold text-gray-700 mb-2">📋 Billing</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-gray-600">
                          {billing.firstName && <p><span className="font-medium">Name:</span> {billing.firstName} {billing.lastName}</p>}
                          {billing.address1 && <p><span className="font-medium">Address:</span> {billing.address1}</p>}
                          {billing.country && <p><span className="font-medium">Country:</span> {billing.country}</p>}
                          {billing.phoneNumber && <p><span className="font-medium">Phone:</span> {billing.phoneNumber}</p>}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
