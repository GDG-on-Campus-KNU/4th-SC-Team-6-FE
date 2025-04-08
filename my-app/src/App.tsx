import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';

import Header from './components/Header';
import AppRouter from './routes/Routers';

function App() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[rgba(129,216,207,0.3)] via-[#81D8CF] to-[rgba(129,216,207,0.4)]">
      {/* gradient blur 1 */}
      <div className="absolute top-[160.11px] left-[30px] h-[319.89px] w-[321.83px] bg-gradient-to-b from-[#81D8CF] to-[rgba(4,125,230,0.46)] blur-[100px]"></div>
      <div className="absolute top-[141px] left-[128.51px] h-[234.06px] w-[235.49px] bg-gradient-to-b from-[#81D8CF] to-[#7061A3] blur-[50px]"></div>

      {/* gradient blur 2 */}
      <div className="absolute top-[50vh] left-[65vw] h-[234.06px] w-[235.49px] bg-gradient-to-b from-[#81D8CF] to-[#7061A3] blur-[75px]"></div>
      <BrowserRouter>
        <Header />
        <Navigation />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
