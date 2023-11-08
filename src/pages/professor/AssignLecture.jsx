import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AddLecture, AssignLectureProfessor } from "../../api/Professor";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignLecture = () => {
  const { SubjectId, SemesterId, UserId } = useParams();
  const [venues, setVenues] = useState([]);
  const [lectureNames, setLectureNames] = useState([]);
  const [lectureName, setLectureName] = useState("");
  const [series, setSeries] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [venueId, setVenueId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    AssignLectureProfessor(SubjectId, SemesterId, UserId)
      .then((res) => {
        console.log(res);
        setVenues(res.Venues);
        setLectureNames(res.LectureNames);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch data. Please try again later.");
      });
  }, []);

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const currentDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

  const handleAssignment = () => {
    const lecture = {
      lectureName: lectureName,
      dateTime: dateTime,
      venueId: venueId,
      subjectId: SubjectId,
      semesterId: SemesterId,
      professorId: UserId,
      series: series,
      lectures: [],
      lectureNames: [],
      venues: [],
    };

    AddLecture(lecture)
      .then((res) => {
        console.log(res);
        toast.success("Lecture Added Successfully");
        setTimeout(() => {}, 3000);
        navigate(`/professor/viewlecture/${SubjectId}/${SemesterId}/${UserId}`);
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          toast.error(err.response.data);
        } else {
          toast.error("Failed to add lecture. Please try again later.");
        }
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-400-500 to-blue-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl text-center text-indigo-600 font-semibold mb-6">
          Assign Lecture
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Lecture Name
          </label>
          <select
            className="block w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-500"
            value={lectureName}
            onChange={(e) => setLectureName(e.target.value)}
          >
            <option value="">Select a Lecture Name</option>
            {lectureNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Series No
          </label>
          <select
            className="block w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-500"
            value={series}
            onChange={(e) => setSeries(e.target.value)}
          >
            <option value="">Select a Series</option>
            <option value="S1">S1</option>
            <option value="S2">S2</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Lecture Date and Time
          </label>
          <input
            className="block w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-500"
            type="datetime-local"
            min={currentDateTime}
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Venue
          </label>
          <select
            className="block w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-500"
            value={venueId}
            onChange={(e) => setVenueId(e.target.value)}
          >
            <option value="">Select a Venue</option>
            {venues.map((venue) => (
              <option key={venue.VenueId} value={venue.VenueId}>
                {venue.VenueName}
              </option>
            ))}
          </select>
        </div>

        <button
          className="w-full p-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-500"
          onClick={handleAssignment}
        >
          Assign Lecture
        </button>
        <ToastContainer position="bottom-right" autoClose={5000} />
      </div>
    </div>
  );
};

export default AssignLecture;
