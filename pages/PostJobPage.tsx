
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle, AlertTriangle, Briefcase } from 'lucide-react';
import Spinner from '../components/Spinner';
import { submitJobPosting } from '../services/geminiService';
import { JobSubmission } from '../types';

type SubmissionStatus = 'idle' | 'submitting' | 'submitted' | 'error';

const PostJobPage: React.FC = () => {
    const [status, setStatus] = useState<SubmissionStatus>('idle');
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<JobSubmission>({
        jobTitle: '',
        companyName: '',
        location: '',
        jobType: 'Full-time',
        salaryRange: '',
        jobDescription: '',
        responsibilities: '',
        qualifications: '',
        contactEmail: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setError('');
        try {
            await submitJobPosting(formData);
            setStatus('submitted');
        } catch (err) {
            console.error('Job posting submission failed:', err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            setStatus('error');
        }
    };

    if (status === 'submitted') {
        return (
             <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
                <CheckCircle className="w-24 h-24 text-secondary mb-6" />
                <h1 className="text-4xl font-bold font-display text-secondary">Submission Received!</h1>
                <p className="mt-4 text-lg text-medium-text max-w-xl">
                    Thank you for submitting your job posting. Our team will review it shortly. Once approved, it will be live on our job board.
                </p>
                <Link to="/jobs" className="mt-8 bg-accent hover:bg-accent-dark text-white font-bold py-3 px-6 rounded-lg transition-colors">
                    Back to Job Board
                </Link>
            </div>
        )
    }

    return (
        <div className="bg-dark-bg py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                     <div className="text-center mb-10">
                        <Briefcase className="mx-auto h-12 w-12 text-secondary mb-4" />
                        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-light-text">Post a New Job</h1>
                        <p className="mt-3 text-lg text-medium-text">Fill out the details below. All submissions are reviewed before posting.</p>
                    </div>

                    <div className="bg-light-bg/50 border border-slate-100/10 p-8 rounded-xl shadow-2xl shadow-black/30">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="jobTitle" className="block text-sm font-medium text-light-text mb-1">Job Title</label>
                                    <input type="text" name="jobTitle" id="jobTitle" required value={formData.jobTitle} onChange={handleChange} className="w-full input-style"/>
                                </div>
                                <div>
                                    <label htmlFor="companyName" className="block text-sm font-medium text-light-text mb-1">Company Name</label>
                                    <input type="text" name="companyName" id="companyName" required value={formData.companyName} onChange={handleChange} className="w-full input-style"/>
                                </div>
                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-light-text mb-1">Location (e.g., City, State or Remote)</label>
                                    <input type="text" name="location" id="location" required value={formData.location} onChange={handleChange} className="w-full input-style"/>
                                </div>
                                <div>
                                    <label htmlFor="jobType" className="block text-sm font-medium text-light-text mb-1">Job Type</label>
                                    <select name="jobType" id="jobType" required value={formData.jobType} onChange={handleChange} className="w-full input-style appearance-none">
                                        <option>Full-time</option>
                                        <option>Part-time</option>
                                        <option>Contract</option>
                                    </select>
                                </div>
                                 <div className="md:col-span-2">
                                    <label htmlFor="salaryRange" className="block text-sm font-medium text-light-text mb-1">Salary Range (e.g., $100,000 - $120,000)</label>
                                    <input type="text" name="salaryRange" id="salaryRange" required value={formData.salaryRange} onChange={handleChange} className="w-full input-style"/>
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="jobDescription" className="block text-sm font-medium text-light-text mb-1">Job Description</label>
                                <textarea name="jobDescription" id="jobDescription" rows={5} required value={formData.jobDescription} onChange={handleChange} className="w-full input-style" placeholder="A summary of the role..."></textarea>
                            </div>
                             <div>
                                <label htmlFor="responsibilities" className="block text-sm font-medium text-light-text mb-1">Key Responsibilities (one per line)</label>
                                <textarea name="responsibilities" id="responsibilities" rows={5} required value={formData.responsibilities} onChange={handleChange} className="w-full input-style" placeholder="Develop new features..."></textarea>
                            </div>
                            <div>
                                <label htmlFor="qualifications" className="block text-sm font-medium text-light-text mb-1">Qualifications (one per line)</label>
                                <textarea name="qualifications" id="qualifications" rows={5} required value={formData.qualifications} onChange={handleChange} className="w-full input-style" placeholder="5+ years experience with React..."></textarea>
                            </div>
                            <div>
                                <label htmlFor="contactEmail" className="block text-sm font-medium text-light-text mb-1">Your Contact Email (for notifications)</label>
                                <input type="email" name="contactEmail" id="contactEmail" required value={formData.contactEmail} onChange={handleChange} className="w-full input-style"/>
                            </div>

                            {status === 'error' && (
                                <div className="bg-red-900/50 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg flex items-center">
                                    <AlertTriangle className="w-5 h-5 mr-3"/>
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="text-center pt-4">
                                <button type="submit" disabled={status === 'submitting'} className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-3 px-12 rounded-lg shadow-lg shadow-accent/20 transition-all duration-300 hover:scale-105 text-lg inline-flex items-center justify-center disabled:bg-slate-500 disabled:cursor-not-allowed">
                                    {status === 'submitting' ? (
                                        <><Spinner size="sm" /><span className="ml-3">Submitting for Review...</span></>
                                    ) : (
                                        <><Send className="mr-3 h-5 w-5" /><span>Submit for Review</span></>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
             <style>{`
                .input-style {
                    background-color: #0f172a; /* dark-bg */
                    border: 1px solid #475569; /* slate-600 */
                    border-radius: 0.5rem;
                    padding: 0.75rem 1rem;
                    color: #f1f5f9; /* light-text */
                }
                .input-style:focus {
                    outline: none;
                    box-shadow: 0 0 0 2px #4f46e5; /* primary */
                    border-color: #4f46e5;
                }
            `}</style>
        </div>
    );
};

export default PostJobPage;
