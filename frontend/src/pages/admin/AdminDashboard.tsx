import { useState, useEffect } from "react";
import { Users, Car, Calendar, IndianRupee, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Stats {
  users: number;
  cars: number;
  bookings: number;
  revenue: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/admin/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch statistics");
      }

      const data = await response.json();
      setStats(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl border border-red-200 dark:border-red-800">
          {error}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats?.users || 0,
      icon: <Users className="w-6 h-6" />,
      color: "bg-blue-500",
      link: "/admin/users",
    },
    {
      title: "Total Cars",
      value: stats?.cars || 0,
      icon: <Car className="w-6 h-6" />,
      color: "bg-emerald-500",
      link: "/admin/cars",
    },
    {
      title: "Total Bookings",
      value: stats?.bookings || 0,
      icon: <Calendar className="w-6 h-6" />,
      color: "bg-amber-500",
      link: "/admin/bookings",
    },
    {
      title: "Total Revenue",
      value: `₹${stats?.revenue?.toLocaleString() || 0}`,
      icon: <IndianRupee className="w-6 h-6" />,
      color: "bg-purple-500",
      link: "/admin/bookings",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          System overview and management
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${card.color} p-3 rounded-2xl text-white shadow-lg shadow-${card.color.split('-')[1]}-500/20`}>
                {card.icon}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                {card.title}
              </p>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {card.value}
              </h2>
            </div>
            <Link
              to={card.link}
              className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:gap-3 transition-all"
            >
              Manage <ArrowRight size={16} />
            </Link>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/admin/users"
              className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-100 dark:border-slate-700"
            >
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">Manage Users</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">View and edit user roles</p>
            </Link>
            <Link
              to="/admin/cars"
              className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-100 dark:border-slate-700"
            >
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">Fleet Management</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">Monitor all vehicles</p>
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <p className="text-slate-500 dark:text-slate-400 italic text-center py-8">
              Recent booking activity will appear here in the next update.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
