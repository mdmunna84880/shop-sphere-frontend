/** @format */

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  FiUser,
  FiLock,
  FiMail,
  FiArrowRight,
  FiAlertCircle,
} from "react-icons/fi";
import { motion } from "framer-motion";

// Components
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthInput } from "@/components/auth/AuthInput";

import { cn } from "@/utils/cn";
import { login, register } from "@/store/slices/authSlice";
import type { AppDispatch } from "@/store";
import type { SignUpCredentials } from "@/types";
import type { RootState } from "@/store";

interface ValidationErrors extends SignUpCredentials {
  confirmPassword: string;
}

const INITIAL_ERRORS = {
  id: 0,
  username: "",
  password: "",
  email: "",
  confirmPassword: "",
};
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // State
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrors>(INITIAL_ERRORS);
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({
    id: count,
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { status, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const isLoading = status === "loading";

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (validationErrors[name as keyof SignUpCredentials]) {
      setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: ValidationErrors = { ...INITIAL_ERRORS };
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Must be at least 6 characters";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setValidationErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const apiPayload: SignUpCredentials = {
      id: formData.id,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };
    dispatch(register(apiPayload));
    confirm("You simulated the registration successfully");
    dispatch(login({ username: "mor_2314", password: "83r5^_" }));
    setCount((prev) => prev + 1);
  };
  useEffect(() => {
    if (isAuthenticated) {
      confirm(
        "You have successfully signed using the fakestore username and password"
      );
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (
    <AuthLayout>
      <AuthHeader title="Create Account" subtitle="Join us to start shopping" />

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Global API Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex items-center gap-2 p-2 text-xs border rounded-lg bg-status-error/10 border-status-error/20 text-status-error"
            >
              <FiAlertCircle className="shrink-0" />
              {error}
            </motion.div>
          )}

          <AuthInput
            label="Username"
            name="username"
            icon={FiUser}
            type="text"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
            error={validationErrors.username}
          />

          <AuthInput
            label="Email Address"
            name="email"
            icon={FiMail}
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            error={validationErrors.email}
          />

          <AuthInput
            label="Password"
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Min 6 characters"
            value={formData.password}
            onChange={handleChange}
            error={validationErrors.password}
          />

          <AuthInput
            label="Confirm Password"
            name="confirmPassword"
            icon={FiLock}
            type="password"
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={validationErrors.confirmPassword}
          />

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full py-3 rounded-lg font-bold text-sm text-text-inverse shadow-md transition-all mt-4",
              "flex items-center justify-center gap-2",
              isLoading
                ? "bg-text-muted cursor-wait opacity-70"
                : "bg-brand-primary hover:bg-brand-hover hover:scale-[1.02] active:scale-[0.98]"
            )}
          >
            {isLoading ? (
              "Creating Account..."
            ) : (
              <>
                Sign Up <FiArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-xs text-text-muted">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold transition-colors text-brand-primary hover:text-brand-hover hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
