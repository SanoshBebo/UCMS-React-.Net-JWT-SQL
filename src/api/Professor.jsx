import axios from "./AxiosConfig";

export const GetProfDetailsAndSubjectDetails = async (id) => {
  try {
    const response = await axios.get(`/api/Professor/professorhome/${id}`);
    return response.data; // Return the response data
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const AssignLecture = async (subjectId, semesterId, professorId) => {
  const response = await axios.post(
    `api/Professor/assignlecture/${subjectId}/${semesterId}/${professorId}`
  );
  return response.data;
};

export const ViewLecture = async (subjectId, semesterId, professorId) => {
  try {
    const response = await axios.get(
      `/api/Professor/viewlecture/${subjectId}/${semesterId}/${professorId}`
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const DeleteLecture = async (lectureId, professorId) => {
  const response = await axios.delete(
    `api/Professor/deletelecture/{lectureId}/{professorId}`
  );
  return response.data;
};

export const AddLecture = async (lectureInfo) => {
  const response = await axios.post(`api/Professor/addlecture`, lectureInfo, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
