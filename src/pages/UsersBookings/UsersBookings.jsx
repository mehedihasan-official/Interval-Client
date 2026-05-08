import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import ResortImage from "../../components/ResortImage";

const UsersBookings = () => {
  const { allBookingsData } = useContext(AuthContext);

  // Check if allBookingsData is an array and is not empty
  const flattenedBookingsData = Array.isArray(allBookingsData[0])
    ? allBookingsData.flat()
    : allBookingsData;

  // If there are no bookings, display a message
  if (!flattenedBookingsData || flattenedBookingsData.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-2xl text-center font-bold mb-4">Total Bookings: 0</h1>
        <p className="text-center py-10 text-gray-500">There are no bookings data.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl text-center font-bold mb-4">
        Total Bookings: {flattenedBookingsData.length}
      </h1>
      <div className="overflow-x-auto">
        {/* Desktop Table */}
        <table className="table w-full hidden lg:table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Resort Name</th>
              <th>Booking Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {flattenedBookingsData.map((booking, index) => (
              <tr key={index}>
                <td>
                  <ResortImage
                    src={booking.resort?.img}
                    alt="Resort"
                    seed={booking.resort?._id || booking.resort?.resortName || String(index)}
                    className="w-24 h-24 rounded"
                  />
                </td>
                <td>{booking.resort?.name || "Unknown resort"}</td>
                <td>{booking.date || "No date available"}</td>
                <td>{booking.status || "No status available"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Responsive */}
        <div className="block lg:hidden">
          {flattenedBookingsData.map((booking, index) => (
            <div
              key={index}
              className="card card-side bg-base-100 shadow-xl p-2 py-3 mb-4"
            >
              <figure>
                <ResortImage
                  src={booking.resort?.img}
                  alt="Resort"
                  seed={booking.resort?._id || booking.resort?.resortName || String(index)}
                  className="w-24 h-24 rounded-md"
                />
              </figure>
              <div className="pl-10 space-y-1">
                <h2 className="card-title">
                  {booking.billingInfo?.firstName || "Unknown"}{" "}
                  {booking.billingInfo?.lastName || "User"}
                </h2>
                <div>
                  <p>
                    <strong>Booking Date:</strong>
                  </p>
                  <p>{booking.startDate || "No start date"}</p>
                  <p>{booking.endDate || "No end date"}</p>
                </div>
                <p>
                  <strong>Unit Type:</strong> {booking.unitType || "No unit type"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersBookings;