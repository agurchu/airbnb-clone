import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../components/reusable/AddressLink";
import PlaceGallery from "../components/reusable/PlaceGallery";
import BookingDates from "../components/reusable/BookingDates";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      const foundBooking = response.data.find(({ _id }) => _id === id);
      if (foundBooking) {
        setBooking(foundBooking);
      }
    });
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className={"my-2 block"}>
        {booking.place.address}
      </AddressLink>
      <div className="flex justify-between items-center bg-gray-200 p-6 my-6 rounded-xl">
        <div>
          <h2 className="text-2xl mb-4">Your Booking Information</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-xl">
          <h3>Total price:</h3>{" "}
          <span className="text-3xl">{booking.price}</span>
        </div>
      </div>

      <PlaceGallery place={booking.place} />
    </div>
  );
}
