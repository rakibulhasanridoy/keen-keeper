 import { useState } from 'react';
import { Phone, MessageSquare, Video, Users, ChevronDown, Trash2 } from 'lucide-react';
import { useTimeline } from '../context/TimelineContext';
 const typeConfig = {
  Call:   { Icon: Phone,         color: 'text-slate-600', bg: 'bg-slate-100' },
  Text:   { Icon: MessageSquare, color: 'text-slate-600', bg: 'bg-slate-100' },
  Video:  { Icon: Video,         color: 'text-slate-600', bg: 'bg-slate-100' },
  Meetup: { Icon: Users,         color: 'text-amber-600', bg: 'bg-amber-50'  },
};




function formatEntryDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });
}
export default function Timeline() {
   const { timeline, removeEntry } = useTimeline();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered = timeline.filter(entry => {
     const matchesType = activeFilter === 'All' || entry.type === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery.trim() ||
        entry.friendName.toLowerCase().includes(q) ||
      entry.type.toLowerCase().includes(q) ||
      formatEntryDate(entry.date).toLowerCase().includes(q);
      return matchesType && matchesSearch;
  });




  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-extrabold text-[#1a2e1e] mb-6">Timeline</h1>
      <div className="mb-8">
        



        <div className="flex gap-2">
          {['All', 'Call', 'Text', 'Video'].map(type => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                activeFilter === type
                  ? 'bg-[#2d6a4f] text-white border-[#2d6a4f]'
                  : 'bg-white text-[#4a5e4e] border-[#d4e8d8] hover:bg-[#f0f7f2]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {timeline.length === 0 && (
        <p className="text-center text-[#8a9e8f] py-16">No entries yet.</p>
        )}
        {timeline.length > 0 && filtered.length === 0 && (
        <p className="text-center text-[#8a9e8f] py-16">No matching entries found.</p>
        )}
        {filtered.map(entry => {
          const cfg = typeConfig[entry.type] || typeConfig.Call;
          return (
            <div
              key={entry.id}
              className="group bg-white border border-[#e8eeea] rounded-xl px-5 py-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-10 h-10 rounded-full ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
                <cfg.Icon size={18} className={cfg.color} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-[#1a2e1e]">
                  <strong>{entry.type}</strong>
                <span className="text-[#6b856f]"> with {entry.friendName}</span>
                </p>
              <p className="text-xs text-[#8a9e8f] mt-0.5">{formatEntryDate(entry.date)}</p>
              </div>
              <button
                onClick={() => removeEntry(entry.id)}
                className="p-2 text-[#8a9e8f] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                title="Delete entry"
              >
                <Trash2 size={18} />
             </button>
          </div>
          );
        })}
      </div>
    </div>
  );
}