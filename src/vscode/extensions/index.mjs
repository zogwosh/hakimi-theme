// Aligned with catppuccin-vsc/src/theme/extensions/index.ts
import errorLens from './error-lens.mjs';
import gitHubPullRequest from './github-pull-request.mjs';
import gitLens from './gitlens.mjs';

export default function extensions(context) {
  return {
    ...errorLens(context),
    ...gitHubPullRequest(context),
    ...gitLens(context),
  };
}
