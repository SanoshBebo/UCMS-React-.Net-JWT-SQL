import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <div className="min-h-screen">
      <div className="flex flex-row">
        <div className="m-5">
          <Link to="/admin/courses">
            <h1 className="p-5">courses</h1>
          </Link>
        </div>
        <div className="m-5">
          <Link to="/admin/subjects">
            <h1 className="p-5">subjects</h1>
          </Link>
        </div>
        <div className="m-5">
          <Link to="/admin/venues">
            <h1 className="p-5">venues</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
