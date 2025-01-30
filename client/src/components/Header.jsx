import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "./ui/button";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const response = await axios.get("/api/current-user");
        if (response.data.status === 200) {
          setUser(response.data.data);
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
    try {
      await axios.post("/api/v1/users/logout");
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="px-4 lg:px-6 h-14 flex justify-center items-center shadow-md ">
      <Link className="flex items-center justify-center" to="/">
        <span className="ml-2 text-xl font-bold">ExpenseTracker</span>
      </Link>

      <nav className="ml-auto flex justify-center items-center gap-4 sm:gap-6">
        {/* Show Dashboard only if logged in */}
        {isLoggedIn && (
          <Link
            className="text-sm font-medium hover:text-gray-400"
            to="/dashboard"
          >
            Dashboard
          </Link>
        )}

        {/* Show Login button if not logged in */}
        {!isLoggedIn ? (
          <Button>
            {" "}
            <Link className="text-sm font-medium" to="/login">
              Login
            </Link>
          </Button>
        ) : (
          <Button className="text-sm font-medium " onClick={handleLogout}>
            Logout
          </Button>
        )}
      </nav>
    </header>
  );
}
