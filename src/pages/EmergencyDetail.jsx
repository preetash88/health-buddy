import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, AlertTriangle, Phone } from "lucide-react";
import { CheckCircle2, XCircle } from "lucide-react";
import emergencyData from "@/data/emergencies.json";

/* ---------- Icons ---------- */

function AlertIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-5 h-5 text-red-600 ${className}`}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

/* ---------- Component ---------- */

export default function EmergencyDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const data = emergencyData[slug];

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  if (!data) {
    return (
      <div className="pt-32 text-center text-gray-600">
        Emergency guide not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-32">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-lg font-semibold
                     text-gray-600 hover:text-gray-900 mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Emergency Guides
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="h-2 bg-orange-500" />

          <div className="p-8">
            <span
              className={`
    inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-2xl
    font-semibold text-sm hover:bg-red-500 hover:text-white cursor-pointer shadow-2xl
    transition-all duration-300
    ${
      data.urgency === "critical"
        ? "bg-red-100 text-red-600"
        : "bg-orange-100 text-orange-600"
    }
  `}
            >
              {data.urgency === "critical" ? (
                /* ⚡ CRITICAL ICON */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                </svg>
              ) : (
                /* ⚠️ URGENT ICON */
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              )}

              {data.urgency.toUpperCase()}
            </span>

            <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
            <p className="text-gray-500 mb-4">{data.subtitle}</p>

            {/* Callout */}
            <div
              className="flex gap-3 bg-red-50 border border-red-200
                            rounded-lg p-4 mb-6"
            >
              <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5" />
              <p className="text-red-800">
                <strong>Call Emergency Services First.</strong>
                <br />
                Dial 108 or 112 immediately.
              </p>
            </div>

            {/* About */}
            <Section title="About This Emergency">{data.about}</Section>

            {/* Recognize */}
            <h3 className="text-xl font-semibold mt-8 mb-3 flex gap-2">
              <AlertIcon /> How to Recognize
            </h3>

            <ul className="space-y-3">
              {data.recognize.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 bg-orange-50 border
                                       border-orange-100 p-3 rounded-xl"
                >
                  <AlertIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Steps */}
            <div
              className="bg-blue-50 border-2 border-blue-200
                            p-6 rounded-xl mt-8"
            >
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                ⚡ Immediate Action Steps
              </h3>

              <ol className="space-y-3">
                {data.steps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <div
                      className="w-8 h-8 rounded-full bg-blue-600
                                    text-white flex items-center
                                    justify-center font-bold"
                    >
                      {i + 1}
                    </div>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* DO / DON'T */}
            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              <Checklist title="DO" items={data.dos} type="do" />
              <Checklist title="DON'T" items={data.donts} type="dont" />
            </div>

            {/* Helplines */}
            <div
              className="mt-8 bg-red-50 border border-red-200
                            rounded-xl p-4"
            >
              <p className="flex gap-2 font-semibold text-red-700 mb-3">
                <Phone className="w-4 h-4" /> Emergency Helplines
              </p>

              <div className="grid grid-cols-2 gap-3">
                <a href="tel:108" className="emergency-btn">
                  108 Ambulance
                </a>
                <a href="tel:104" className="emergency-btn">
                  104 Health
                </a>
                <a href="tel:102" className="emergency-btn">
                  102 Emergency
                </a>
                <a href="tel:112" className="emergency-btn">
                  112 National
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ---------- Helpers ---------- */

function Section({ title, children }) {
  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-700">{children}</p>
    </div>
  );
}

function Checklist({ title, items, type }) {
  const Icon = type === "do" ? CheckCircle2 : XCircle;
  const color = type === "do" ? "green" : "red";

  return (
    <div className="bg-gray-50 border rounded-xl p-4">
      <h4 className={`text-${color}-700 font-semibold mb-3`}>{title}</h4>

      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <Icon className={`w-4 h-4 text-${color}-600 mt-0.5`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
