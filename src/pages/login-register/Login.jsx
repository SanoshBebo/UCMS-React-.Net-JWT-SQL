import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/userSlice";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { LoginCall, RegisterCall } from "../../api/Auth";

const Login = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const dispatch = useDispatch();

  const toggleRegistration = () => {
    setInvalidCredentials(false);
    setIsRegistering(!isRegistering);
  };

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const signIn = async () => {
    const loginData = {
      email: email,
      password: password,
    };

    try {
      // Call the login function and await the response
      const response = await LoginCall(loginData);

      if (response.Role) {
        // Check if the login was successful
        console.log("Login successful");
        console.log(response);
        dispatch(setUser(response));
        localStorage.setItem("user", JSON.stringify(response));
        if (response.Role == "student") {
          navigate("/student-page");
        } else if (response.Role == "professor") {
          navigate("/professor-page");
        } else if (response.Role == "admin") {
          navigate("/admin-page");
        }
      } else {
        console.error("Login failed. Server returned an error.");
      }
    } catch (error) {
      console.error("An error occurred while logging in:", error);
    }
  };

  const signUp = async () => {
    const registrationData = {
      Name: name,
      Email: email,
      Password: password,
      Role: role,
    };
    try {
      RegisterCall(registrationData).then((response) => {
        if (response.Role) {
          if (response.Role == "student") {
            navigate("/student-page");
          } else if (response.Role == "professor") {
            navigate("/professor-page");
          } else if (response.Role == "admin") {
            navigate("/admin-page");
          }
        } else {
          console.log(response);
        }
      });
    } catch (err) {
      setInvalidCredentials(true);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-400 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-96 transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-semibold mb-4 text-center ">
          {isRegistering ? "Customer Register" : "Customer Login"}
        </h2>
        {isRegistering && (
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Your full name"
              onChange={(e) => setName(e.target.value)}
            />
            {invalidCredentials && (
              <div>
                <p className="text-red-500">Invalid Credentials</p>
              </div>
            )}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            placeholder="Your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {invalidCredentials && (
            <div>
              <p className="text-red-500">Invalid Credentials</p>
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            placeholder="Your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {invalidCredentials && (
            <div>
              <p className="text-red-500">Invalid Credentials</p>
            </div>
          )}
        </div>
        {isRegistering && (
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="role"
                onChange={handleChange}
              >
                <MenuItem value={"student"}>student</MenuItem>
                <MenuItem value={"professor"}>professor</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
        <div className="flex gap-4 p-2">
          <button
            onClick={() => {
              isRegistering ? signUp() : signIn();
            }}
            className="bg-blue-500 text-white w-full py-2 px-4 rounded hover:bg-blue-600 mb-2 focus:outline-none focus:bg-blue-600"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </div>
        <p className="mt-4 text-center">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <a
            href="#"
            className="text-blue-500 hover:underline transition-colors duration-300 ease-in-out"
            onClick={toggleRegistration}
          >
            {isRegistering ? "Login" : "Sign up"}
          </a>
        </p>
      </div>
      <Link to="/login">
        <div className="p-2 text-white font-bold">Back to login</div>
      </Link>
      <p className="mt-4 text-center text-[15px]">
        Continue without signing in
        <Link to="/erichie">
          <a className="text-blue-500 hover:underline transition-colors duration-300 ease-in-out p-2">
            Click here
          </a>
        </Link>
      </p>
    </div>
  );
};

export default Login;
