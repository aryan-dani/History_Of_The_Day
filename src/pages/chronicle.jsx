import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, ArrowLeft, Calendar, Tag, Compass } from "lucide-react";
import { historyService } from "../services/historyService";
import { chronicleService } from "../services/chronicleService";
import "../styles/chronicle.css";

export default function ChroniclePage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [event, setEvent] = useState(null);
	const [article, setArticle] = useState("");
	const [loading, setLoading] = useState(true);
	const [articleLoading, setArticleLoading] = useState(true);

	// Fetch event data
	useEffect(() => {
		if (!id) return;
		setLoading(true);
		historyService.getEventById(id).then((data) => {
			setEvent(data);
			setLoading(false);

			// Generate AI article
			if (data) {
				setArticleLoading(true);
				chronicleService.generateArticle(data).then((text) => {
					setArticle(text);
					setArticleLoading(false);
				});
			}
		});
	}, [id]);

	// Generate a pseudo-random edition number from the event ID
	const getEditionNumber = (id) => {
		if (!id) return "001";
		let hash = 0;
		for (let i = 0; i < id.length; i++) {
			hash = (hash << 5) - hash + id.charCodeAt(i);
			hash |= 0;
		}
		return String(Math.abs(hash) % 99999).padStart(5, "0");
	};

	// Format the historical date
	const formatDate = (event) => {
		if (!event) return "";
		const months = [
			"January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December",
		];
		const monthName = event.monthName || months[(event.month || 1) - 1];
		// Get a day-of-week for immersion
		const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		const d = new Date(event.year, (event.month || 1) - 1, event.day);
		const dayOfWeek = days[d.getDay()];
		return `${dayOfWeek}, ${monthName} ${event.day}, ${event.year}`;
	};

	if (loading) {
		return (
			<div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl relative z-10">
				<div className="chronicle-skeleton">
					<div className="skeleton-headline" />
					<div className="skeleton-line" />
					<div className="skeleton-line" />
					<div className="skeleton-line" />
					<div className="skeleton-line" />
					<div className="skeleton-line" />
					<div className="skeleton-line" />
					<div className="skeleton-line" />
				</div>
			</div>
		);
	}

	if (!event) {
		return (
			<div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl relative z-10 text-center">
				<div className="py-24 bg-paper-light border-rough">
					<h2 className="text-3xl font-display text-ink mb-4">
						Chronicle Not Found
					</h2>
					<p className="font-body text-ink-muted text-lg italic mb-8">
						"This page of history has been lost to time..."
					</p>
					<button
						onClick={() => navigate("/explore")}
						className="inline-flex items-center gap-2 bg-ink text-gold hover:bg-gold hover:text-ink px-6 py-3 font-display uppercase tracking-widest text-sm transition-colors"
					>
						<ArrowLeft size={16} />
						Return to Archives
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 pt-24 pb-12 max-w-5xl relative z-10 chronicle-enter">
			{/* ═══════════ NEWSPAPER MASTHEAD ═══════════ */}
			<div className="newspaper-masthead">
				<h2 className="masthead-title">The Daily Chronicles</h2>
				<div className="masthead-subtitle">{formatDate(event)}</div>
			</div>

			{/* ═══════════ HEADLINE ═══════════ */}
			<div className="chronicle-headline">
				<h1>{event.title}</h1>
				<div className="headline-meta">
					<span className="meta-divider" />
					<span className="font-display text-xs uppercase tracking-[0.2em] text-gold-dipped">
						{event.category}
					</span>
					<span>•</span>
					<span className="font-body italic text-ink-muted">{event.year}</span>
					<span className="meta-divider" />
				</div>
			</div>

			{/* ═══════════ MAIN CONTENT ═══════════ */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
				{/* Left column — Image + Sidebar metadata */}
				<div className="lg:col-span-4 space-y-6">
					{/* Event Image */}
					<div className="chronicle-image-frame aspect-[4/3]">
						<img src={event.imageUrl} alt={event.title} />
						<div className="image-caption">
							{event.location || event.location_name} — {event.year}
						</div>
					</div>

					{/* Metadata Sidebar */}
					<div className="chronicle-sidebar lg:border-l-0 lg:border-t-0">
						{/* Location */}
						{(event.location || event.location_name) && (
							<div className="sidebar-section">
								<div className="sidebar-label">
									<MapPin size={12} className="inline mr-1" />
									Location
								</div>
								<div className="sidebar-value">
									{event.location || event.location_name}
								</div>
							</div>
						)}

						{/* Date */}
						<div className="sidebar-section">
							<div className="sidebar-label">
								<Calendar size={12} className="inline mr-1" />
								Date Recorded
							</div>
							<div className="sidebar-value">
								{event.monthName || "Month"} {event.day}, {event.year}
							</div>
						</div>

						{/* Coordinates */}
						{event.coordinates && (
							<div className="sidebar-section">
								<div className="sidebar-label">
									<Compass size={12} className="inline mr-1" />
									Coordinates
								</div>
								<div className="sidebar-value font-body text-sm italic">
									{event.coordinates.lat.toFixed(4)}°N,{" "}
									{event.coordinates.lng.toFixed(4)}°E
								</div>
							</div>
						)}

						{/* Tags */}
						{event.tags && event.tags.length > 0 && (
							<div className="sidebar-section">
								<div className="sidebar-label">
									<Tag size={12} className="inline mr-1" />
									Classification
								</div>
								<div className="chronicle-tags">
									{event.tags.map((tag) => (
										<span key={tag} className="tag">
											{tag}
										</span>
									))}
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Right column — Article text */}
				<div className="lg:col-span-8">
					{/* Original summary */}
					<p className="font-body text-ink text-lg font-bold leading-relaxed mb-4 border-b border-gold-dipped pb-4">
						{event.short_summary || event.description}
					</p>

					{articleLoading ? (
						<div className="chronicle-skeleton">
							<div className="skeleton-line" />
							<div className="skeleton-line" />
							<div className="skeleton-line" />
							<div className="skeleton-line" />
							<div className="skeleton-line" />
							<div className="skeleton-line" />
							<div className="skeleton-line" />
							<div className="skeleton-line" />
							<div className="skeleton-line" />
							<div className="skeleton-line" />
						</div>
					) : (
						<>
							{/* Article body in newspaper columns */}
							<div className="newspaper-columns article-dropcap">
								{article.split("\n\n").map((paragraph, i) => (
									<p key={i} className="mb-4">
										{paragraph}
									</p>
								))}
							</div>

							{/* AI Insight Pull-Quote */}
							{event.ai_insight && (
								<>
									<div className="newspaper-divider">
										<span className="divider-ornament">✦</span>
									</div>
									<div className="pull-quote">
										<p>{event.ai_insight}</p>
										<div className="quote-attribution">
											— The Daily Chronicles, Editorial Insight
										</div>
									</div>
								</>
							)}
						</>
					)}
				</div>
			</div>

			{/* ═══════════ FOOTER NAVIGATION ═══════════ */}
			<div className="chronicle-footer">
				<button onClick={() => navigate(-1)}>
					<ArrowLeft size={14} />
					Return to Archives
				</button>
				<button
					onClick={() => navigate(`/map?event=${event.id}`)}
				>
					<MapPin size={14} />
					Locate on Map
				</button>
			</div>
		</div>
	);
}
