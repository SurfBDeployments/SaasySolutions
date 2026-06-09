import Link from 'next/link';
import React from 'react';

const NavBar = (): React.JSX.Element => {
	return (
		<div>
			<nav className="navbar navbar-expand-lg">
				<div className="container-fluid">
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link className="nav-link" href="/news">
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" href="/news/entertainment">
									Entertainment
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" href="/news/technology">
									Technology
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" href="/news/sports">
									Sports
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" href="/news/business">
									Business
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" href="/news/health">
									Health
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" href="/news/science">
									Science
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default NavBar;