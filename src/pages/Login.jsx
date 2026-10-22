import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (isSignup) {
      const users = JSON.parse(
        localStorage.getItem("demoUsers") || "[]"
      );

      if (users.some((user) => user.email === normalizedEmail)) {
        setError("This email is already registered. Please login.");
        return;
      }

      // Frontend demo only. Real passwords must be handled securely
      // by a backend, never stored in browser localStorage.
      const user = {
        name: name.trim(),
        email: normalizedEmail,
      };

      localStorage.setItem(
        "demoUsers",
        JSON.stringify([...users, user])
      );

      localStorage.setItem("demoUser", JSON.stringify(user));
      navigate("/");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("demoUsers") || "[]"
    );

    const foundUser = users.find(
      (user) => user.email === normalizedEmail
    );

    if (!foundUser) {
      setError("Account not found. Please sign up first.");
      return;
    }

    // Demo only: this does not verify a password.
    localStorage.setItem("demoUser", JSON.stringify(foundUser));
    navigate("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-100 via-white to-blue-100 px-4 py-10 text-black">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">

        {/* Left side */}
        <div className="hidden flex-col justify-center bg-indigo-600 p-12 text-white md:flex">
          <div className="mb-8 text-5xl">🛍️</div>

          <h1 className="text-4xl font-extrabold leading-tight">
            Shop Smarter.
            <br />
            Live Better.
          </h1>

          <p className="mt-5 leading-7 text-indigo-100">
            Discover your favourite products and enjoy a simple
            shopping experience with our online store.
          </p>

          <div className="mt-10 rounded-2xl bg-white/10 p-5">
            <p className="text-lg font-semibold">
              Your shopping journey starts here.
            </p>
          </div>
        </div>

        {/* Form side */}
        <div className="p-7 sm:p-12">
          <Link
            to="/"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            ← Back to Store
          </Link>

          <div className="mt-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {isSignup ? "Create account" : "Welcome back!"}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {isSignup
                ? "Create your account to get started."
                : "Login to continue shopping."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {isSignup && (
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                minLength={6}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            {error && (
              <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 py-3.5 font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.99]"
            >
              {isSignup ? "Create Account" : "Login"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-gray-600">
            {isSignup
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setError("");
              }}
              className="font-bold text-indigo-600 hover:underline"
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>

          <p className="mt-6 text-center text-xs text-gray-400">
            Demo login for your college project
          </p>
        </div>
      </div>
    </div>
  );
}