import { useLocation, useNavigate } from "react-router-dom";
import {
  Check,
  Heart,
  Info,
  ArrowLeft,
  ArrowRight,
  Download,
} from "lucide-react";

export default function AssessmentResult() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    navigate("/symptom-checker");
    return null;
  }

  const { disease, score } = location.state;

  /* ---------------- Risk Logic ---------------- */
  let riskLevel = "LOW RISK";
  let theme = "green";

  if (score >= 30) {
    riskLevel = "HIGH RISK";
    theme = "red";
  } else if (score >= 15) {
    riskLevel = "MODERATE RISK";
    theme = "yellow";
  }

  const themes = {
    green: {
      bg: "bg-green-100",
      border: "border-green-200",
      text: "text-green-700",
      badge: "bg-green-100 text-green-700",
      icon: "text-green-600",
    },
    yellow: {
      bg: "bg-yellow-100",
      border: "border-yellow-200",
      text: "text-yellow-700",
      badge: "bg-yellow-100 text-yellow-700",
      icon: "text-yellow-600",
    },
    red: {
      bg: "bg-red-100",
      border: "border-red-200",
      text: "text-red-700",
      badge: "bg-red-100 text-red-700",
      icon: "text-red-600",
    },
  };

  const t = themes[theme];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-16 pb-32">
      <div className="max-w-4xl mx-auto px-4 print-area">
        <div
          className="
            bg-white
            rounded-2xl
            border border-gray-300
            shadow-sm sm:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.25)]
            overflow-hidden
          "
        >
          {/* Header */}
          <div
            className={`${t.bg} border ${t.border} p-4 sm:p-6 flex items-start justify-between`}
          >
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                {disease} Assessment
              </h1>
              <p className="text-sm text-gray-700 mt-1">
                Completed on {new Date().toLocaleDateString()}
              </p>
            </div>

            <Check className={`w-20 h-20 font-bold sm:w-10 sm:h-10 ${t.icon}`} />
          </div>

          {/* Risk Card */}
          <div
            className={`mx-2 sm:mx-6 mt-6 sm:mt-8 rounded-2xl border ${t.border} ${t.bg} p-4 sm:p-6`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="font-bold text-lg text-gray-900">
                  Risk Assessment
                </h2>
                <p className={`${t.text} mt-1 text-sm font-semibold`}>
                  Score: {score} points
                </p>
              </div>

              <span
                className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold ${t.badge} ring-2 ring-offset-2 ${t.border}`}
              >
                {riskLevel}
              </span>
            </div>
          </div>

          {/* Recommendations */}
          <div className="px-4 sm:px-10 mt-8 sm:mt-10">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-lg text-gray-900">
                Recommendations
              </h3>
            </div>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-green-600 mt-1" />
                <span className="text-sm text-gray-800">
                  Follow the prevention tips for this condition
                </span>
              </li>

              {riskLevel !== "LOW RISK" && (
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-600 mt-1" />
                  <span className="text-sm text-gray-800">
                    Consider scheduling an appointment with a doctor
                  </span>
                </li>
              )}

              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-green-600 mt-1" />
                <span className="text-sm text-gray-800">
                  Maintain a healthy lifestyle with proper diet and exercise
                </span>
              </li>
            </ul>
          </div>

          {/* Prevention Tips */}
          <div className="px-4 sm:px-10 mt-8 sm:mt-10">
            <h3 className="font-bold text-lg text-gray-900 mb-4">
              Prevention Tips
            </h3>

            <ul className="space-y-2 text-sm text-gray-800">
              <li>• Maintain healthy blood pressure</li>
              <li>• Control cholesterol levels</li>
              <li>• Quit smoking</li>
              <li>• Exercise regularly</li>
              <li>• Eat a heart-healthy diet</li>
            </ul>
          </div>

          {/* Next Steps */}
          <div className="mx-2 sm:mx-6 mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 flex gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-700 mb-1">Next Steps</p>
              <p className="text-sm text-blue-700">
                {riskLevel === "HIGH RISK"
                  ? "We strongly recommend consulting a healthcare professional immediately."
                  : "Continue monitoring your health and maintain healthy habits."}
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="px-4 sm:px-10 mt-8 text-xs text-gray-500 text-center">
            Disclaimer: This assessment is for informational purposes only and
            does not constitute medical advice, diagnosis, or treatment.
          </p>

          {/* Actions */}
          {/* Actions */}
          <div className="px-4 sm:px-8 mt-6 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pdf-hide">
            {/* New Assessment */}
            <button
              onClick={() => navigate("/symptom-checker")}
              className="
      min-h-[56px]
      touch-manipulation
      flex items-center justify-center gap-2
      rounded-xl border
      bg-white
      font-semibold text-gray-700
      shadow-md
      active:scale-[0.97] active:shadow-sm
      hover:bg-gray-200
      transition
    "
            >
              <ArrowLeft className="w-4 h-4" />
              New Assessment
            </button>

            {/* Download PDF */}
            <button
              onClick={() => window.print()}
              className="
      min-h-[56px]
      touch-manipulation
      flex items-center justify-center gap-2
      rounded-xl border
      bg-white
      font-semibold text-gray-800
      shadow-md
      active:scale-[0.97] active:shadow-sm
      hover:bg-gray-200
      transition
    "
            >
              Download Report as PDF
              <Download className="w-4 h-4" />
            </button>

            {/* Find Clinics – Primary CTA */}
            <button
              onClick={() => navigate("/clinics")}
              className="
      min-h-[56px]
      touch-manipulation
      flex items-center justify-center gap-2
      rounded-xl
      bg-black text-white
      font-semibold
      shadow-lg
      active:scale-[0.96] active:shadow-md
      hover:bg-white hover:text-black
      border border-black
      transition
    "
            >
              Find Nearby Clinics
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
