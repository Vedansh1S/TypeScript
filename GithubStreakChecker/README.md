# GitHub Streak Checker

A React widget that checks if a GitHub user has contributed today by tracking their public activity.

## Features

- Real-time contribution status (Active/Pending)
- Last contribution time and repository
- Tracks Push, Pull Request, Create, and Issue events
- GitHub-inspired dark theme UI

## Usage

Update the `username` prop in `src/main.tsx`:

```tsx
<GitHubStreakWidget username="your-username" />
```

## How It Works

The widget fetches the last 15 public events from GitHub's API and checks if any contributions (pushes, PRs, issues, or repo creation) occurred today in your local timezone.
