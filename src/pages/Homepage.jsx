 import { useTimeline } from '../context/TimelineContext';
import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
 import FriendCard from '../components/FriendCard';
  import friendsData from '../data/friends.json';






function StatCard({ value, label }) {
  return (
  <div className="bg-white rounded-2xl border border-[#e8eeea] p-5 text-center shadow-sm">
       <p className="text-4xl font-extrabold text-[#1a2e1e]">{value}</p>
      <p className="text-sm text-[#8a9e8f] mt-1">{label}</p>
     </div>
  );
}
export default function Homepage() {
  const [friends, setFriends] = useState([]);
   const [loading, setLoading] = useState(true);
  useEffect(() => {
      const t = setTimeout(() => {
      setFriends(friendsData);
      setLoading(false);
    }, 900);
    return () => clearTimeout(t);
  }, []);
  const total = friends.length;
  const onTrack = friends.filter(f => f.status === 'on-track').length;
const needAttn = friends.filter(f => f.status !== 'on-track').length;
  const { timeline } = useTimeline();
const now = new Date();
const interactions = timeline.filter(entry => {
  const d = new Date(entry.date);
  return (
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear() &&
    ['Call', 'Text', 'Video'].includes(entry.type)
  );
}).length;
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
      <div className="text-center py-14 md:py-20">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a2e1e] mb-3 tracking-tight">
          Friends to keep close in your life
        </h1>
        <p className="text-[#6b856f] text-base md:text-lg max-w-xl mx-auto mb-8">
          Your personal shelf of meaningful connections. Browse, tend, and nurture
          the relationships that matter most.
        </p>
        <button className="inline-flex items-center gap-2 bg-[#2d6a4f] hover:bg-[#245a41] text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-md">
          <Plus size={18} />
          Add a Friend
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="spinner" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <StatCard value={total} label="Total Friends" />
            <StatCard value={onTrack} label="On Track" />
            <StatCard value={needAttn} label="Need Attention" />
            <StatCard value={interactions} label="Interactions This Month" />
          </div>

          <h2 className="text-xl font-bold text-[#1a2e1e] mb-5">Your Friends</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {friends.map(friend => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
