

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import EmployersPage from './pages/EmployersPage';
import AboutPage from './pages/AboutPage';
import ResumeHelperPage from './pages/ResumeHelperPage';
import JobDetailPage from './pages/JobDetailPage';
import ApplicationPage from './pages/ApplicationPage';
import PostJobPage from './pages/PostJobPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/jobs/:id/apply" element={<ApplicationPage />} />
          <Route path="/employers" element={<EmployersPage />} />
          <Route path="/post-job" element={<PostJobPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/resume-helper" element={<ResumeHelperPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;