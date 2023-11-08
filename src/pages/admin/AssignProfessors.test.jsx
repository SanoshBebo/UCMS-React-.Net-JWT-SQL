import React from "react";
import { render, screen, act } from "@testing-library/react";
import AssignProfessors from "./AssignProfessors";
import userEvent from "@testing-library/user-event";
import { AddProfessorToSubject, GetAssignedProfessors } from "../../api/Course";

jest.mock("../../api/Course", () => ({
  AddProfessorToSubject: jest.fn(),
  RemoveProfessorFromSubject: jest.fn(),
  GetAssignedProfessors: jest.fn(),
}));

describe("AssignProfessors Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", async () => {
    GetAssignedProfessors.mockResolvedValue({
      AssignedProfessors: [],
      AvailableProfessors: [],
    });

    render(<AssignProfessors />);
    expect(screen.getByText("Assign Professors")).toBeInTheDocument();
    expect(screen.getByText("Add New Professor")).toBeInTheDocument();
  });

  it('assigns professors when the "Assign Professors" button is clicked', async () => {
    AddProfessorToSubject.mockResolvedValue({
      /* your response object here */
    });

    render(<AssignProfessors />);

    const professorCheckbox = screen.getByLabelText("Professor Name");
    userEvent.click(professorCheckbox);

    const assignButton = screen.getByText("Assign Professors");
    userEvent.click(assignButton);

    expect(
      AddProfessorToSubject
    ).toHaveBeenCalledWith(/* your expected arguments here */);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    expect(/* your assertions here */);
  });
});
