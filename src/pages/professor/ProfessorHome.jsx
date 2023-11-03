import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetProfDetailsAndSubjectDetails } from "../../api/Professor";
import { loadUserFromStorage } from "../../redux/userSlice";

const ProfessorHome = () => {
  const user = useSelector((state) => state.user.user);
  const [profDetails, setProfDetails] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.UserId) {
      GetProfDetailsAndSubjectDetails(user.UserId)
        .then((response) => {
          console.log(response);
          setProfDetails(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user.UserId]);

  useEffect(() => {
    if (!user.UserId) {
      dispatch(loadUserFromStorage);
    }
  }, [user.UserId, dispatch]);

  return (
    <div className="min-h-screen">
      <div></div>
    </div>
  );
};

export default ProfessorHome;
