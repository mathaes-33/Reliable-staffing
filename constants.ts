

import { Job } from './types';

export const NAV_LINKS = [
  { name: 'Find a Job', href: '/jobs' },
  { name: 'For Employers', href: '/employers' },
  { name: 'Post a Job', href: '/post-job'},
  { name: 'AI Resume Helper', href: '/resume-helper' },
  { name: 'About Us', href: '/about' },
];

export const JOBS_DATA: Job[] = [
  {
    id: 1,
    title: 'General Labour',
    company: 'Warehouse Position',
    location: 'Mississauga, ON',
    type: 'Full-time',
    salary: '$18.30 / hour',
    description: 'We are hiring reliable and hardworking General Labourers for a busy warehouse environment. This is a great opportunity to join a dynamic team with potential for growth.',
    responsibilities: [
        'Loading and unloading materials from delivery trucks.',
        'Picking and packing orders accurately and efficiently.',
        'Maintaining a clean and safe work area at all times.',
        'Operating basic warehouse equipment like pallet jacks.'
    ],
    qualifications: [
        'Ability to lift up to 50 lbs consistently.',
        'Previous warehouse experience is an asset but not required.',
        'Positive attitude and willingness to work as part of a team.',
        'Must own CSA-approved steel-toed safety boots.'
    ]
  },
  {
    id: 2,
    title: 'Janitorial / Sanitization Crew',
    company: 'Commercial Cleaning Services',
    location: 'Brampton, ON',
    type: 'Part-time',
    salary: '$17.90 / hour',
    description: 'Seeking dedicated individuals to join our Janitorial and Sanitization Crew. You will be responsible for maintaining the cleanliness and safety of commercial facilities.',
    responsibilities: [
        'Performing general cleaning duties such as sweeping, mopping, and dusting.',
        'Sanitizing high-touch surfaces, restrooms, and common areas.',
        'Emptying trash and recycling receptacles.',
        'Following all health and safety regulations and procedures.'
    ],
    qualifications: [
        'Previous cleaning or janitorial experience preferred.',
        'Strong attention to detail and a thorough work ethic.',
        'Ability to work independently with minimal supervision.',
        'Knowledge of cleaning chemicals and supplies is a plus.'
    ]
  },
  {
    id: 3,
    title: 'General Labour',
    company: 'Warehouse Position',
    location: 'Mississauga, ON',
    type: 'Full-time',
    salary: '$18.60 / hour',
    description: 'Join our fast-paced warehouse team as a General Labourer. We are looking for motivated individuals who thrive in an active work environment and are committed to quality.',
    responsibilities: [
        'Sorting and placing materials or items on racks, shelves, or in bins.',
        'Assisting with regular inventory counts and quality control checks.',
        'Preparing customer orders for shipment according to specifications.',
        'Adhering to all company quality and safety standards.'
    ],
    qualifications: [
        'Must be able to stand for extended periods and perform repetitive tasks.',
        'Good communication and organizational skills.',
        'Reliable and punctual with a strong attendance record.',
        'Ability to work effectively in a team-oriented environment.'
    ]
  },
  {
    id: 4,
    title: 'Data Scientist',
    company: 'DataDriven Inc.',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$130,000 - $160,000',
    description: 'Analyze large, complex datasets to extract valuable insights and drive business decisions. Proficiency in Python, SQL, and machine learning frameworks is essential for this role.',
    responsibilities: [
        'Work with stakeholders to identify opportunities for leveraging company data.',
        'Mine and analyze data from company databases to drive optimization.',
        'Develop custom data models and algorithms to apply to data sets.',
        'Build predictive models and machine-learning algorithms.'
    ],
    qualifications: [
        'Experience with common data science toolkits, such as R, Python, etc.',
        'Proficiency in using query languages such as SQL.',
        'Good applied statistics skills, such as distributions, statistical testing, regression, etc.',
        'Experience with machine learning techniques and algorithms.'
    ]
  },
  {
    id: 5,
    title: 'Digital Marketing Specialist',
    company: 'GrowthPro Agency',
    location: 'Chicago, IL',
    type: 'Part-time',
    salary: '$30 - $45 / hour',
    description: 'Develop and execute digital marketing campaigns across various channels, including SEO, SEM, social media, and email marketing. Help our clients achieve their growth targets.',
     responsibilities: [
        'Plan and execute all digital marketing, including SEO/SEM, marketing database, email, social media and display advertising campaigns.',
        'Measure and report performance of all digital marketing campaigns.',
        'Identify trends and insights, and optimize spend and performance based on the insights.',
        'Collaborate with internal teams to create landing pages and optimize user experience.'
    ],
    qualifications: [
        'Proven working experience in digital marketing.',
        'Demonstrable experience leading and managing SEO/SEM, marketing database, email, social media and/or display advertising campaigns.',
        'Highly creative with experience in identifying target audiences and devising digital campaigns that engage, inform and motivate.',
        'Experience with A/B and multivariate experiments.'
    ]
  },
    {
    id: 6,
    title: 'Backend Developer (Node.js)',
    company: 'ServerSide Solutions',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    description: 'Build and maintain scalable and secure server-side applications and APIs using Node.js, Express, and PostgreSQL. You will be responsible for the core logic that powers our services.',
    responsibilities: [
        'Design and implement low-latency, high-availability, and performant applications.',
        'Write reusable, testable, and efficient code.',
        'Integration of data storage solutions, including databases, key-value stores, blob stores, etc.',
        'Implementation of security and data protection.'
    ],
    qualifications: [
        'Strong proficiency with JavaScript and Node.js.',
        'Experience with frameworks such as Express.',
        'Understanding the nature of asynchronous programming.',
        'User authentication and authorization between multiple systems, servers, and environments.'
    ]
  }
];