import { FiUser, FiLogOut, FiMail, FiPhone } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface UserProfileProps {
  username: string;
  onLogout: () => void;
}

export const UserProfile = ({ username, onLogout }: UserProfileProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-bg-surface border border-border-base rounded-2xl p-6 shadow-sm shadow-shadow-base flex flex-col md:flex-row items-center gap-6"
    >
      {/* 1. Avatar Placeholder */}
      <div className="w-24 h-24 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary border-4 border-bg-page shrink-0">
        <FiUser className="w-10 h-10" />
      </div>

      {/* 2. User Info */}
      <div className="flex-1 text-center md:text-left space-y-1">
        <h2 className="text-2xl font-bold text-text-main font-heading capitalize">
          {username || "Guest User"}
        </h2>
        <p className="text-text-muted text-sm flex items-center justify-center md:justify-start gap-2">
          <FiMail className="w-4 h-4" /> 
          {username ? `${username}@example.com` : "guest@example.com"}
        </p>
        <p className="text-text-muted text-sm flex items-center justify-center md:justify-start gap-2">
          <FiPhone className="w-4 h-4" /> 
          +1 (555) 123-4567
        </p>
      </div>

      {/* 3. Logout Action */}
      <div className="shrink-0 mt-4 md:mt-0">
        <button
          onClick={onLogout}
          className="
            flex items-center gap-2 px-6 py-2.5 rounded-xl
            bg-bg-subtle text-text-main font-bold border border-border-base
            hover:bg-status-error/10 hover:text-status-error hover:border-status-error/20
            transition-all active:scale-95
          "
        >
          <FiLogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </motion.div>
  );
};