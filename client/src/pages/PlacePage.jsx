import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PlacePage() {
  const [place, setPlace] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/place/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  return <div className="mt-8">Place Page: {id}</div>;
}
