import { useNavigate } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";

export default function TodayCard({ event }) {
  const navigate = useNavigate();

  const handleMapClick = (e) => {
    e.stopPropagation();
    // Navigate to specific event on map if ID exists
    if (event.id) {
      navigate(`/map?event=${event.id}`);
    } else {
      navigate("/map");
    }
  };

  return (
    <div className="vintage-card transform transition-all hover:scale-[1.01] duration-500 border-rough p-4 md:p-5 bg-paper-light">
      {/* Decorative Header */}
      <div className="flex items-center justify-between mb-3 border-b-2 border-ink pb-1">
        <div className="flex items-center gap-2 text-gold-dipped">
          <Calendar size={16} />
          <span className="font-display uppercase tracking-widest text-xs font-bold">
            On This Day
          </span>
        </div>
        <div className="font-display text-xl text-ink">{event.year}</div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Image Section */}
        <div className="w-full md:w-1/4 relative h-32 md:h-auto border-4 border-paper shadow-lg overflow-hidden shrink-0 transform -rotate-1">
          <div className="photo-corner-tl"></div>
          <div className="photo-corner-br"></div>
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover sepia-high contrast-110"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-xl md:text-2xl font-display text-ink mb-1 uppercase leading-none">
            {event.title}
          </h3>

          <div className="text-gold-dipped text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2">
            {event.category}
          </div>

          <p className="font-body text-ink text-sm md:text-base leading-relaxed mb-3 italic border-l-2 border-gold pl-3 line-clamp-3">
            "{event.description}"
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-1 text-ink-muted text-xs font-display uppercase tracking-wider">
              <MapPin size={12} />
              {event.location}
            </div>

            <button
              onClick={handleMapClick}
              className="px-4 py-1.5 bg-ink text-gold border-2 border-transparent hover:border-gold font-display uppercase tracking-widest text-[10px] transition-all shadow-md"
            >
              Locate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
