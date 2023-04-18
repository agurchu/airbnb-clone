import React from "react";
import { Link, useParams } from "react-router-dom";

export default function PlacePage() {
  const { action } = useParams();

  return (
    <div>
      {action !== "new" && (
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
      )}
      {action === "new" && (
        <div>
          <form>
            <h2 className="text-2xl mt-4">Title</h2>
            <p className="text-gray-500 text-sm">
              Title for your place should be short and catchy as in
              advertisement
            </p>
            <input type="text" placeholder="title, e.g: My lovely apt" />
            <h2 className="text-2xl mt-4">Address</h2>
            <p className="text-gray-500 text-sm">Address to this place</p>
            <input type="text" placeholder="address" />
            <h2 className="text-2xl mt-4">Photos</h2>
            <p className="text-gray-500 text-sm">More = Better</p>
            <div className="flex gap-2">
              <input type="text" placeholder="Add using a link ....jpg" />
              <button className="bg-gray-200 rounded-xl px-4 ">
                Add&nbsp;photo
              </button>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <button className="btn__outline ">Upload from your device</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
