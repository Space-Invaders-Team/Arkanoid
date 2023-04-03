import type { RouteObject } from 'react-router-dom';
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

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        path: Paths.HOME,
        element: <Landing />,
      },
      {
        path: Paths.AUTH,
        element: <Authorization />,
      },
      {
        path: Paths.REGISTER,
        element: <Registration />,
      },
      {
        path: Paths.FORUM,
        element: (
          <ProtectedRoute>
            <Forum />
          </ProtectedRoute>
        ),
        children: [
          {
            path: Paths.TOPICLIST,
            element: <TopicList />,
          },
          {
            path: Paths.TOPIC,
            element: <Messages />,
          },
        ],
      },
      {
        path: Paths.GAME,
        element: (
          <ProtectedRoute>
            <GamePage />
          </ProtectedRoute>
        ),
      },
      {
        path: Paths.PROFILE,
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: Paths.LEADERBOARD,
        element: (
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
];
