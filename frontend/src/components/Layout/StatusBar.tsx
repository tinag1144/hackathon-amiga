import React, { useState, useEffect } from 'react';
import { Wifi, Signal, Battery } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const [time, setTime] = useState('05:53');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#FAF9F5] text-[#073b4c] px-6 pt-3 pb-1 flex justify-between items-center text-[11px] font-bold tracking-tight select-none border-b border-[#073b4c]/5 z-40">
      <span>{time}</span>
      
      {/* Notch / Dynamic Island simulation */}
      <div className="w-24 h-4 bg-[#073b4c] rounded-full mx-auto flex items-center justify-end px-2 gap-1.5 shadow-sm">
        <div className="w-1.5 h-1.5 rounded-full bg-[#118ab2]/60 animate-pulse" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#073b4c] border border-white/20" />
      </div>

      <div className="flex items-center gap-1.5 text-[#073b4c]/80">
        <Signal className="w-3 h-3" />
        <Wifi className="w-3 h-3" />
        <div className="flex items-center gap-1">
          <span className="text-[10px]">98%</span>
          <Battery className="w-3.5 h-3.5 text-[#06d6a0] fill-[#06d6a0]" />
        </div>
      </div>
    </div>
  );
};
