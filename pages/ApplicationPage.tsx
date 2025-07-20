
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { JOBS_DATA } from '../constants';
import { ArrowLeft, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import Spinner from '../components/Spinner';
import { submitApplication } from '../services/geminiService';

type SubmissionStatus = 'idle' | 'submitting' | 'submitted' | 'error';

const ApplicationPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const job = JOBS_DATA.find(j => j.id.toString() === id);

    const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        resume: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmissionStatus('submitting');
        setErrorMessage('');
        try {
            await submitApplication({ jobId: id, ...formData });
            setSubmissionStatus('submitted');
        } catch (error) {
            console.error('Application submission failed:', error);
            setErrorMessage('Something went wrong. Please try again later.');
            setSubmissionStatus('error');
        }
    };


    if (!job) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <h1 className="text-4xl font-bold font-display text-light-text">Job Not Found</h1>
                <p className="mt-4 text-lg text-medium-text">The job you are trying to apply for does not exist.</p>
                <Link to="/jobs" className="mt-8 inline-flex items-center bg-primary hover:bg-primary-light text-white font-bold py-3 px-6 rounded-lg transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to All Jobs
                </Link>
            </div>
        );
    }
    
    if (submissionStatus === 'submitted') {
        return (
             <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
                <CheckCircle className="w-24 h-24 text-secondary mb-6" />
                <h1 className="text-4xl font-bold font-display text-secondary">Application Sent!</h1>
                <p className="mt-4 text-lg text-medium-text max-w-xl">Thank you for applying for the {job.title} position. We will review your application and be in touch soon.</p>
                <Link to="/jobs" className="mt-8 bg-accent hover:bg-accent-dark text-white font-bold py-3 px-6 rounded-lg transition-colors">
                    Find More Jobs
                </Link>
            </div>
        )
    }

    return (
        <div className="bg-dark-bg py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto bg-light-bg/50 border border-slate-100/10 p-8 rounded-xl shadow-2xl shadow-black/30">
                    <div className="text-center mb-8">
                        <p className="text-lg text-medium-text">Apply for</p>
                        <h1 className="text-3xl md:text-4xl font-extrabold font-display text-light-text">{job.title}</h1>
                        <p className="text-xl font-semibold text-secondary">{job.company}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-light-text mb-1">Full Name</label>
                            <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 bg-dark-bg border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none placeholder:text-slate-500"/>
                        </div>
                         <div>
                            <label htmlFor="email" className="block text-sm font-medium text-light-text mb-1">Email Address</label>
                            <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2 bg-dark-bg border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none placeholder:text-slate-500"/>
                        </div>
                         <div>
                            <label htmlFor="resume" className="block text-sm font-medium text-light-text mb-1">Paste Your Resume & Cover Letter</label>
                            <textarea name="resume" id="resume" rows={10} required value={formData.resume} onChange={handleChange} className="w-full px-4 py-2 bg-dark-bg border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none placeholder:text-slate-500" placeholder="Paste your resume text here..."></textarea>
                        </div>
                        
                        {submissionStatus === 'error' && (
                             <div className="bg-red-900/50 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg flex items-center">
                                <AlertTriangle className="w-5 h-5 mr-3"/>
                                <span>{errorMessage}</span>
                            </div>
                        )}

                        <div className="text-center pt-4">
                            <button
                                type="submit"
                                disabled={submissionStatus === 'submitting'}
                                className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-3 px-12 rounded-lg shadow-lg shadow-accent/20 transition-all duration-300 hover:scale-105 text-lg inline-flex items-center justify-center disabled:bg-slate-500 disabled:cursor-not-allowed"
                            >
                                {submissionStatus === 'submitting' ? (
                                    <>
                                        <Spinner size="sm" />
                                        <span className="ml-3">Submitting...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="mr-3 h-5 w-5" />
                                        <span>Submit Application</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                    <div className="mt-8 text-center">
                        <Link to={`/jobs/${id}`} className="inline-flex items-center text-medium-text hover:text-light-text font-semibold transition-colors text-sm group">
                            <ArrowLeft className="w-4 h-4 mr-1 transform transition-transform duration-300 group-hover:-translate-x-1" />
                            Cancel and go back to job details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationPage;
