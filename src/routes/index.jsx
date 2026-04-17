import { Routes, Route } from 'react-router-dom';

import FriendDetail from '../pages/FriendDetail';
import Timeline from '../pages/Timeline';
import Stats from '../pages/Stats';
import NotFound from '../pages/NotFound';
import Homepage from '../pages/Homepage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/friend/:id" element={<FriendDetail />} />
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
