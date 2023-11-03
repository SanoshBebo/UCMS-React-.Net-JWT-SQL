import axios from "./AxiosConfig";

export const GetAllCourse = async () => {
  const response = await axios.get("/api/Course/viewcourses");
  console.log(response.data);
  return response.data;
};
export const GetCourseDetail = async (id) => {
  try {
    const response = await axios.get(`/api/Course/detail/${id}`);
    return response.data; // Return the response data
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const CreateCourse = async (courseInfo) => {
  console.log(courseInfo);
  const response = await axios.post("api/Course/createcourse", courseInfo, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const EditCourse = async (courseInfo, id) => {
  const response = await axios.put(`api/Course/editcourse/${id}`, courseInfo, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const DeleteCourse = async (id) => {
  const response = await axios.delete(`api/Course/deletecourse/${id}`);
  return response.data;
};

export const AddSemester = async (courseId, semesterName) => {
  const response = await axios.post(
    `api/Course/addsemester/${courseId}?semesterName=${semesterName}`
  );
  return response.data;
};

export const DeleteSemester = async (courseId, semesterId) => {
  const response = await axios.delete(
    `api/Course/deletesemester/${courseId}/${semesterId}`
  );
  return response.data;
};

export const GetAssignedSubjects = async (semesterId) => {
  try {
    const response = await axios.get(
      `/api/Course/getassignedsubject/${semesterId}`
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const GetAssignedProfessors = async (subjectId, semesterId) => {
  try {
    const response = await axios.get(
      `/api/Course/getassignedprofessors/${subjectId}/${semesterId}`
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const AddProfessorToSubject = async (
  SubjectId,
  SemesterId,
  selectedProfessorIds
) => {
  const response = await axios.post(
    `api/Course/addprofessortosubject/${SubjectId}/${SemesterId}`,
    selectedProfessorIds,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const RemoveProfessorFromSubject = async (
  SubjectId,
  SemesterId,
  ProfessorId
) => {
  try {
    const response = await axios.delete(
      `api/Course/removeprofessor/${SubjectId}/${SemesterId}/${ProfessorId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const GetAssignedProfessorsForSubject = async (
  subjectId,
  semesterId
) => {
  try {
    const response = await axios.get(
      `/api/Course/getassignedprofessorsforsubject/${subjectId}/${semesterId}`
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const AddSubjectToSemester = async (semesterId, selectedSubjectIds) => {
  const response = await axios.post(
    `api/Course/addsubjecttosemester/${semesterId}`,
    selectedSubjectIds,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const DeleteSubjectFromSemester = async (SubjectId, SemesterId) => {
  try {
    const response = await axios.delete(
      `api/Course/deletesubjectfromsemester/${SubjectId}/${SemesterId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
