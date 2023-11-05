import axios from "./AxiosConfig";

export const GetVenueList = async () => {
  const response = await axios.get("/api/Venues/getvenuelist");
  console.log(response);
  console.log(response.data);
  return response.data;
};

export const GetVenueDetail = async (id) => {
  try {
    const response = await axios.get(`/api/Venues/getvenuedetail/${id}`);

    return response.data; // Return the response data
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const CreateVenue = async (VenueInfo) => {
  const response = await axios.post("api/Venues/addvenue", VenueInfo, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const UpdateVenue = async (VenueInfo, id) => {
  const response = await axios.put(`api/Venues/editvenue/${id}`, VenueInfo, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const GetVenueToEdit = async (id) => {
  try {
    const response = await axios.get(`/api/Venues/venuetoedit/${id}`);
    return response.data; // Return the response data
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const DeleteVenue = async (id) => {
  const response = await axios.delete(`api/Venues/deletevenue/${id}`);
  return response.data;
};
