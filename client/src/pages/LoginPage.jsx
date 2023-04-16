import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleEmail = (e) => {
    return setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    return setPassword(e.target.value);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/test/login", { email, password });

      alert("Login successful");
      setRedirect(true);
    } catch (error) {
      alert("Login failed");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 flex items-center justify-around grow">
      <div className="mb-52 ">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="mt-4 max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="email address"
            required
            value={email}
            onChange={handleEmail}
          />
          <input
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={handlePassword}
          />
          <button>Login</button>
          <div className="my-4 text-center text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to="/register">
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
