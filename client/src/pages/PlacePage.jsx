import React from "react";
import { Link } from "react-router-dom";

import AccountNav from "../components/AccountNav";

export default function PlacePage() {
  return (
    <div>
      <AccountNav />

      <div className="text-center mt-8">
        <p className="mb-2">List of all added places</p>

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
    </div>
  );
}
