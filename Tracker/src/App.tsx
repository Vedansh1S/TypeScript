import { useEffect, useState } from "react";
import { Plus, Check, Trash2, Flame, Undo2 } from "lucide-react"; // Ensure you install lucide-react

type Habit = {
  id: string;
  name: string;
  completedDates: string[];
};

const todayISO = () => new Date().toISOString().split("T")[0];
const yesterdayISO = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
};

export default function App() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitName, setHabitName] = useState("");
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);

  // Load
  useEffect(() => {
    const saved = localStorage.getItem("habits");
    if (saved) setHabits(JSON.parse(saved));
  }, []);

  // Save
  useEffect(() => {
    if (mounted) localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits, mounted]);

  const addHabit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!habitName.trim()) return;
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: habitName.trim(),
      completedDates: [],
    };
    setHabits((h) => [...h, newHabit]);
    setHabitName("");
  };

  const deleteHabit = (id: string) => {
    setHabits((h) => h.filter((habit) => habit.id !== id));
  };

  const toggleToday = (id: string) => {
    const today = todayISO();
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;
        const done = habit.completedDates.includes(today);
        return {
          ...habit,
          completedDates: done
            ? habit.completedDates.filter((d) => d !== today)
            : [...habit.completedDates, today],
        };
      })
    );
  };

  const getStreak = (dates: string[]) => {
    const today = todayISO();
    const yesterday = yesterdayISO();
    const sorted = [...dates].sort((a, b) => b.localeCompare(a));

    // If no dates, 0
    if (!sorted.length) return 0;

    // Determine where to start counting
    // If we did it today, start today. If not, check if we did it yesterday.
    let currentCheck = sorted[0] === today ? today : yesterday;

    // If neither today nor yesterday is in the list, streak is broken/0
    if (!dates.includes(currentCheck)) return 0;

    let streak = 0;

    // Simple loop backwards
    while (true) {
      if (dates.includes(currentCheck)) {
        streak++;
        const d = new Date(currentCheck);
        d.setDate(d.getDate() - 1);
        currentCheck = d.toISOString().split("T")[0];
      } else {
        break;
      }
    }
    return streak;
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex justify-center items-center p-8 font-sans selection:bg-emerald-500/30">
      <div className=" w-full max-w-md space-y-8 border border-slate-50 rounded-xl p-4">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Focus.
          </h1>
          <p className="text-zinc-500 text-sm">
            Consistency is the only currency.
          </p>
        </div>

        {/* Input Area */}
        <form onSubmit={addHabit} className="relative group">
          <input
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            className="w-full bg-zinc-900/50 border border-slate-50 rounded-lg px-4 py-4 pr-12 outline-none focus:border-slate-50/50 focus:ring-2  focus:ring-slate-50 transition-all placeholder:text-zinc-600"
            placeholder="What needs to get done?"
          />
          <button
            type="submit"
            className="absolute right-3 top-3 bottom-3 p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-emerald-600 transition-colors cursor-pointer"
          >
            <Plus size={20} />
          </button>
        </form>

        {/* List */}
        <div className="space-y-3">
          {habits.length === 0 && (
            <div className="min-h-19 flex justify-center items-center text-center text-zinc-600 text-sm border-2 border-dashed border-zinc-900 rounded-lg">
              No active habits. Initialize one above.
            </div>
          )}

          {habits.map((habit) => {
            const isDone = habit.completedDates.includes(todayISO());
            const streak = getStreak(habit.completedDates);

            return (
              <div
                key={habit.id}
                className={`group flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                  isDone
                    ? "bg-emerald-950/10 border-emerald-900/20"
                    : "bg-zinc-900/30 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <div className="flex-1 min-w-0 mr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h3
                      className={`font-medium truncate ${
                        isDone
                          ? "text-zinc-400 line-through decoration-zinc-600"
                          : "text-zinc-200"
                      }`}
                    >
                      {habit.name}
                    </h3>
                    {streak > 0 && (
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-400/10 px-1.5 py-0.5 rounded">
                        <Flame size={10} /> {streak}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleToday(habit.id)}
                    title={isDone ? "Undo" : "Mark as done"}
                    className={`h-10 w-10 flex items-center justify-center rounded-lg transition-all ${
                      isDone
                        ? "bg-emerald-500 text-white shadow-2xl"
                        : "bg-zinc-800 text-zinc-600 hover:bg-zinc-700 hover:text-zinc-300"
                    }`}
                  >
                    {isDone ? (
                      <Undo2 size={16} strokeWidth={3} />
                    ) : (
                      <Check size={16} strokeWidth={3} />
                    )}
                  </button>

                  <button
                    onClick={() => deleteHabit(habit.id)}
                    title="Delete"
                    className="h-10 w-10 flex items-center justify-center opacity-0 group-hover:opacity-100 p-2 text-zinc-600 hover:bg-red-500/30 hover:text-red-400 transition-all rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
