import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SubHeading from "../components/reusable/SubHeading";
import Perks from "../components/reusable/Perks";

export default function PlacePage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");

  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [checkTime, setCheckTime] = useState([
    {
      title: "Check in time",
      type: "text",
      placeholder: "14:00",
      input: { value: checkIn, setValue: setCheckIn },
    },
    {
      title: "Check out time",
      type: "text",
      placeholder: "18:00",
      input: { value: checkOut, setValue: setCheckOut },
    },
    {
      title: "Max number of guests",
      type: "number",
      placeholder: "3",
      input: { value: maxGuests, setValue: setMaxGuests },
    },
  ]);

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
            <SubHeading
              title="Title"
              description=" Title for your place should be short and catchy as in
              advertisement"
            />
            <input
              value={title}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title, e.g: My lovely apt"
            />

            <SubHeading title="Address" description=" Address to this place" />
            <input
              value={address}
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              placeholder="address"
            />

            <SubHeading title="Photos" description=" More = Better" />
            <div className="flex gap-2 items-center">
              <input
                value={photoLink}
                type="text"
                onChange={(e) => setPhotoLink(e.target.value)}
                placeholder="Add using a link ....jpg"
              />
              <button className="bg-gray-200 rounded-xl px-4 h-max py-3 font-medium">
                Add&nbsp;photo
              </button>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <button className="border flex justify-center gap-1 p-8 rounded-xl text-2xl bg-transparent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload
              </button>
            </div>

            <SubHeading
              title="Description"
              description="Description of the place"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <SubHeading
              title="Perks"
              description="Select all the perks of your place"
            />

            <Perks selected={perks} onChange={setPerks} />

            <SubHeading title="Extra Info" description="House rules, etc" />
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />

            <SubHeading
              title="Check in & out time"
              description="Add check in and out times, remember to have some time window for cleaning the room between guests"
            />
            <div className="grid gap-2 sm:grid-cols-3">
              {checkTime?.map((check) => (
                <div key={check.title}>
                  <h3 className="mt-3 -mb-1">{check.title}</h3>
                  <input
                    type={check.type}
                    value={check.input.value}
                    onChange={(e) => check.input.setValue(e.target.value)}
                    placeholder={check.placeholder}
                  />
                </div>
              ))}
            </div>

            <button className="btn-form">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}