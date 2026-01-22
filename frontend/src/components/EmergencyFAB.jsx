import { Phone } from "lucide-react";
import { useState } from "react";

export default function EmergencyFAB() {
    const [open, setOpen] = useState(false);

    return (
        <div className="sm:hidden fixed bottom-20 right-4 z-[2000]">
            {/* Expanded */}
            {open && (
                <div className="mb-4 p-4 rounded-2xl shadow-xl bg-[#1e1f20] text-white w-64 animate-fade-in">
                    <p className="font-semibold mb-2">Emergency Helplines</p>
                    <div className="space-y-2 text-sm">
                        <div>📞 <b>108</b> Ambulance</div>
                        <div>📞 <b>104</b> Health Helpline</div>
                        <div>📞 <b>102</b> Medical Emergency</div>
                        <div>📞 <b>112</b> National Emergency</div>
                    </div>
                </div>
            )}

            {/* Button */}
            <button
                onClick={() => setOpen(!open)}
                className={`
          w-14 h-14 rounded-full
          flex items-center justify-center
          shadow-xl
          transition-all duration-300
          ${
                    open
                        ? "bg-red-600 scale-110"
                        : "bg-red-500 animate-pulse"
                }
        `}
            >
                <Phone className="text-white w-6 h-6" />
            </button>
        </div>
    );
}
