import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { mapService } from '../services/mapService';
import SiteCard from '../components/map/SiteCard';
import MapView from '../components/map/MapView';
import MarkerInfo from '../components/map/MarkerInfo';

export default function MapPage() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const eventId = searchParams.get('event');

	const [sites, setSites] = useState([]);
	const [selectedSite, setSelectedSite] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [activeFilter, setActiveFilter] = useState('All');

	// Load sites from service
	useEffect(() => {
		mapService.getAllLocations().then(setSites);
	}, []);

	// Handle URL-based selection
	useEffect(() => {
		if (eventId && sites.length > 0) {
			const site = sites.find(s => s.id === eventId);
			if (site) setSelectedSite(site);
		}
	}, [eventId, sites]);

	// Get unique categories for filter pills
	const categories = ['All', ...new Set(sites.map(s => s.category).filter(Boolean))];

	// Filter sites based on search and category
	const filteredSites = sites.filter(site => {
		const matchesSearch = site.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			site.description?.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesFilter = activeFilter === 'All' || site.category === activeFilter;
		return matchesSearch && matchesFilter;
	});

	const handleSiteSelect = (site) => {
		setSelectedSite(site);
	};

	const handleCloseDetails = () => {
		setSelectedSite(null);
		navigate('/map');
	};

	return (
		<div className="h-[calc(100vh-24px)] flex overflow-hidden">
			{/* Sidebar */}
			<div className="w-80 lg:w-96 bg-ink flex flex-col border-r-4 border-gold-dipped shrink-0">
				{/* Sidebar Header */}
				<div className="p-4 border-b border-gold-dipped">
					<h2 className="text-gold font-display text-xl tracking-widest uppercase text-center mb-4">
						Historical Sites
					</h2>

					{/* Search Input */}
					<div className="relative">
						<input
							type="text"
							placeholder="Search chronicles..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full bg-ink-light border border-gold-dipped text-paper placeholder-gold-muted px-4 py-2 font-body focus:outline-none focus:border-gold transition-colors"
						/>
						<svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					</div>

					{/* Filter Pills */}
					<div className="flex flex-wrap gap-2 mt-4">
						{categories.slice(0, 5).map(category => (
							<button
								key={category}
								onClick={() => setActiveFilter(category)}
								className={`px-3 py-1 text-xs font-display uppercase tracking-wider border transition-all
									${activeFilter === category
										? 'bg-gold text-ink border-gold'
										: 'bg-transparent text-gold border-gold-dipped hover:border-gold'
									}`}
							>
								{category}
							</button>
						))}
					</div>
				</div>

				{/* Sites List */}
				<div className="flex-1 overflow-y-auto custom-scrollbar">
					{filteredSites.length === 0 ? (
						<div className="p-6 text-center text-gold-muted font-body italic">
							No records found in the archive.
						</div>
					) : (
						filteredSites.map(site => (
							<SiteCard
								key={site.id}
								site={site}
								isActive={selectedSite?.id === site.id}
								onClick={() => handleSiteSelect(site)}
							/>
						))
					)}
				</div>

				{/* Sidebar Footer */}
				<div className="p-4 bg-ink border-t border-gold-dipped text-center">
					<button
						onClick={() => navigate('/explore')}
						className="text-gold hover:text-paper font-display uppercase tracking-widest text-sm transition-colors"
					>
						← Return to Timeline
					</button>
				</div>
			</div>

			{/* Map Area */}
			<div className="flex-1 relative bg-ink-light">
				<MapView
					sites={filteredSites}
					selectedId={selectedSite?.id}
					onSelect={handleSiteSelect}
				/>

				{/* Details Card Overlay */}
				{selectedSite && (
					<MarkerInfo
						site={selectedSite}
						onClose={handleCloseDetails}
					/>
				)}
			</div>
		</div>
	);
}
