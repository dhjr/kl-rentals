import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { XCircle, ArrowLeft, Loader2 } from "lucide-react";
import { carService } from "../utils/api";

const PaymentCancel = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    const cancelBooking = async () => {
      const bookingId = searchParams.get("booking_id");

      if (bookingId) {
        setIsCancelling(true);
        try {
          await carService.cancelBooking(bookingId);
        } catch (error) {
          console.error("Failed to cancel booking:", error);
        } finally {
          setIsCancelling(false);
        }
      }
    };

    cancelBooking();
  }, [searchParams]);

  if (isCancelling) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <Loader2 className="animate-spin w-12 h-12 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-24 text-center px-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 shadow-xl border border-slate-200 dark:border-slate-800 transition-colors flex flex-col items-center gap-6">
        <div className="w-24 h-24 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mb-4">
          <XCircle className="w-12 h-12 text-red-500" />
        </div>

        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Payment Cancelled
        </h2>

        <p className="text-lg text-slate-600 dark:text-slate-300">
          Your booking process was interrupted and no charges were made.
        </p>

        <button
          onClick={() => navigate("/cars")}
          className="mt-8 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-xl font-bold transition-all active:scale-95 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" /> Return to Cars
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;
