import axios from "./AxiosConfig";

export const RegisterCall = async (registrationData) => {
  try {
    const response = await axios.post("api/Auth/register", registrationData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check the response status code to determine if the request was successful
    if (response.data.Role) {
      console.log("Registration successful");
      console.log(response.data); // Access the response data
      return response.data;
    } else {
      // Handle the situation when the server returns an error response
      console.error("Registration failed. Server returned an error.");
      console.error(response.data); // Access the error message from the server
      throw new Error("Registration failed.");
    }
  } catch (error) {
    // Handle any network-related errors (e.g., no internet connection)
    console.error(
      "An error occurred while making the registration request:",
      error
    );
    throw error;
  }
};

export const LoginCall = async (loginData) => {
  console.log("hi im here");
  try {
    const response = await axios.post("api/Auth/login", loginData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data.Token);
    const token = response.data.Token;
    sessionStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
