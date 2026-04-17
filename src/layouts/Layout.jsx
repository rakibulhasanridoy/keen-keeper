  import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
    import { Toaster } from 'react-hot-toast'; 

  export default function Layout({ children }) {
     return (
    <div className="min-h-screen flex flex-col bg-[#f4f7f4]">
      <Navbar />
        <main className="flex-1 pt-14">
        {children}
      </main>
         <Footer />
      <Toaster position="top-right" /> 
    </div>
  );
}