// Aligned with catppuccin-vsc/src/theme/extensions/gitlens.ts
import { opacity, shade, transparent } from '../../colors.mjs';

export default function gitlens(context) {
  const { palette, options } = context;
  const accent = palette[options.accent || 'sapphire'];

  const graphLaneColors = [
    palette.mauve,
    palette.yellow,
    palette.blue,
    palette.flamingo,
    palette.teal,
    palette.lavender,
    palette.rosewater,
    palette.red,
    palette.green,
    palette.pink,
  ];

  return {
    'gitlens.gutterBackgroundColor': opacity(palette.surface0, 0.3),
    'gitlens.gutterForegroundColor': palette.text,
    'gitlens.gutterUncommittedForegroundColor': accent,
    'gitlens.trailingLineBackgroundColor': transparent,
    'gitlens.trailingLineForegroundColor': opacity(palette.text, 0.3),
    'gitlens.lineHighlightBackgroundColor': opacity(accent, 0.15),
    'gitlens.lineHighlightOverviewRulerColor': opacity(accent, 0.8),
    'gitlens.openAutolinkedIssueIconColor': palette.teal,
    'gitlens.closedAutolinkedIssueIconColor': palette.mauve,
    'gitlens.closedPullRequestIconColor': palette.red,
    'gitlens.openPullRequestIconColor': palette.teal,
    'gitlens.mergedPullRequestIconColor': palette.mauve,
    'gitlens.unpublishedChangesIconColor': palette.teal,
    'gitlens.unpublishedCommitIconColor': palette.teal,
    'gitlens.unpulledChangesIconColor': palette.peach,
    'gitlens.decorations.branchAheadForegroundColor': palette.teal,
    'gitlens.decorations.branchBehindForegroundColor': palette.peach,
    'gitlens.decorations.branchDivergedForegroundColor': palette.maroon,
    'gitlens.decorations.branchUnpublishedForegroundColor': palette.teal,
    'gitlens.decorations.branchMissingUpstreamForegroundColor': palette.peach,
    'gitlens.decorations.statusMergingOrRebasingConflictForegroundColor':
      palette.red,
    'gitlens.decorations.statusMergingOrRebasingForegroundColor':
      palette.maroon,
    'gitlens.decorations.workspaceRepoMissingForegroundColor': palette.subtext0,
    'gitlens.decorations.workspaceCurrentForegroundColor': accent,
    'gitlens.decorations.workspaceRepoOpenForegroundColor': accent,
    'gitlens.decorations.worktreeHasUncommittedChangesForegroundColor':
      palette.peach,
    'gitlens.decorations.worktreeMissingForegroundColor': palette.red,
    'gitlens.graphLane1Color': graphLaneColors[0],
    'gitlens.graphLane2Color': graphLaneColors[1],
    'gitlens.graphLane3Color': graphLaneColors[2],
    'gitlens.graphLane4Color': graphLaneColors[3],
    'gitlens.graphLane5Color': graphLaneColors[4],
    'gitlens.graphLane6Color': graphLaneColors[5],
    'gitlens.graphLane7Color': graphLaneColors[6],
    'gitlens.graphLane8Color': graphLaneColors[7],
    'gitlens.graphLane9Color': graphLaneColors[8],
    'gitlens.graphLane10Color': graphLaneColors[9],
    'gitlens.graphChangesColumnAddedColor': palette.teal,
    'gitlens.graphChangesColumnDeletedColor': palette.red,
    'gitlens.graphMinimapMarkerHeadColor': palette.teal,
    'gitlens.graphScrollMarkerHeadColor': palette.teal,
    'gitlens.graphMinimapMarkerUpstreamColor': shade(palette.teal, -0.05),
    'gitlens.graphScrollMarkerUpstreamColor': shade(palette.teal, -0.05),
    'gitlens.graphMinimapMarkerHighlightsColor': palette.maroon,
    'gitlens.graphScrollMarkerHighlightsColor': palette.maroon,
    'gitlens.graphMinimapMarkerLocalBranchesColor': palette.sky,
    'gitlens.graphScrollMarkerLocalBranchesColor': palette.sky,
    'gitlens.graphMinimapMarkerRemoteBranchesColor': shade(palette.sky, -0.05),
    'gitlens.graphScrollMarkerRemoteBranchesColor': shade(palette.sky, -0.05),
    'gitlens.graphMinimapMarkerStashesColor': palette.mauve,
    'gitlens.graphScrollMarkerStashesColor': palette.mauve,
    'gitlens.graphMinimapMarkerTagsColor': palette.flamingo,
    'gitlens.graphScrollMarkerTagsColor': palette.flamingo,
  };
}
