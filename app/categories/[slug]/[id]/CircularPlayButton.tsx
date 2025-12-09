"use client";
import React from "react";

type Props = {
  isPlaying: boolean;
  isPaused: boolean;
  progress: number;
  onClick: () => void;
  size?: "sm" | "md";
};

export default function CircularPlayButton({
  isPlaying,
  isPaused,
  progress,
  onClick,
  size = "md",
}: Props) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const btnSize = size === "sm" ? "h-10 w-10" : "h-12 w-12";

  return (
    <button
      onClick={onClick}
      aria-label={isPlaying && !isPaused ? "Pause" : "Play"}
      className={`${btnSize} rounded-full bg-white border border-[#DDEEE6] flex items-center justify-center relative focus:outline-none active:scale-95 transition-transform`}
    >
      <svg className="absolute inset-0" viewBox="0 0 44 44" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="22" r={radius} stroke="#E6F2EA" strokeWidth="4" fill="none" />
        <circle
          cx="22"
          cy="22"
          r={radius}
          stroke="#417360"
          strokeWidth="4"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - Math.max(0, Math.min(1, progress)) * circumference}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 120ms linear" }}
        />
      </svg>

      <div className="relative z-10">
        {isPlaying && !isPaused ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="6" y="5" width="4" height="14" fill="#417360" rx="1" />
            <rect x="14" y="5" width="4" height="14" fill="#417360" rx="1" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M7 5v14l11-7L7 5z" fill="#417360" />
          </svg>
        )}
      </div>
    </button>
  );
}
