import React, { useEffect, useState } from 'react';
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  useEffect(() => {
    // Set the date for September 10, 2025
    const summitDate = new Date('September 10, 2025 00:00:00').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = summitDate - now;
      if (distance < 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
        minutes: Math.floor(distance % (1000 * 60 * 60) / (1000 * 60)),
        seconds: Math.floor(distance % (1000 * 60) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const timeUnits = [{
    label: 'Days',
    value: timeLeft.days
  }, {
    label: 'Hours',
    value: timeLeft.hours
  }, {
    label: 'Minutes',
    value: timeLeft.minutes
  }, {
    label: 'Seconds',
    value: timeLeft.seconds
  }];
  return <div className="flex flex-col items-center">
      <h3 className="text-amber-400 text-lg mb-4 font-semibold tracking-wider">
        Countdown to ILSA 2025
      </h3>
      <div className="flex flex-wrap justify-center gap-4">
        {timeUnits.map(unit => <div key={unit.label} className="flex flex-col items-center">
            <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-900/50 to-black/50 backdrop-blur-sm border border-blue-500/30 shadow-lg shadow-blue-500/10">
              <span className="text-3xl md:text-4xl font-bold text-white animate-pulse">
                {unit.value.toString().padStart(2, '0')}
              </span>
            </div>
            <span className="mt-2 text-xs text-white/70">{unit.label}</span>
          </div>)}
      </div>
    </div>;
};