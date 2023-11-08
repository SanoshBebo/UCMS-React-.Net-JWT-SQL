import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("admincourses");
    sessionStorage.removeItem("adminsubjects");
    sessionStorage.removeItem("adminvenues");
    navigate("/login");
  };

  return (
    <div className="bg-blue-500 p-3">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">UCMS</h1>
        <div className="space-x-4">
          {user && user.Role === "student" && (
            <>
              <Button onClick={handleBack} variant="contained">
                Back
              </Button>
              <Button onClick={handleSignOut} variant="contained">
                Sign Out
              </Button>
            </>
          )}
          {user && user.Role === "professor" && (
            <>
              <Button onClick={handleBack} variant="contained">
                Back
              </Button>
              <Button onClick={handleSignOut} variant="contained">
                Sign Out
              </Button>
            </>
          )}
          {user && user.Role === "admin" && (
            <>
              <Link to="/admin/courses" className="text-white hover:underline">
                Course
              </Link>
              <Link to="/admin/venues" className="text-white hover:underline">
                Venue
              </Link>
              <Link to="/admin/subjects" className="text-white hover:underline">
                Subject
              </Link>
              <Button onClick={handleBack} variant="contained">
                Back
              </Button>
              <Button onClick={handleSignOut} variant="contained">
                Sign Out
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
