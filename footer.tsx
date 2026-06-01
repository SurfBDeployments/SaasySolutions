import Link from 'next/link';
import React from 'react';

interface FooterLink {
  id: number;
  label: string;
  href?: string;
  path?: string;
}

 const footlinks: FooterLink[] = [
  { id: 1, label: 'Home', href: '/' },
  { id: 2, label: 'Products', path: '/products' },
  { id: 3, label: 'Team', path: '/team' },
  { id: 4, label: 'Contact', path: '/contact' },
]; 

const legalitems: FooterLink[] = [
  { id: 5, label: 'Terms of Use', path: '/terms' },
  { id: 6, label: 'Privacy', path: '/privacy' },

];

const Footer = (): React.JSX.Element => {
  return (
    <footer>
      <img
        src="../socialicons.png"
        alt="Social Media"
        height="25px"
        useMap="#Map"
        style={{ height: '25px' }}
      />
      <map name="Map">
        <area shape="rect" coords="5,5,43,29" href="https://www.instagram.com" target="_blank" alt="Instagram" rel="noopener noreferrer" />
        <area shape="rect" coords="44,4,68,32" href="https://www.facebook.com" target="_blank" alt="Facebook" rel="noopener noreferrer" />
        <area shape="rect" coords="70,3,97,31" href="http://www.x.com" target="_blank" alt="X" rel="noopener noreferrer" />
        <area shape="rect" coords="100,4,134,30" href="http://www.linkedin.com" target="_blank" alt="LinkedIn" rel="noopener noreferrer" />
      </map>

      <ul>
        {legalitems.map((item: FooterLink) => (
          <li key={item.id}>
            {item.path ? (
              <Link href={item.path}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ul>
      <p className="text-sm text-gray-500 font-bold">&copy; 2026 SaaSy Solutions. All rights reserved.</p>

    </footer>
  );
};

export default Footer;