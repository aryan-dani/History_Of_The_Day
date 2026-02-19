import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useState, useCallback } from 'react';

// Map container styling
const containerStyle = {
	width: '100%',
	height: '100%'
};

// Center on India
const defaultCenter = {
	lat: 20.5937,
	lng: 78.9629
};

/**
 * SVG path for the custom map marker icon.
 * Creates a pin/teardrop shape with an inner circle cutout.
 * 
 * Path breakdown:
 * - M12 0: Start at top center (12, 0)
 * - C7.03 0 3 4.03 3 9: Create the rounded top of the pin (cubic bezier)
 * - c0 6.75 9 15 9 15: Draw the pin's pointed bottom
 * - s9-8.25 9-15: Mirror the bottom point path
 * - c0-4.97-4.03-9-9-9: Complete the top curve
 * - zm0 12.75: Move to inner circle starting point
 * - c-2.07 0-3.75-1.68-3.75-3.75: Draw the inner circle (left curve, cubic bezier)
 * - S9.93 5.25 12 5.25: Smooth curve to continue inner circle (right curve)
 * - s3.75 1.68 3.75 3.75: Smooth curve to complete inner circle
 * - -1.68 3.75-3.75 3.75z: Close the inner circle path
 * 
 * Dimensions: 24x24 viewBox, pin point at (12, 24)
 */
const MARKER_PIN_PATH = 'M12 0C7.03 0 3 4.03 3 9c0 6.75 9 15 9 15s9-8.25 9-15c0-4.97-4.03-9-9-9zm0 12.75c-2.07 0-3.75-1.68-3.75-3.75S9.93 5.25 12 5.25s3.75 1.68 3.75 3.75-1.68 3.75-3.75 3.75z';

// Custom vintage map styling
const mapStyles = [
	{
		"elementType": "geometry",
		"stylers": [{ "color": "#2d2a24" }]
	},
	{
		"elementType": "labels.text.stroke",
		"stylers": [{ "color": "#1a1a1a" }]
	},
	{
		"elementType": "labels.text.fill",
		"stylers": [{ "color": "#c9a961" }]
	},
	{
		"featureType": "administrative",
		"elementType": "geometry.stroke",
		"stylers": [{ "color": "#c9a961" }, { "lightness": -30 }]
	},
	{
		"featureType": "administrative.land_parcel",
		"elementType": "labels.text.fill",
		"stylers": [{ "color": "#ae9a5e" }]
	},
	{
		"featureType": "landscape.natural",
		"elementType": "geometry",
		"stylers": [{ "color": "#3a3630" }]
	},
	{
		"featureType": "poi",
		"elementType": "geometry",
		"stylers": [{ "color": "#2d2a24" }]
	},
	{
		"featureType": "poi",
		"elementType": "labels.text.fill",
		"stylers": [{ "color": "#93817c" }]
	},
	{
		"featureType": "poi.park",
		"elementType": "geometry.fill",
		"stylers": [{ "color": "#3a3a30" }]
	},
	{
		"featureType": "road",
		"elementType": "geometry",
		"stylers": [{ "color": "#4a4640" }]
	},
	{
		"featureType": "road",
		"elementType": "geometry.stroke",
		"stylers": [{ "color": "#1a1a1a" }]
	},
	{
		"featureType": "road.highway",
		"elementType": "geometry",
		"stylers": [{ "color": "#5a5650" }]
	},
	{
		"featureType": "transit",
		"elementType": "geometry",
		"stylers": [{ "color": "#2d2a24" }]
	},
	{
		"featureType": "water",
		"elementType": "geometry",
		"stylers": [{ "color": "#1a1a1a" }]
	},
	{
		"featureType": "water",
		"elementType": "labels.text.fill",
		"stylers": [{ "color": "#515c6d" }]
	}
];

export default function MapView({ sites, selectedId, onSelect }) {
	const [hoveredSite, setHoveredSite] = useState(null);

	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

	// useJsApiLoader prevents remounting when switching tabs
	const { isLoaded, loadError } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: apiKey || ''
	});

	const onLoad = useCallback((mapInstance) => {
		// Map loaded
	}, []);

	const onUnmount = useCallback(() => {
		// Map unmounted
	}, []);

	// Custom marker icon for vintage look
	const createMarkerIcon = (isSelected) => {
		return {
			path: MARKER_PIN_PATH,
			fillColor: isSelected ? '#c9a961' : '#e8dcc4',
			fillOpacity: 1,
			strokeColor: isSelected ? '#1a1a1a' : '#8b7a3d',
			strokeWeight: isSelected ? 2 : 1,
			scale: isSelected ? 1.5 : 1.2,
			anchor: { x: 12, y: 24 },
			labelOrigin: { x: 12, y: 9 }
		};
	};

	if (!apiKey || apiKey === 'your_api_key_here') {
		return (
			<div className="w-full h-full flex items-center justify-center bg-ink-light">
				<div className="text-center p-8 bg-ink border-2 border-gold-dipped">
					<p className="text-gold font-display text-lg mb-2">Google Maps API Key Required</p>
					<p className="text-paper/70 font-body text-sm">
						Add your API key to the .env file:<br />
						<code className="text-gold/80">VITE_GOOGLE_MAPS_API_KEY=your_key</code>
					</p>
				</div>
			</div>
		);
	}

	if (loadError) {
		return (
			<div className="w-full h-full flex items-center justify-center bg-ink-light">
				<div className="text-center p-8 bg-ink border-2 border-gold-dipped">
					<p className="text-gold font-display text-lg mb-2">Error Loading Map</p>
					<p className="text-paper/70 font-body text-sm">{loadError.message}</p>
				</div>
			</div>
		);
	}

	if (!isLoaded) {
		return (
			<div className="w-full h-full flex items-center justify-center bg-ink-light">
				<div className="text-center">
					<div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
					<p className="text-gold font-display text-lg">Loading Map...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full h-full relative">
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={defaultCenter}
				zoom={5}
				onLoad={onLoad}
				onUnmount={onUnmount}
				options={{
					styles: mapStyles,
					disableDefaultUI: false,
					zoomControl: true,
					mapTypeControl: false,
					streetViewControl: false,
					fullscreenControl: true,
					gestureHandling: 'greedy'
				}}
			>
				{/* Site Markers */}
				{sites.map((site) => {
					const isSelected = site.id === selectedId;
					const isHovered = hoveredSite === site.id;

					return (
						<Marker
							key={site.id}
							position={{ lat: site.lat, lng: site.lng }}
							onClick={() => onSelect(site)}
							onMouseOver={() => setHoveredSite(site.id)}
							onMouseOut={() => setHoveredSite(null)}
							icon={createMarkerIcon(isSelected)}
							zIndex={isSelected ? 1000 : isHovered ? 500 : 1}
						/>
					);
				})}
			</GoogleMap>

			{/* Decorative Corner Frames */}
			<div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gold/30 pointer-events-none"></div>
			<div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gold/30 pointer-events-none"></div>
			<div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-gold/30 pointer-events-none"></div>
			<div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gold/30 pointer-events-none"></div>

			{/* Compass Rose */}
			<div className="absolute bottom-6 left-6 opacity-30 pointer-events-none">
				<div className="w-12 h-12 border-2 border-gold rounded-full flex items-center justify-center bg-ink/80">
					<span className="text-gold font-display text-xs">N</span>
				</div>
			</div>

			{/* Empty State */}
			{sites.length === 0 && (
				<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
					<p className="text-gold-muted font-body italic text-lg bg-ink/80 px-4 py-2">
						Loading historical sites...
					</p>
				</div>
			)}
		</div>
	);
}
