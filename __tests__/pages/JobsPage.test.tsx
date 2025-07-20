/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import JobsPage from '../../pages/JobsPage';
import { JOBS_DATA } from '../../constants';
import * as geminiService from '../../services/geminiService';
import '@testing-library/jest-dom';

// Mock the AI search service to prevent actual API calls during tests
vi.mock('../../services/geminiService', () => ({
  parseJobSearchQuery: vi.fn(),
}));

describe('JobsPage Component', () => {

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <JobsPage />
      </MemoryRouter>
    );
  };

  it('renders all jobs initially', () => {
    renderComponent();
    const jobCards = screen.getAllByText(/view details/i);
    expect(jobCards).toHaveLength(JOBS_DATA.length);
  });

  it('filters jobs by search term (title)', async () => {
    const user = userEvent.setup();
    renderComponent();

    const searchInput = screen.getByPlaceholderText('Job title or company');
    await user.type(searchInput, 'Frontend');

    // After typing, only the job with "Frontend" in the title should be visible
    const jobCards = screen.getAllByText(/view details/i);
    expect(jobCards).toHaveLength(1);
    expect(screen.getByText('Senior Frontend Engineer')).toBeInTheDocument();
  });

  it('filters jobs by location', async () => {
    const user = userEvent.setup();
    renderComponent();

    const locationInput = screen.getByPlaceholderText('City or state');
    await user.type(locationInput, 'New York');

    const jobCards = screen.getAllByText(/view details/i);
    expect(jobCards).toHaveLength(1);
    expect(screen.getByText('Product Manager')).toBeInTheDocument();
  });

  it('filters jobs by type', async () => {
    const user = userEvent.setup();
    renderComponent();

    const typeSelect = screen.getByLabelText('Job Type');
    await user.selectOptions(typeSelect, 'Contract');
    
    const jobCards = screen.getAllByText(/view details/i);
    expect(jobCards).toHaveLength(1);
    expect(screen.getByText('UX/UI Designer')).toBeInTheDocument();
  });

  it('shows a message when no jobs are found', async () => {
    const user = userEvent.setup();
    renderComponent();
    
    const searchInput = screen.getByPlaceholderText('Job title or company');
    await user.type(searchInput, 'NonExistentJob12345');

    expect(screen.getByText('No Jobs Found')).toBeInTheDocument();
    expect(screen.queryByText(/view details/i)).not.toBeInTheDocument();
  });

  it('clears all filters when "Clear Filters" is clicked', async () => {
    const user = userEvent.setup();
    renderComponent();

    const searchInput = screen.getByPlaceholderText('Job title or company');
    await user.type(searchInput, 'Frontend');
    
    // Check that filter is applied
    expect(screen.getAllByText(/view details/i)).toHaveLength(1);

    const clearButton = screen.getByRole('button', { name: /clear filters/i });
    await user.click(clearButton);

    // After clearing, all jobs should be visible again
    expect(screen.getAllByText(/view details/i)).toHaveLength(JOBS_DATA.length);
  });
});
