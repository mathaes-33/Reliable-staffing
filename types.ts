

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  salary: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
}

export interface JobSubmission {
  jobTitle: string;
  companyName: string;
  location: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract';
  salaryRange: string;
  jobDescription: string;
  responsibilities: string;
  qualifications: string;
  contactEmail: string;
}
