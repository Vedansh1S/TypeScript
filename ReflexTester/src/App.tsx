import { useState, useRef, useEffect } from 'react';
import { Play, Hand, Zap, AlertCircle, RotateCcw } from 'lucide-react'; // Assumes you have lucide-react or similar

type GameState = 'idle' | 'waiting' | 'ready' | 'success' | 'early';

export default function ReflexGame() {
  const [state, setState] = useState<GameState>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  
  // STATS: High score + Rolling Average (last 5)
  const [highScore, setHighScore] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // 1. GLOBAL HANDLER: Unified logic for Mouse + Keyboard
  const handleAction = () => {
    if (state === 'idle' || state === 'success' || state === 'early') {
      startGame();
    } else if (state === 'waiting') {
      earlyTrigger();
    } else if (state === 'ready') {
      successTrigger();
    }
  };

  // 2. KEYBOARD SUPPORT: The "Pro" way to play
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault(); // Stop page scroll
        handleAction();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state]); // Re-bind based on state changes

  const startGame = () => {
    setState('waiting');
    setReactionTime(null);
    const delay = Math.floor(Math.random() * 3000) + 2000;
    
    timerRef.current = window.setTimeout(() => {
      setState('ready');
      startTimeRef.current = Date.now();
    }, delay);
  };

  const earlyTrigger = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setState('early');
  };

  const successTrigger = () => {
    const time = Date.now() - startTimeRef.current;
    setReactionTime(time);
    setState('success');

    // Update History (Keep last 5) & High Score
    setHistory(prev => {
      const newHistory = [time, ...prev].slice(0, 5);
      return newHistory;
    });
    
    if (!highScore || time < highScore) setHighScore(time);
  };

  // Helper for Average Calculation
  const average = history.length > 0 
    ? Math.round(history.reduce((a, b) => a + b, 0) / history.length) 
    : null;

  const getTheme = () => {
    switch (state) {
      case 'waiting': return { bg: 'bg-rose-600', icon: <Hand size={64} /> };
      case 'ready':   return { bg: 'bg-emerald-500', icon: <Zap size={64} /> }; // Shape change
      case 'early':   return { bg: 'bg-amber-500', icon: <AlertCircle size={64} /> };
      case 'success': return { bg: 'bg-indigo-600', icon: <RotateCcw size={64} /> };
      default:        return { bg: 'bg-slate-800', icon: <Play size={64} /> };
    }
  };

  const theme = getTheme();

  return (
    <div 
      onMouseDown={handleAction}
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-200 select-none cursor-pointer ${theme.bg}`}
    >
      <div className="text-center text-white space-y-6 p-8 max-w-md w-full">
        
        {/* Visual Anchor for Accessibility */}
        <div className="flex justify-center mb-4 animate-bounce-short">
            {theme.icon}
        </div>

        <div className="text-6xl font-black tracking-tighter tabular-nums">
          {state === 'success' ? `${reactionTime} ms` : (state === 'ready' ? 'CLICK!' : state.toUpperCase())}
        </div>

        <p className="text-xl font-medium opacity-90">
            {state === 'idle' ? 'Press Space or Click to start' : 
             state === 'waiting' ? 'Wait for Green...' :
             state === 'ready' ? 'NOW!' :
             state === 'early' ? 'Too soon! Try again.' : 
             'Great! Press Space to retry.'}
        </p>

        {/* DATA HUD: The Strategy Layer */}
        <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="p-4 bg-black/20 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="text-xs uppercase tracking-widest text-white/60">Best</div>
                <div className="text-2xl font-bold">{highScore || '-'} ms</div>
            </div>
            <div className="p-4 bg-black/20 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="text-xs uppercase tracking-widest text-white/60">Avg (Last 5)</div>
                <div className="text-2xl font-bold">{average || '-'} ms</div>
            </div>
        </div>
      </div>
      
      <div className="fixed bottom-4 text-white/30 text-xs font-mono">
        Press [SPACE] for best accuracy
      </div>
    </div>
  );
}