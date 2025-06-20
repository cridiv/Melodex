import { useState } from "react";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [activeLink, setActiveLink] = useState("Home");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted email:", email);
    setEmail("");
  };

  const handleNavClick = (link: string) => {
    setActiveLink(link);
    // You would typically add navigation logic here
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#121118] dark justify-between group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      {/* Glassmorphism Navbar */}
{/* Modern Glassmorphism Navbar */}
<nav className="fixed w-full z-50 backdrop-blur-lg bg-gradient-to-b from-[#ffffff08] to-[#ffffff03] border-b border-[#ffffff15]">
  <div className="max-w-[1200px] mx-auto px-6 py-3 flex justify-between items-center">
    <div className="flex items-center gap-2">
      {/* Music-themed SVG Logo */}
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#3b19e6] drop-shadow-lg"
      >
        <path 
          d="M12 3V19M8 5V17M16 7V15M20 9V13M4 9V13" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M12 21C14.7614 21 17 18.7614 17 16C17 13.2386 14.7614 11 12 11C9.23858 11 7 13.2386 7 16C7 18.7614 9.23858 21 12 21Z" 
          stroke="currentColor" 
          strokeWidth="2"
        />
      </svg>
      <span className="text-xl font-bold bg-gradient-to-r from-[#3b19e6] to-[#6d4aff] bg-clip-text text-transparent drop-shadow-lg">
        Melodex
      </span>
    </div>
    
    <div className="flex items-center gap-3">
      <button
        onClick={() => handleNavClick("Signup")}
        className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-[#3b19e6] to-[#6d4aff] text-white hover:shadow-lg hover:shadow-[#3b19e6]/30 transition-all"
      >
        <Link to="/signup">
          Sign Up
        </Link>
      </button>
    </div>
  </div>
</nav>

      {/* Main Content */}
      <div className="pt-20">
        {/* Hero Section */}
        <div
          className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-end px-4 pb-10 @[480px]:px-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/sdxl10/28391a47-f713-4c24-8c5d-01a90f4f9ee8.png")',
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
          <div className="flex-wrap gap-3 flex w-full max-w-[1200px] mx-auto">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#3b19e6] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
              <span className="truncate"><Link to="/signup">Get Started</Link></span>
            </button>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#2b2938] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
              <span className="truncate"><Link to="/signup">Upload Track</Link></span>
            </button>
          </div>
        </div>

        {/* Feature Boxes */}
        <div className="flex flex-col gap-10 px-4 py-10 @container max-w-[1200px] mx-auto">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-0">
            <div className="flex flex-1 gap-3 rounded-lg border border-[#403c53] bg-[#1e1c26] p-4 flex-col">
              <div className="text-white" data-icon="MusicNote" data-size="24px" data-weight="regular">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M210.3,56.34l-80-24A8,8,0,0,0,120,40V148.26A48,48,0,1,0,136,184V98.75l69.7,20.91A8,8,0,0,0,216,112V64A8,8,0,0,0,210.3,56.34ZM88,216a32,32,0,1,1,32-32A32,32,0,0,1,88,216ZM200,101.25l-64-19.2V50.75L200,70Z"></path>
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-white text-base font-bold leading-tight">AI Audio Detection</h2>
                <p className="text-[#a29db8] text-sm font-normal leading-normal">Identify music from short audio clips</p>
              </div>
            </div>
            <div className="flex flex-1 gap-3 rounded-lg border border-[#403c53] bg-[#1e1c26] p-4 flex-col">
              <div className="text-white" data-icon="FileSearch" data-size="24px" data-weight="regular">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-45.54-48.85a36.05,36.05,0,1,0-11.31,11.31l11.19,11.2a8,8,0,0,0,11.32-11.32ZM104,148a20,20,0,1,1,20,20A20,20,0,0,1,104,148Z"></path>
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-white text-base font-bold leading-tight">Metadata Retrieval</h2>
                <p className="text-[#a29db8] text-sm font-normal leading-normal">Retrieve metadata for tracks</p>
              </div>
            </div>
            <div className="flex flex-1 gap-3 rounded-lg border border-[#403c53] bg-[#1e1c26] p-4 flex-col">
              <div className="text-white" data-icon="MusicNotes" data-size="24px" data-weight="regular">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M212.92,25.69a8,8,0,0,0-6.86-1.45l-128,32A8,8,0,0,0,72,64V174.08A36,36,0,1,0,88,204V118.25l112-28v51.83A36,36,0,1,0,216,172V32A8,8,0,0,0,212.92,25.69ZM52,224a20,20,0,1,1,20-20A20,20,0,0,1,52,224ZM88,101.75V70.25l112-28v31.5ZM180,192a20,20,0,1,1,20-20A20,20,0,0,1,180,192Z"></path>
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-white text-base font-bold leading-tight">Track Library</h2>
                <p className="text-[#a29db8] text-sm font-normal leading-normal">Explore track library</p>
              </div>
            </div>
            <div className="flex flex-1 gap-3 rounded-lg border border-[#403c53] bg-[#1e1c26] p-4 flex-col">
              <div className="text-white" data-icon="Notepad" data-size="24px" data-weight="regular">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H80v32h96V48h24Z"></path>
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-white text-base font-bold leading-tight">Generate Lyrics</h2>
                <p className="text-[#a29db8] text-sm font-normal leading-normal">AI-powered lyrics generation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Email Signup Section */}
        <div className="@container bg-[#1e1c26] py-16">
          <div className="flex flex-col justify-end gap-6 px-4 @[480px]:gap-8 @[480px]:px-10 max-w-[1200px] mx-auto">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px] mx-auto">
                Join Melodex and never miss a beat
              </h1>
              <p className="text-white text-base font-normal leading-normal max-w-[720px] mx-auto">
                Sign up for free to unlock premium features.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-1 justify-center max-w-[600px] mx-auto">
              <label className="flex flex-col min-w-40 h-14 max-w-[480px] flex-1 @[480px]:h-16">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2b2938] focus:border-none h-full placeholder:text-[#a29db8] px-4 rounded-r-none border-r-0 pr-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
                  />
                  <div className="flex items-center justify-center rounded-r-xl border-l-0 border-none bg-[#2b2938] pr-2">
                    <button
                      type="submit"
                      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#3b19e6] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
                    >
                      <span className="truncate"><Link to="/signup">Get Started</Link></span>
                    </button>
                  </div>
                </div>
              </label>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div>
        <footer className="flex flex-col gap-6 px-5 py-10 text-center @container bg-[#121118]">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#">
              <div className="text-[#a29db8]" data-icon="FacebookLogo" data-size="24px" data-weight="regular">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
                </svg>
              </div>
            </a>
            <a href="#">
              <div className="text-[#a29db8]" data-icon="TwitterLogo" data-size="24px" data-weight="regular">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path>
                </svg>
              </div>
            </a>
            <a href="#">
              <div className="text-[#a29db8]" data-icon="InstagramLogo" data-size="24px" data-weight="regular">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
                </svg>
              </div>
            </a>
          </div>
          <p className="text-[#a29db8] text-base font-normal leading-normal">
            © {new Date().getFullYear()} Melodex, Inc. All rights reserved
          </p>
        </footer>
      </div>
    </div>
  );
};