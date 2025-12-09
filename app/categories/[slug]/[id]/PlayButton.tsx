"use client";
import { useState, useRef } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function DuaPlayer({ text }: { text: string }) {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);


  const duration = Math.max(2000, text.length * 60); 

  const play = () => {

    window.speechSynthesis.cancel();
    if (timerRef.current) clearInterval(timerRef.current);

    setProgress(0);
    setIsPlaying(true);


    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ar-SA";
    utter.rate = 0.9;
    window.speechSynthesis.speak(utter);


    const start = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(timerRef.current!);
        setIsPlaying(false);
      }
    }, 80);
  };

  return (
    <button 
      onClick={play} 
      className="w-10 h-10 relative flex items-center justify-center"
    >
      <div className={`absolute inset-0 ${isPlaying ? '' : 'hidden'}`}>
        <CircularProgressbar 
          value={progress} 
          strokeWidth={12} 
        />
      </div>

      {!isPlaying && (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.33337 9.99995V7.03329C3.33337 3.34995 5.94171 1.84162 9.13337 3.68329L11.7084 5.16662L14.2834 6.64995C17.475 8.49162 17.475 11.5083 14.2834 13.35L11.7084 14.8333L9.13337 16.3166C5.94171 18.1583 3.33337 16.65 3.33337 12.9666V9.99995Z" stroke="#709484" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
      )}

      {isPlaying && (
              <svg
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="6" y="5" width="4" height="14" rx="0.5" fill="#709484"/>
                <rect x="14" y="5" width="4" height="14" rx="0.5" fill="#709484"/>
              </svg>
      )}
                            <div className="
                        absolute bottom-11 right-[-7px]
                        px-3 py-2 text-[14px] bg-black text-white rounded-lg 
                        opacity-0 invisible translate-y-2
                        group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 duration-200">
                          Play
                    </div>
    </button>
  );
}
