import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { useTimeline } from '../context/TimelineContext';

const COLORS = ['#6c63ff', '#2d6a4f', '#52b788'];

export default function Stats() {
  const { timeline } = useTimeline();

  const counts = { Text: 0, Call: 0, Video: 0 };
  timeline.forEach(entry => {
    if (counts[entry.type] !== undefined) {
      counts[entry.type]++;
    }
  });






  const data = Object.entries(counts).map(([name, value]) => ({ name, value }));
  if (data.every(d => d.value === 0)) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-3xl font-extrabold text-[#1a2e1e] mb-8">Friendship Analytics</h1>
        <div className="bg-white rounded-2xl border border-[#e8eeea] p-16 shadow-sm text-center">
        <p className="text-4xl mb-4"></p>
          <p className="text-lg font-bold text-[#1a2e1e] mb-2">No data yet</p>
          <p className="text-sm text-[#8a9e8f]">Start logging calls, texts, and videos to see your stats here.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-extrabold text-[#1a2e1e] mb-8">Friendship Analytics</h1>
      <div className="bg-white rounded-2xl border border-[#e8eeea] p-6 shadow-sm mb-6">
        <p className="text-sm font-semibold text-[#4a5e4e] mb-4">By Interaction Type</p>
       <ResponsiveContainer width="100%" height={280}>
          <PieChart>
          <Pie
              data={data}
            cx="50%"
              cy="50%"
             innerRadius={80}
              outerRadius={120}
            paddingAngle={5}
              dataKey="value"
           >
             {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
             ))}
            </Pie>
          <Tooltip />
            <Legend />
         </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {data.map(({ name, value }, i) => (
        <div key={name} className="bg-white rounded-2xl border border-[#e8eeea] p-5 text-center shadow-sm">
            <div
             className="w-4 h-4 rounded-full mx-auto mb-2"
              style={{ background: COLORS[i] }}
           />
          <p className="text-3xl font-extrabold text-[#1a2e1e]">{value}</p>
            <p className="text-sm text-[#8a9e8f] mt-1">{name}s</p>
        </div>
        ))}
      </div>
    </div>
  );
}
