# Reliable Staffing - Modern Employment Agency Website

Reliable Staffing is a modern, feature-rich web application designed to connect talented professionals with innovative companies. It serves as a comprehensive platform for both job seekers and employers, leveraging AI-powered tools to streamline the entire recruitment and application process.

## ✨ Features

- **Modern, Responsive Design**: A stunning "glassmorphism" dark theme that is fully responsive and accessible.
- **Job Listings & Search**: Browse, search, and filter job openings with a clean, intuitive interface.
- **AI-Powered Search**: Use natural language queries (e.g., "remote frontend jobs in New York") to find relevant positions, powered by Google Gemini.
- **AI Resume Helper**: Get instant, actionable feedback on your resume by comparing it against a job description.
- **Seamless Application Process**: A multi-step, user-friendly application form with clear feedback on submission.
- **Detailed Job Pages**: Rich, data-driven pages for each job with responsibilities, qualifications, and company details.

## 🛠️ Tech Stack & Architecture

- **Frontend**: [React](https://react.dev/) 19, [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **AI/LLM**: [Google Gemini API](https://ai.google.dev/)
- **Backend**: **Serverless Functions** (acting as a secure API proxy)
- **Icons**: [Lucide React](https://lucide.dev/)

This project uses a secure architecture where the client-side application communicates with a serverless function (`/api/gemini`) rather than directly with the Google Gemini API. This ensures the **API key is never exposed to the public**, making the application production-ready.

## 🚀 Getting Started

To run this project, you need a development environment that supports serving static files and running a serverless function for the API proxy.

1.  **Clone the repository.**
2.  **Provide API Key**: The AI features rely on the Google Gemini API. You must have an API key available as a **backend environment variable** named `API_KEY`. This variable should be accessible by your serverless function environment, NOT the client.
3.  **Run the application**: Use a framework like Next.js or a local development server that can run the serverless function in `api/`.
4.  Open your browser and navigate to the local server address.

## 🧪 Running Tests

This project is configured for testing using a standard JavaScript test runner like [Vitest](https://vitest.dev/) or [Jest](https://jestjs.io/). The tests are located in the `__tests__` directory.

To run the tests, you would typically install a development environment with Node.js and run the configured test command.

Example tests provided:
- **Component Test**: `__tests__/components/JobCard.test.tsx`
- **Integration/Page Test**: `__tests__/pages/JobsPage.test.tsx`
- **Service/API Test**: `__tests__/services/geminiService.test.ts`

These tests demonstrate best practices, including user interaction simulation and mocking `fetch` calls to the API proxy.
