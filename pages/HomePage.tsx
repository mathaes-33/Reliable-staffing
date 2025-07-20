
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, User, Building, Zap } from 'lucide-react';
import JobCard from '../components/JobCard';
import { JOBS_DATA } from '../constants';

const HomePage: React.FC = () => {
  const featuredJobs = JOBS_DATA.slice(0, 3);
  
  return (
    <div className="bg-dark-bg">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 animated-gradient" />
        <div className="absolute inset-0 bg-dark-bg opacity-50" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-40 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-300">Find Your Next Big Opportunity</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-medium-text">
            We connect talented professionals with innovative companies. Your dream job is just a click away.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link to="/jobs" className="bg-accent hover:bg-accent-dark text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-accent/20 transition-all duration-300 hover:scale-105 inline-flex items-center text-lg">
              Browse Jobs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/employers" className="bg-light-bg/80 text-light-text font-bold py-3 px-8 rounded-lg shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 hover:bg-light-bg">
              Hire Talent
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 sm:py-28 fade-in-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-light-text">Why Choose Us?</h2>
            <p className="mt-3 text-lg text-medium-text max-w-2xl mx-auto">A faster, smarter, and more personal way to handle employment.</p>
          </div>
          <div className="mt-16 grid gap-8 grid-cols-1 md:grid-cols-3">
            {[
              { icon: User, title: 'For Job Seekers', description: 'Access exclusive roles and get expert guidance with our AI-powered tools to land your dream job.'},
              { icon: Building, title: 'For Employers', description: 'Find pre-vetted, high-quality candidates quickly and efficiently. We streamline your hiring process.'},
              { icon: Zap, title: 'Fast & Reliable', description: 'Our process is built for speed and reliability, ensuring a smooth experience for everyone involved.'},
            ].map((item, index) => (
              <div key={index} className="text-center p-8 bg-light-bg/50 border border-slate-100/10 rounded-xl shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-primary/20">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/20 text-primary mx-auto">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="mt-5 text-xl font-semibold font-display text-light-text">{item.title}</h3>
                <p className="mt-2 text-medium-text">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="bg-dark-bg py-20 sm:py-28 border-t border-slate-100/10 fade-in-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-light-text">Featured Job Openings</h2>
            <p className="mt-3 text-lg text-medium-text max-w-2xl mx-auto">Get a glimpse of the exciting opportunities waiting for you.</p>
          </div>
          <div className="mt-16 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {featuredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link to="/jobs" className="group text-secondary font-semibold hover:text-amber-400 transition-colors duration-300 inline-flex items-center text-lg">
              View All Jobs <ArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
