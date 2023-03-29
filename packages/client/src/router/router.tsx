import { createRoutesFromElements, Route, Routes } from 'react-router-dom';
import { RootLayout } from '../components/RootLayout/RootLayout';
import { Paths } from '../utils/routeConstants';
import {
  Authorization,
  Forum,
  GamePage,
  Landing,
  Leaderboard,
  Profile,
  Registration,
} from '../pages';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { TopicList } from '../pages/forum/topicList';
import { Messages } from '../pages/forum/Messages';

const routes = (
  <Route element={<RootLayout />}>
    <Route path={Paths.HOME} element={<Landing />} />
    <Route path={Paths.AUTH} element={<Authorization />} />
    <Route path={Paths.REGISTER} element={<Registration />} />
    <Route
      path={Paths.FORUM}
      element={(
        <ProtectedRoute>
          <Forum />
        </ProtectedRoute>
      )}
    >
      <Route path={Paths.TOPICLIST} element={<TopicList />} />
      <Route path={Paths.TOPIC} element={<Messages />} />
    </Route>
    <Route
      path={Paths.GAME}
      element={(
        <ProtectedRoute>
          <GamePage />
        </ProtectedRoute>
      )}
    />
    <Route
      path={Paths.PROFILE}
      element={(
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      )}
    />
    <Route
      path={Paths.LEADERBOARD}
      element={(
        <ProtectedRoute>
          <Leaderboard />
        </ProtectedRoute>
      )}
    />
  </Route>
);

export const browserRoutes = createRoutesFromElements(routes);
export const serverRoutes = (
  <Routes>
    {
      routes
    }
  </Routes>
);
