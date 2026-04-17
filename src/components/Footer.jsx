import logoXl from '../assets/logo-xl.png';
  import instagram from '../assets/instagram.png';
import facebook from '../assets/facebook.png';
    import twitter from '../assets/twitter.png';
  const socials = [
  { src: instagram, alt: 'Instagram' },
     { src: facebook, alt: 'Facebook' },
  { src: twitter, alt: 'Twitter' },
];
  export default function Footer() {
    return (
    <footer className="bg-[#1e3a2a] text-white pt-14 pb-6 mt-16">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <img src={logoXl} alt="KeenKeeper" className="h-10 w-auto mx-auto mb-4" />
        <p className="text-[#8ab89a] text-sm mb-6">
          Your personal shelf of meaningful connections. Browse, tend, and nurture
          the relationships that matter most.
        </p>

        <p className="text-sm font-medium text-white mb-3">Social Links</p>
        <div className="flex justify-center gap-3 mb-8">
          {socials.map(({ src, alt }) => (
           <button
              key={alt}
           className="w-10 h-10 rounded-full bg-[#2d5a3d] flex items-center justify-center hover:bg-[#3a7a50]transition-colors"
            >
             <img src={src} alt={alt} className="w-5 h-5 object-contain" />
            </button>
         ))}
        </div>
      <div className="border-t border-[#2d5a3d] pt-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#5a8a6a]">
          <span>© 2026 KeenKeeper. All rights reserved.</span>
        <div className="flex gap-4">
            <button className="hover:text-white transition-colors">Privacy Policy</button>
           <button className="hover:text-white transition-colors">Terms of Service</button>
            <button className="hover:text-white transition-colors">Cookies</button>
         </div>
        </div>
     </div>
    </footer>
 );
}
