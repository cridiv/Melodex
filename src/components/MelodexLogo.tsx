import React from "react";

export const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 backdrop-blur-lg bg-gradient-to-b from-[#ffffff08] to-[#ffffff03] border-b border-[#ffffff15]">
      <div className="max-w-[1200px] mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <MelodexLogo />
          <span className="text-xl font-bold bg-gradient-to-r from-[#3b19e6] to-[#6d4aff] bg-clip-text text-transparent">
            Melodex
          </span>
        </div>

        <button
          onClick={() => (window.location.href = "/signup")}
          className="px-6 py-2 text-sm rounded-full bg-gradient-to-r from-[#3b19e6] to-[#6d4aff] text-white hover:shadow-lg hover:shadow-[#3b19e6]/30 transition-all duration-300 hover:scale-105"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

const MelodexLogo = ({ width = 32, height = 32, className = "drop-shadow-lg" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="50%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#3B19E6" />
      </linearGradient>
      <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
      <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#3B19E6" stopOpacity="0" />
      </radialGradient>
    </defs>

    <circle cx="16" cy="16" r="14" fill="url(#glowGradient)" />

    <g transform="translate(16,16)">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((rotation, index) => {
        const heights = [6, 8, 10, 7, 12, 5, 9, 11, 6, 8, 4, 7];
        const opacities = [0.9, 0.8, 1, 0.85, 1, 0.7, 0.9, 1, 0.8, 0.85, 0.6, 0.75];
        return (
          <g key={index} transform={`rotate(${rotation})`}>
            <rect
              x="0"
              y="-12"
              width="1.5"
              height={heights[index]}
              rx="0.75"
              fill="url(#primaryGradient)"
              opacity={opacities[index]}
            />
          </g>
        );
      })}
    </g>

    <g transform="translate(16,16)">
      <circle r="7" fill="none" stroke="url(#accentGradient)" strokeWidth="1" opacity="0.4" />
      <path
        d="M-4,0 Q-2,-2 0,0 Q2,2 4,0"
        stroke="url(#primaryGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M-3,1 Q-1.5,-1 0,1 Q1.5,3 3,1"
        stroke="url(#accentGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
    </g>

    <circle cx="16" cy="16" r="15" fill="none" stroke="url(#primaryGradient)" strokeWidth="0.5" opacity="0.3" />

    {[[8, 8], [24, 8], [8, 24], [24, 24]].map(([cx, cy], index) => (
      <circle key={index} cx={cx} cy={cy} r="0.5" fill="url(#accentGradient)" opacity="0.6" />
    ))}
  </svg>
);
