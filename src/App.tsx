
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import BookConsultation from "./pages/patient/BookConsultation";
import NotFound from "./pages/NotFound";

// New Pages
import PatientsList from "./pages/patients/PatientsList";
import AddPatient from "./pages/patients/AddPatient";
import DoctorsList from "./pages/doctors/DoctorsList";
import AddDoctor from "./pages/doctors/AddDoctor";
import AssignDoctor from "./pages/mappings/AssignDoctor";

const queryClient = new QueryClient();

// Protected route component that checks for user role
const ProtectedRoute = ({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode; 
  allowedRoles?: ('patient' | 'doctor')[] 
}) => {
  const { user, loading } = useAuth();

  // Show loading indicator while auth state is being determined
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check role if allowedRoles is provided
  if (allowedRoles && !allowedRoles.includes(user.role as 'patient' | 'doctor')) {
    // Redirect based on user role
    if (user.role === 'patient') {
      return <Navigate to="/patient/dashboard" replace />;
    } else if (user.role === 'doctor') {
      return <Navigate to="/doctor/dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Generic dashboard (for backward compatibility) */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Patient routes */}
      <Route 
        path="/patient/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['patient']}>
            <PatientDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/patient/book-consultation" 
        element={
          <ProtectedRoute allowedRoles={['patient']}>
            <BookConsultation />
          </ProtectedRoute>
        } 
      />
      
      {/* Doctor routes */}
      <Route 
        path="/doctor/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DoctorDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Patients management routes */}
      <Route 
        path="/patients" 
        element={
          <ProtectedRoute>
            <PatientsList />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/patients/new" 
        element={
          <ProtectedRoute>
            <AddPatient />
          </ProtectedRoute>
        } 
      />
      
      {/* Doctors management routes */}
      <Route 
        path="/doctors" 
        element={
          <ProtectedRoute>
            <DoctorsList />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/doctors/new" 
        element={
          <ProtectedRoute>
            <AddDoctor />
          </ProtectedRoute>
        } 
      />
      
      {/* Patient-Doctor mapping routes */}
      <Route 
        path="/mappings/new" 
        element={
          <ProtectedRoute>
            <AssignDoctor />
          </ProtectedRoute>
        } 
      />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
