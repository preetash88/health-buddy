import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, AlertTriangle, Phone } from "lucide-react";
import { CheckCircle2, XCircle } from "lucide-react";
import emergencyData from "../data/emergencies.json";

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
      className={`w-4 h-4 sm:w-5 sm:h-5 text-red-600 ${className}`}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export default function EmergencyDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const data =
  emergencyData?.[slug] ||
  Object.entries(emergencyData).find(([key]) => key.startsWith(slug))?.[1] ||
  Object.entries(emergencyData).find(([key]) => key.includes(slug))?.[1] ||
  Object.values(emergencyData).find(
    (item) =>
      item.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") === slug
  );


  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 pt-20 sm:pt-24 pb-24 sm:pb-32">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back button */}
        <button
          onClick={() => navigate("/emergency")}
          className="flex items-center gap-2 text-sm sm:text-lg font-semibold cursor-pointer transition-colors duration-200
                     text-gray-600 hover:text-gray-900 mb-4 sm:mb-6"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Back to Emergency Guides
        </button>

        {!data ? (
          /* ---------- FALLBACK ---------- */
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-12 text-center">
            <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500 mx-auto mb-4" />
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">
              Emergency Guide Coming Soon
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
              This emergency guide is not available yet.
            </p>
          </div>
        ) : (
          /* ---------- MAIN CONTENT ---------- */
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="h-1.5 sm:h-2 bg-orange-500" />

            <div className="p-4 sm:p-6 lg:p-8">
              {/* Urgency badge */}
              <span
                className={`inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-2xl
                  font-semibold text-xs sm:text-sm
                  ${
                    data.urgency === "critical"
                      ? "bg-red-100 text-red-600"
                      : "bg-orange-100 text-orange-600"
                  }
                `}
              >
                {data.urgency.toUpperCase()}
              </span>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {data.title}
              </h1>

              <p className="text-sm sm:text-base text-gray-500 mb-4">
                {data.subtitle}
              </p>

              {/* Emergency Callout */}
              <div className="flex gap-3 bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 mb-6">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mt-0.5" />
                <p className="text-sm sm:text-base text-red-800">
                  <strong>Call Emergency Services First.</strong>
                  <br />
                  Dial <strong>108</strong> or <strong>112</strong> immediately.
                </p>
              </div>

              {/* About */}
              <Section title="About This Emergency">{data.about}</Section>

              {/* Recognize */}
              <h3 className="text-lg sm:text-xl font-semibold mt-6 sm:mt-8 mb-3 flex items-center gap-2">
                <AlertIcon />
                How to Recognize
              </h3>

              <ul className="space-y-3">
                {data.recognize.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 bg-orange-50 border border-orange-100 p-3 rounded-xl text-sm sm:text-base"
                  >
                    <AlertIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Steps */}
              <div className="bg-blue-50 border-2 border-blue-200 p-4 sm:p-6 rounded-xl mt-6 sm:mt-8">
                <h3 className="text-lg sm:text-2xl font-bold text-blue-900 mb-4">
                  ⚡ Immediate Action Steps
                </h3>

                <ol className="space-y-3 leading-none">
                  {data.steps.map((step, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm sm:text-base"
                    >
                      <div
                        className="
    w-5 sm:w-6
    aspect-square
    shrink-0
    rounded-full
    bg-blue-600 text-white
    flex items-center justify-center
    text-[10px] sm:text-xs
    font-bold
  "
                      >
                        {i + 1}
                      </div>

                      <p className="text-[13px] sm:text-base leading-relaxed">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* DO / DON'T */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                <Checklist title="DO" items={data.dos} type="do" />
                <Checklist title="DON'T" items={data.donts} type="dont" />
              </div>
              <p className="text-center text-sm font-semibold text-red-700 mb-3 animate-pulse mt-8 sm:hidden">
                Tap a number to call immediately
              </p>

              {/* Helplines */}
              <div className="mt-2 sm:mt-8 bg-red-50 border border-red-200 rounded-xl p-4 sm:p-5">
                <p className="flex items-center gap-2 font-semibold text-sm sm:text-base text-red-700 mb-4">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  Emergency Helplines
                </p>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { n: "108", l: "Ambulance" },
                    { n: "104", l: "Health Helpline" },
                    { n: "102", l: "Medical Emergency" },
                    { n: "112", l: "National Emergency" },
                  ].map((h) => (
                    <a
                      key={h.n}
                      href={`tel:${h.n}`}
                      className="
    relative
    bg-red-600
    text-white
    rounded-2xl
    py-4
    flex flex-col items-center justify-center
    font-extrabold
    text-lg
    text-center
    shadow-2xl
    transition-all duration-150
    active:scale-95
    active:bg-red-700
    hover:bg-red-700
  "
                    >
                      <Phone className="w-6 h-6 mb-1" />
                      <span className="text-xl">{h.n}</span>
                      <span className="text-xs font-semibold tracking-wide opacity-90">
                        CALL {h.l.toUpperCase()}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Sticky Emergency Call Bar (Mobile Only) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
        <a
          href="tel:108"
          className="
      flex items-center justify-center gap-3
      bg-red-600 text-white
      py-4
      font-extrabold text-lg
      shadow-2xl
      active:bg-red-700
    "
        >
          <Phone className="w-6 h-6" />
          CALL 108 AMBULANCE NOW
        </a>
      </div>
    </main>
  );
}

/* ---------- Helpers ---------- */

function Section({ title, children }) {
  return (
    <div className="mt-6">
      <h3 className="font-semibold text-sm sm:text-base mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-gray-700">{children}</p>
    </div>
  );
}

function Checklist({ title, items, type }) {
  const Icon = type === "do" ? CheckCircle2 : XCircle;
  const color = type === "do" ? "green" : "red";

  return (
    <div className="bg-gray-50 border rounded-xl p-4">
      <h4
        className={`text-${color}-700 text-sm sm:text-base font-semibold mb-3`}
      >
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm sm:text-base">
            <Icon
              className={`w-4 h-4 sm:w-5 sm:h-5 text-${color}-600 mt-0.5`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
