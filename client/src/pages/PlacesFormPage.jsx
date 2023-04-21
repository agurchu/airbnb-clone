import React, { useEffect, useState } from "react";
import SubHeading from "../components/reusable/SubHeading";
import Perks from "../components/reusable/Perks";
import PhotoUploader from "../components/PhotoUploader";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const checkTime = [
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
  ];
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();
  console.log({ id });

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setAddedPhotos(data.photos);
      setAddress(data.address);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setDescription(data.description);
      setExtraInfo(data.extraInfo);
      setMaxGuests(data.maxGuests);
      setPerks(data.perks);
      setTitle(data.title);
    });
  }, [id]);

  async function addNewPlace(e) {
    e.preventDefault();
    await axios.post("/places", {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={addNewPlace}>
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
        <PhotoUploader onAddedPhotos={addedPhotos} onChange={setAddedPhotos} />
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
  );
}
