import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlacePage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then(({ data }) => setPlaces(data));
  }, []);

  return (
    <div>
      <AccountNav />

      <div className="text-center mt-8">
        <Link
          className="inline-flex gap-1 btn__outline"
          to={"/account/places/new"}
        >
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add New Place
        </Link>
      </div>

      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/account/places/" + place._id}
              className="bg-gray-100 p-4 rounded-xl gap-4 flex cursor-pointer"
              key={place._id}
            >
              <div className="flex w-32 h-32 grow shrink-0 bg-gray-300">
                {place.photos.length > 0 && (
                  <img
                    className=" object-cover"
                    src={"http://localhost:8000/uploads/" + place.photos[0]}
                    alt=""
                  />
                )}
              </div>
              <div>
                <h2 className="text-xl">{place.title}</h2>
                <p className="mt-2 text-sm">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
