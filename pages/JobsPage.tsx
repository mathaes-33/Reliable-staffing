
import React, { useState, useMemo, useCallback } from 'react';
import { JOBS_DATA } from '../constants';
import { Job } from '../types';
import JobCard from '../components/JobCard';
import Spinner from '../components/Spinner';
import { parseJobSearchQuery } from '../services/geminiService';
import { Search, MapPin, XCircle, BrainCircuit } from 'lucide-react';

const JobsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('All');
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [naturalQuery, setNaturalQuery] = useState('');

  const handleNaturalSearch = useCallback(async () => {
    if (!naturalQuery) return;
    setIsAiSearching(true);
    try {
      const parsed = await parseJobSearchQuery(naturalQuery);
      setSearchTerm(parsed.keywords || '');
      setLocation(parsed.location || '');
    } catch (error) {
      console.error(error);
      setSearchTerm(naturalQuery);
      setLocation('');
    } finally {
      setIsAiSearching(false);
    }
  }, [naturalQuery]);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setLocation('');
    setJobType('All');
    setNaturalQuery('');
  }, []);

  const filtersAreActive = useMemo(() => {
    return searchTerm !== '' || location !== '' || jobType !== 'All';
  }, [searchTerm, location, jobType]);


  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter(job => {
      const matchesSearch = searchTerm.toLowerCase() === '' ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = location.toLowerCase() === '' ||
        job.location.toLowerCase().includes(location.toLowerCase());

      const matchesType = jobType === 'All' || job.type === jobType;

      return matchesSearch && matchesLocation && matchesType;
    });
  }, [searchTerm, location, jobType]);
  
  const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract'];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-light-text">Find Your Perfect Job</h1>
        <p className="mt-3 text-lg text-medium-text">Search through hundreds of open positions.</p>
      </div>

      {/* AI Search Bar */}
      <div className="mb-10 p-6 bg-light-bg/50 border border-slate-100/10 rounded-xl shadow-lg shadow-black/20">
         <label htmlFor="natural-search" className="flex items-center text-lg font-semibold text-secondary mb-3">
          <BrainCircuit className="w-6 h-6 mr-2" />
          Try our AI-Powered Search
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
            <input
                id="natural-search"
                type="text"
                value={naturalQuery}
                onChange={(e) => setNaturalQuery(e.target.value)}
                placeholder="e.g., 'Remote frontend jobs in New York'"
                className="flex-grow w-full px-4 py-3 bg-dark-bg border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none placeholder:text-slate-500"
                onKeyDown={(e) => e.key === 'Enter' && handleNaturalSearch()}
            />
            <button
                onClick={handleNaturalSearch}
                disabled={isAiSearching || !naturalQuery}
                className="bg-primary hover:bg-primary-light text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
                {isAiSearching ? <Spinner size="sm" /> : <Search className="w-5 h-5 mr-2" />}
                <span>AI Search</span>
            </button>
        </div>
        <p className="text-sm text-medium-text mt-2">Let AI parse your query into filters for you!</p>
      </div>


      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Job title or company"
              className="w-full pl-10 pr-4 py-3 bg-light-bg border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="location" className="sr-only">Location</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              id="location"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="City or state"
              className="w-full pl-10 pr-4 py-3 bg-light-bg border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="jobType" className="sr-only">Job Type</label>
          <select
            id="jobType"
            value={jobType}
            onChange={e => setJobType(e.target.value)}
            className="w-full px-4 py-3 bg-light-bg border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none appearance-none"
          >
            {jobTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
      </div>
      
       {/* Clear Filters Button */}
      {filtersAreActive && (
        <div className="mb-8 text-right">
          <button
            onClick={clearFilters}
            className="inline-flex items-center text-sm font-semibold text-medium-text hover:text-accent transition-colors"
          >
            <XCircle className="w-4 h-4 mr-1" />
            Clear Filters
          </button>
        </div>
      )}

      {/* Job Listings */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-light-bg/30 rounded-lg">
          <h3 className="text-2xl font-semibold text-light-text">No Jobs Found</h3>
          <p className="mt-2 text-medium-text">Try adjusting your search filters to find what you're looking for.</p>
           {filtersAreActive && (
             <button
                onClick={clearFilters}
                className="mt-6 bg-accent hover:bg-accent-dark text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors"
            >
                Reset Search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default JobsPage;
