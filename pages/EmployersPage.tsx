

import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Target, Users, ArrowRight } from 'lucide-react';

/**
 * EmployersPage showcases the agency's value proposition for companies looking to hire.
 * It outlines the process, services, and benefits in a visually compelling, dark-themed layout.
 */
const EmployersPage: React.FC = () => {
  return (
    <div className="bg-dark-bg text-light-text">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 animated-gradient" />
        <div className="absolute inset-0 bg-dark-bg opacity-60" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold font-display tracking-tight">Hire Faster, Hire Smarter</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-medium-text">
            Access a pool of pre-vetted, top-tier talent ready to make an impact. Let us handle the sourcing, so you can focus on building your team.
          </p>
          <div className="mt-10">
            <Link to="/post-job" className="bg-accent hover:bg-accent-dark text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-accent/20 transition-all duration-300 hover:scale-105 inline-flex items-center text-lg">
              Post a Job Opening
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 sm:py-28 fade-in-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-light-text">Our Proven Process</h2>
            <p className="mt-3 text-lg text-medium-text max-w-2xl mx-auto">A streamlined approach to finding your perfect hire.</p>
          </div>
          <div className="mt-16 grid gap-8 grid-cols-1 md:grid-cols-3">
             {[
              { num: '1', title: 'Define Your Needs', description: 'We work with you to understand the role, team culture, and ideal candidate profile.' },
              { num: '2', title: 'Source & Vet', description: 'We leverage our network and AI tools to find and screen the best candidates for your review.' },
              { num: '3', title: 'Hire with Confidence', description: 'We present a shortlist of top talent, facilitating interviews and successful hires.' },
            ].map((item) => (
               <div key={item.num} className="text-center p-8 bg-light-bg/50 border border-slate-100/10 rounded-xl shadow-lg shadow-black/20">
                 <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/20 text-primary mx-auto mb-5 border-2 border-primary">
                    <span className="text-3xl font-bold font-display">{item.num}</span>
                 </div>
                <h3 className="text-xl font-semibold font-display text-light-text">{item.title}</h3>
                <p className="mt-2 text-medium-text">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 sm:py-28 border-t border-slate-100/10 fade-in-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-light-text">Services Tailored For You</h2>
              <p className="mt-4 text-lg text-medium-text">We offer flexible solutions to meet your unique hiring challenges, from single placements to building entire teams.</p>
              <ul className="mt-8 space-y-6">
                 {[
                  { icon: Zap, title: 'Rapid Placement', description: 'Fill critical roles quickly with our agile recruitment process and extensive talent network.' },
                  { icon: Target, title: 'Specialized Search', description: 'Find experts in niche industries and technologies with our targeted headhunting services.' },
                  { icon: Users, title: 'Contract & Temp Staffing', description: 'Scale your team up or down with flexible, high-quality contract and temporary professionals.' },
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-secondary/20 text-secondary">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-light-text">{item.title}</h4>
                      <p className="text-medium-text">{item.description}</p>
                    </div>
                  </li>
                 ))}
              </ul>
            </div>
            <div className="hidden md:block">
              <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg shadow-2xl">
                <img src="https://plus.unsplash.com/premium_photo-1664299968832-5a0870f50541?q=80&w=600&h=500&auto=format&fit=crop" alt="Strategizing talent acquisition on a glass whiteboard" className="rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmployersPage;