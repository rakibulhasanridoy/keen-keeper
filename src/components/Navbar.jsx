  import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
    import { Home, Clock, BarChart2, Menu, X } from 'lucide-react';
    const links = [
   { to: '/', label: 'Home', Icon: Home },
  { to: '/timeline', label: 'Timeline', Icon: Clock },
      { to: '/stats', label: 'Stats', Icon: BarChart2 },
];
  export default function Navbar() {
    const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  function isActive(to) {
    if (to === '/') return pathname === '/';
    return pathname.startsWith(to);
  }
  function linkClass(to) {
    const base = 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors';
    if (isActive(to)) return `${base} bg-[#2d6a4f] text-white`;
    return `${base} text-[#4a5e4e] hover:bg-[#f0f7f2]`;
  }
    return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e8eeea]">
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <Link to="/" className="flex items-center select-none">
          <span className="text-xl font-black text-[#1a2e1e] tracking-tight">
              Keen<span className="font-light">Keeper</span>
          </span>
            </Link>
          <div className="hidden md:flex items-center gap-1">
          {links.map(({ to, label, Icon }) => (
              <Link key={to} to={to} className={linkClass(to)}>
              <Icon size={15} />
                {label}
              </Link>
            ))}
          </div>
             <button
          className="md:hidden text-[#2d6a4f]"
           onClick={() => setMenuOpen(prev => !prev)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
         </button>
      </div>
        {menuOpen && (
         <div className="md:hidden bg-white border-t border-[#e8eeea] px-4 pb-4 pt-2 flex flex-col gap-1">
          {links.map(({ to, label, Icon }) => (
                 <Link
              key={to}
               to={to}
              onClick={() => setMenuOpen(false)}
                   className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium ${
                isActive(to) ? 'bg-[#2d6a4f] text-white' : 'text-[#4a5e4e] hover:bg-[#f0f7f2]'
                 }`}
            >
                 <Icon size={16} />
              {label}
                 </Link>
          ))}
        </div>
           )}
    </nav>
  );
}