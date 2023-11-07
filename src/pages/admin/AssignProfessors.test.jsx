import React from 'react';
import { render, screen, act } from '@testing-library/react';
import AssignProfessors from './AssignProfessors';
import userEvent from '@testing-library/user-event';
import { AddProfessorToSubject, GetAssignedProfessors } from '../../api/Course';

// Mock your API functions if needed
jest.mock('../../api/Course', () => ({
  AddProfessorToSubject: jest.fn(),
  RemoveProfessorFromSubject: jest.fn(),
  GetAssignedProfessors: jest.fn(),
}));

describe('AssignProfessors Component', () => {
  beforeEach(() => {
    // Reset the mocked functions before each test
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    // Mock GetAssignedProfessors to return sample data
    GetAssignedProfessors.mockResolvedValue({
      AssignedProfessors: [],
      AvailableProfessors: [],
    });

    render(<AssignProfessors />);
    // You can assert that some elements are in the document
    expect(screen.getByText('Assign Professors')).toBeInTheDocument();
    expect(screen.getByText('Add New Professor')).toBeInTheDocument();
    // ...
  });

  it('assigns professors when the "Assign Professors" button is clicked', async () => {
    // Mock API functions for AddProfessorToSubject
    AddProfessorToSubject.mockResolvedValue({ /* your response object here */ });

    render(<AssignProfessors />);

    // Select some professors
    const professorCheckbox = screen.getByLabelText('Professor Name');
    userEvent.click(professorCheckbox);

    // Click the "Assign Professors" button
    const assignButton = screen.getByText('Assign Professors');
    userEvent.click(assignButton);

    // Assert that AddProfessorToSubject was called with the correct arguments
    expect(AddProfessorToSubject).toHaveBeenCalledWith(/* your expected arguments here */);

    // Wait for the API call to complete, you may need to adjust the timeout
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the timeout if needed
    });

    // Assert that the component is updated as expected
    expect(/* your assertions here */);
  });

  // Write similar tests for other component behaviors, like removing professors
});
