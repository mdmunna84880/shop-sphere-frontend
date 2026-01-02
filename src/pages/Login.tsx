import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router';
import { FiUser, FiLock, FiAlertCircle, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Shared Components
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthInput } from '@/components/auth/AuthInput';

// Types & Redux
import type { AppDispatch, RootState } from '@/store';
import { login, clearAuthError } from '@/store/slices/authSlice';
import { cn } from '@/utils/cn';
import type { LoginCredentials } from '@/types';

const INITIAL_ERRORS = {username: "", password: ""};
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<LoginCredentials>(INITIAL_ERRORS);

  const { status, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const isLoading = status === 'loading';

  // Effects
  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => { dispatch(clearAuthError()); };
  }, [dispatch]);

  // Validation
  const validateForm = (): boolean => {
    const errors = {...INITIAL_ERRORS};
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

  // Handlers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    dispatch(login({ username, password }));
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, field: keyof LoginCredentials, value: string) => {
    setter(value);
    if (validationErrors[field]) setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    if (error) dispatch(clearAuthError());
  };

  const fillTestCredentials = () => {
    setUsername('mor_2314');
    setPassword('83r5^_');
    setValidationErrors(INITIAL_ERRORS);
    dispatch(clearAuthError());
  };

  return (
    <AuthLayout>
      <AuthHeader 
        title="Welcome Back" 
        subtitle="Sign in to manage your account" 
      />

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Global API Error */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-center gap-2 p-2 text-xs border rounded-lg bg-status-error/10 border-status-error/20 text-status-error"
            >
              <FiAlertCircle className="shrink-0" />
              {error}
            </motion.div>
          )}

          {/* Reusable Inputs */}
          <AuthInput
            label="Username"
            icon={FiUser}
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => handleInputChange(setUsername, 'username', e.target.value)}
            error={validationErrors.username}
          />

          <AuthInput
            label="Password"
            icon={FiLock}
            type="password"
            placeholder="......."
            value={password}
            onChange={(e) => handleInputChange(setPassword, 'password', e.target.value)}
            error={validationErrors.password}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full py-3 rounded-lg font-bold text-sm text-text-inverse shadow-md transition-all mt-2",
              "flex items-center justify-center gap-2",
              isLoading 
                ? "bg-text-muted cursor-wait opacity-70" 
                : "bg-brand-primary hover:bg-brand-hover hover:scale-[1.02] active:scale-[0.98] hover:translate-y-1 active:translate-0"
            )}
          >
            {isLoading ? "Processing..." : <>Sign In <FiArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-5 text-center">
          <p className="text-xs text-text-muted">
            No account?{' '}
            <Link to="/signup" className="font-bold transition-colors text-brand-primary hover:text-brand-hover hover:underline">
              Create one
            </Link>
          </p>
        </div>

        {/* Demo Helper */}
        <div className="pt-4 mt-6 border-t border-border-base">
          <div className="p-3 border rounded-lg bg-brand-accent/5 border-brand-accent/10">
            <div className="flex items-start gap-2">
              <FiCheckCircle className="text-brand-accent mt-0.5 shrink-0 w-4 h-4" />
              <div>
                <h4 className="mb-0.5 text-xs font-bold text-text-main">Demo Mode</h4>
                <button type="button" onClick={fillTestCredentials} className="text-[10px] font-bold hover:underline text-brand-primary text-left">
                  Tap to auto-fill (mor_2314)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;