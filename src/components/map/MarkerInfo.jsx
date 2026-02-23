import { useNavigate } from 'react-router-dom';

export default function MarkerInfo({ site, onClose }) {
	const navigate = useNavigate();

	const handleReadChronicle = () => {
		navigate(`/chronicle/${site.id}`);
	};

	return (
		<div className="absolute top-4 right-4 w-80 max-w-[calc(100%-2rem)] z-40 animate-fade-in">
			{/* Vintage Card Container */}
			<div className="vintage-card bg-paper border-4 border-ink relative overflow-hidden">
				{/* Photo Corners */}
				<div className="photo-corner-tl" />
				<div className="photo-corner-tr" />
				<div className="photo-corner-bl" />
				<div className="photo-corner-br" />

				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-2 right-2 z-10 w-8 h-8 bg-ink text-gold hover:bg-gold hover:text-ink transition-colors flex items-center justify-center"
					aria-label="Close details"
				>
					<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>

				{/* Card Header */}
				<div className="border-b-2 border-gold-dipped pb-4 mb-4">
					<div className="flex items-start gap-3">
						{/* Thumbnail */}
						<div className="w-14 h-14 shrink-0 bg-ink border-2 border-gold-dipped flex items-center justify-center overflow-hidden">
							{site.imageUrl ? (
								<img
									src={site.imageUrl}
									alt={site.title}
									className="w-full h-full object-cover sepia-high"
								/>
							) : (
								<span className="text-gold text-xs font-display">IMG</span>
							)}
						</div>

						{/* Title & Meta */}
						<div className="flex-1 min-w-0 pr-8">
							<h3 className="font-display text-ink text-sm uppercase tracking-wider leading-tight">
								{site.title}
							</h3>
							<div className="flex items-center gap-2 mt-1 text-xs">
								{site.year && (
									<span className="text-gold font-display">{site.year}</span>
								)}
								{site.category && (
									<>
										<span className="text-gold-dipped">•</span>
										<span className="text-ink-muted font-body uppercase tracking-wider">
											{site.category}
										</span>
									</>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Card Body */}
				<div className="space-y-3">
					{/* Location */}
					{site.name && (
						<div className="flex items-center gap-2 text-xs text-ink-muted">
							<svg className="w-4 h-4 text-gold-dipped" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
							<span className="font-body truncate">{site.name}</span>
						</div>
					)}

					{/* Description */}
					<p className="font-body text-ink text-sm leading-relaxed line-clamp-4">
						{site.description || "A significant moment in history, etched in the chronicles of time."}
					</p>

					{/* Coordinates */}
					{site.lat && site.lng && (
						<div className="text-xs text-ink-muted font-body italic border-t border-gold-dipped pt-3 mt-3">
							Coordinates recorded at {site.lat.toFixed(2)}°N, {site.lng.toFixed(2)}°E
						</div>
					)}
				</div>

				{/* Card Footer */}
				<div className="mt-4 pt-4 border-t-2 border-gold-dipped">
					<button
						onClick={handleReadChronicle}
						className="w-full bg-ink text-gold hover:bg-gold hover:text-ink py-3 font-display uppercase tracking-widest text-sm transition-colors"
					>
						Read Full Chronicle
					</button>
				</div>

				{/* Grunge Texture Overlay */}
				<div className="absolute inset-0 bg-grunge-overlay opacity-20 pointer-events-none mix-blend-multiply" />
			</div>
		</div>
	);
}
