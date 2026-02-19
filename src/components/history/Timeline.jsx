const MONTHS = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
];

export default function Timeline({ selectedDate, onDateSelect }) {
	const daysInMonth = new Date(new Date().getFullYear(), selectedDate.month, 0).getDate();
	const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

	return (
		<div className="bg-paper p-6 vintage-card border-rough relative">
			{/* Grunge Texture Overlay */}
			<div className="absolute inset-0 bg-grunge-overlay opacity-20 pointer-events-none mix-blend-multiply" />

			{/* Decorative Stamp Element */}
			<div className="absolute -top-4 -right-4 w-16 h-16 bg-gold rounded-full flex items-center justify-center border-4 border-double border-ink opacity-80 rotate-12 shadow-lg z-10">
				<span className="font-display text-ink text-xs uppercase text-center leading-tight">History<br />Dept.</span>
			</div>

			<div className="border-b-2 border-ink pb-4">
				<span className="block text-gold-dipped font-display text-xs tracking-[0.2em] mb-1">Select Period</span>
				<h3 className="text-4xl text-ink font-display uppercase leading-none">
					{MONTHS[selectedDate.month - 1]}
				</h3>
			</div>

			{/* Archive Search Label */}
			<p className="font-body italic text-ink-muted text-sm text-right mt-1 mb-6">Archive Search</p>

			{/* Month Grid */}
			<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-10">
				{MONTHS.map((month, idx) => (
					<button
						key={month}
						onClick={() => onDateSelect({ ...selectedDate, month: idx + 1, day: 1 })}
						className={`
              relative py-2 px-1 text-xs font-bold uppercase tracking-widest transition-all duration-300 border-2 overflow-hidden group
              ${selectedDate.month === idx + 1
								? 'bg-ink text-paper border-ink shadow-[4px_4px_0px_#8b7355] -translate-y-1'
								: 'bg-paper text-ink border-ink hover:bg-gold hover:text-ink'}
            `}
					>
						{/* Rough edge effect via border dashed or similar could go here */}
						<span className="relative z-10">{month.slice(0, 3)}</span>
					</button>
				))}
			</div>

			<div className="h-px bg-ink opacity-20 mb-8 border-t border-dashed border-ink w-full"></div>

			{/* Day Grid */}
			<div className="grid grid-cols-7 gap-2">
				{days.map(day => (
					<button
						key={day}
						onClick={() => onDateSelect({ ...selectedDate, day })}
						className={`
              aspect-square flex items-center justify-center text-lg font-display border-2 rounded-full transition-all duration-200
              ${selectedDate.day === day
								? 'bg-gold text-ink border-ink ring-2 ring-offset-2 ring-offset-paper ring-ink font-bold transform scale-110'
								: 'bg-transparent text-ink border-transparent hover:border-gold-dipped hover:bg-paper-dark'}
            `}
					>
						{day}
					</button>
				))}
			</div>
		</div>
	);
}
