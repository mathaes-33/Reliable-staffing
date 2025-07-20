
import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { href: "https://twitter.com/reliablestaffing", label: "Twitter", icon: Twitter },
    { href: "https://facebook.com/reliablestaffing", label: "Facebook", icon: Facebook },
    { href: "https://linkedin.com/company/reliablestaffing", label: "LinkedIn", icon: Linkedin },
  ];

  return (
    <footer className="bg-slate-900/50 border-t border-slate-100/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2 space-y-4">
             <Link to="/" className="flex items-center space-x-3">
                <Briefcase className="h-8 w-8 text-secondary" />
                <span className="text-2xl font-bold font-display text-light-text">Reliable Staffing</span>
            </Link>
            <p className="text-medium-text max-w-md">Connecting talent with opportunity since 2023. We are committed to helping you find your next career move.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-light-text mb-4 font-display">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/jobs" className="text-medium-text hover:text-secondary transition-colors">Find a Job</Link></li>
              <li><Link to="/employers" className="text-medium-text hover:text-secondary transition-colors">For Employers</Link></li>
              <li><Link to="/about" className="text-medium-text hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link to="/resume-helper" className="text-medium-text hover:text-secondary transition-colors">AI Resume Helper</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-light-text mb-4 font-display">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <a 
                  key={social.label}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-medium-text hover:text-secondary transition-all duration-300 hover:scale-125" 
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-100/10 pt-8 text-center text-medium-text">
          <p>&copy; {currentYear} Reliable Staffing. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
