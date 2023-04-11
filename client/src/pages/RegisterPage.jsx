import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="mt-4 flex items-center justify-around grow">
      <div className="mb-52 ">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="mt-4 max-w-md mx-auto  ">
          <input type="text" placeholder="name" />
          <input type="email" placeholder="email address" />
          <input type="passward" placeholder="password" />
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
