import PageLayout from '../../components/PageLayout';
import UserInfoCard from './components/UserInfoCard';
import PlaysSection, { Play } from './components/PlaysSection';
import FeedbacksSection, { Feedback } from './components/FeedbackSection';

const dummyPlays: Play[] = [
  { id: 1, title: 'Live Forever' },
  { id: 2, title: 'Supersonic' },
  { id: 3, title: 'Whatever' },
];

const dummyFeedbacks: Feedback[] = [
  { id: 1, title: 'Live Forever', score: 75 },
  { id: 2, title: 'Supersonic', score: 85 },
  { id: 3, title: 'Whatever', score: 75 },
];

export default function MyPage() {
  return (
    <PageLayout title="My Page">
      <div className="mt-8 space-y-8">
        <UserInfoCard name="User" />
        <PlaysSection plays={dummyPlays} />
        <FeedbacksSection feedbacks={dummyFeedbacks} />
      </div>
    </PageLayout>
  );
}
