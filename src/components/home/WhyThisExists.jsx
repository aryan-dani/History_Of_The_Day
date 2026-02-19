/**
 * WhyThisExists - Editorial section
 * Left-aligned, concise, with differentiated background
 */
export default function WhyThisExists() {
	return (
		<section className="w-full py-16 md:py-20 px-6 bg-ink/[0.08]">
			<div className="max-w-2xl mx-auto">
				{/* Editorial content - CENTERED */}
				<div className="text-center">
					<span className="font-display text-ink/60 text-xs uppercase tracking-[0.3em] block mb-4">
						A Note on Intent
					</span>
					<p className="font-body text-base md:text-lg text-ink/70 leading-loose">
						History of the Day is not a feed.<br />
						It is an archive designed to be revisited.
					</p>
				</div>

				{/* Subtle closing mark - centered */}
				<div className="mt-8 flex justify-center">
					<span className="text-gold-dipped/60 text-xl font-display">§</span>
				</div>
			</div>
		</section>
	);
}
