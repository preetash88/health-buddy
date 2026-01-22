import {Link, useLocation} from "react-router-dom";
import {Home, Activity, Stethoscope, BookOpen, Shield, MapPin, AlertCircle} from "lucide-react";
import {useTheme} from "../context/ThemeContext";

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
    const {theme} = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-[1000]">
            <div
                className={`
          flex justify-around items-center
          h-16
          backdrop-blur-xl
          border-t
          ${
                    isDark
                        ? "bg-[#1e1f20]/90 border-white/10"
                        : "bg-white/80 border-gray-200"
                }
        `}
            >
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const active = location.pathname === tab.path;

                    return (
                        <Link
                            key={tab.path}
                            to={tab.path}
                            className="flex flex-col items-center gap-1 mb-1"
                        >
                            <span
                                className={`
    material-symbols-rounded text-2xl
    transition-all
    ${tab.color}
    ${active ? "scale-125" : "opacity-70"}
  `}
                            >
  {tab.icon}
</span>


                            {active && (
                                <div className="w-1.5 h-1.5 mb bg-blue-500 rounded-full"/>
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
