import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/reusable/BookingWidget";
import PlaceGallery from "../components/reusable/PlaceGallery";

export default function PlacePage() {
  const [place, setPlace] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  return (
    <div className="mt-4 bg-gray-50 -mx-8 px-8 py-6 ">
      <h1 className="text-2xl font-semibold">{place.title}</h1>
      <a
        className="underline font-semibold block my-2"
        target="_blank"
        href={"https://maps.google.com/?q=" + place.address}
      >
        {place.address}
      </a>

      <PlaceGallery place={place} />

      <div className="my-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="mb-4">
            <h2 className="mb-1 font-semibold text-xl">About the place</h2>
            <p className="text-sm ">{place.description}</p>
          </div>
          Check-in: {place.checkIn}
          <br />
          Check-out: {place.checkOut} <br />
          Max number of guests: {place.maxGuests}
        </div>
        <BookingWidget place={place} />
      </div>
      <div className="bg-white border-t -mx-8 py-4 px-8">
        <h2 className="mb-1 font-semibold text-xl">About the place</h2>
        <p className="text-sm text-gray-600 leading-5">{place.extraInfo}</p>
      </div>
    </div>
  );
}
