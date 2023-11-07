import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import the custom matchers
import { BrowserRouter as Router } from 'react-router-dom';
import AdminHome from './AdminHome';

test('AdminHome renders correctly', () => {
  render(
    <Router>
      <AdminHome />
    </Router>
  );

  // Check that the component's content is rendered
  const coursesLink = screen.getByText(/Courses/);
  const subjectsLink = screen.getByText(/Subjects/);
  const venuesLink = screen.getByText(/Venues/);

  expect(coursesLink).toBeInTheDocument();
  expect(subjectsLink).toBeInTheDocument();
  expect(venuesLink).toBeInTheDocument();
});
