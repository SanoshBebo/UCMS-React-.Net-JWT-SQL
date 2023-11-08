import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SubjectPage from "./SubjectPage";
import {
  CreateSubject,
  GetSubjects,
  UpdateSubject,
  DeleteSubject,
} from "../../api/Subject";
import { Router } from "react-router";

// Mock your API functions
jest.mock("../../api/Subject", () => ({
  CreateSubject: jest.fn(),
  GetSubjects: jest.fn(),
  UpdateSubject: jest.fn(),
  DeleteSubject: jest.fn(),
}));

describe("SubjectPage Component", () => {
  // Sample subjects for mocking the API response
  const sampleSubjects = [
    {
      SubjectId: "1b2a5e60-5e23-4db5-8e5f-3a9c4f2b68a7",
      SubjectName: "Math",
      TeachingHours: 20,
      SubjectAssigns: null,
      ProfessorAssigns: null,
      Lectures: null,
    },
    {
      SubjectId: "b4f6ad46-713a-42b5-ad1c-78dc853cdf5a",
      SubjectName: "C",
      TeachingHours: 20,
      SubjectAssigns: null,
      ProfessorAssigns: null,
      Lectures: null,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", async () => {
    GetSubjects.mockResolvedValue(sampleSubjects);
    render(
      <Router>
        <SubjectPage />
      </Router>
    );
    expect(screen.getByText("Subjects")).toBeInTheDocument();
    expect(screen.getByText("Math")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
  });

  //   it('opens the "Add New Subject" dialog', () => {
  //     render(<SubjectPage />);
  //     const addButton = screen.getByText("Add New Subject");
  //     fireEvent.click(addButton);

  //     // Use aria-labelledby to target the dialog title
  //     const dialogTitle = screen.getByRole("dialog", { name: "Add New Subject" });
  //     expect(dialogTitle).toBeInTheDocument();
  //   });

  //   it("handles adding a subject", async () => {
  //     CreateSubject.mockResolvedValue({}); // Modify with your response object

  //     render(<SubjectPage />);
  //     const addButton = screen.getByText("Add New Subject");
  //     fireEvent.click(addButton);

  //     // Fill out the form fields
  //     const subjectNameInput = screen.getByLabelText("Subject Name");
  //     fireEvent.change(subjectNameInput, { target: { value: "New Subject" } });

  //     const teachingHoursInput = screen.getByLabelText("Teaching Hours");
  //     fireEvent.change(teachingHoursInput, { target: { value: "30" } });

  //     // Submit the form
  //     const addSubjectButton = screen.getByText("Add Subject");
  //     fireEvent.click(addSubjectButton);

  //     // Assert that CreateSubject was called with the correct arguments
  //     expect(CreateSubject).toHaveBeenCalledWith({
  //       SubjectName: "New Subject",
  //       TeachingHours: "30",
  //       SubjectAssigns: null, // Modify as needed
  //       ProfessorAssigns: null, // Modify as needed
  //       Lectures: null, // Modify as needed
  //     });
  //   });

  //   it("handles updating a subject", async () => {
  //     UpdateSubject.mockResolvedValue({}); // Modify with your response object

  //     render(<SubjectPage />);
  //     const updateButton = screen.getByText("Update"); // Assuming you have an "Update" button in your UI
  //     fireEvent.click(updateButton);

  //     // Fill out the form fields
  //     const subjectNameInput = screen.getByLabelText("Subject Name");
  //     fireEvent.change(subjectNameInput, {
  //       target: { value: "Updated Subject" },
  //     });

  //     const teachingHoursInput = screen.getByLabelText("Teaching Hours");
  //     fireEvent.change(teachingHoursInput, { target: { value: "40" } });

  //     // Submit the form
  //     const saveButton = screen.getByText("Save"); // Assuming you have a "Save" button in your UI
  //     fireEvent.click(saveButton);

  //     // Assert that UpdateSubject was called with the correct arguments
  //     expect(UpdateSubject).toHaveBeenCalledWith({
  //       SubjectId: "your_subject_id", // Modify with the actual subject ID
  //       SubjectName: "Updated Subject",
  //       TeachingHours: "40",
  //       SubjectAssigns: null, // Modify as needed
  //       ProfessorAssigns: null, // Modify as needed
  //       Lectures: null, // Modify as needed
  //     });
  //   });

  //   it("handles deleting a subject", async () => {
  //     DeleteSubject.mockResolvedValue({}); // Modify with your response object

  //     render(<SubjectPage />);
  //     const deleteButton = screen.getByText("Delete"); // Assuming you have a "Delete" button in your UI
  //     fireEvent.click(deleteButton);

  //     // Confirm the deletion (if applicable)
  //     const confirmButton = screen.getByText("Confirm Delete"); // Modify with your confirmation button
  //     fireEvent.click(confirmButton);

  //     // Assert that DeleteSubject was called with the correct arguments
  //     expect(DeleteSubject).toHaveBeenCalledWith("your_subject_id"); // Modify with the actual subject ID
  //   });
});
