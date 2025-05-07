import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Feedback from '../pages/feedback';
import FeedbackDetailPage from '../pages/feedback/DetailPage';
import MyPage from '../pages/myPage';
import AboutUs from '../pages/aboutUs';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/feedback/:id" element={<FeedbackDetailPage />} />
      <Route path="/myPage" element={<MyPage />} />
      <Route path="/aboutUs" element={<AboutUs />} />
    </Routes>
  );
}
