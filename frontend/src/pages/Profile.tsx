import { useAuth } from "../contexts/AuthContext";
import { User, Mail, Shield, Calendar } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white tracking-tight">
        Account Details
      </h1>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
        <div className="bg-linear-to-r from-blue-600 to-blue-400 h-32 relative">
          <div className="absolute -bottom-12 left-8 p-1 bg-white dark:bg-slate-900 rounded-2xl border-4 border-white dark:border-slate-900 transition-colors">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
              <User size={48} />
            </div>
          </div>
        </div>

        <div className="pt-16 pb-8 px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {user.name}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium capitalize">
              {user.role} Account
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 dark:text-slate-500">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">
                  Email Address
                </p>
                <p className="text-slate-900 dark:text-slate-100 font-medium">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 dark:text-slate-500">
                <Shield size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">
                  Account Role
                </p>
                <p className="text-slate-900 dark:text-slate-100 font-medium capitalize">
                  {user.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 dark:text-slate-500">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">
                  Member Since
                </p>
                <p className="text-slate-900 dark:text-slate-100 font-medium">
                  March 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
