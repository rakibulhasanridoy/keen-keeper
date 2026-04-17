import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="text-8xl font-extrabold text-[#2d6a4f] mb-4">404</p>
      <h1 className="text-2xl font-bold text-[#1a2e1e] mb-2">Page Not Found</h1>
      <p className="text-[#6b856f] mb-8">Looks like this friendship doesn't exist… yet.</p>
      <Link
        to="/"
        className="bg-[#2d6a4f] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#245a41] transition-colors"
      >
        ← Go Home
      </Link>
    </div>
  );
}
