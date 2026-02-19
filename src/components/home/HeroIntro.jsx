/**
 * HeroIntro - The museum's entrance hall
 * Full-width, minimal, no frame - only texture and words
 * Reduced vertical space (~40% less) for better pacing
 */
export default function HeroIntro() {
	return (
		<section className="relative w-full py-12 md:py-16 flex flex-col items-center justify-center text-center px-6">
			{/* Slogan - anchored with stronger visual weight */}
			<h2 className="font-display text-3xl md:text-5xl text-ink tracking-wide leading-tight">
				Every Day Has a Past
			</h2>

			{/* Subtext */}
			<p className="mt-4 max-w-xl font-body text-base md:text-lg text-ink-muted leading-relaxed">
				A curated archive of moments that shaped civilizations, cultures, and ideas.
			</p>

			{/* Soft ornamental divider - section boundary */}
			<div className="mt-10 flex items-center justify-center w-full max-w-md">
				<div className="flex-1 h-px bg-gradient-to-r from-transparent via-ink/20 to-transparent"></div>
				<span className="mx-4 text-ink/30 text-xs tracking-[0.3em] font-display">✦</span>
				<div className="flex-1 h-px bg-gradient-to-r from-transparent via-ink/20 to-transparent"></div>
			</div>
		</section>
	);
}
