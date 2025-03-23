import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import AppRouter from './routes/Routers';
import Header from './components/Header';

//test

import PlayButton from './components/PlayButton';
import WearableButton from './components/WearableButton';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
      <Navigation />
      <PlayButton to="/"></PlayButton>

      <WearableButton />
    </BrowserRouter>
  );
}

export default App;
