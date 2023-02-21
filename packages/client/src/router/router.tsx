import { Route, Routes, Navigate } from 'react-router-dom';
import { Authorization } from '../pages/Authorization';
import { Forum } from '../pages/forum';
import { TopicList } from '../pages/forum/topicList';
import { Landing } from '../pages/landing';
import { Profile } from '../pages/Profile';
import { Leaderboard } from '../pages/leaderboard';
import { Registration } from '../pages/Registration';
import { GamePage } from '../pages/GamePage';
import { Messages } from '../pages/forum/Messages';
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';
import { RouterProps } from './typings';

export function Router(
  { isLogged,
    onLogin,
    onRegister,
  }: RouterProps,
) {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/authorization"
        element={
          isLogged
            ? (<Navigate to="/game" />)
            : (<Authorization onLogin={onLogin} />)
        }
      />
      <Route
        path="/registration"
        element={
          isLogged
            ? (<Navigate to="/game" />)
            : (<Registration onRegister={onRegister} />)
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route path="/forum">
          <Route index element={<Forum />} />
          <Route path="/forum/topicList/:id" element={<TopicList />} />
          <Route path="/forum/topicList/:id/topic/:id" element={<Messages />} />
        </Route>
        <Route path="/game" element={<GamePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />        
      </Route>
    </Routes>
  );
}
