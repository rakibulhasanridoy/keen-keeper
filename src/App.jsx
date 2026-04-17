import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {/*  other page content  */}
    </BrowserRouter>
  );
}

export default App;