import { Link } from 'react-router-dom';
export default function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/community">Community</Link>
      <Link to="/feedback">Feedback</Link>
      <Link to="/myPage">MyPage</Link>
    </nav>
  );
}
