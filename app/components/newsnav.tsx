'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const NavBar = (): React.JSX.Element => {
	const pathname = usePathname();

	const isActive = (href: string): boolean => {
		return pathname === href || pathname.startsWith(href + '/');
	};

	const navLinks = [

		{ href: '/news/entertainment', label: 'Entertainment' },
		{ href: '/news/technology', label: 'Technology' },
		{ href: '/news/sports', label: 'Sports' },
		{ href: '/news/business', label: 'Business' },
		{ href: '/news/health', label: 'Health' },
		{ href: '/news/science', label: 'Science' },
	];

	return (
		<div>
			<nav className="navbar navbar-expand-lg">
				<div className="container-fluid">

					<div id="navbarNav">
						<ul className="navbar-nav">
							{navLinks.map((link) => (
								<li key={link.href} className="nav-item">
									<Link
										className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
										href={link.href}
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default NavBar;