import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import AppRouter from './routes/Routers';
import Header from './components/Header';

//test

import PlayButton from './components/PlayButton';
import MusicCard from './components/MusicCard';
import MusicCardBig from './components/MusicCardBig';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
      <Navigation />
      <PlayButton to="/"></PlayButton>
      <MusicCard titile="Oasis - Live Fore.." to ="/"/>
      <MusicCardBig title="먼지가 되어 Cover" to="/" />

    </BrowserRouter>
  );
}

export default App;
