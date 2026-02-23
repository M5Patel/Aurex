import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Twitter, Linkedin } from 'lucide-react';
import logo from '../../assets/image.png';
const footerColumns = [
  { title: 'DISCOVER AUREX', links: ['About Us', 'Sustainability', 'Careers', 'Blog'] },
  { title: 'USEFUL LINKS', links: ['Track Order', 'Warranty', 'Contact', 'FAQs'] },
  { title: 'POLICIES', links: ['Privacy', 'Terms', 'Shipping', 'Returns'] },
];

const socialIcons = [{ icon: Instagram }, { icon: Facebook }, { icon: Youtube }, { icon: Twitter }, { icon: Linkedin }];

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-luxury-black">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold tracking-widest mb-6">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => <li key={link}><Link to="#" className="text-sm text-gray-600 hover:text-luxury-gold">{link}</Link></li>)}
              </ul>
            </div>
          ))}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5">
             <img src={logo} alt="Aurex Logo" className="h-14 w-auto" />
            </Link>
            <div className="flex gap-4">
              {socialIcons.map(({ icon: Icon }) => <a key={Icon.name} href="#" className="text-gray-600 hover:text-luxury-gold"><Icon className="w-5 h-5" /></a>)}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-gray-600">
          © 2026 Aurex® - A brand by Style Feathers®
        </div>
      </div>
    </footer>
  );
}
