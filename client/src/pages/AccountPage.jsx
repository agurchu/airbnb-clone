import React, { useContext } from "react";
import { UserContext } from "../userContext";
import { Link, Navigate, useParams } from "react-router-dom";

function AccountPage() {
  const { user, ready } = useContext(UserContext);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  const linkClasses = (type = null) => {
    let classes = "py-2 px-6 ";
    if (type === subpage) {
      classes += "  bg-primary text-white rounded-full duration-200 ";
    }
    return classes;
  };

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <nav className="w-full mt-8 flex justify-center gap-2 ">
        <Link className={linkClasses("profile")} to="/account">
          My Profile
        </Link>
        <Link className={linkClasses("bookings")} to="/account/bookings">
          My Bookings
        </Link>
        <Link className={linkClasses("places")} to="/account/places">
          My Accommodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="mt-8 text-center max-w-sm mx-auto">
          <p>
            Logged in as {user.name} ({user.email})
          </p>
          <button className="btn__outline  ">Logout</button>
        </div>
      )}
    </div>
  );
}

export default AccountPage;
