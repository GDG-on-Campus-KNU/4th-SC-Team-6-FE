import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Community from '../pages/community';
import Feedback from '../pages/feedback';
import MyPage from '../pages/myPage';
import AboutUs from '../pages/aboutUs';



export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/community" element={<Community />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/myPage" element={<MyPage />} />
      <Route path="/aboutUs" element={<AboutUs />} />
    </Routes>
  );
}
