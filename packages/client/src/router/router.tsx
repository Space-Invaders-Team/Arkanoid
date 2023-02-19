import { Route, Routes } from 'react-router-dom';
import { Authorization } from '../pages/Authorization';
import { Forum } from '../pages/forum';
import { TopicList } from '../pages/forum/topicList';
import { Landing } from '../pages/landing';
import { Leaderboard } from '../pages/leaderboard';
// import { Profile } from '../pages/Profile';
import { Registration } from '../pages/Registration';
import { GamePage } from '../pages/GamePage';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/authorization" element={<Authorization />} />
      <Route path="/forum">
        <Route index element={<Forum />} />
        <Route path="/forum/topicList/:id" element={<TopicList />} />
      </Route>
      <Route path="/game" element={<GamePage />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  );
}
