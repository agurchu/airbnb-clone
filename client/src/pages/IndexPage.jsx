import axios from "axios";
import { useEffect, useState } from "react";

function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces([
        ...response.data,
        ...response.data,
        ...response.data,
        ...response.data,
      ]);
    });
  }, []);

  return (
    <div className="grid gap-x-6 gap-y-8 mt-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <div>
            <div className="bg-gray-500 flex rounded-xl mb-2">
              {place.photos?.[0] && (
                <img
                  className="object-cover w-full rounded-xl aspect-square "
                  src={"http://localhost:8000/uploads/" + place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <h2 className="font-medium text-sm truncate ">{place.title}</h2>
            <h3 className="font-bold ">{place.address}</h3>
          </div>
        ))}
    </div>
  );
}

export default IndexPage;
