import axios from "./AxiosConfig";

export const GetSubjects = async () => {
  const response = await axios.get("/api/Subjects/getsubjects");
  console.log(response.data);
  return response.data;
};

export const GetSubjectDetail = async (id) => {
  try {
    const response = await axios.get(`/api/Subjects/getsubject/${id}`);
    return response.data; // Return the response data
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const CreateSubject = async (subjectInfo) => {
  const response = await axios.post("api/Subjects/addsubject", subjectInfo, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const UpdateSubject = async (subjectInfo, id) => {
  const response = await axios.put(
    `api/Subjects/updatesubject/${id}`,
    subjectInfo,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const DeleteSubject = async (id) => {
  const response = await axios.delete(`api/Subjects/deletesubject/${id}`);
  return response.data;
};
