import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PlacePage() {
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
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
  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-white min-h-full  ">
        <div className="p-24 grid gap-4 relative">
          <div className="fixed bg-white left-0 top-0 right-0 p-4">
            <button
              onClick={() => setShowAllPhotos(false)}
              className="  rounded-full gray__btn p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div>
                <img src={"http://localhost:8000/uploads/" + photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

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
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-xl overflow-hidden mt-6">
          <div>
            {place.photos?.[0] && (
              <img
                className="aspect-square object-cover "
                src={"http://localhost:8000/uploads/" + place.photos[0]}
              />
            )}
          </div>
          <div className="grid ">
            {place.photos?.[1] && (
              <img
                className="aspect-square object-cover "
                src={"http://localhost:8000/uploads/" + place.photos[1]}
              />
            )}
            {place.photos?.[2] && (
              <img
                className="aspect-square object-cover relative top-2"
                src={"http://localhost:8000/uploads/" + place.photos[2]}
              />
            )}
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="absolute flex gap-1 items-center bottom-4 right-4 py-2 px-4 bg-white rounded-xl border border-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
              clipRule="evenodd"
            />
          </svg>
          Show all photos
        </button>
      </div>
    </div>
  );
}
