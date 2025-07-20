
import React from 'react';
import { Job } from '../types';
import { Briefcase, MapPin, DollarSign, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-light-bg/50 border border-slate-100/10 rounded-xl shadow-lg shadow-black/20 p-6 flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-secondary/20 hover:border-secondary/30">
      <div className="flex-grow">
        <h3 className="text-xl font-bold font-display text-light-text">{job.title}</h3>
        <p className="text-lg font-semibold text-secondary mt-1">{job.company}</p>
        
        <div className="mt-4 space-y-2 text-medium-text">
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
        <p className="mt-4 text-medium-text line-clamp-3">{job.description}</p>
      </div>

      <div className="mt-6">
         <Link to={`/jobs/${job.id}`} className="group w-full text-center bg-primary-light/80 hover:bg-primary-light text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center">
            View Details
            <ArrowRight className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
