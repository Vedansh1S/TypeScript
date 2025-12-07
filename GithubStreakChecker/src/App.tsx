import { useState, useEffect } from "react";

// ------------------ Types ------------------

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
}

interface StreakState {
  contributedToday: boolean;
  lastContribution: Date | null;
  lastRepo: string | null;
  loading: boolean;
  error: string | null;
}

// ------------------ Component ------------------

export default function GitHubStreakWidget({ username }: { username: string }) {
  const [state, setState] = useState<StreakState>({
    contributedToday: false,
    lastContribution: null,
    lastRepo: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!username) return;

    async function fetchEvents() {
      setState((s) => ({ ...s, loading: true, error: null }));

      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/events?per_page=20`
        );
        if (!res.ok) throw new Error("User not found or API limit reached");

        const events: GitHubEvent[] = await res.json();
        const validTypes = ["PushEvent", "PullRequestEvent", "CreateEvent", "IssuesEvent"];
        
        // Filter for valid contributions
        const contributions = events.filter((e) => validTypes.includes(e.type));

        if (contributions.length === 0) {
          setState({
            contributedToday: false,
            lastContribution: null,
            lastRepo: null,
            loading: false,
            error: null,
          });
          return;
        }

        const last = contributions[0];
        const lastDate = new Date(last.created_at);
        const today = new Date();
        const contributedToday = lastDate.toDateString() === today.toDateString();

        setState({
          contributedToday,
          lastContribution: lastDate,
          lastRepo: last.repo.name,
          loading: false,
          error: null,
        });
      } catch (err) {
        setState((s) => ({ ...s, loading: false, error: (err as Error).message }));
      }
    }

    fetchEvents();
  }, [username]);

  // ------------------ Render ------------------

  if (state.loading)
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
        <Card>
          <div className="flex items-center justify-center space-x-4 py-8">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-300 font-medium text-lg">Loading GitHub data...</span>
          </div>
        </Card>
      </div>
    );

  if (state.error)
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
        <Card>
          <div className="flex items-center space-x-4 py-4">
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
              <span className="text-red-500 font-bold">!</span>
            </div>
            <div>
              <h3 className="text-red-400 font-semibold text-lg">Error</h3>
              <p className="text-gray-400">{state.error}</p>
            </div>
          </div>
        </Card>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Card>
        {/* Header Section */}
        <div className="flex items-center space-x-6 mb-10"> {/* Increased space-x and mb */}
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">GitHub Streak</h3>
            <p className="text-gray-400 text-lg">@{username}</p>
          </div>
        </div>

        {/* Status Banner */}
        <div className="mb-10"> {/* Increased bottom margin */}
          <Status
            active={state.contributedToday}
            message={state.contributedToday ? "You have contributed today! 🎉" : "No contributions yet today."}
          />
        </div>

        {/* Details Section */}
        {state.lastContribution && (
          <div className="mt-10 pt-10 border-t border-gray-700/50"> {/* Increased margins */}
            <div className="space-y-8"> {/* Increased vertical gap between items */}
              
              {/* Row 1: Time */}
              <div className="flex items-start space-x-6">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">Last Activity</p>
                  <p className="text-white text-xl font-medium tracking-wide">
                    {state.lastContribution.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Row 2: Repo */}
              <div className="flex items-start space-x-6">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">Repository</p>
                  <p className="text-white text-xl font-medium tracking-wide break-all">
                    {state.lastRepo}
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

// ------------------ UI Subcomponents ------------------

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={
        "bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl " +
        "border border-gray-700/50 rounded-2xl p-12 shadow-2xl " + // INCREASED PADDING (p-10 -> p-12)
        "max-w-xl w-full transition-all duration-300 " + // INCREASED WIDTH (max-w-lg -> max-w-xl)
        className
      }
    >
      {children}
    </div>
  );
}

function Status({ active, message }: { active: boolean; message: string }) {
  return (
    <div
      className={`flex items-center space-x-6 p-6 rounded-xl transition-all duration-300 ${ // INCREASED PADDING AND SPACE
        active
          ? "bg-green-500/10 border border-green-500/20"
          : "bg-red-500/10 border border-red-500/20"
      }`}
    >
      <div className="relative flex-shrink-0">
        <div
          className={`w-4 h-4 rounded-full ${
            active
              ? "bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]"
              : "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.6)]"
          }`}
        ></div>
      </div>
      <span
        className={`font-medium text-lg tracking-wide ${
          active ? "text-green-400" : "text-red-400"
        }`}
      >
        {message}
      </span>
    </div>
  );
}