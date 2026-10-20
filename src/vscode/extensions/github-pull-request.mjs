// Aligned with catppuccin-vsc/src/theme/extensions/github-pull-request.ts
export default function githubPullRequest(context) {
  const { palette } = context;

  return {
    'issues.closed': palette.mauve,
    'issues.newIssueDecoration': palette.rosewater,
    'issues.open': palette.teal,
    'pullRequests.closed': palette.red,
    'pullRequests.draft': palette.overlay2,
    'pullRequests.merged': palette.mauve,
    'pullRequests.notification': palette.text,
    'pullRequests.open': palette.teal,
  };
}
