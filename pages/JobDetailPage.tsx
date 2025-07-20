
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { JOBS_DATA } from '../constants';
import { Job } from '../types';
import { Briefcase, MapPin, DollarSign, ArrowLeft } from 'lucide-react';

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const job: Job | undefined = JOBS_DATA.find(j => j.id.toString() === id);

  if (!job) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl font-bold font-display text-light-text">Job Not Found</h1>
        <p className="mt-4 text-lg text-medium-text">Sorry, we couldn't find the job you're looking for.</p>
        <Link to="/jobs" className="mt-8 inline-flex items-center bg-primary hover:bg-primary-light text-white font-bold py-3 px-6 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to All Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-dark-bg py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to="/jobs" className="inline-flex items-center text-secondary hover:text-amber-400 font-semibold transition-colors group">
              <ArrowLeft className="w-5 h-5 mr-2 transform transition-transform duration-300 group-hover:-translate-x-1" />
              Back to All Jobs
            </Link>
          </div>

          <div className="bg-light-bg/50 border border-slate-100/10 rounded-xl shadow-2xl shadow-black/30 p-8 sm:p-12">
            <h1 className="text-3xl md:text-4xl font-extrabold font-display text-light-text">{job.title}</h1>
            <p className="mt-2 text-2xl font-bold text-secondary">{job.company}</p>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-4 text-medium-text">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-slate-500" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-slate-500" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-slate-500" />
                <span>{job.salary}</span>
              </div>
            </div>

            <hr className="my-8 border-slate-100/10" />

            <div className="prose prose-lg max-w-none prose-invert prose-headings:font-display prose-headings:text-light-text prose-p:text-medium-text prose-li:text-medium-text">
                <h2>Job Description</h2>
                <p>{job.description}</p>
                
                <h3>Responsibilities:</h3>
                <ul>
                    {job.responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>

                <h3>Qualifications:</h3>
                <ul>
                     {job.qualifications.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-12 text-center">
                 <Link to={`/jobs/${job.id}/apply`} className="bg-accent hover:bg-accent-dark text-white font-bold py-4 px-12 rounded-lg shadow-lg shadow-accent/20 transition-all duration-300 hover:scale-105 text-lg">
                    Apply Now
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
