import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import AppRouter from './routes/Routers';
import Header from './components/Header';

//test

import PlayButton from './components/PlayButton';
<<<<<<< HEAD
import WearableButton from './components/WearableButton';
=======
import MusicCard from './components/MusicCard';
import MusicCardBig from './components/MusicCardBig';

>>>>>>> develop

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
      <Navigation />
      <PlayButton to="/"></PlayButton>
<<<<<<< HEAD

      <WearableButton />
=======
      <MusicCard titile="Oasis - Live Fore.." to ="/"/>
      <MusicCardBig title="먼지가 되어 Cover" to="/" />

>>>>>>> develop
    </BrowserRouter>
  );
}

export default App;
