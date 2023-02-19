import { Route, Routes } from 'react-router-dom';
import { Authorization } from '../pages/Authorization';
import { Forum } from '../pages/forum';
import { TopicList } from '../pages/forum/topicList';
import { Landing } from '../pages/landing';
import { Leaderboard } from '../pages/leaderboard';
import Profile from '../pages/profile';
import { Registration } from '../pages/Registration';
import { GamePage } from '../pages/GamePage';
import { StringObject } from '../api/typings';

export function Router(
  { onLogin }: { onLogin: (userData: StringObject) => void },
) {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/authorization"
        element={<Authorization onLogin={onLogin} />}
      />
      <Route path="/forum">
        <Route index element={<Forum />} />
        <Route path="/forum/topicList/:id" element={<TopicList />} />
      </Route>
      <Route path="/game" element={<GamePage />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  );
}
