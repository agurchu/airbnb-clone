import React, { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import PlaceImg from "../components/reusable/PlaceImg";
import { format, differenceInCalendarDays } from "date-fns";
import { Link } from "react-router-dom";
import BookingDates from "../components/reusable/BookingDates";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              className="flex gap-4 bg-gray-50 shadow rounded-xl overflow-hidden"
              key={booking._id}
            >
              <div className="w-48">
                <PlaceImg place={booking.place} />
              </div>

              <div className="py-3 grow">
                <h2 className="text-xl mb-2  ">{booking.place.title}</h2>
                <BookingDates
                  booking={booking}
                  className={
                    "border-t text-gray-600 text-sm  items-center border-gray-200 py-2"
                  }
                />
                <div className="flex items-center gap-1 font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                  Total price: R{booking.price}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
