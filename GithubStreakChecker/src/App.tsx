import { useState, useEffect } from "react";

// ------------------ Types ------------------

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  actor: { avatar_url: string; login: string }; // Added actor for avatar
  created_at: string;
}

interface StreakState {
  contributedToday: boolean;
  lastContribution: Date | null;
  lastRepo: string | null;
  avatarUrl: string | null; // Added avatar to state
  loading: boolean;
  error: string | null;
}

// ------------------ Main App Component ------------------

export default function App() {
  const [username, setUsername] = useState<string>("");
  const [submittedUsername, setSubmittedUsername] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setSubmittedUsername(username.trim());
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="relative z-10 max-w-2xl mx-auto p-6 flex flex-col items-center pt-20">
        {/* Header */}
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
            GitHub{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-violet-400">
              Streak Check
            </span>
          </h1>
          <p className="text-slate-400 text-lg">Did you ship code today?</p>
        </div>

        {/* Input Form */}
        <div className="w-full mb-8">
          <form onSubmit={handleSubmit} className="relative group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-500 to-violet-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative flex bg-slate-900 rounded-2xl p-2 ring-1 ring-white/10 shadow-2xl">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="github_username"
                className="flex-1 bg-transparent px-4 py-3 text-white placeholder-slate-500 focus:outline-none text-lg font-medium"
                spellCheck={false}
              />
              <button
                type="submit"
                disabled={!username.trim()}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] active:scale-95"
              >
                Check
              </button>
            </div>
          </form>
        </div>

        {/* Display Widget */}
        <div className="w-full transition-all duration-500 ease-out">
          {submittedUsername && (
            <GitHubStreakWidget
              key={submittedUsername}
              username={submittedUsername}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ------------------ Widget Component ------------------

function GitHubStreakWidget({ username }: { username: string }) {
  const [state, setState] = useState<StreakState>({
    contributedToday: false,
    lastContribution: null,
    lastRepo: null,
    avatarUrl: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!username) return;

    async function fetchEvents() {
      setState((s) => ({ ...s, loading: true, error: null }));

      try {
        // Fetch events
        const res = await fetch(
          `https://api.github.com/users/${username}/events?per_page=20`
        );

        if (res.status === 404) throw new Error("User not found");
        if (res.status === 403) throw new Error("API Rate limit exceeded");
        if (!res.ok) throw new Error("Failed to fetch data");

        const events: GitHubEvent[] = await res.json();

        // If user exists but has no public events, we might still want their avatar
        // ideally we'd do a separate user fetch, but let's try to grab it from events first
        // or fallback to a default avatar construction
        let avatar = `https://github.com/${username}.png`;
        if (events.length > 0 && events[0].actor) {
          avatar = events[0].actor.avatar_url;
        }

        const validTypes = [
          "PushEvent",
          "PullRequestEvent",
          "CreateEvent",
          "IssuesEvent",
        ];

        const contributions = events.filter((e) => validTypes.includes(e.type));

        if (contributions.length === 0) {
          setState({
            contributedToday: false,
            lastContribution: null,
            lastRepo: null,
            avatarUrl: avatar,
            loading: false,
            error: null,
          });
          return;
        }

        const last = contributions[0];
        const lastDate = new Date(last.created_at);
        const today = new Date();
        const contributedToday =
          lastDate.toDateString() === today.toDateString();

        setState({
          contributedToday,
          lastContribution: lastDate,
          lastRepo: last.repo.name,
          avatarUrl: avatar,
          loading: false,
          error: null,
        });
      } catch (err) {
        setState((s) => ({
          ...s,
          loading: false,
          error: (err as Error).message,
        }));
      }
    }

    fetchEvents();
  }, [username]);

  // Loading State
  if (state.loading)
    return (
      <Card className="animate-pulse flex flex-col items-center justify-center py-12 space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-800/50"></div>
        <div className="h-4 w-32 bg-slate-800/50 rounded-full"></div>
        <div className="h-3 w-24 bg-slate-800/50 rounded-full"></div>
      </Card>
    );

  // Error State
  if (state.error)
    return (
      <Card className="border-red-500/20 bg-red-500/5">
        <div className="flex flex-col items-center text-center space-y-3 py-6">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-500">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-red-400 font-semibold text-lg">
            Unable to Check
          </h3>
          <p className="text-slate-400 text-sm">{state.error}</p>
        </div>
      </Card>
    );

  // Success State
  return (
    <Card
      className={`
        border-t transition-colors duration-500
        ${
          state.contributedToday
            ? "border-t-green-500/50 shadow-[0_0_40px_-10px_rgba(34,197,94,0.2)]"
            : "border-t-slate-700"
        }
    `}
    >
      {/* User Header */}
      <div className="flex items-center space-x-5 mb-8">
        <div className="relative shrink-0">
          <img
            src={state.avatarUrl || ""}
            alt={username}
            className="w-20 h-20 rounded-2xl shadow-lg ring-2 ring-white/10 object-cover bg-slate-800"
          />
          {state.contributedToday && (
            <div className="absolute -bottom-2 -right-2 bg-green-500 text-slate-900 rounded-full p-1.5 border-4 border-slate-900">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold text-white truncate">
            @{username}
          </h2>
          <div
            className={`inline-flex items-center space-x-2 mt-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              state.contributedToday
                ? "bg-green-500/10 text-green-400 border-green-500/20"
                : "bg-slate-700/30 text-slate-400 border-slate-700"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                state.contributedToday
                  ? "bg-green-400 animate-pulse"
                  : "bg-slate-500"
              }`}
            />
            <span>
              {state.contributedToday ? "Active Today" : "No Activity"}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      {state.lastContribution ? (
        <div className="grid gap-4 p-4 bg-slate-900/50 rounded-2xl border border-white/5">
          <InfoRow
            icon={
              <svg
                className="w-5 h-5 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            label="Latest Commit"
            value={state.lastContribution.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            subValue={state.lastContribution.toLocaleDateString(undefined, {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          />
          <div className="h-px bg-white/5" />
          <InfoRow
            icon={
              <svg
                className="w-5 h-5 text-pink-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            }
            label="Repository"
            value={state.lastRepo || "Unknown"}
            valueClass="text-indigo-300 break-all"
          />
        </div>
      ) : (
        <div className="text-center py-8 text-slate-500 bg-slate-900/30 rounded-2xl border border-dashed border-slate-700">
          <p>No public contributions found recently.</p>
        </div>
      )}
    </Card>
  );
}

// ------------------ UI Subcomponents ------------------

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        relative backdrop-blur-xl bg-slate-900/80 
        border border-white/10 rounded-3xl p-8 
        shadow-2xl ring-1 ring-black/5
        w-full overflow-hidden
        ${className}
    `}
    >
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-50" />
      {children}
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
  subValue,
  valueClass = "text-white",
}: {
  icon: any;
  label: string;
  value: string;
  subValue?: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center space-x-4">
      <div className="p-2.5 rounded-xl bg-slate-800 text-slate-400 border border-slate-700/50 shadow-inner">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-0.5">
          {label}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-2">
          <p className={`font-medium text-lg leading-tight ${valueClass}`}>
            {value}
          </p>
          {subValue && (
            <span className="text-sm text-slate-500">{subValue}</span>
          )}
        </div>
      </div>
    </div>
  );
}
