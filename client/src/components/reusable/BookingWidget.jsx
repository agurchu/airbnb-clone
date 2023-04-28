import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../userContext";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numOfGuests, setNumOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numOfNights = 0;
  if (checkIn && checkOut) {
    numOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  const bookPlace = async () => {
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      numOfGuests,
      name,
      phone,
      price: numOfNights * place.price,
      place: place._id,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

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
              min="0"
              onChange={(ev) => setNumOfGuests(ev.target.value)}
            />
          </div>
          {numOfNights > 0 && (
            <div className=" border-t py-2 px-4">
              <label>Your full name:</label>
              <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <label>Phone number:</label>
              <input
                type="tel"
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
              />
            </div>
          )}
        </div>
        <button onClick={bookPlace} className="btn-primary mt-3">
          Book for
          {numOfNights > 0 && <span> R{numOfNights * place.price}</span>}
        </button>
      </div>
    </div>
  );
}
