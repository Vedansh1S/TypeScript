import { useState, useEffect } from "react";

// --- Types ---

interface Actor {
  id: number;
  login: string;
  avatar_url: string;
}

interface Repo {
  id: number;
  name: string;
  url: string;
}

interface GitHubEvent {
  id: string;
  type:
    | "PushEvent"
    | "PullRequestEvent"
    | "CreateEvent"
    | "WatchEvent"
    | string;
  actor: Actor;
  repo: Repo;
  created_at: string; // ISO 8601 date string
}

interface StreakState {
  hasContributedToday: boolean;
  lastContributionTime: Date | null;
  lastRepo: string | null;
  loading: boolean;
  error: string | null;
}

// --- Component ---

export default function GitHubStreakWidget({ username }: { username: string }) {
  const [status, setStatus] = useState<StreakState>({
    hasContributedToday: false,
    lastContributionTime: null,
    lastRepo: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!username) return;

    const checkStreak = async () => {
      setStatus((prev) => ({ ...prev, loading: true, error: null }));

      try {
        // Fetch last 15 public events for the user
        const response = await fetch(
          `https://api.github.com/users/${username}/events?per_page=15`
        );

        if (!response.ok)
          throw new Error("User not found or API limit reached");

        const events: GitHubEvent[] = await response.json();

        // Define what counts as a "Streak Contribution"
        // Usually: Pushing code, opening PRs, or creating repos/issues.
        const contributionTypes = [
          "PushEvent",
          "PullRequestEvent",
          "CreateEvent",
          "IssuesEvent",
        ];

        const relevantEvents = events.filter((e) =>
          contributionTypes.includes(e.type)
        );

        if (relevantEvents.length === 0) {
          setStatus({
            hasContributedToday: false,
            lastContributionTime: null,
            lastRepo: null,
            loading: false,
            error: null,
          });
          return;
        }

        const lastEvent = relevantEvents[0];
        const lastEventDate = new Date(lastEvent.created_at);
        const today = new Date();

        // Check if the dates match (ignoring time) in the user's LOCAL timezone
        const isToday =
          lastEventDate.getDate() === today.getDate() &&
          lastEventDate.getMonth() === today.getMonth() &&
          lastEventDate.getFullYear() === today.getFullYear();

        setStatus({
          hasContributedToday: isToday,
          lastContributionTime: lastEventDate,
          lastRepo: lastEvent.repo.name,
          loading: false,
          error: null,
        });
      } catch (err) {
        setStatus((prev) => ({
          ...prev,
          loading: false,
          error: (err as Error).message,
        }));
      }
    };

    checkStreak();
  }, [username]);

  // --- Render Helpers ---

  if (status.loading)
    return <div style={styles.card}>Loading GitHub data...</div>;
  if (status.error)
    return (
      <div style={{ ...styles.card, color: "red" }}>Error: {status.error}</div>
    );

  return (
    <div style={styles.card}>
      <h3 style={styles.heading}>
        GitHub Streak: <span style={{ color: "#58a6ff" }}>{username}</span>
      </h3>

      <div style={styles.statusContainer}>
        <div
          style={{
            ...styles.indicator,
            backgroundColor: status.hasContributedToday ? "#238636" : "#da3633",
          }}
        >
          {status.hasContributedToday ? "Active" : "Pending"}
        </div>
        <div style={styles.textContainer}>
          {status.hasContributedToday ? (
            <p>You have contributed today! 🎉</p>
          ) : (
            <p>No public contributions yet today.</p>
          )}
        </div>
      </div>

      {status.lastContributionTime && (
        <div style={styles.meta}>
          <small>
            Last activity: {status.lastContributionTime.toLocaleTimeString()}{" "}
            <br />
            Repo: <strong>{status.lastRepo}</strong>
          </small>
        </div>
      )}
    </div>
  );
}

// --- Basic Inline Styles (Replace with Tailwind/CSS Modules) ---
const styles = {
  card: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    border: "1px solid #30363d",
    backgroundColor: "#0d1117",
    color: "#c9d1d9",
    padding: "20px",
    borderRadius: "6px",
    maxWidth: "350px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
  },
  heading: {
    marginTop: 0,
    marginBottom: "15px",
    fontSize: "1.1rem",
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
  },
  indicator: {
    padding: "5px 12px",
    borderRadius: "20px",
    fontWeight: "bold" as const, // TS requires strict typing for standard CSS properties
    color: "white",
    marginRight: "15px",
    fontSize: "0.9rem",
  },
  textContainer: {
    fontSize: "0.95rem",
  },
  meta: {
    borderTop: "1px solid #30363d",
    paddingTop: "10px",
    color: "#8b949e",
  },
};
