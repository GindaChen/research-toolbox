---
name: guide-pr
description: Guide the creation, review, and merge of a pull request
---

# Guide PR Skill

## Purpose
Guide the creation of a well-structured PR with clear description, appropriate labels, and proper review flow.

## When to Use
- When implementing a feature or fix
- When an agent completes work that needs review
- When merging extension contributions

## Instructions

1. **Before creating the PR**:
   - Ensure all changes are committed with conventional commit messages
   - Run CI checks locally: `cd frontend && npm run build` and `cd backend && pytest tests/ -v`
   - Verify the branch is up-to-date with `main`

2. **Create the PR** with this structure:

```markdown
## Summary
[1-2 sentence overview of what this PR does]

## Changes
- [Change 1]
- [Change 2]

## Type
- [ ] feat: New feature
- [ ] fix: Bug fix
- [ ] docs: Documentation
- [ ] ext: Extension
- [ ] ci: CI/CD
- [ ] refactor: Code refactoring

## Labels
[Apply from taxonomy: type:, area:, priority:, effort:]

## Testing
- [ ] Backend tests pass (`pytest tests/ -v`)
- [ ] Frontend builds (`npm run build`)
- [ ] Manual verification: [describe]

## Related Issues
Closes #XX
```

3. **After PR creation**:
   - Wait for CI to pass
   - Add a comment documenting the execution flow
   - Request review if applicable
   - Monitor for merge conflicts
