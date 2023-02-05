import { Route, Routes } from 'react-router-dom';
import { Authorization } from '../pages/authorization/authorization';
import { Forum } from '../pages/forum/forum';
import { Game } from '../pages/game/game';
import { Landing } from '../pages/landing/landing';
import { Leaderboard } from '../pages/leaderboard/leaderboard';
import { Profile } from '../pages/profile/profile';
import { Registration } from '../pages/registration/registration';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/authorization" element={<Authorization />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/game" element={<Game />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  );
}

export default Router;
