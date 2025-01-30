import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check user login status
  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const response = await fetch("/api/v1/users/current-user"); // Adjust to your API endpoint
        const data = await response.json();

        if (data.status === 200) {
          setUser(data.data); // Set the logged-in user
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkUserLogin();
  }, []);

  const handleLogout = async () => {
    // Call logout API (if you have one)
    await fetch("/api/logout"); // Adjust this endpoint as needed
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-700 bg-gray-900 text-white">
        <Link className="flex items-center justify-center text-white" to="/">
          <span className="ml-2 text-xl font-bold">ExpenseTracker</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-gray-400" to="/">
            Home
          </Link>

          {/* Conditionally render Dashboard link based on login status */}
          {isLoggedIn && (
            <Link
              className="text-sm font-medium hover:text-gray-400"
              to="/dashboard"
            >
              Dashboard
            </Link>
          )}

          {/* Conditionally render Sign Up/Login/Logout links */}
          {!isLoggedIn ? (
            <>
              <Link
                className="text-sm font-medium hover:text-gray-400"
                to="/signup"
              >
                Signup
              </Link>
              <Link
                className="text-sm font-medium hover:text-gray-400"
                to="/login"
              >
                Login
              </Link>
            </>
          ) : (
            <button
              className="text-sm font-medium hover:text-gray-400"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </nav>
      </header>

      {/* Page Content */}
      <main className="flex-1 p-6">
        <Outlet /> {/* This renders the child routes dynamically */}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-gray-700 bg-gray-900">
        <p className="text-xs text-gray-400">
          © 2024 ExpenseTracker. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
