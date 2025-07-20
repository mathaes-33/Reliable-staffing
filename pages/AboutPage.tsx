import React from 'react';
import { Globe, Heart, Rocket, User, Users, Briefcase, BrainCircuit } from 'lucide-react';

/**
 * AboutPage provides information about the company's mission, values, and team.
 * It's designed with the application's dark theme to maintain a consistent, professional brand image.
 */
const AboutPage: React.FC = () => {
  return (
    <div className="bg-dark-bg text-light-text">
      {/* Page Header */}
       <div className="relative text-white overflow-hidden py-24 md:py-32 text-center">
        <div className="absolute inset-0 animated-gradient opacity-80" />
        <div className="absolute inset-0 bg-dark-bg opacity-50" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-extrabold font-display">About Reliable Staffing</h1>
            <p className="mt-4 text-lg text-medium-text">Connecting talent to opportunity, powering the future of work.</p>
        </div>
      </div>

      {/* Our Mission Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 fade-in-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold font-display">Our Mission</h2>
            <p className="mt-4 text-lg text-medium-text">
              Our mission is to bridge the gap between talented individuals and the world's most innovative companies. We believe that the right job can transform a person's life and that the right person can transform a business. We are dedicated to making these connections happen with integrity, efficiency, and a human-first approach.
            </p>
            <p className="mt-4 text-lg text-medium-text">
              We strive to be more than just a recruitment agency; we aim to be a long-term career partner for our candidates and a strategic talent advisor for our clients.
            </p>
          </div>
          <div className="text-center p-2 bg-gradient-to-br from-primary to-secondary rounded-lg shadow-2xl">
             <img src="https://plus.unsplash.com/premium_photo-1661932816149-291a447e3022?q=80&w=500&h=400&auto=format&fit=crop" alt="A professional focusing on their work in a modern office" className="rounded-md" />
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-light-bg/30 py-20 sm:py-28 fade-in-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-display text-light-text">Our Core Values</h2>
            <p className="mt-3 text-lg text-medium-text max-w-2xl mx-auto">The principles that guide everything we do.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
              { icon: Heart, title: 'Integrity', description: 'We operate with honesty and transparency, building trust with every interaction.' },
              { icon: Rocket, title: 'Innovation', description: 'We leverage cutting-edge technology to streamline the hiring process and deliver better results.' },
              { icon: Globe, title: 'Impact', description: 'We are passionate about making a positive impact on careers, companies, and communities.' },
            ].map((item, index) => (
               <div key={index} className="text-center p-8 bg-light-bg/50 border border-slate-100/10 rounded-xl shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-secondary/20">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary/20 text-secondary mx-auto">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="mt-5 text-xl font-semibold font-display text-light-text">{item.title}</h3>
                <p className="mt-2 text-medium-text">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Our Team Section */}
      <section className="py-20 sm:py-28 fade-in-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold font-display text-light-text">Meet The Team</h2>
            <p className="mt-3 text-lg text-medium-text max-w-2xl mx-auto">A passionate group of recruiters and technologists.</p>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { name: 'Kyle & Mathais', role: 'Founders & CEOs', icon: Users },
                    { name: 'Kyle Banks', role: 'Head of Recruitment', icon: User },
                    { name: 'Mathais Daniels', role: 'Lead Tech Recruiter', icon: BrainCircuit },
                    { name: 'Diana Prince', role: 'Client Relations', icon: Briefcase }
                ].map(member => (
                    <div key={member.name} className="text-center flex flex-col items-center">
                         <div className="flex items-center justify-center h-32 w-32 rounded-full bg-light-bg/50 border-2 border-slate-100/10 shadow-lg mb-4">
                           <member.icon className="w-16 h-16 text-secondary" />
                        </div>
                        <h4 className="mt-4 text-lg font-semibold text-light-text">{member.name}</h4>
                        <p className="text-primary-light">{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;