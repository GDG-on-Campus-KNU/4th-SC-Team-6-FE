import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import AppRouter from './routes/Routers';
import Header from './components/Header';

<<<<<<< HEAD
//test

import PlayButton from './components/PlayButton';
import MusicCard from './components/MusicCard';
import MusicCardBig from './components/MusicCardBig';


=======
>>>>>>> f1dfc94cc3e7c1f079860d1b131c5a50e8e5f0df
function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
      <Navigation />
<<<<<<< HEAD
      <PlayButton to="/"></PlayButton>
      <MusicCard titile="Oasis - Live Fore.." to ="/"/>
      <MusicCardBig title="먼지가 되어 Cover" to="/" />

=======
>>>>>>> f1dfc94cc3e7c1f079860d1b131c5a50e8e5f0df
    </BrowserRouter>
  );
}

export default App;
