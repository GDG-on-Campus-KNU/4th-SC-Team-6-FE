import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import AppRouter from './routes/Routers';
import Header from './components/Header';

function App() {
  return (
    <div className="relative h-[852px] w-[393px] overflow-hidden bg-gradient-to-b from-[rgba(129,216,207,0.3)] via-[#81D8CF] to-[rgba(129,216,207,0.4)]">
      {/* 배경 요소 */}
      <div className="-z-10">
        <div className="absolute left-[30px] top-[141px] h-[339px] w-[334px]"></div>
        <div className="absolute left-[30px] top-[160.11px] h-[319.89px] w-[321.83px] bg-gradient-to-b from-[#81D8CF] to-[rgba(4,125,230,0.46)] blur-[100px]"></div>
        <div className="absolute left-[128.51px] top-[141px] h-[234.06px] w-[235.49px] bg-gradient-to-b from-[#81D8CF] to-[#7061A3] blur-[50px]"></div>
      </div>

      <BrowserRouter>
        <Header />
        <Navigation />
        <AppRouter className="z-40" />
      </BrowserRouter>
    </div>
  );
}

export default App;
