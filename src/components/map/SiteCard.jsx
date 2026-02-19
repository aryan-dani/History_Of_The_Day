export default function SiteCard({ site, isActive, onClick }) {
	return (
		<button
			onClick={onClick}
			className={`
				w-full text-left p-4 border-b border-ink-muted transition-all duration-200 group
				${isActive
					? 'bg-ink-light border-l-4 border-l-gold'
					: 'hover:bg-ink-light border-l-4 border-l-transparent hover:border-l-gold-dipped'
				}
			`}
		>
			<div className="flex items-start gap-3">
				{/* Thumbnail Placeholder */}
				<div className="w-12 h-12 shrink-0 bg-paper border-2 border-gold-dipped flex items-center justify-center overflow-hidden">
					{site.imageUrl ? (
						<img
							src={site.imageUrl}
							alt={site.title}
							className="w-full h-full object-cover sepia-high"
						/>
					) : (
						<span className="text-ink text-xs font-display">IMG</span>
					)}
				</div>

				{/* Content */}
				<div className="flex-1 min-w-0">
					<h3 className={`font-display text-sm uppercase tracking-wider leading-tight truncate transition-colors
						${isActive ? 'text-gold' : 'text-paper group-hover:text-gold'}
					`}>
						{site.title}
					</h3>
					<div className="flex items-center gap-2 mt-1">
						{site.year && (
							<span className="text-gold-muted text-xs font-body">{site.year}</span>
						)}
						{site.category && (
							<>
								<span className="text-gold-dipped">•</span>
								<span className="text-gold-dipped text-xs font-body uppercase tracking-wider truncate">
									{site.category}
								</span>
							</>
						)}
					</div>
				</div>
			</div>
		</button>
	);
}
