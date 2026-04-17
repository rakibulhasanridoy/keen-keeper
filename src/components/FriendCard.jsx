import { useNavigate } from 'react-router-dom';

function getBadgeClass(status) {
  if (status === 'overdue') return 'badge-overdue';
  if (status === 'almost due') return 'badge-almost-due';
  return 'badge-on-track';
}

function getBadgeLabel(status) {
  if (status === 'overdue') return 'Overdue';
  if (status === 'almost due') return 'Almost Due';
  return 'On-Track';
}

export default function FriendCard({ friend }) {
  const navigate = useNavigate();

  return (
    <div
      className="friend-card bg-white rounded-2xl border border-[#e8eeea] p-5 flex flex-col items-center gap-2 cursor-pointer"
      onClick={() => navigate(`/friend/${friend.id}`)}
    >
      <img
        src={friend.picture}
        alt={friend.name}
        className="w-16 h-16 rounded-full object-cover border-2 border-[#d4e8d8]"
      />
      <p className="font-bold text-[#1a2e1e] text-sm text-center">{friend.name}</p>
      <p className="text-xs text-[#8a9e8f]">{friend.days_since_contact}d ago</p>

      <div className="flex flex-wrap gap-1 justify-center">
        {friend.tags.map(tag => (
          <span key={tag} className="badge-tag rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase">
            {tag}
          </span>
        ))}
      </div>

      <span className={`${getBadgeClass(friend.status)} rounded-full px-3 py-0.5 text-[11px] font-bold`}>
        {getBadgeLabel(friend.status)}
      </span>
    </div>
  );
}
