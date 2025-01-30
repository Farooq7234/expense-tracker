import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "./ui/button";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const response = await axios.get(`/api/v1/users/current-user`);
        if (response.status === 200) {
          setUser(response.data.data);
          setIsLoggedIn(true);
          console.log(response.data.message);
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
      await axios.post(`/api/v1/users/logout`);
      setUser(null);
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="px-4 lg:px-6 h-14 flex justify-center items-center shadow-md mb-10">
      <Link className="flex items-center justify-center" to="/">
        <span className="ml-2 text-xl font-bold">ExpenseTracker</span>
      </Link>

      <nav className="ml-auto flex justify-center items-center gap-4 sm:gap-6">
        {/* Show Login button if not logged in */}
        {!isLoggedIn ? (
          <Button>
            {" "}
            <Link className="text-sm font-medium" to="/login">
              Login
            </Link>
          </Button>
        ) : (
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </nav>
    </header>
  );
}
