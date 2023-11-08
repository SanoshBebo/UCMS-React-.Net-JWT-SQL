import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
const AdminLayout = ({ children }) => {
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    if (!isLoadingUser && user.length === 0) {
      navigate("/login");
    }
  }, [isLoadingUser, navigate]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      if (userData.Role == "professor" || userData.Role == "student") {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
    setIsLoadingUser(false);
  }, []);

  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default AdminLayout;
