import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * HeroSection - The modern entry point (Dropbox-inspired)
 * Two-column layout:
 * Left: Yesterday's Event
 * Right: Today's Event
 */
export default function HeroSection({ todayEvent, yesterdayEvent }) {
  const navigate = useNavigate();
  const [isYesterdayHovered, setIsYesterdayHovered] = useState(false);
  const [isTodaySelected, setIsTodaySelected] = useState(false);
  const [isTodayHovered, setIsTodayHovered] = useState(false);

  const handleTodayClick = () => {
    // Trigger the same animation as hover
    setIsTodayHovered(true);
    setIsTodaySelected(true);

    // Wait for animation to be visible, then scroll
    setTimeout(() => {
      document
        .getElementById("todays-chronicle")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 400);

    // Reset animation states after scroll starts
    setTimeout(() => {
      setIsTodayHovered(false);
      setIsTodaySelected(false);
    }, 1200);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-6 pt-12 pb-4 md:pt-16 md:pb-4 lg:pt-20 lg:pb-4 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
      {/* LEFT COLUMN: Intent & Action */}
      <div className="flex flex-col items-start text-left space-y-8">
        <div className="flex flex-col items-center w-full md:w-auto">
          <span className="text-gold-muted uppercase tracking-[0.5em] text-xs md:text-sm font-bold border-b border-gold-muted/30 pb-2 mb-4 w-fit">
            Est. 2025
          </span>
          <h1 className="font-display text-5xl md:text-7xl text-ink leading-none text-center">
            History
            <br />
            <span className="text-3xl md:text-5xl text-ink/30 block mt-2">
              of the Day
            </span>
          </h1>
        </div>

        <p className="font-body text-lg md:text-xl text-ink/70 leading-relaxed max-w-md">
          A curated archive designed to be visited once a day, every day.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
          {/* Primary CTA */}
          <button
            onClick={handleTodayClick}
            className="px-8 py-4 bg-ink text-paper font-display text-sm uppercase tracking-widest hover:bg-ink/90 transition-colors w-full sm:w-auto"
          >
            Today's board
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => navigate("/explore")}
            className="px-8 py-4 bg-transparent border border-ink/20 text-ink font-display text-sm uppercase tracking-widest hover:bg-ink/5 transition-colors w-full sm:w-auto"
          >
            Explore the Archive
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Demonstration / Preview */}
      {/* A visual container with aged paper texture from cartography background */}
      <div className="relative w-full h-full min-h-[400px] flex items-center justify-center rounded-2xl p-8 md:p-12 overflow-hidden">
        {/* Background: Base image for texture */}
        <div
          className="absolute inset-0 rounded-2xl bg-cover bg-center"
          style={{ backgroundImage: "url('/images/bg.png')" }}
        ></div>

        {/* Subtle light overlay to lift the darkness slightly */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{ backgroundColor: "rgba(228, 218, 196, 0.2)" }}
        ></div>

        {/* Soft Vignette Layer */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 70%, rgba(139, 115, 85, 0.08) 100%)",
          }}
        ></div>

        {/* The Cards Container */}
        <div className="relative z-10 flex gap-6 items-center justify-center w-full">
          {/* Yesterday Card Wrapper - Fixed size, overflow visible for transforms */}
          <div className="w-[260px] h-[347px] flex-shrink-0 relative">
            {/* Yesterday Card */}
            <div
              onMouseEnter={() => setIsYesterdayHovered(true)}
              onMouseLeave={() => setIsYesterdayHovered(false)}
              className={`absolute inset-0 rounded-sm p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer origin-center ${
                isYesterdayHovered
                  ? "bg-paper border border-transparent shadow-xl -translate-y-2 scale-[1.02] grayscale-0 opacity-100"
                  : "bg-paper/60 border border-ink/5 shadow-sm grayscale opacity-70 scale-95"
              }`}
            >
              <span
                className={`absolute top-0 left-0 w-full h-1 bg-gold transition-opacity duration-300 ${
                  isYesterdayHovered ? "opacity-100" : "opacity-0"
                }`}
              ></span>
              <div>
                <span
                  className={`font-display text-xs uppercase tracking-widest block mb-2 transition-colors duration-300 ${
                    isYesterdayHovered ? "text-ink/40" : "text-ink/30"
                  }`}
                >
                  Yesterday
                </span>
                <h3
                  className={`font-display leading-tight mb-2 line-clamp-3 transition-all duration-300 ${
                    isYesterdayHovered
                      ? "text-2xl text-ink"
                      : "text-xl text-ink/60"
                  }`}
                >
                  {yesterdayEvent === null
                    ? "Loading..."
                    : yesterdayEvent === false
                      ? "No records found"
                      : yesterdayEvent.title}
                </h3>
              </div>
              <div
                className={`mt-auto pt-4 border-t transition-colors duration-300 flex justify-between items-baseline ${
                  isYesterdayHovered ? "border-ink/10" : "border-ink/5"
                }`}
              >
                <span
                  className={`font-display transition-colors duration-300 ${
                    isYesterdayHovered
                      ? "text-4xl text-ink/20"
                      : "text-4xl text-ink/10"
                  }`}
                >
                  {yesterdayEvent?.day}
                </span>
                <span
                  className={`font-body text-sm transition-colors duration-300 ${
                    isYesterdayHovered ? "text-ink/50" : "text-ink/40"
                  }`}
                >
                  {yesterdayEvent?.year}
                </span>
              </div>
            </div>
          </div>

          {/* Today Card Wrapper - Fixed size, overflow visible for transforms */}
          <div className="w-[260px] h-[347px] flex-shrink-0 relative">
            {/* Today Card */}
            <div
              className={`absolute inset-0 rounded-sm p-6 flex flex-col justify-between transition-all duration-300 origin-center ${
                isYesterdayHovered
                  ? "bg-paper/60 border border-ink/5 shadow-sm grayscale opacity-70 scale-95"
                  : `bg-paper border border-transparent shadow-xl ${isTodaySelected || isTodayHovered ? "-translate-y-2 scale-[1.02]" : "scale-100"}`
              }`}
              onMouseEnter={() => setIsTodayHovered(true)}
              onMouseLeave={() => setIsTodayHovered(false)}
            >
              <span
                className={`absolute top-0 left-0 w-full h-1 bg-gold transition-opacity duration-300 ${
                  isYesterdayHovered ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <div>
                <span
                  className={`font-display text-xs uppercase tracking-widest block mb-2 transition-colors duration-300 ${
                    isYesterdayHovered ? "text-ink/30" : "text-ink/40"
                  }`}
                >
                  Today
                </span>
                <h3
                  className={`font-display leading-tight mb-2 line-clamp-3 transition-all duration-300 ${
                    isYesterdayHovered
                      ? "text-xl text-ink/60"
                      : "text-2xl text-ink"
                  }`}
                >
                  {todayEvent === null
                    ? "Loading..."
                    : todayEvent === false
                      ? "No records found"
                      : todayEvent.title}
                </h3>
              </div>
              <div
                className={`mt-auto pt-4 border-t transition-colors duration-300 flex justify-between items-baseline ${
                  isYesterdayHovered ? "border-ink/5" : "border-ink/10"
                }`}
              >
                <span
                  className={`font-display transition-colors duration-300 ${
                    isYesterdayHovered
                      ? "text-4xl text-ink/10"
                      : "text-4xl text-ink/20"
                  }`}
                >
                  {todayEvent?.day}
                </span>
                <span
                  className={`font-body text-sm transition-colors duration-300 ${
                    isYesterdayHovered ? "text-ink/40" : "text-ink/50"
                  }`}
                >
                  {todayEvent?.year}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
