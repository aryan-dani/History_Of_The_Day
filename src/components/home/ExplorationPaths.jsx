import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * ExplorationPaths - Navigation to Timeline and Map
 * With distinct zones, separator, and clear clickability affordances
 */
export default function ExplorationPaths() {
	const navigate = useNavigate();

	return (
		<section className="w-full py-16 md:py-20 px-6 bg-gradient-to-b from-transparent via-ink/[0.03] to-ink/[0.06]">
			<div className="max-w-4xl mx-auto">
				{/* Section Header */}
				<p className="text-center font-body text-xs uppercase tracking-[0.4em] text-black font-semibold mb-10">
					Continue Your Journey
				</p>

				{/* Two paths with separator */}
				<div className="relative grid grid-cols-1 md:grid-cols-2 gap-0">
					{/* Vertical Separator (desktop only) */}
					<div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-ink/15 to-transparent"></div>

					{/* Timeline Path - Zone with Clock Texture */}
					<button
						onClick={() => navigate('/explore')}
						className="group relative flex flex-col items-center justify-center text-center py-10 px-6 
						           rounded-lg transition-all duration-300
						           overflow-hidden shadow-md min-h-[300px]
						           hover:-translate-y-1 hover:shadow-lg
						           cursor-pointer md:mr-4"
					>
						{/* Clock texture background - full coverage with clock in corner of the image */}
						<div
							className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
							style={{ backgroundImage: "url('/images/clock.png')" }}
						></div>

						{/* Darkening gradient for the clock area (bottom-left) */}
						<div
							className="absolute inset-0 transition-opacity duration-300 opacity-40 group-hover:opacity-100"
							style={{ background: 'radial-gradient(circle at 0% 100%, rgba(26, 26, 26, 0.5), transparent 50%)' }}
						></div>

						{/* Overlay for text readability - matching Map button style */}
						<div className="absolute inset-0 bg-paper/50 group-hover:bg-paper/30 transition-colors duration-300"></div>

						{/* Subtle zone indicator */}
						<div className="absolute inset-0 rounded-lg border border-ink/10 group-hover:border-gold/30 transition-colors"></div>

						{/* Content - positioned above texture */}
						<div className="relative z-10 flex flex-col items-center pt-8">
							<h3 className="font-display text-2xl md:text-3xl text-ink uppercase tracking-wider mb-3 transition-colors group-hover:text-ink">
								Explore the Timeline
							</h3>
							<p className="font-body text-sm text-ink/50 leading-relaxed max-w-xs mb-4">
								Browse events by date, category, or era. Discover patterns across centuries.
							</p>
							{/* Arrow indicator for clickability */}
							<span className="flex items-center gap-2 text-xs uppercase tracking-widest text-ink/30 group-hover:text-gold transition-all duration-300">
								<span className="opacity-0 group-hover:opacity-100 transition-opacity">Enter</span>
								<ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
							</span>
						</div>
					</button>

					{/* Map Path - Zone with Cartography Background */}
					<button
						onClick={() => navigate('/map')}
						className="group relative flex flex-col items-center justify-center text-center py-12 px-6 
						           rounded-lg transition-all duration-300
						           overflow-hidden shadow-md min-h-[300px]
						           hover:-translate-y-1 hover:shadow-lg
						           cursor-pointer md:ml-4
						           border-t md:border-t-0 border-ink/10 mt-4 md:mt-0"
					>
						{/* Background Image Layer */}
						<div
							className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
							style={{ backgroundImage: "url('/images/cartography.png')" }}
						></div>

						{/* Overlay for text readability - reduced opacity to show more map */}
						<div className="absolute inset-0 bg-paper/50 group-hover:bg-paper/30 transition-colors duration-300"></div>

						{/* Border indicator */}
						<div className="absolute inset-0 rounded-lg border border-ink/10 group-hover:border-gold/30 transition-colors"></div>

						{/* Content - positioned above overlays */}
						<div className="relative z-10 flex flex-col items-center pt-8">
							<h3 className="font-display text-2xl md:text-3xl text-ink uppercase tracking-wider mb-3 transition-colors group-hover:text-ink">
								Navigate the Map
							</h3>
							<p className="font-body text-sm text-ink/70 leading-relaxed max-w-xs mb-4">
								See where history happened. Explore events by location and geography.
							</p>
							{/* Arrow indicator for clickability */}
							<span className="flex items-center gap-2 text-xs uppercase tracking-widest text-ink/50 group-hover:text-gold transition-all duration-300">
								<span className="opacity-0 group-hover:opacity-100 transition-opacity">Enter</span>
								<ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
							</span>
						</div>
					</button>
				</div>
			</div>
		</section>
	);
}
