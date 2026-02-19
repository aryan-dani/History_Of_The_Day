import React from 'react';

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.error('Error caught by boundary:', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="min-h-screen flex items-center justify-center bg-paper p-8">
					<div className="vintage-card max-w-2xl text-center p-8 border-rough">
						<h1 className="text-4xl font-display text-ink mb-4 uppercase tracking-widest">
							Chronicle Unavailable
						</h1>
						<div className="w-16 h-1 bg-gold mx-auto mb-6"></div>
						<p className="font-body text-ink-muted text-lg mb-8 italic">
							"The archives have encountered an unexpected error.
							Please refresh the page to try again."
						</p>
						<button
							onClick={() => window.location.reload()}
							className="px-8 py-4 bg-ink text-gold font-display uppercase tracking-widest border-2 border-transparent hover:border-gold transition-all"
						>
							Reload Archives
						</button>
					</div>
				</div>
			);
		}
		return this.props.children;
	}
}
