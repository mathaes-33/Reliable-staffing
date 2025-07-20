
import { JobSubmission } from '../types';

/**
 * A helper function to call our secure API proxy.
 * This ensures the API key is never exposed on the client side.
 * @param type The type of AI task to perform ('resume' or 'search').
 * @param payload The data required for the task.
 * @returns The JSON response from the server.
 */
const callApiProxy = async (type: 'resume' | 'search' | 'application' | 'job-submission', payload: any) => {
    const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, payload }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred.' }));
        throw new Error(errorData.message || `Failed to fetch from API proxy with status: ${response.status}`);
    }

    return response.json();
};


/**
 * Analyzes a resume against a job description and provides feedback.
 * @param resume The user's resume text.
 * @param jobDescription The job description text.
 * @returns A string containing formatted feedback.
 */
export const getResumeFeedback = async (resume: string, jobDescription: string): Promise<string> => {
  try {
    const data = await callApiProxy('resume', { resume, jobDescription });
    return data.feedback;
  } catch (error) {
    console.error("Error getting resume feedback:", error);
    return "Sorry, I encountered an error while analyzing your documents. Please try again later.";
  }
};

/**
 * Parses a natural language job search query into structured data.
 * @param query The user's natural language search query.
 * @returns An object with extracted keywords and location.
 */
export const parseJobSearchQuery = async (query: string): Promise<{ keywords: string; location: string; }> => {
    try {
        const data = await callApiProxy('search', { query });
        return data.parsedQuery;
    } catch (error) {
        console.error("Error parsing job search query:", error);
        // Fallback to basic parsing if API fails
        return { keywords: query, location: "" };
    }
};

/**
 * Submits a job application.
 * @param applicationData The user's application data.
 * @returns A promise that resolves on successful submission.
 */
export const submitApplication = async (applicationData: { jobId: string | undefined; name: string; email: string; resume: string; }): Promise<{success: boolean}> => {
    // No try/catch here, we want the component to handle it
    // so it can display a specific error message to the user.
    return callApiProxy('application', applicationData);
};

/**
 * Submits a new job posting from an employer.
 * @param jobData The job posting data from the form.
 * @returns A promise that resolves on successful submission.
 */
export const submitJobPosting = async (jobData: JobSubmission): Promise<{success: boolean}> => {
    // Component will handle try/catch for UI feedback
    return callApiProxy('job-submission', jobData);
};
