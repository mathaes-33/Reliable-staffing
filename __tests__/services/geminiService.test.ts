/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getResumeFeedback, parseJobSearchQuery, submitApplication } from '../../services/geminiService';
import '@testing-library/jest-dom';

// Mock the global fetch function
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('geminiService', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  describe('getResumeFeedback', () => {
    it('should call the API proxy and return feedback on success', async () => {
      const mockResponse = { feedback: '## Great Resume!' };
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const feedback = await getResumeFeedback('my resume', 'job description');

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'resume',
          payload: { resume: 'my resume', jobDescription: 'job description' },
        }),
      });
      expect(feedback).toBe(mockResponse.feedback);
    });

    it('should return an error message when the API call fails', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ message: 'Server error' }),
      });

      const feedback = await getResumeFeedback('my resume', 'job description');
      
      expect(feedback).toBe('Sorry, I encountered an error while analyzing your documents. Please try again later.');
    });
  });

  describe('parseJobSearchQuery', () => {
    it('should call the API proxy and return parsed data on success', async () => {
      const mockResponse = { parsedQuery: { keywords: 'Software Engineer', location: 'Remote' } };
       mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await parseJobSearchQuery('remote software engineer jobs');

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'search',
          payload: { query: 'remote software engineer jobs' },
        }),
      });
      expect(result).toEqual(mockResponse.parsedQuery);
    });

    it('should return a fallback object when the API call fails', async () => {
       mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ message: 'Server error' }),
      });
      const query = 'some complex query';
      const result = await parseJobSearchQuery(query);

      expect(result).toEqual({ keywords: query, location: "" });
    });
  });

  describe('submitApplication', () => {
    it('should call the API proxy with application data and return success', async () => {
      const applicationData = { jobId: '1', name: 'Jane Doe', email: 'jane@example.com', resume: 'My resume' };
      const mockResponse = { success: true };
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await submitApplication(applicationData);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'application',
          payload: applicationData,
        }),
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error if the API call fails', async () => {
       mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ message: 'Server error' }),
      });
      const applicationData = { jobId: '1', name: 'Jane Doe', email: 'jane@example.com', resume: 'My resume' };
      
      // Ensure the function throws, so the component can catch it.
      await expect(submitApplication(applicationData)).rejects.toThrow('Server error');
    });
  });
});
