import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../components/reusable/AddressLink";
import PlaceGallery from "../components/reusable/PlaceGallery";

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
      <div className="bg-gray-200 p-4 rounded-xl">
        <h2>Your Booking Information</h2>
      </div>

      <PlaceGallery place={booking.place} />
    </div>
  );
}
