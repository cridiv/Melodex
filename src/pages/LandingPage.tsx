import { useState } from "react";
import { Link } from "react-router-dom";

const MelodexLogo = () => (
  <svg 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-lg"
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

export const LandingPage = () => {
  const [email, setEmail] = useState("");



  const handleSubmit = (e: React.FormEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Submitted email:", email);
    setEmail("");
  };

  const features = [
    {
      icon: "M210.3,56.34l-80-24A8,8,0,0,0,120,40V148.26A48,48,0,1,0,136,184V98.75l69.7,20.91A8,8,0,0,0,216,112V64A8,8,0,0,0,210.3,56.34ZM88,216a32,32,0,1,1,32-32A32,32,0,0,1,88,216ZM200,101.25l-64-19.2V50.75L200,70Z",
      title: "AI Audio Detection",
      description: "Identify music from short audio clips"
    },
    {
      icon: "M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-45.54-48.85a36.05,36.05,0,1,0-11.31,11.31l11.19,11.2a8,8,0,0,0,11.32-11.32ZM104,148a20,20,0,1,1,20,20A20,20,0,0,1,104,148Z",
      title: "Metadata Retrieval",
      description: "Retrieve complete metadata for tracks"
    },
    {
      icon: "M212.92,25.69a8,8,0,0,0-6.86-1.45l-128,32A8,8,0,0,0,72,64V174.08A36,36,0,1,0,88,204V118.25l112-28v51.83A36,36,0,1,0,216,172V32A8,8,0,0,0,212.92,25.69ZM52,224a20,20,0,1,1,20-20A20,20,0,0,1,52,224ZM88,101.75V70.25l112-28v31.5ZM180,192a20,20,0,1,1,20-20A20,20,0,0,1,180,192Z",
      title: "Track Library",
      description: "Explore comprehensive track library"
    },
    {
      icon: "M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H80v32h96V48h24Z",
      title: "Generate Lyrics",
      description: "AI-powered lyrics generation"
    }
  ];

  const socialIcons = [
    "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z",
    "M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z",
    "M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"
  ];

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#121118] justify-between group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      {/* Glassmorphism Navbar */}
      <nav className="fixed w-full z-50 backdrop-blur-lg bg-gradient-to-b from-[#ffffff08] to-[#ffffff03] border-b border-[#ffffff15]">
        <div className="max-w-[1200px] mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <MelodexLogo />
            <span className="text-xl font-bold bg-gradient-to-r from-[#3b19e6] to-[#6d4aff] bg-clip-text text-transparent">
              Melodex
            </span>
          </div>
          
          <button
            onClick={() => window.location.href = '/signup'}
            className="px-6 py-2 text-sm rounded-full bg-gradient-to-r from-[#3b19e6] to-[#6d4aff] text-white hover:shadow-lg hover:shadow-[#3b19e6]/30 transition-all duration-300 hover:scale-105"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20">
        {/* Hero Section */}
        <div
          className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-end px-4 pb-10 @[480px]:px-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/sdxl10/28391a47-f713-4c24-8c5d-01a90f4f9ee8.png")',
          }}
        >
          <div className="flex flex-col gap-2 text-left w-full max-w-[1200px] mx-auto">
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
              Unlock Song Secrets Instantly
            </h1>
            <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
              Discover the name of any song, artist or album in seconds.
            </h2>
          </div>
          <div className="flex gap-3 w-full max-w-[1200px] mx-auto">
            <Link
              to="/signup"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#3b19e6] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] hover:bg-[#2d0db8] transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/upload"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#2b2938] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] hover:bg-[#3a3547] transition-colors"
            >
              Upload Track
            </Link>
          </div>
        </div>

        {/* Feature Boxes */}
        <div className="flex flex-col gap-10 px-4 py-10 @container max-w-[1200px] mx-auto">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-1 gap-4 rounded-xl border border-[#403c53] bg-[#1e1c26] p-6 flex-col hover:border-[#4f46e5] transition-colors group">
                <div className="text-[#4f46e5] group-hover:text-[#6366f1] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="currentColor" viewBox="0 0 256 256">
                    <path d={feature.icon}></path>
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-white text-lg font-bold leading-tight">{feature.title}</h2>
                  <p className="text-[#a29db8] text-sm font-normal leading-normal">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Signup Section */}
        <div className="@container bg-[#1e1c26] py-16">
          <div className="flex flex-col justify-end gap-8 px-4 @[480px]:px-10 max-w-[1200px] mx-auto">
            <div className="flex flex-col gap-4 text-center">
              <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px] mx-auto">
                Join Melodex and never miss a beat
              </h1>
              <p className="text-[#a29db8] text-base font-normal leading-normal max-w-[720px] mx-auto">
                Sign up for free to unlock premium features and start analyzing your music today.
              </p>
            </div>
            <div onSubmit={handleSubmit} className="flex justify-center max-w-[600px] mx-auto w-full">
              <div className="flex w-full max-w-[480px] h-14 @[480px]:h-16">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 resize-none overflow-hidden rounded-l-xl text-white focus:outline-0 focus:ring-2 focus:ring-[#4f46e5] border-none bg-[#2b2938] h-full placeholder:text-[#a29db8] px-4 text-sm font-normal leading-normal @[480px]:text-base"
                  required
                />
                <button
                  onClick={handleSubmit}
                  className="flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-r-xl h-full px-6 bg-gradient-to-r from-[#3b19e6] to-[#6d4aff] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base hover:shadow-lg hover:shadow-[#3b19e6]/30 transition-all"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex flex-col gap-6 px-5 py-10 text-center @container bg-[#121118]">
        <div className="flex justify-center gap-6">
          {socialIcons.map((iconPath, index) => (
            <a key={index} href="#" className="text-[#a29db8] hover:text-[#4f46e5] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d={iconPath}></path>
              </svg>
            </a>
          ))}
        </div>
        <p className="text-[#a29db8] text-sm font-normal leading-normal">
          © {new Date().getFullYear()} Melodex, Inc. All rights reserved
        </p>
      </footer>
    </div>
  );
};