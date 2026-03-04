import { Car, Shield, Users, MapPin, Award, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Header Section */}
      <section className="text-center max-w-3xl mx-auto pt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight transition-colors">
          Redefining the{" "}
          <span className="text-blue-600 dark:text-blue-500">
            Rental Experience
          </span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
          KL Rentals was founded on a simple premise: renting a car should be as
          seamless as driving one. We've built a platform that puts
          transparency, quality, and your journey first.
        </p>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {[
          { label: "Active Users", value: "10k+", icon: Users },
          { label: "Elite Vehicles", value: "500+", icon: Car },
          { label: "Locations", value: "24/7", icon: MapPin },
          { label: "Service Awards", value: "15", icon: Award },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mx-auto mb-4">
              <stat.icon size={24} />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {stat.value}
            </p>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      {/* Story Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center px-4">
        <div className="rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10">
          <img
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000"
            alt="Our mission"
            className="w-full h-[400px] object-cover"
          />
        </div>
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold border border-blue-100 dark:border-blue-800">
            <Heart size={16} />
            <span>Our Mission</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Driven by Passion, Focused on People
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            At KL Rentals, we don't just provide cars; we provide gateways to
            new experiences. From the solo traveler exploring winding roads to
            the family heading to their favorite destination, we treat every
            journey as our own.
          </p>
          <div className="space-y-4 pt-4">
            <div className="flex gap-4">
              <div className="shrink-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                <Shield size={14} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">
                  Safety First
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Every vehicle undergoes a 120-point inspection before every
                  rental.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <Users size={14} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">
                  Customer Obsessed
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Our support team is always just a phone call or chat away,
                  24/7.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-slate-900 dark:bg-slate-900 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
        <blockquote className="relative z-10 max-w-2xl mx-auto italic text-xl md:text-2xl font-medium leading-relaxed">
          "The best way to find yourself is to lose yourself in the service of
          others. We apply this philosophy to every mile you drive with us."
        </blockquote>
        <div className="mt-6 font-bold text-blue-400">
          — The KL Rentals Team
        </div>
      </section>
    </div>
  );
}
