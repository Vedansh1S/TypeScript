import { useState, useRef } from 'react';

// Define the 5 possible states of the game
type GameState = 'idle' | 'waiting' | 'ready' | 'success' | 'early';

export default function ReflexGame() {
  const [state, setState] = useState<GameState>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [highScore, setHighScore] = useState<number | null>(null);
  
  // Refs are perfect for timers and timestamps that don't need to trigger re-renders immediately
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const startGame = () => {
    setState('waiting');
    setReactionTime(null);
    
    // Random delay between 2 and 5 seconds
    const delay = Math.floor(Math.random() * 3000) + 2000;
    
    timerRef.current = window.setTimeout(() => {
      setState('ready');
      startTimeRef.current = Date.now();
    }, delay);
  };

  const handleClick = () => {
    if (state === 'idle' || state === 'success' || state === 'early') {
      startGame();
    } else if (state === 'waiting') {
      // User clicked too early
      if (timerRef.current) clearTimeout(timerRef.current);
      setState('early');
    } else if (state === 'ready') {
      // User clicked on time
      const endTime = Date.now();
      const time = endTime - startTimeRef.current;
      setReactionTime(time);
      setState('success');
      
      // Update high score (lower is better)
      if (!highScore || time < highScore) setHighScore(time);
    }
  };

  // Dynamic styles based on state
  const getColors = () => {
    switch (state) {
      case 'waiting': return 'bg-rose-600 cursor-wait';
      case 'ready':   return 'bg-emerald-500 cursor-pointer';
      case 'early':   return 'bg-amber-500 cursor-pointer';
      case 'success': return 'bg-indigo-600 cursor-pointer';
      default:        return 'bg-slate-800 cursor-pointer hover:bg-slate-700';
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-200 select-none ${getColors()}`}
    >
      <div className="text-center text-white space-y-4 p-8">
        
        {/* Main Icon/Text Display */}
        <div className="text-6xl font-black tracking-tighter">
          {state === 'idle' && 'START'}
          {state === 'waiting' && 'WAIT...'}
          {state === 'ready' && 'CLICK!'}
          {state === 'early' && 'TOO SOON!'}
          {state === 'success' && `${reactionTime} ms`}
        </div>

        {/* Subtext Instructions */}
        <p className="text-xl font-medium opacity-90">
          {state === 'idle' && 'Click anywhere to begin testing.'}
          {state === 'waiting' && 'Wait for the green color.'}
          {state === 'ready' && 'Click now!'}
          {state === 'early' && 'You clicked before green. Click to retry.'}
          {state === 'success' && 'Click to try again.'}
        </p>

        {/* High Score Badge */}
        {highScore && (
          <div className="mt-8 inline-block px-4 py-2 bg-black/20 rounded-full backdrop-blur-sm border border-white/10">
            <span className="text-sm font-bold uppercase tracking-widest text-white/80">
              Best: {highScore} ms
            </span>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="fixed bottom-4 text-white/30 text-xs font-mono">
        ReflexTester v1.0 • React • Tailwind
      </div>
    </div>
  );
}