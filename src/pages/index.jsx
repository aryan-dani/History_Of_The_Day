import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TodayCard from "../components/home/TodayCard";
import HeroSection from "../components/home/HeroSection";
import ExplorationPaths from "../components/home/ExplorationPaths";
import WhyThisExists from "../components/home/WhyThisExists";
import { historyService } from "../services/historyService";

/**
 * HomePage - The Museum
 * The board is the artifact. The page is the museum around it.
 */
export default function HomePage() {
  const navigate = useNavigate();
  const [todaysEvent, setTodaysEvent] = useState(null);
  const [yesterdayEvent, setYesterdayEvent] = useState(null);
  const [yearsAgo, setYearsAgo] = useState(null);

  useEffect(() => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentDay = now.getDate();
    const currentYear = now.getFullYear();

    historyService.getEventsByDate(currentMonth, currentDay).then((events) => {
      if (events && events.length > 0) {
        setTodaysEvent(events[0]);
        // Calculate temporal context
        if (events[0].year) {
          setYearsAgo(currentYear - events[0].year);
        }
      } else {
        setTodaysEvent(false);
      }
    });

    // Fetch Yesterday's Event for Preview
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayMonth = yesterday.getMonth() + 1;
    const yesterdayDay = yesterday.getDate();

    historyService
      .getEventsByDate(yesterdayMonth, yesterdayDay)
      .then((events) => {
        if (events && events.length > 0) {
          setYesterdayEvent(events[0]);
        } else {
          setYesterdayEvent(false);
        }
      });
  }, []);

  return (
    <div className="relative min-h-screen pt-12">
      {/* ═══════════════════════════════════════════════════════════════
			    SECTION A: Hero Introduction (Redesigned)
			    Two-column modern entry point
			════════════════════════════════════════════════════════════════ */}
      <HeroSection todayEvent={todaysEvent} yesterdayEvent={yesterdayEvent} />

      {/* ═══════════════════════════════════════════════════════════════
			    SECTION B: Today's Chronicle (THE BOARD)
			    The artifact - the only framed element, with external label
			════════════════════════════════════════════════════════════════ */}
      <section
        id="todays-chronicle"
        className="w-full pt-2 pb-8 md:pt-2 md:pb-12 px-4 md:px-8 flex flex-col items-center"
      >
        {/* Board Container with shadow grounding */}
        <div className="relative w-full max-w-5xl flex flex-col items-center">
          {/* External Label - "TODAY'S CHRONICLE" */}
          <div className="w-[92%] md:w-[88%] mb-6 flex items-baseline justify-start gap-6">
            <span className="text-xl uppercase tracking-[0.4em] text-ink font-display font-medium">
              Today's Chronicle
            </span>
            {/* Temporal Context - whisper before the artifact */}
            {yearsAgo && (
              <span className="text-lg uppercase tracking-[0.25em] text-ink/80 font-body">
                {yearsAgo} years ago
              </span>
            )}
          </div>

          {/* Shadow/Vignette Grounding - makes the board feel placed */}
          <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-b from-transparent via-ink/5 to-ink/10 rounded-lg blur-xl pointer-events-none"></div>

          {/* The Board - scaled to ~88% */}
          <div className="relative w-full bg-ink text-paper p-1 shadow-2xl transform scale-[0.92] md:scale-[0.88] origin-top">
            {/* The Blackboard Frame */}
            <div className="border-[16px] border-gold-dipped p-8 md:p-12 relative overflow-hidden">
              {/* Internal Border Decoration */}
              <div className="absolute top-4 left-4 right-4 bottom-4 border border-paper opacity-20 pointer-events-none"></div>

              {/* Hero Content */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-5">
                {/* Vintage Logo / Top Label */}
                <div className="flex flex-col items-center">
                  <span className="text-gold uppercase tracking-[0.5em] text-xs md:text-sm font-bold border-b border-gold pb-2 mb-2">
                    Est. 2025
                  </span>
                  <h1 className="text-5xl md:text-7xl font-display text-gold-muted text-shadow-vintage leading-none">
                    History
                    <br />
                    <span className="text-3xl md:text-5xl text-paper opacity-90 block mt-2">
                      of the Day
                    </span>
                  </h1>
                </div>

                {/* Separator */}
                <div className="w-24 h-1 bg-gold opacity-50 my-4"></div>

                {/* Description */}
                <p className="text-base md:text-lg font-body italic text-paper-dark leading-relaxed max-w-none whitespace-nowrap">
                  "Unearth the forgotten chronicles of the past. A journey
                  through time, etched in digital stone."
                </p>

                {/* History of the Day Feature */}
                {todaysEvent && (
                  <div className="w-full max-w-2xl mt-6 animate-fade-in-up">
                    <TodayCard event={todaysEvent} />
                  </div>
                )}
              </div>

              {/* Background Gradient Blend */}
              <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(232,220,196,0.1)_0%,transparent_70%)] pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
			    SECTION C: Exploration Entry Points
			    The paths out - with distinct zones and clear hierarchy
			════════════════════════════════════════════════════════════════ */}
      <ExplorationPaths />

      {/* ═══════════════════════════════════════════════════════════════
			    SECTION D: "Why This Exists"
			    The curatorial note - editorial, left-aligned, concise
			════════════════════════════════════════════════════════════════ */}
      <WhyThisExists />
    </div>
  );
}
