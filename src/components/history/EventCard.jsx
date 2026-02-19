import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export default function EventCard({ event }) {
	const navigate = useNavigate();

	const handleMapClick = (e) => {
		e.stopPropagation();
		navigate('/map?event=' + event.id);
	};

	return (
		<div className="vintage-card group transform transition-all hover:scale-[1.02] hover:rotate-1 duration-500 cursor-pointer">
			{/* Photo Corners */}
			<div className="photo-corner-tl"></div>
			<div className="photo-corner-tr"></div>
			<div className="photo-corner-bl"></div>
			<div className="photo-corner-br"></div>

			{/* Image Area */}
			<div className="relative h-56 mb-6 border-b-4 border-gold-dipped overflow-hidden bg-ink">
				<img
					src={event.imageUrl}
					alt={event.title}
					className="w-full h-full object-cover sepia-high opacity-80 group-hover:opacity-100 transition-opacity duration-700"
				/>
				<div className="absolute top-0 right-0 bg-gold-dipped text-paper px-3 py-1 font-display text-sm">
					{event.year}
				</div>
			</div>

			{/* Content */}
			<div className="relative z-10 px-2 text-center">
				<div className="uppercase tracking-[0.2em] text-xs font-bold text-gold-dipped mb-2 border-b border-gold-muted inline-block pb-1">
					{event.category}
				</div>

				<h3 className="text-2xl font-display text-ink mb-3 leading-tight group-hover:text-gold-dipped transition-colors">
					{event.title}
				</h3>

				<p className="font-body text-ink-muted text-lg italic leading-relaxed mb-6 line-clamp-3">
					"{event.description}"
				</p>

				<button
					onClick={handleMapClick}
					className="w-full py-2 border-t-2 border-dashed border-gold-dipped text-ink font-bold uppercase tracking-widest text-xs hover:bg-gold-dipped hover:text-paper transition-colors flex items-center justify-center gap-2"
				>
					<MapPin size={14} />
					Locate on Map
				</button>
			</div>
		</div>
	);
}
