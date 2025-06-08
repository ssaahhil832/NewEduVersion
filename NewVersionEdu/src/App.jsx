
    import React from 'react';
    import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
    import WelcomePage from '@/pages/WelcomePage';
    import LoginPage from '@/pages/LoginPage';
    import SignUpPage from '@/pages/SignUpPage';
    import DashboardPage from '@/pages/DashboardPage';
    import { Toaster } from '@/components/ui/toaster';
    import { AuthProvider, useAuth } from '@/contexts/AuthContext';
    import AppLayout from '@/components/AppLayout';

    function ProtectedRoute({ children }) {
      const { user } = useAuth();
      if (!user) {
        return <Navigate to="/login" />;
      }
      return children;
    }

    function App() {
      return (
        <AuthProvider>
          <Router>
            <AppLayout>
              <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } 
                />
                {/* Add other routes here as they are built */}
              </Routes>
            </AppLayout>
          </Router>
          <Toaster />
        </AuthProvider>
      );
    }

    export default App;
  