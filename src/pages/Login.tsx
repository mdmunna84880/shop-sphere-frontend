import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router';
import { motion } from 'framer-motion';
import { FiUser, FiLock, FiAlertCircle, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

// Redux
import { login, clearAuthError } from '../store/slices/authSlice';
import type { AppDispatch, RootState } from '../store';

// Type for local validation errors
interface ValidationErrors {
  username?: string;
  password?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Local Form State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // NEW: Validation State
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Redux State
  const { status, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const isLoading = status === 'loading';

  // 1. Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // 2. Clear Redux errors when unmounting
  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  // NEW: Validation Logic
  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    let isValid = true;

    if (!username.trim()) {
      errors.username = "Username is required";
      isValid = false;
    }

    if (!password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Run validation before dispatching
    if (!validateForm()) return;

    dispatch(login({ username, password }));
  };

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>, 
    field: keyof ValidationErrors,
    value: string
  ) => {
    setter(value);
    
    // Clear specific validation error when user types
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Clear global API error
    if (error) dispatch(clearAuthError());
  };

  // Helper for Portfolio Reviewers
  const fillTestCredentials = () => {
    setUsername('mor_2314');
    setPassword('83r5^_');
    setValidationErrors({}); // Clear validation errors
    dispatch(clearAuthError());
  };

  return (
    <div className="relative min-h-screen bg-bg-page flex items-center justify-center p-4 font-body top-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-bg-surface rounded-2xl shadow-xl shadow-shadow-base overflow-hidden border border-border-base"
      >
        {/* Header */}
        <div className="bg-brand-primary/5 p-8 text-center border-b border-border-base">
          <h1 className="text-2xl font-bold text-text-main font-heading">Welcome Back</h1>
          <p className="text-text-muted mt-2 text-sm">Sign in to manage your cart and wishlist</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* API Error Message (Global) */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-status-error/10 border border-status-error/20 text-status-error text-sm p-3 rounded-lg flex items-center gap-2"
              >
                <FiAlertCircle className="shrink-0" />
                {error}
              </motion.div>
            )}

            {/* Username Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-main">Username</label>
              <div className="relative group">
                <FiUser className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${validationErrors.username ? 'text-status-error' : 'text-text-muted group-focus-within:text-brand-primary'}`} />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => handleInputChange(setUsername, 'username', e.target.value)}
                  className={`
                    w-full pl-10 pr-4 py-3 bg-bg-subtle rounded-xl focus:outline-none focus:ring-2 transition-all text-text-main
                    ${validationErrors.username 
                      ? "border border-status-error focus:ring-status-error/20" 
                      : "border border-border-base focus:ring-brand-primary/20 focus:border-brand-primary"
                    }
                  `}
                  placeholder="Enter your username"
                />
              </div>
              {/* Validation Error Message */}
              {validationErrors.username && (
                <p className="text-xs text-status-error mt-1 ml-1">{validationErrors.username}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-main">Password</label>
              <div className="relative group">
                <FiLock className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${validationErrors.password ? 'text-status-error' : 'text-text-muted group-focus-within:text-brand-primary'}`} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => handleInputChange(setPassword, 'password', e.target.value)}
                  className={`
                    w-full pl-10 pr-4 py-3 bg-bg-subtle rounded-xl focus:outline-none focus:ring-2 transition-all text-text-main
                    ${validationErrors.password 
                      ? "border border-status-error focus:ring-status-error/20" 
                      : "border border-border-base focus:ring-brand-primary/20 focus:border-brand-primary"
                    }
                  `}
                  placeholder="••••••••"
                />
              </div>
              {/* Validation Error Message */}
              {validationErrors.password && (
                <p className="text-xs text-status-error mt-1 ml-1">{validationErrors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full py-3.5 rounded-xl font-bold text-text-inverse shadow-lg transition-all
                flex items-center justify-center gap-2
                ${isLoading 
                  ? "bg-text-muted cursor-wait opacity-70" 
                  : "bg-brand-primary hover:bg-brand-hover hover:scale-[1.02] active:scale-[0.98] shadow-brand-primary/25"
                }
              `}
            >
              {isLoading ? (
                <>Processing...</>
              ) : (
                <>Sign In <FiArrowRight /></>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="font-bold text-brand-primary hover:text-brand-hover hover:underline transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>

          {/* Test Credentials Helper */}
          <div className="mt-8 pt-6 border-t border-border-base">
            <div className="bg-brand-accent/5 rounded-lg p-4 border border-brand-accent/10">
              <div className="flex items-start gap-3">
                <FiCheckCircle className="text-brand-accent mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-text-main mb-1">Portfolio Demo Mode</h4>
                  <p className="text-xs text-text-muted mb-3">
                    Since this uses FakeStoreAPI, you must use specific test credentials.
                  </p>
                  <button 
                    type="button"
                    onClick={fillTestCredentials}
                    className="text-xs font-bold text-brand-primary hover:underline"
                  >
                    Auto-fill Test User (mor_2314)
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default Login;