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
import { Paths } from '../utils/routeConstants';
import { ErrorPage } from '../pages/ErrorPage';

export function Router(
  { isLogged,
    onLogin,
    onRegister,
  }: RouterProps,
) {
  return (
    <Routes>
      <Route path={Paths.HOME} element={<Landing />} />
      <Route
        path={Paths.AUTH}
        element={
          isLogged
            ? (<Navigate to={Paths.GAME} />)
            : (<Authorization onLogin={onLogin} />)
        }
      />
      <Route
        path={Paths.REGISTER}
        element={
          isLogged
            ? (<Navigate to={Paths.GAME} />)
            : (<Registration onRegister={onRegister} />)
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route path={Paths.FORUM}>
          <Route index element={<Forum />} />
          <Route path={Paths.TOPICLIST} element={<TopicList />} />
          <Route path={Paths.TOPIC} element={<Messages />} />
        </Route>
        <Route path={Paths.GAME} element={<GamePage />} />
        <Route path={Paths.PROFILE} element={<Profile />} />
        <Route path={Paths.LEADERBOARD} element={<Leaderboard />} />
      </Route>
      <Route element={<ErrorPage />} />
    </Routes>
  );
}
