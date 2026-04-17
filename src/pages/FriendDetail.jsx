import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  Bell, Archive, Trash2,
  ArrowLeft, Pencil, Check, X
} from 'lucide-react';
import friendsData from '../data/friends.json';
import { useTimeline } from '../context/TimelineContext';
import callImg from '../assets/call.png';
import textImg from '../assets/text.png';
import videoImg from '../assets/video.png';

function statusBadgeClass(s) {
  if (s === 'overdue') return 'badge-overdue';
  if (s === 'almost due') return 'badge-almost-due';
  return 'badge-on-track';
}

function statusBadgeLabel(s) {
  if (s === 'overdue') return 'Overdue';
  if (s === 'almost due') return 'Almost Due';
  return 'On-Track';
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function FriendDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addEntry } = useTimeline();

  const friend = friendsData.find(f => f.id === Number(id));

  const [goal, setGoal] = useState(friend?.goal ?? 30);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(goal);

  if (!friend) {
    return (
      <div className="text-center py-24 text-[#6b856f]">
        <p className="text-2xl font-bold mb-4">Friend not found</p>
        <button onClick={() => navigate('/')} className="text-[#2d6a4f] underline">
          ← Back home
        </button>
      </div>
    );
  }

  function handleCheckin(type) {
    addEntry(type, friend.name);
    toast.success(`${type} with ${friend.name} logged! ✅`, {
      style: { borderRadius: '10px', background: '#1e3a2a', color: '#fff' },
    });
  }

  function saveGoal() {
    setGoal(Number(draft));
    setEditing(false);
  }

  const toastDark = (msg) => toast(msg, { style: { background: '#1e3a2a', color: '#fff' } });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-[#2d6a4f] font-semibold mb-8 hover:underline"
      >
        <ArrowLeft size={16} /> Back to Friends
      </button>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5">

        {/* Left column — profile + actions */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-[#e8eeea] p-6 text-center shadow-sm">
            <img
              src={friend.picture}
              alt={friend.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-[#d4e8d8] mx-auto mb-3"
            />
            <p className="font-extrabold text-lg text-[#1a2e1e] mb-2">{friend.name}</p>

            <div className="flex justify-center gap-2 flex-wrap mb-3">
              <span className={`${statusBadgeClass(friend.status)} rounded-full px-3 py-0.5 text-xs font-bold`}>
                {statusBadgeLabel(friend.status)}
              </span>
              {friend.tags.map(t => (
                <span key={t} className="badge-tag rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase">
                  {t}
                </span>
              ))}
            </div>

            <p className="text-sm text-[#5a7060] italic mb-2">"{friend.bio}"</p>
            <p className="text-xs text-[#8a9e8f]">📧 {friend.email}</p>
          </div>

          <button
            onClick={() => toastDark('Snoozed for 2 weeks 😴')}
            className="bg-white border border-[#e8eeea] rounded-xl px-5 py-3.5 flex items-center justify-center gap-2 text-sm font-semibold text-[#1a2e1e] hover:bg-[#f7faf8] transition-colors shadow-sm"
          >
            <Bell size={16} /> Snooze 2 Weeks
          </button>

          <button
            onClick={() => toastDark('Archived 📦')}
            className="bg-white border border-[#e8eeea] rounded-xl px-5 py-3.5 flex items-center justify-center gap-2 text-sm font-semibold text-[#1a2e1e] hover:bg-[#f7faf8] transition-colors shadow-sm"
          >
            <Archive size={16} /> Archive
          </button>

          <button
            onClick={() => toast.error('Deleted 🗑️')}
            className="bg-white border border-[#e8eeea] rounded-xl px-5 py-3.5 flex items-center justify-center gap-2 text-sm font-semibold text-red-600 hover:bg-[#f7faf8] transition-colors shadow-sm"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">

          {/* Quick stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-[#e8eeea] p-5 text-center shadow-sm">
              <p className="font-extrabold text-4xl text-[#1a2e1e]">{friend.days_since_contact}</p>
              <p className="text-xs text-[#8a9e8f] mt-1">Days Since Contact</p>
            </div>
            <div className="bg-white rounded-2xl border border-[#e8eeea] p-5 text-center shadow-sm">
              <p className="font-extrabold text-4xl text-[#1a2e1e]">{goal}</p>
              <p className="text-xs text-[#8a9e8f] mt-1">Goal (Days)</p>
            </div>
            <div className="bg-white rounded-2xl border border-[#e8eeea] p-5 text-center shadow-sm">
              <p className="font-extrabold text-lg text-[#1a2e1e]">{formatDate(friend.next_due_date)}</p>
              <p className="text-xs text-[#8a9e8f] mt-1">Next Due</p>
            </div>
          </div>

          {/* Goal editor */}
          <div className="bg-white rounded-2xl border border-[#e8eeea] p-6 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <p className="font-bold text-[#1a2e1e]">Relationship Goal</p>

              {editing ? (
                <div className="flex gap-2">
                  <button onClick={saveGoal} className="p-1.5 rounded-lg bg-[#2d6a4f] text-white">
                    <Check size={14} />
                  </button>
                  <button onClick={() => setEditing(false)} className="p-1.5 rounded-lg border border-[#e8eeea]">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setDraft(goal); setEditing(true); }}
                  className="flex items-center gap-1 text-xs font-semibold border border-[#d4e8d8] px-3 py-1.5 rounded-lg hover:bg-[#f0f7f2] transition-colors"
                >
                  <Pencil size={12} /> Edit
                </button>
              )}
            </div>

            {editing ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#4a5e4e]">Connect every</span>
                <input
                  type="number"
                  min={1}
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  className="w-20 border border-[#d4e8d8] rounded-lg px-2 py-1 text-sm font-bold text-center outline-none focus:border-[#2d6a4f]"
                />
                <span className="text-sm text-[#4a5e4e]">days</span>
              </div>
            ) : (
              <p className="text-sm text-[#4a5e4e]">
                Connect every <strong className="text-[#1a2e1e]">{goal} days</strong>
              </p>
            )}
          </div>

          {/* Check-in buttons */}
          <div className="bg-white rounded-2xl border border-[#e8eeea] p-6 shadow-sm">
            <p className="font-bold text-[#1a2e1e] mb-4">Quick Check-In</p>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleCheckin('Call')}
                className="border border-[#e0ece4] rounded-xl py-5 flex flex-col items-center gap-2 hover:bg-[#f0f7f2] hover:border-[#a5d6a7] transition-colors"
              >
                <img src={callImg} alt="Call" className="w-7 h-7 object-contain" />
                <span className="text-sm font-semibold text-[#2d4a32]">Call</span>
              </button>
              <button
                onClick={() => handleCheckin('Text')}
                className="border border-[#e0ece4] rounded-xl py-5 flex flex-col items-center gap-2 hover:bg-[#f0f7f2] hover:border-[#a5d6a7] transition-colors"
              >
                <img src={textImg} alt="Text" className="w-7 h-7 object-contain" />
                <span className="text-sm font-semibold text-[#2d4a32]">Text</span>
              </button>
              <button
                onClick={() => handleCheckin('Video')}
                className="border border-[#e0ece4] rounded-xl py-5 flex flex-col items-center gap-2 hover:bg-[#f0f7f2] hover:border-[#a5d6a7] transition-colors"
              >
                <img src={videoImg} alt="Video" className="w-7 h-7 object-contain" />
                <span className="text-sm font-semibold text-[#2d4a32]">Video</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
