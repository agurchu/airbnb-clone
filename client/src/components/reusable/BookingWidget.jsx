import React, { useState } from "react";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numOfGuests, setNumOfGuests] = useState(1);

  return (
    <div>
      <div className="bg-white shadow py-2 px-4 rounded-xl ">
        <p className="text-xl text-center">Price: {place.price} / per night</p>
        <div className="rounded-xl border mt-4">
          <div className="flex">
            <div className=" py-2 px-4 ">
              <label>Check in:</label>
              <input
                type="date"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div className="border-l py-2 px-4">
              <label>Check out:</label>
              <input
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
          </div>
          <div className="py-2 px-4 border-t">
            <label>Number of guests:</label>
            <input
              type="number"
              value={numOfGuests}
              onChange={(ev) => setNumOfGuests(ev.target.value)}
            />
          </div>
        </div>
        <button className="btn-primary mt-3">Book this place</button>
      </div>
    </div>
  );
}
