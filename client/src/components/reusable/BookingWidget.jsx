import React from "react";

export default function BookingWidget({ place }) {
  return (
    <div>
      <div className="bg-white shadow py-2 px-4 rounded-xl ">
        <p className="text-xl text-center">Price: {place.price} / per night</p>
        <div className="rounded-xl border mt-4">
          <div className="flex">
            <div className=" py-2 px-4 ">
              <label>Check in:</label>
              <input type="date" />
            </div>
            <div className="border-l py-2 px-4">
              <label>Check out:</label>
              <input type="date" />
            </div>
          </div>
          <div className="py-2 px-4 border-t">
            <label>Number of guests:</label>
            <input type="number" value={1} />
          </div>
        </div>
        <button className="btn-primary mt-3">Book this place</button>
      </div>
    </div>
  );
}
