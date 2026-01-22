import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const tabs = [
    { label: "home", path: "/", icon: "home", color: "text-blue-500" },
    { label: "analyze", path: "/symptom-analyzer", icon: "monitor_heart", color: "text-emerald-500" },
    { label: "check", path: "/symptom-checker", icon: "stethoscope", color: "text-purple-500" },
    { label: "diseases", path: "/diseases", icon: "menu_book", color: "text-orange-500" },
    { label: "prevent", path: "/prevention", icon: "shield", color: "text-teal-500" },
    { label: "clinics", path: "/clinics", icon: "location_on", color: "text-pink-500" },
    { label: "emergency", path: "/emergency", icon: "emergency", color: "text-red-500" },
];

export default function MobileTabBar() {
    const location = useLocation();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="sm:hidden fixed bottom-3.5 left-0 right-0 z-[1000] flex justify-center">
            <div
                className={`
          flex justify-around items-center
          h-16 w-[95%]
          rounded-4xl
          backdrop-blur-lg
          border
          transition-all duration-300
          ${
                    isDark
                        ? "bg-[#1e1f20]/35 border-gray-300/15 shadow-[0_8px_30px_rgba(0.7,0.7,0.7,0.7)]"
                        : "bg-white/35 border-white/60 shadow-[0_8px_25px_rgba(0.7,0.7,0.7,0.7)]"
                }
        `}
            >
                {tabs.map((tab) => {
                    const active = location.pathname === tab.path;

                    return (
                        <Link
                            key={tab.path}
                            to={tab.path}
                            className="relative flex flex-col items-center justify-center w-12 h-14"
                        >
                            {/* Active glass bubble */}
                            {active && (
                                <div
                                    className={`
            absolute top-0.5 left-0.5 right-0.5 bottom-1
            rounded-4xl
            backdrop-blur-xl
            ${
                                        isDark
                                            ? "bg-white/15"
                                            : "bg-black/10"
                                    }
            transition-all duration-300
          `}
                                />
                            )}

                            <span
                                className={`
          material-symbols-rounded text-2xl z-10
          transition-all duration-300
          ${tab.color}
          ${
                                    active
                                        ? "scale-125 drop-shadow-[0_0_12px_currentColor]"
                                        : "opacity-70"
                                }
        `}
                            >
        {tab.icon}
      </span>

                            {/* Active dot */}
                            {active && (
                                <div className="w-1.5 h-1.5 mt-0.5 bg-blue-500 rounded-full z-10" />
                            )}
                        </Link>
                    );
                })}

            </div>
        </div>
    );
}
