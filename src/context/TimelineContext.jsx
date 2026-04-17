import { createContext, useContext, useState } from 'react';

const TimelineContext = createContext(null);

export function TimelineProvider({ children }) {
  const [timeline, setTimeline] = useState([]);

  function addEntry(type, friendName) {
    const today = new Date().toISOString().split('T')[0];
    const newEntry = { id: Date.now(), type, friendName, date: today };
    setTimeline(prev => [newEntry, ...prev]);
  }

  function removeEntry(id) {
    setTimeline(prev => prev.filter(entry => entry.id !== id));
  }

  return (
    <TimelineContext.Provider value={{ timeline, addEntry, removeEntry }}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  return useContext(TimelineContext);
}
