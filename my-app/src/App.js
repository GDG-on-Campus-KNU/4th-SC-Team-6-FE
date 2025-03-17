import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import AppRouter from './routes/Routers';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
      <Navigation />
    </BrowserRouter>
  );
}

export default App;
