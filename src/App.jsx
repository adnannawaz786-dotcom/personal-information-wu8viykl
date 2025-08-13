import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import OnboardingFlow from './pages/OnboardingFlow';
import { Toaster } from 'sonner';

function App() {
  const [isOnboardingComplete, setIsOnboardingComplete] = React.useState(() => {
    return localStorage.getItem('onboardingComplete') === 'true';
  });

  const handleOnboardingComplete = () => {
    setIsOnboardingComplete(true);
    localStorage.setItem('onboardingComplete', 'true');
  };

  const resetOnboarding = () => {
    setIsOnboardingComplete(false);
    localStorage.removeItem('onboardingComplete');
    localStorage.removeItem('onboardingData');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/"
              element={
                !isOnboardingComplete ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <OnboardingFlow onComplete={handleOnboardingComplete} />
                  </motion.div>
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              }
            />
            <Route
              path="/onboarding"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <OnboardingFlow onComplete={handleOnboardingComplete} />
                </motion.div>
              }
            />
            <Route
              path="/dashboard"
              element={
                isOnboardingComplete ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Dashboard onResetOnboarding={resetOnboarding} />
                  </motion.div>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </Router>
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          duration: 4000,
          style: {
            background: 'white',
            border: '1px solid #e2e8f0',
            color: '#1e293b',
          },
        }}
      />
    </div>
  );
}

export default App;