import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Community from '../pages/Community';
import Feedback from '../pages/Feedback';
import MyPage from '../pages/MyPage';
import AboutUs from '../pages/AboutUS';

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/community"
        element={<Community />}
      />
      <Route
        path="/feedback"
        element={<Feedback />}
      />
      <Route
        path="/myPage"
        element={<MyPage />}
      />
      <Route
        path="/aboutUs"
        element={<AboutUs />}
      />
    </Routes>
  );
}
