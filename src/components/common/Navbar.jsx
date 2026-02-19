import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  // Animate navbar on page navigation
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      prevPathRef.current = location.pathname;
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/explore", label: "Timeline" },
    { path: "/map", label: "Map" },
  ];

  const isMapPage = location.pathname === "/map";
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Fixed Logo in Top-Left Corner - Non-clickable, hidden on map page */}
      {!isMapPage && (
        <div className="fixed top-4 left-4 md:top-6 md:left-6 z-[100] pointer-events-none">
          {/* Logo Icon Mark */}
          <div className="relative w-12 h-12 border-2 border-gold flex items-center justify-center bg-ink shadow-xl">
            <span className="font-display text-gold text-xl font-bold">H</span>
            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-gold"></div>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-gold"></div>
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-gold"></div>
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-gold"></div>
          </div>
        </div>
      )}

      {/* Centered Floating Navbar */}
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[99] transition-all duration-500 ease-out ${isAnimating ? "scale-110" : "scale-100"
          }`}
      >
        {/* Main Navbar Container */}
        <div
          className={`relative bg-ink border-2 border-gold-dipped shadow-2xl transition-all duration-500 px-6 py-3`}
        >
          {/* Gold Corner Accents */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-gold"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-gold"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-gold"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-gold"></div>

          <div className="flex items-center gap-4 md:gap-6">
            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`relative px-5 py-2 font-display text-xs uppercase tracking-[0.2em] transition-all duration-300 group ${isActive(link.path)
                      ? "text-gold"
                      : "text-paper/80 hover:text-gold"
                      }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {/* Hover/Active Background */}
                    <span
                      className={`absolute inset-0 bg-gold/5 border border-gold/20 transition-all duration-300 ${isActive(link.path) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}
                    ></span>
                    {/* Bottom Accent Line */}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gold transition-all duration-300 ${isActive(link.path) ? "w-3/4" : "w-0 group-hover:w-1/2"
                        }`}
                    ></span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 text-gold hover:text-gold-muted transition-colors"
              aria-label="Toggle menu"
            >
              <span
                className={`w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
              ></span>
              <span
                className={`w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""
                  }`}
              ></span>
              <span
                className={`w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
              ></span>
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          <div
            className={`md:hidden absolute top-full left-0 right-0 mt-2 bg-ink border-2 border-gold-dipped overflow-hidden transition-all duration-300 ${isMobileMenuOpen
              ? "max-h-48 opacity-100"
              : "max-h-0 opacity-0 border-0"
              }`}
          >
            <ul className="py-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-2 font-display text-xs uppercase tracking-[0.2em] transition-colors ${isActive(link.path)
                      ? "text-gold bg-ink-light"
                      : "text-paper hover:text-gold hover:bg-ink-light"
                      }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Decorative Shadow */}
        <div className="absolute inset-0 bg-ink/50 blur-md -z-10 translate-y-1"></div>
      </nav>
    </>
  );
}
