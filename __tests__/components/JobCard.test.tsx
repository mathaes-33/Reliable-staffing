/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import JobCard from '../../components/JobCard';
import { JOBS_DATA } from '../../constants';
import '@testing-library/jest-dom';

const mockJob = JOBS_DATA[0]; // Use the first job for testing

describe('JobCard Component', () => {
  it('renders all job details correctly', () => {
    render(
      <MemoryRouter>
        <JobCard job={mockJob} />
      </MemoryRouter>
    );

    // Check for title and company
    expect(screen.getByText(mockJob.title)).toBeInTheDocument();
    expect(screen.getByText(mockJob.company)).toBeInTheDocument();

    // Check for location, type, and salary
    expect(screen.getByText(mockJob.location)).toBeInTheDocument();
    expect(screen.getByText(mockJob.type)).toBeInTheDocument();
    expect(screen.getByText(mockJob.salary)).toBeInTheDocument();
    
    // Check that the description is present
    // Using a regex to ignore case and find the text within the element
    const description = screen.getByText(/We are seeking an experienced Frontend Engineer/i);
    expect(description).toBeInTheDocument();
    
    // Check if the "View Details" link is correct
    const link = screen.getByRole('link', { name: /view details/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/jobs/${mockJob.id}`);
  });
});
