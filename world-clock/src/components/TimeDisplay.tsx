import React, { useState, useEffect } from "react";
import type { TimeZone } from "../types";

interface TimeDisplayProps {
  timezone: TimeZone;
  mode: "digital" | "analog";
  // cityName?: string;
  radius?: number;
}

const AnalogClock: React.FC<{ time: Date; radius?: number }> = ({
  time,
  radius = 100,
}) => {
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();
  const center = radius;

  const hourLength = radius * 0.5;
  const minuteLength = radius * 0.7;
  const secondLength = radius * 0.8;

  const numbers = Array.from({ length: 12 }, (_, i) => i + 1);

  const marks = Array.from({ length: 60 }, (_, i) => i + 1);

  return (
    <svg
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      width={radius * 2}
      height={radius * 2}
      style={{ display: "block" }}
    >
      {/* Circle of the clock  */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="black"
        strokeWidth={2}
        fill="white"
      />

      {/* Marks of minutes and hours */}
      {marks.map((m) => {
        const angle = m * 6 * (Math.PI / 180);
        const markLength = m % 5 === 0 ? 8 : 4;
        const x1 = center + (radius - markLength) * Math.sin(angle);
        const y1 = center - (radius - markLength) * Math.cos(angle);
        const x2 = center + radius * Math.sin(angle);
        const y2 = center - radius * Math.cos(angle);
        return (
          <line
            key={m}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="black"
            strokeWidth={m % 5 === 0 ? 2 : 1}
          />
        );
      })}

      {/* Visare */}
      <line
        x1={center}
        y1={center}
        x2={center + hourLength * Math.sin((hours % 12) * 30 * (Math.PI / 180))}
        y2={center - hourLength * Math.cos((hours % 12) * 30 * (Math.PI / 180))}
        stroke="black"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <line
        x1={center}
        y1={center}
        x2={center + minuteLength * Math.sin(minutes * 6 * (Math.PI / 180))}
        y2={center - minuteLength * Math.cos(minutes * 6 * (Math.PI / 180))}
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <line
        x1={center}
        y1={center}
        x2={center + secondLength * Math.sin(seconds * 6 * (Math.PI / 180))}
        y2={center - secondLength * Math.cos(seconds * 6 * (Math.PI / 180))}
        stroke="red"
        strokeWidth={1}
        strokeLinecap="round"
      />

      {/* Siffror */}
      {numbers.map((num) => {
        const angle = (num % 12) * 30 * (Math.PI / 180);
        const x = center + radius * 0.8 * Math.sin(angle);
        const y = center - radius * 0.8 * Math.cos(angle);
        return (
          <text
            key={num}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={radius * 0.15}
            fontWeight="bold"
          >
            {num}
          </text>
        );
      })}
    </svg>
  );
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({
  timezone,
  mode,
  radius = 100,
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  let localTime: Date;
  try {
    const parts = new Intl.DateTimeFormat("enGB", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).formatToParts(time);

    const hours = parseInt(
      parts.find((p) => p.type === "hour")?.value || "0",
      10
    );
    const minutes = parseInt(
      parts.find((p) => p.type === "minute")?.value || "0",
      10
    );
    const seconds = parseInt(
      parts.find((p) => p.type === "second")?.value || "0",
      10
    );

    localTime = new Date();
    localTime.setHours(hours, minutes, seconds, 0);
  } catch {
    localTime = new Date(time.toLocaleString("en-US", { timeZone: "UTC " }));
  }

  return mode === "digital" ? (
    <time>{localTime.toLocaleTimeString("en-GB", { hour12: false })}</time>
  ) : (
    <AnalogClock time={localTime} radius={radius} />
  );
};

export default TimeDisplay;