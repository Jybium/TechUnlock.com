import React from "react";
import HeroSection from "@/components/reusables/learn-pace/hero-section";
import { Clock, Globe, GraduationCap, Trophy } from "lucide-react";
import ProgramsOffered from "@/components/reusables/learn-pace/program-offered";

const features = [
  {
    icon: Clock,
    emoji: "🕐",
    title: "Self-paced",
    description: "No deadlines. No pressure. Just results",
    color: "bg-blue-100 text-[#13485B]",
    // bgColor: "bg-blue-50",
  },
  {
    icon: Globe,
    emoji: "🌍",
    title: "Learn Anywhere",
    description: "Learn anywhere, anytime on your own terms",
    color: "bg-green-100 text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: GraduationCap,
    emoji: "    🎓",
    title: "Beginner-Friendly",
    description: "Completely beginner-friendly so prior knowledge required",
    color: "bg-orange-100 text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: Trophy,
    emoji: "🏆",
    title: "Badges",
    description:
      "Earn certificates, build your confidence, and launch your career",
    color: "bg-purple-100 text-purple-600",
    bgColor: "bg-purple-50",
  },
];

const LearnPacePage = () => {
  return (
    <div>
      <div className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <div className="lg:absolute lg:bottom-12 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 z-20 max-w-6xl w-full px-4">
          <div className="bg-white border p-3 rounded-lg">
            <div className="grid lg:flex lg:justify-between gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`${feature.bgColor} rounded-xl p-4  transition-shadow border- border-gray-200`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl">{feature.emoji}</div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ProgramsOffered />
    </div>
  );
};

export default LearnPacePage;
