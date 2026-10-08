import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LearningPage from './pages/LearningPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import DigitalSkillsPage from './pages/DigitalSkillsPage';
import ProfilePage from './pages/ProfilePage';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import StudentsPage from './pages/teacher/StudentsPage';
import AddStudentPage from './pages/teacher/AddStudentPage';
import ReportDropoutPage from './pages/teacher/ReportDropoutPage';
import DropoutCasesPage from './pages/teacher/DropoutCasesPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTeachersPage from './pages/admin/AdminTeachersPage';
import AdminOpportunitiesPage from './pages/admin/AdminOpportunitiesPage';
import AdminCoursesPage from './pages/admin/AdminCoursesPage';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';

// Guard
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/learning" element={<LearningPage />} />
      <Route path="/opportunities" element={<OpportunitiesPage />} />
      <Route path="/digital-skills" element={<DigitalSkillsPage />} />

      {/* Teacher Routes */}
      <Route
        path="/teacher/dashboard"
        element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/students"
        element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <StudentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/add-student"
        element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <AddStudentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/report-dropout"
        element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <ReportDropoutPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/dropout-cases"
        element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <DropoutCasesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/profile"
        element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/students"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <StudentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/teachers"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminTeachersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dropout-cases"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DropoutCasesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/opportunities"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminOpportunitiesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/courses"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminCoursesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Student Routes */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/profile"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* General Profile Route */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
