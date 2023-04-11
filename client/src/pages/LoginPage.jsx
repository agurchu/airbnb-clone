import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="mt-4 flex items-center justify-around grow">
      <div className="mb-52 ">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="mt-4 max-w-md mx-auto  ">
          <input type="email" placeholder="email address" />
          <input type="passward" placeholder="password" />
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
