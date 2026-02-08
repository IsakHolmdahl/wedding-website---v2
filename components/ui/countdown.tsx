"use client";
import { useEffect, useState } from "react";

interface CountdownProps {
  className?: string;
}

const Countdown = ({ className }: CountdownProps) => {
  const [timeRemaining, setTimeRemaining] = useState(0);

  const formatTime = (time: number) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return (
      <div className={className}>
        <div className="hidden md:grid grid-cols-4 gap-10 text-2xl">
          <div className="grid grid-cols-3">
            <h2 className="text-center">{days}</h2>
            <h2 className="col-span-2">Dagar</h2>
          </div>
          <div className="grid grid-cols-3">
            <h2 className="text-center">{hours}</h2>
            <h2 className="col-span-2">Timmar</h2>
          </div>
          <div className="grid grid-cols-3">
            <h2 className="text-center">{minutes}</h2>
            <h2 className="col-span-2">Minuter</h2>
          </div>
          <div className="grid grid-cols-3">
            <h2 className="text-center">{seconds}</h2>
            <h2 className="col-span-2">Sekunder</h2>
          </div>
        </div>
        <div className="text-center md:hidden grid grid-cols-2 gap-2 text-2xl text-black gap-y-10">
          <h2>{days} dagar</h2>
          <h2>{hours} timmar</h2>
          <h2>{minutes} minuter</h2>
          <h2>{seconds} sekunder</h2>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const targetTime = new Date("2026-08-08T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;
      setTimeRemaining(difference > 0 ? difference : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  return formatTime(timeRemaining);
};

export default Countdown;
