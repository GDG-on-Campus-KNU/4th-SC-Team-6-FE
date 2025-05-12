import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Community from '../pages/community';
import Feedback from '../pages/feedback';
import FeedbackDetail from '../pages/feedback/DetailPage';
import MyPage from '../pages/myPage';
import AboutUs from '../pages/aboutUs';

import WritePage from '../pages/community/components/WritePage';
import CommunityDetail from '../pages/community/DetailPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/community" element={<Community />} />
      <Route path="/community/write" element={<WritePage />} />
      <Route path="/community/:id" element={<CommunityDetail />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/feedback/:id" element={<FeedbackDetail />} />
      <Route path="/myPage" element={<MyPage />} />
      <Route path="/aboutUs" element={<AboutUs />} />
    </Routes>
  );
}
