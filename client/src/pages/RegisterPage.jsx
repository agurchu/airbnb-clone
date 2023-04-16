import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (ev) => {
    ev.preventDefault();
    try {
      await axios.post("http://localhost:8000/test/register", {
        name,
        email,
        password,
      });
      alert("Registration successful, you may login");
    } catch (error) {
      alert("Registration failed. Please try again later");
    }
  };

  return (
    <div className="mt-4 flex items-center justify-around grow">
      <div className="mb-52 ">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="mt-4 max-w-md mx-auto  " onSubmit={registerUser}>
          <input
            required
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            required
            type="email"
            placeholder="email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            required
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
