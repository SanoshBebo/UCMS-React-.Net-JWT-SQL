import React from "react";
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-500 to-blue-600">
      <div className="flex justify-center items-center h-screen">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/admin/courses">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h1 className="text-2xl font-semibold text-indigo-600">
                Courses
              </h1>
            </div>
          </Link>

          <Link to="/admin/subjects">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h1 className="text-2xl font-semibold text-indigo-600">
                Subjects
              </h1>
            </div>
          </Link>

          <Link to="/admin/venues">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h1 className="text-2xl font-semibold text-indigo-600">Venues</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
