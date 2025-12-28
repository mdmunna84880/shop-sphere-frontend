import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router';
import { motion } from 'framer-motion';
import { 
  FiUser, 
  FiMail, 
  FiLock, 
  FiArrowRight, 
  FiCheckCircle, 
  FiAlertCircle 
} from 'react-icons/fi';

// Redux
import { register, clearAuthError } from '../store/slices/authSlice';
import type { AppDispatch, RootState } from '../store';

// Validation Type
interface ValidationErrors {
  firstname?: string;
  lastname?: string;
  email?: string;
  username?: string;
  password?: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Form State
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: ''
  });

  // Validation State
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const { status, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const isLoading = status === 'loading';

  // 1. Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  // 2. Clear errors on load
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  // 3. Handle Success Redirect
  useEffect(() => {
    if (status === 'succeeded') {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 2500); // 2.5s delay to read success message
      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  // --- VALIDATION LOGIC ---
  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    let isValid = true;

    // Name Validation
    if (!formData.firstname.trim()) { errors.firstname = "First name is required"; isValid = false; }
    if (!formData.lastname.trim()) { errors.lastname = "Last name is required"; isValid = false; }

    // Username Validation
    if (!formData.username.trim()) { errors.username = "Username is required"; isValid = false; }

    // Email Validation (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password Validation (Length)
    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field as user types
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return; // Stop if invalid

    // Construct payload for FakeStoreAPI
    const payload = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      name: {
        firstname: formData.firstname,
        lastname: formData.lastname
      }
    };

    dispatch(register(payload));
  };

  // --- Success UI ---
  if (status === 'succeeded') {
    return (
      <div className="min-h-screen bg-bg-page flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-bg-surface p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-border-base"
        >
          <div className="w-16 h-16 bg-status-success/10 text-status-success rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-text-main font-heading mb-2">Account Created!</h2>
          <p className="text-text-muted mb-6">
            Welcome to Scruto Mart, <b>{formData.firstname}</b>! <br/>
            Redirecting you to login...
          </p>
          <div className="w-full bg-bg-subtle rounded-full h-1.5 overflow-hidden">
             <motion.div 
               initial={{ width: "0%" }}
               animate={{ width: "100%" }}
               transition={{ duration: 2 }}
               className="h-full bg-brand-primary"
             />
          </div>
        </motion.div>
      </div>
    );
  }

  // --- Form UI ---
  return (
    <div className="relative min-h-screen bg-bg-page flex items-center justify-center p-4 font-body top-20 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-bg-surface rounded-2xl shadow-xl shadow-shadow-base overflow-hidden border border-border-base"
      >
        {/* Header */}
        <div className="bg-brand-primary/5 p-8 text-center border-b border-border-base">
          <h1 className="text-2xl font-bold text-text-main font-heading">Create Account</h1>
          <p className="text-text-muted mt-2 text-sm">Join us to start your shopping journey</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* API Error Banner */}
            {error && (
              <div className="bg-status-error/10 border border-status-error/20 text-status-error text-sm p-3 rounded-lg flex items-center gap-2">
                <FiAlertCircle className="shrink-0" />
                {error}
              </div>
            )}

            {/* Name Fields (Row) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">First Name</label>
                <input 
                  type="text" 
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 bg-bg-subtle rounded-xl focus:outline-none focus:ring-2 transition-all ${validationErrors.firstname ? 'border border-status-error focus:ring-status-error/20' : 'border border-border-base focus:ring-brand-primary/20'}`}
                />
                {validationErrors.firstname && <p className="text-xs text-status-error">{validationErrors.firstname}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Last Name</label>
                <input 
                  type="text" 
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 bg-bg-subtle rounded-xl focus:outline-none focus:ring-2 transition-all ${validationErrors.lastname ? 'border border-status-error focus:ring-status-error/20' : 'border border-border-base focus:ring-brand-primary/20'}`}
                />
                {validationErrors.lastname && <p className="text-xs text-status-error">{validationErrors.lastname}</p>}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Email Address</label>
              <div className="relative group">
                <FiMail className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${validationErrors.email ? 'text-status-error' : 'text-text-muted group-focus-within:text-brand-primary'}`} />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full pl-10 pr-4 py-2.5 bg-bg-subtle rounded-xl focus:outline-none focus:ring-2 transition-all ${validationErrors.email ? 'border border-status-error focus:ring-status-error/20' : 'border border-border-base focus:ring-brand-primary/20'}`}
                />
              </div>
              {validationErrors.email && <p className="text-xs text-status-error">{validationErrors.email}</p>}
            </div>

            {/* Username */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Username</label>
              <div className="relative group">
                <FiUser className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${validationErrors.username ? 'text-status-error' : 'text-text-muted group-focus-within:text-brand-primary'}`} />
                <input 
                  type="text" 
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="johndoe123"
                  className={`w-full pl-10 pr-4 py-2.5 bg-bg-subtle rounded-xl focus:outline-none focus:ring-2 transition-all ${validationErrors.username ? 'border border-status-error focus:ring-status-error/20' : 'border border-border-base focus:ring-brand-primary/20'}`}
                />
              </div>
              {validationErrors.username && <p className="text-xs text-status-error">{validationErrors.username}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Password</label>
              <div className="relative group">
                <FiLock className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${validationErrors.password ? 'text-status-error' : 'text-text-muted group-focus-within:text-brand-primary'}`} />
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-2.5 bg-bg-subtle rounded-xl focus:outline-none focus:ring-2 transition-all ${validationErrors.password ? 'border border-status-error focus:ring-status-error/20' : 'border border-border-base focus:ring-brand-primary/20'}`}
                />
              </div>
              {validationErrors.password && <p className="text-xs text-status-error">{validationErrors.password}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full py-3.5 rounded-xl font-bold text-text-inverse shadow-lg transition-all mt-4
                flex items-center justify-center gap-2
                ${isLoading 
                  ? "bg-text-muted cursor-wait opacity-70" 
                  : "bg-brand-primary hover:bg-brand-hover hover:scale-[1.02] active:scale-[0.98] shadow-brand-primary/25"
                }
              `}
            >
              {isLoading ? "Creating Account..." : "Sign Up"} <FiArrowRight />
            </button>
          </form>

          {/* Footer / Login Link */}
          <div className="mt-6 pt-6 border-t border-border-base text-center">
            <p className="text-sm text-text-muted">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-brand-primary hover:underline">
                Log In
              </Link>
            </p>
          </div>

          {/* Portfolio Note */}
          <div className="mt-4 p-3 bg-brand-accent/5 rounded-lg border border-brand-accent/10 text-xs text-text-muted text-center">
            <span className="font-bold text-brand-accent block mb-1">Portfolio Note:</span>
            FakeStoreAPI will simulate success but won't save this user.<br/>
            After redirect, please use <b>mor_2314</b> to log in.
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;