
import React, { useState, useCallback } from 'react';
import { getResumeFeedback } from '../services/geminiService';
import Spinner from '../components/Spinner';
import { Wand2, FileText, Briefcase } from 'lucide-react';

/**
 * Renders a simple version of Markdown content into React elements for display.
 * @param text The Markdown-formatted string.
 * @returns An array of React elements.
 */
const renderFeedback = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        line = line.trim();
        if (line.startsWith('**') && line.endsWith('**')) {
             return <strong key={index} className="my-1 font-bold">{line.substring(2, line.length - 2)}</strong>;
        }
        if (line.startsWith('### ')) return <h3 key={index} className="text-xl font-display font-semibold mt-4 mb-2 text-secondary">{line.substring(4)}</h3>;
        if (line.startsWith('## ')) return <h2 key={index} className="text-2xl font-display font-bold mt-6 mb-3 border-b border-slate-100/10 pb-2 text-light-text">{line.substring(3)}</h2>;
        if (line.startsWith('* ')) return <li key={index} className="ml-5 list-disc text-medium-text">{line.substring(2)}</li>;
        if (line.startsWith('---')) return <hr key={index} className="my-6 border-slate-100/10" />;
        if (line === '') return null; // Don't render empty paragraphs
        return <p key={index} className="my-2 text-medium-text">{line}</p>;
      }).filter(Boolean); // Remove null entries
  };


/**
 * ResumeHelperPage provides an AI-powered tool for users to get feedback on their resume
 * against a specific job description. The design is integrated with the dark theme.
 */
const ResumeHelperPage: React.FC = () => {
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = useCallback(async () => {
    if (!resume || !jobDescription) {
      setError('Please provide both your resume and the job description.');
      return;
    }
    setError('');
    setIsLoading(true);
    setFeedback('');
    try {
      const result = await getResumeFeedback(resume, jobDescription);
      setFeedback(result);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [resume, jobDescription]);

  return (
    <div className="bg-dark-bg text-light-text">
       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
            <Wand2 className="mx-auto h-12 w-12 text-secondary mb-4" />
            <h1 className="text-4xl md:text-5xl font-extrabold font-display text-light-text">AI Resume Helper</h1>
            <p className="mt-3 text-lg text-medium-text max-w-3xl mx-auto">
            Paste your resume and a job description to get instant, AI-powered feedback on how to improve your application.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
            <div>
                <label htmlFor="resume" className="flex items-center text-lg font-semibold text-light-text mb-2">
                    <FileText className="w-5 h-5 mr-2 text-primary-light" />
                    Your Resume
                </label>
                <textarea
                id="resume"
                rows={15}
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="Paste your full resume here..."
                className="w-full p-4 bg-light-bg border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none placeholder:text-slate-500 font-mono text-sm"
                />
            </div>
            </div>
            <div>
                <label htmlFor="jobDescription" className="flex items-center text-lg font-semibold text-light-text mb-2">
                    <Briefcase className="w-5 h-5 mr-2 text-primary-light" />
                    Job Description
                </label>
                <textarea
                id="jobDescription"
                rows={15}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description you're applying for..."
                className="w-full p-4 bg-light-bg border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none placeholder:text-slate-500 font-mono text-sm"
                />
            </div>
        </div>
        
        <div className="text-center mb-12">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="bg-accent hover:bg-accent-dark text-white font-bold py-4 px-10 rounded-lg shadow-lg shadow-accent/20 transition-all duration-300 hover:scale-105 disabled:bg-slate-500 disabled:cursor-not-allowed inline-flex items-center text-lg"
            >
            {isLoading ? (
                <>
                <Spinner size="sm" />
                <span className="ml-3">Analyzing...</span>
                </>
            ) : (
                <>
                <Wand2 className="mr-3 h-6 w-6" />
                <span>Analyze My Resume</span>
                </>
            )}
            </button>
        </div>

         <div className="bg-light-bg/50 border border-slate-100/10 rounded-xl shadow-2xl shadow-black/30 p-8 min-h-[400px]">
            <h2 className="text-2xl font-bold font-display text-light-text mb-4">Your Feedback</h2>
            <div className="h-full">
                {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-10">
                    <Spinner size="lg" />
                    <p className="mt-4 text-medium-text font-semibold">Analyzing your documents...</p>
                    <p className="text-slate-500">This may take a moment.</p>
                </div>
                ) : feedback ? (
                 <div className="max-w-none">
                    {renderFeedback(feedback)}
                 </div>
                ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-medium-text bg-dark-bg/50 rounded-lg p-8">
                    <Wand2 className="w-16 h-16 text-slate-500 mb-4" />
                    <h3 className="text-xl font-semibold text-slate-300">Feedback will appear here</h3>
                    <p className="mt-2 max-w-xs">Fill out both fields and click "Analyze" to see the magic happen.</p>
                </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default ResumeHelperPage;
