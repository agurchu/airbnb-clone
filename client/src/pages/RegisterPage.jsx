import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = (ev) => {
    ev.preventDefault();
    axios.post("/register", { name, email, password });
  };

  return (
    <div className="mt-4 flex items-center justify-around grow">
      <div className="mb-52 ">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="mt-4 max-w-md mx-auto  " onSubmit={registerUser}>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button>Register</button>
          <div className="my-4 text-center text-gray-500">
            Already a member?{" "}
            <Link className="underline text-black" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
