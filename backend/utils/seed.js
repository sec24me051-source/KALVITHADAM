const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Student = require('../models/Student');
const DropoutCase = require('../models/DropoutCase');
const Opportunity = require('../models/Opportunity');
const Course = require('../models/Course');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/digital-education-platform');
  console.log('MongoDB Connected for seeding...');
};

const seedData = async () => {
  await connectDB();

  // Clear existing data
  await User.deleteMany();
  await Student.deleteMany();
  await DropoutCase.deleteMany();
  await Opportunity.deleteMany();
  await Course.deleteMany();
  console.log('Cleared existing data');

  // Create Users
  const adminUser = await User.create({ name: 'Admin User', email: 'admin@decp.edu', password: 'admin123', role: 'admin', school: 'Education Department' });
  const teacher1 = await User.create({ name: 'Meena Sundaram', email: 'meena@decp.edu', password: 'teacher123', role: 'teacher', school: 'Government Higher Secondary School, Coimbatore' });
  const teacher2 = await User.create({ name: 'Rajan Pillai', email: 'rajan@decp.edu', password: 'teacher123', role: 'teacher', school: 'Government High School, Madurai' });
  const student1 = await User.create({ name: 'Priya Nair', email: 'priya@decp.edu', password: 'student123', role: 'student', school: 'Government Higher Secondary School, Coimbatore' });
  console.log('Users created');

  // Create Students
  const students = await Student.insertMany([
    { name: 'Arun Kumar', age: 14, class: '9th', school: 'Government Higher Secondary School, Coimbatore', location: 'Coimbatore', district: 'Coimbatore', gender: 'Male', guardianName: 'Senthil Kumar', guardianContact: '9876543210', attendancePercentage: 45, riskLevel: 'High', educationStatus: 'At-Risk', teacherId: teacher1._id, hasDigitalAccess: false, preferredLanguage: 'Tamil' },
    { name: 'Lakshmi Devi', age: 13, class: '8th', school: 'Government Higher Secondary School, Coimbatore', location: 'Coimbatore', district: 'Coimbatore', gender: 'Female', guardianName: 'Devi Amma', guardianContact: '9876543211', attendancePercentage: 72, riskLevel: 'Medium', educationStatus: 'Active', teacherId: teacher1._id, hasDigitalAccess: false, preferredLanguage: 'Tamil' },
    { name: 'Mohammed Saleem', age: 15, class: '10th', school: 'Government Higher Secondary School, Coimbatore', location: 'Coimbatore', district: 'Coimbatore', gender: 'Male', guardianName: 'Abdul Saleem', guardianContact: '9876543212', attendancePercentage: 60, riskLevel: 'Medium', educationStatus: 'Active', teacherId: teacher1._id, hasDigitalAccess: true, preferredLanguage: 'Tamil' },
    { name: 'Kavitha Raj', age: 12, class: '7th', school: 'Government Higher Secondary School, Coimbatore', location: 'Coimbatore', district: 'Coimbatore', gender: 'Female', guardianName: 'Raj Kumar', guardianContact: '9876543213', attendancePercentage: 88, riskLevel: 'Low', educationStatus: 'Active', teacherId: teacher1._id, hasDigitalAccess: false, preferredLanguage: 'Tamil' },
    { name: 'Senthil Nathan', age: 14, class: '9th', school: 'Government Higher Secondary School, Coimbatore', location: 'Coimbatore', district: 'Coimbatore', gender: 'Male', guardianName: 'Nathan Pillay', guardianContact: '9876543214', attendancePercentage: 30, riskLevel: 'High', educationStatus: 'Dropout', teacherId: teacher1._id, hasDigitalAccess: false, preferredLanguage: 'Tamil' },
    { name: 'Anitha Krishnan', age: 13, class: '8th', school: 'Government High School, Madurai', location: 'Madurai', district: 'Madurai', gender: 'Female', guardianName: 'Krishnan', guardianContact: '9876543215', attendancePercentage: 55, riskLevel: 'Medium', educationStatus: 'At-Risk', teacherId: teacher2._id, hasDigitalAccess: false, preferredLanguage: 'Tamil' },
    { name: 'Vijay Pandi', age: 15, class: '10th', school: 'Government High School, Madurai', location: 'Madurai', district: 'Madurai', gender: 'Male', guardianName: 'Pandi Raja', guardianContact: '9876543216', attendancePercentage: 79, riskLevel: 'Low', educationStatus: 'Active', teacherId: teacher2._id, hasDigitalAccess: true, preferredLanguage: 'Tamil' },
    { name: 'Saranya Murugan', age: 12, class: '7th', school: 'Government High School, Madurai', location: 'Madurai', district: 'Madurai', gender: 'Female', guardianName: 'Murugan', guardianContact: '9876543217', attendancePercentage: 92, riskLevel: 'Low', educationStatus: 'Active', teacherId: teacher2._id, hasDigitalAccess: false, preferredLanguage: 'Tamil' },
  ]);
  console.log('Students created');

  // Create Dropout Cases
  await DropoutCase.insertMany([
    { studentId: students[0]._id, teacherId: teacher1._id, reason: 'Financial difficulties', remarks: 'Family income has dropped significantly. Father lost job. Student helping family.', riskLevel: 'High', status: 'Intervention Planned', intervention: 'Financial assistance application submitted under CM Scholarship scheme', followUpDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), isResolved: false },
    { studentId: students[4]._id, teacherId: teacher1._id, reason: 'Need to work', remarks: 'Student working in agriculture during harvest season. Has not attended school for 3 weeks.', riskLevel: 'High', status: 'Counselling Provided', intervention: 'Parents counselled. Scholarship applied. Bridge education discussed.', followUpDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), isResolved: false },
    { studentId: students[5]._id, teacherId: teacher2._id, reason: 'Family circumstances', remarks: 'Mother is unwell. Student is needed at home to care for younger siblings.', riskLevel: 'Medium', status: 'Under Review', intervention: '', followUpDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), isResolved: false },
  ]);
  console.log('Dropout cases created');

  // Create Opportunities
  await Opportunity.insertMany([
    {
      title: 'Chief Minister\'s Special Scholarship Scheme',
      provider: 'Government of Tamil Nadu',
      type: 'Government Scheme',
      description: 'Financial assistance for students from economically weaker sections of society to continue their school education.',
      eligibility: 'Students from families with annual income below ₹2 lakh. Classes 6 to 12. Must have 60% attendance.',
      benefits: '₹1000 per year for Classes 6-8, ₹1500 for Classes 9-10, ₹2000 for Classes 11-12',
      documents: ['Income Certificate', 'Aadhaar Card', 'School ID', 'Bank Account Details', 'Caste Certificate'],
      applicationProcedure: '1. Collect application from school. 2. Fill with guardian\'s details. 3. Attach required documents. 4. Submit to School Headmaster. 5. Headmaster forwards to District Education Office.',
      deadline: '31st October 2026',
      applicationLink: 'https://www.tnscholarship.gov.in',
      location: 'Tamil Nadu',
      educationLevel: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'],
    },
    {
      title: 'Pre-Matric Scholarship for SC/ST Students',
      provider: 'Ministry of Social Justice and Empowerment, Government of India',
      type: 'Scholarship',
      description: 'Central Government scholarship scheme for SC/ST students at the pre-matriculation stage.',
      eligibility: 'SC/ST students in Classes 9 and 10 with minimum 55% marks in previous exam. Family income below ₹2.5 lakh.',
      benefits: 'Day scholars: ₹150/month. Hostel students: ₹350/month. Additional allowances for books and stationery.',
      documents: ['Caste Certificate', 'Income Certificate', 'Mark Sheet', 'Bank Account', 'Aadhaar Card'],
      applicationProcedure: '1. Apply on National Scholarship Portal (scholarships.gov.in). 2. Fill application form. 3. Upload documents. 4. Submit for school verification. 5. Track status online.',
      deadline: '30th November 2026',
      applicationLink: 'https://scholarships.gov.in',
      location: 'Tamil Nadu',
      educationLevel: ['Class 9', 'Class 10'],
    },
    {
      title: 'ISHAN UDAY Scholarship for Students from NE Region',
      provider: 'University Grants Commission (UGC)',
      type: 'Higher Education Scheme',
      description: 'Special scholarship for students from economically weaker sections pursuing higher education.',
      eligibility: 'Students from economically weaker sections who have passed Class 12. Family income below ₹4.5 lakh.',
      benefits: '₹5400 per month for general courses. ₹7800 per month for technical/professional courses.',
      documents: ['Income Certificate', 'Class 12 Mark Sheet', 'Aadhaar Card', 'Bank Account'],
      applicationProcedure: '1. Apply online at UGC website. 2. Fill form with academic details. 3. Attach income and other documents. 4. Submit before deadline.',
      deadline: '31st December 2026',
      applicationLink: 'https://scholarships.gov.in',
      location: 'All India',
      educationLevel: ['Higher Education'],
    },
    {
      title: 'Adi Dravidar & Tribal Welfare Scholarship',
      provider: 'Adi Dravidar and Tribal Welfare Department, Tamil Nadu',
      type: 'Scholarship',
      description: 'Scholarship for SC/ST students studying in Tamil Nadu to support their educational expenses.',
      eligibility: 'SC/ST students in schools and colleges in Tamil Nadu. No income limit for school students.',
      benefits: 'Tuition fee, maintenance allowance, book grant, stationery grant',
      documents: ['Community Certificate', 'Income Certificate', 'Mark Sheet', 'Aadhaar Card', 'Bonafide Certificate'],
      applicationProcedure: '1. Apply at school / district welfare office. 2. Submit community and income certificates. 3. School verifies and forwards. 4. Benefits transferred to bank account.',
      deadline: 'Ongoing',
      applicationLink: 'https://www.adwelfare.tn.gov.in',
      location: 'Tamil Nadu',
      educationLevel: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'],
    },
    {
      title: 'Pratibha Scholarship - NSP',
      provider: 'National Scholarship Portal - Ministry of Education',
      type: 'Scholarship',
      description: 'Merit-cum-means scholarship for meritorious students from low-income families.',
      eligibility: 'Students who scored above 80% in Class 10. Annual family income below ₹1.5 lakh.',
      benefits: '₹12,000 per year for Class 11 and 12 students.',
      documents: ['Class 10 Mark Sheet', 'Income Certificate', 'Aadhaar Card', 'Bank Account', 'School Admission Proof'],
      applicationProcedure: '1. Register on NSP portal. 2. Fill application form. 3. Upload documents. 4. School verification. 5. Institute verification. 6. Disbursement.',
      deadline: '15th November 2026',
      applicationLink: 'https://scholarships.gov.in',
      location: 'All India',
      educationLevel: ['Class 11', 'Class 12'],
    },
    {
      title: 'Nanhi Kali - Girl Child Education Support',
      provider: 'K.C. Mahindra Education Trust (NGO)',
      type: 'NGO Scholarship',
      description: 'Support for girl children from low-income families to help them complete schooling with dignity.',
      eligibility: 'Girl students from Classes 5 to 10 from families in financial need.',
      benefits: 'School kit, academic support, digital learning materials, mentoring',
      documents: ['School Enrollment Proof', 'Family Income Proof', 'Photograph'],
      applicationProcedure: '1. Apply through school. 2. Teacher nominates eligible girls. 3. NGO verification. 4. Enrollment in program.',
      deadline: 'Ongoing',
      applicationLink: 'https://www.nanhikali.org',
      location: 'Tamil Nadu',
      educationLevel: ['Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    },
    {
      title: 'Vidyalakshmi Portal - Education Loan Support',
      provider: 'Ministry of Finance, Government of India',
      type: 'Educational Assistance',
      description: 'Single-window digital platform for students to apply for education loans from multiple banks.',
      eligibility: 'Students pursuing higher education. Indian nationals.',
      benefits: 'Education loans up to ₹10 lakh (without collateral) through multiple banks.',
      documents: ['Admission Letter', 'Fee Structure', 'Academic Records', 'Income Proof', 'Identity Proof'],
      applicationProcedure: '1. Register on Vidyalakshmi portal. 2. Apply to multiple banks in single form. 3. Track application online. 4. Bank processes application.',
      deadline: 'Ongoing',
      applicationLink: 'https://www.vidyalakshmi.co.in',
      location: 'All India',
      educationLevel: ['Higher Education'],
    },
    {
      title: 'SMILE Program - Digital Skills for Youth',
      provider: 'NASSCOM Foundation (NGO)',
      type: 'Skill Program',
      description: 'Free digital literacy and skill development program for youth from underserved communities.',
      eligibility: 'Students and youth aged 14-25 from low-income communities.',
      benefits: 'Free digital skills training, certification, career guidance and placement support.',
      documents: ['Age Proof', 'Educational Qualification Proof'],
      applicationProcedure: '1. Apply online at NASSCOM Foundation website. 2. Attend orientation session. 3. Complete the program modules. 4. Receive certificate.',
      deadline: 'Rolling Admissions',
      applicationLink: 'https://www.nasscomfoundation.org',
      location: 'Tamil Nadu',
      educationLevel: ['Class 9', 'Class 10', 'Class 11', 'Class 12', 'Higher Education'],
    },
  ]);
  console.log('Opportunities created');

  // Create Courses
  await Course.insertMany([
    {
      title: 'Communication Skills in English',
      category: 'Skill Development',
      subcategory: 'Communication Skills',
      description: 'Build your English communication skills step by step. Learn to speak with confidence in everyday and professional situations.',
      level: 'Beginner',
      lessonCount: 8,
      duration: '4 hours',
      language: 'Tamil & English',
      tags: ['english', 'speaking', 'communication', 'confidence'],
      lessons: [
        { title: 'Introduction to Communication', content: 'What is communication? Why is it important?', duration: '15 min', order: 1 },
        { title: 'Basic English Phrases', content: 'Common everyday phrases and greetings', duration: '20 min', order: 2 },
        { title: 'Listening Skills', content: 'How to be an active listener', duration: '20 min', order: 3 },
        { title: 'Speaking with Confidence', content: 'Tips to overcome shyness and speak clearly', duration: '25 min', order: 4 },
        { title: 'Introduction & Self-Presentation', content: 'How to introduce yourself professionally', duration: '20 min', order: 5 },
        { title: 'Asking Questions', content: 'How to ask questions politely and clearly', duration: '20 min', order: 6 },
        { title: 'Group Discussion Skills', content: 'Participating in group discussions effectively', duration: '25 min', order: 7 },
        { title: 'Practice Session', content: 'Real-life conversation practice exercises', duration: '30 min', order: 8 },
      ]
    },
    {
      title: 'Digital Skills for Students',
      category: 'Digital Literacy',
      subcategory: 'Digital Skills',
      description: 'Learn essential digital skills — from creating an email to applying for scholarships online safely.',
      level: 'Beginner',
      lessonCount: 10,
      duration: '5 hours',
      language: 'Tamil & English',
      tags: ['digital', 'internet', 'email', 'online', 'safety'],
      lessons: [
        { title: 'Creating an Email Account', content: 'Step-by-step guide to create Gmail account', duration: '20 min', order: 1 },
        { title: 'Using Smartphones for Learning', content: 'How to use mobile for study and education apps', duration: '20 min', order: 2 },
        { title: 'Safe Internet Use', content: 'Staying safe online, privacy and fake news', duration: '25 min', order: 3 },
        { title: 'Online Forms and Applications', content: 'Filling forms correctly online', duration: '20 min', order: 4 },
        { title: 'Uploading Documents Online', content: 'Scanning and uploading certificates', duration: '20 min', order: 5 },
        { title: 'Using Government Portals', content: 'Accessing Digilocker, NSP, e-District portals', duration: '30 min', order: 6 },
        { title: 'Video Calls and Meetings', content: 'Using Google Meet and WhatsApp for communication', duration: '20 min', order: 7 },
        { title: 'Password Safety', content: 'Creating strong passwords and account security', duration: '15 min', order: 8 },
        { title: 'Downloading and Saving Documents', content: 'How to download and organize files', duration: '20 min', order: 9 },
        { title: 'Applying for Scholarships Online', content: 'Complete walkthrough of scholarship application', duration: '35 min', order: 10 },
      ]
    },
    {
      title: 'Time Management and Goal Setting',
      category: 'Life Skills',
      subcategory: 'Time Management',
      description: 'Learn how to manage your time effectively, set clear goals, and achieve them step by step.',
      level: 'Beginner',
      lessonCount: 6,
      duration: '3 hours',
      language: 'Tamil & English',
      tags: ['time', 'goals', 'productivity', 'planning'],
      lessons: [
        { title: 'Why Time Matters', content: 'Understanding the value of time in education and life', duration: '20 min', order: 1 },
        { title: 'Creating a Daily Schedule', content: 'How to build a study and daily timetable', duration: '25 min', order: 2 },
        { title: 'SMART Goal Setting', content: 'Setting Specific, Measurable, Achievable, Relevant, Time-bound goals', duration: '25 min', order: 3 },
        { title: 'Overcoming Procrastination', content: 'Why we delay and how to take action', duration: '20 min', order: 4 },
        { title: 'Prioritizing Tasks', content: 'Urgent vs Important: Making smart choices', duration: '20 min', order: 5 },
        { title: 'Reviewing Your Progress', content: 'Weekly review and improving your system', duration: '20 min', order: 6 },
      ]
    },
    {
      title: 'Resume and Interview Preparation',
      category: 'Skill Development',
      subcategory: 'Career Skills',
      description: 'Prepare yourself for jobs and opportunities. Create a simple effective resume and handle interviews confidently.',
      level: 'Intermediate',
      lessonCount: 7,
      duration: '3.5 hours',
      language: 'Tamil & English',
      tags: ['resume', 'interview', 'career', 'job', 'preparation'],
      lessons: [
        { title: 'What is a Resume?', content: 'Purpose and importance of a resume', duration: '15 min', order: 1 },
        { title: 'Parts of a Resume', content: 'Name, contact, education, skills, achievements', duration: '25 min', order: 2 },
        { title: 'Writing Your First Resume', content: 'Simple resume format for students', duration: '30 min', order: 3 },
        { title: 'Understanding Interviews', content: 'Types of interviews and what to expect', duration: '20 min', order: 4 },
        { title: 'Common Interview Questions', content: 'Tell me about yourself, strengths, weaknesses', duration: '30 min', order: 5 },
        { title: 'Body Language and Confidence', content: 'Non-verbal communication in interviews', duration: '20 min', order: 6 },
        { title: 'Practice Interview Session', content: 'Mock questions and answers', duration: '30 min', order: 7 },
      ]
    },
    {
      title: 'Basic Financial Awareness',
      category: 'Life Skills',
      subcategory: 'Financial Awareness',
      description: 'Learn the basics of money management, saving, and understanding bank accounts and government financial services.',
      level: 'Beginner',
      lessonCount: 6,
      duration: '3 hours',
      language: 'Tamil & English',
      tags: ['finance', 'money', 'saving', 'banking', 'life skills'],
      lessons: [
        { title: 'Understanding Money', content: 'What is money and why financial awareness matters', duration: '20 min', order: 1 },
        { title: 'Budgeting Basics', content: 'How to plan income and expenses', duration: '25 min', order: 2 },
        { title: 'Saving Habits', content: 'Small savings, big impact. How to start saving.', duration: '20 min', order: 3 },
        { title: 'Bank Accounts and Jan Dhan', content: 'Opening bank accounts, Aadhaar-linked banking', duration: '25 min', order: 4 },
        { title: 'Online Payments Safety', content: 'UPI, digital payments, and fraud prevention', duration: '25 min', order: 5 },
        { title: 'Government Welfare Schemes', content: 'How to access government financial support schemes', duration: '25 min', order: 6 },
      ]
    },
    {
      title: 'Academic Learning - Science Fundamentals',
      category: 'Academic Learning',
      subcategory: 'Science',
      description: 'Strengthen your foundation in science with simple, clear explanations and revision materials for Classes 8-10.',
      level: 'Beginner',
      lessonCount: 8,
      duration: '4 hours',
      language: 'Tamil & English',
      tags: ['science', 'physics', 'chemistry', 'biology', 'study'],
      lessons: [
        { title: 'Introduction to Science', content: 'Why we study science and scientific method', duration: '15 min', order: 1 },
        { title: 'Matter and Its Properties', content: 'States of matter, physical and chemical changes', duration: '25 min', order: 2 },
        { title: 'Living World - Cells', content: 'Cells, cell division, organs', duration: '25 min', order: 3 },
        { title: 'Forces and Motion', content: 'Newton\'s laws explained simply', duration: '25 min', order: 4 },
        { title: 'Electricity Basics', content: 'Current, voltage, resistance, circuits', duration: '25 min', order: 5 },
        { title: 'Environmental Science', content: 'Ecosystem, food chain, conservation', duration: '20 min', order: 6 },
        { title: 'Practice Questions', content: 'Topic-wise practice questions with answers', duration: '30 min', order: 7 },
        { title: 'Quick Revision', content: 'Important formulas and concepts at a glance', duration: '15 min', order: 8 },
      ]
    },
    {
      title: 'Confidence Building and Self-Awareness',
      category: 'Life Skills',
      subcategory: 'Confidence Building',
      description: 'Discover your strengths, overcome self-doubt, and build the confidence to face any challenge in life.',
      level: 'Beginner',
      lessonCount: 5,
      duration: '2.5 hours',
      language: 'Tamil & English',
      tags: ['confidence', 'self-esteem', 'motivation', 'life skills'],
      lessons: [
        { title: 'Who Am I?', content: 'Self-awareness and discovering your identity', duration: '20 min', order: 1 },
        { title: 'Recognizing Your Strengths', content: 'Identifying and appreciating your talents', duration: '25 min', order: 2 },
        { title: 'Handling Failure Positively', content: 'Learning from mistakes and moving forward', duration: '25 min', order: 3 },
        { title: 'Positive Self-Talk', content: 'Changing negative thoughts to empowering ones', duration: '20 min', order: 4 },
        { title: 'Setting Boundaries', content: 'Saying no respectfully, peer pressure', duration: '20 min', order: 5 },
      ]
    },
    {
      title: 'Career Awareness for School Students',
      category: 'Skill Development',
      subcategory: 'Career Awareness',
      description: 'Explore different career paths, understand educational routes, and plan your future with clarity.',
      level: 'Beginner',
      lessonCount: 6,
      duration: '3 hours',
      language: 'Tamil & English',
      tags: ['career', 'future', 'planning', 'education paths'],
      lessons: [
        { title: 'Career Exploration', content: 'Types of careers and how to explore them', duration: '25 min', order: 1 },
        { title: 'Education After Class 10', content: '10th pass options: Vocational, Arts, Science, ITI', duration: '25 min', order: 2 },
        { title: 'Education After Class 12', content: 'Degree, Diploma, Engineering, Medical options', duration: '25 min', order: 3 },
        { title: 'Government Jobs Overview', content: 'TNPSC, SSC, Police, Railways - how to prepare', duration: '30 min', order: 4 },
        { title: 'Skill-Based Careers', content: 'Plumbing, tailoring, electronics, driving - valued trades', duration: '20 min', order: 5 },
        { title: 'Career Planning Worksheet', content: 'Setting your own career goal with action steps', duration: '15 min', order: 6 },
      ]
    },
  ]);
  console.log('Courses created');

  console.log('\n===== SEED DATA COMPLETE =====');
  console.log('Admin: admin@decp.edu / admin123');
  console.log('Teacher 1: meena@decp.edu / teacher123');
  console.log('Teacher 2: rajan@decp.edu / teacher123');
  console.log('Student: priya@decp.edu / student123');
  console.log('================================\n');
  process.exit(0);
};

seedData().catch(err => { console.error(err); process.exit(1); });
