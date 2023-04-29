import React from "react";

export default function PlaceImg({ place, index = 0, className = null }) {
  if (!place.photos?.length) {
    return "";
  }

  if (!className) {
    className = "object-cover h-full w-full";
  }
  return (
    <>
      {place.photos.length > 0 && (
        <img
          className={className}
          src={"http://localhost:8000/uploads/" + place.photos[index]}
          alt=""
        />
      )}
    </>
  );
}
