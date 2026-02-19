import { useState, useEffect } from "react";
import Timeline from "../components/history/Timeline";
import EventCard from "../components/history/EventCard";
import { historyService } from "../services/historyService";

export default function ExplorePage() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState({
    month: today.getMonth() + 1,
    day: today.getDate(),
  });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    historyService
      .getEventsByDate(selectedDate.month, selectedDate.day)
      .then((data) => {
        setEvents(data);
        setLoading(false);
      });
  }, [selectedDate]);

  return (
    <div className="container mx-auto px-4 pt-24 pb-12 max-w-6xl relative z-10">
      {/* Page Header */}
      <header className="mb-16 text-center relative">
        <div className="inline-block border-b-4 border-double border-gold-dipped pb-4 px-8">
          <h1 className="text-5xl md:text-7xl font-display text-ink text-shadow-vintage uppercase tracking-widest mb-2">
            Chronicles
          </h1>
          <p className="text-ink-muted text-xl font-body italic">
            "Echoes of the past, recorded for eternity."
          </p>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Timeline Sidebar (on Desktop) */}
        <div className="lg:col-span-4 space-y-8">
          <div className="sticky top-24">
            <h2 className="text-2xl text-ink font-display uppercase mb-6 border-l-4 border-gold pl-4 tracking-widest">
              Date Selector
            </h2>
            <Timeline
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>
        </div>

        {/* Events Grid */}
        <div className="lg:col-span-8">
          <h2 className="text-2xl text-ink font-display uppercase mb-8 border-l-4 border-gold pl-4 tracking-widest flex items-center gap-4">
            Events{" "}
            <span className="text-gold-dipped text-lg">
              // {selectedDate.day} . {selectedDate.month}
            </span>
          </h2>

          {loading ? (
            <div className="text-center py-20 border-2 border-dashed border-ink opacity-50">
              <span className="font-display text-2xl animate-pulse">
                Consulting the Archives...
              </span>
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-paper-light border-rough">
              <p className="text-2xl font-display text-ink-muted opacity-60">
                No records found in the archive.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
