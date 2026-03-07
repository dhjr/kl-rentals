import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { carService } from "../utils/api";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("Confirming your payment...");

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    const bookingId = searchParams.get("booking_id");

    if (!sessionId || !bookingId) {
      setStatus("error");
      setMessage(
        "Invalid payment session details. Please check your bookings.",
      );
      return;
    }

    const confirmPayment = async () => {
      try {
        await carService.confirmPayment({
          session_id: sessionId,
          booking_id: bookingId,
        });
        setStatus("success");
      } catch (err: any) {
        setStatus("error");
        setMessage(err.response?.data?.message || "Failed to confirm payment.");
      }
    };

    confirmPayment();
  }, [searchParams]);

  return (
    <div className="max-w-2xl mx-auto py-24 text-center px-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 shadow-xl border border-slate-200 dark:border-slate-800 transition-colors">
        {status === "loading" && (
          <div className="flex flex-col items-center gap-6">
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {message}
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Please don't close this window.
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-6 animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Payment Successful!
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Your car is successfully booked and ready for you.
            </p>
            <button
              onClick={() => navigate("/bookings")}
              className="mt-8 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95 flex items-center gap-2"
            >
              View My Bookings <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mb-4 text-red-500 font-bold text-2xl">
              !
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Payment Confirmation Failed
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-sm">
              {message}
            </p>
            <button
              onClick={() => navigate("/bookings")}
              className="mt-6 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-xl font-bold transition-all active:scale-95"
            >
              Check Bookings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
