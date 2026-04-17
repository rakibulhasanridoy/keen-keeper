import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './layouts/Layout';
import AppRoutes from './routes/index';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;