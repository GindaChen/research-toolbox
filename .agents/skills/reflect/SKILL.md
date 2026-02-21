---
name: reflect
description: Reflect on experiment results, identify patterns, and propose improvements
---

# Reflect Skill

## Purpose
Analyze experiment results, identify patterns/trends, diagnose failures, and propose concrete next steps.

## When to Use
- After a batch of experiments completes
- When a run fails unexpectedly
- When results are surprising (good or bad)
- During periodic research reviews

## Instructions

1. **Collect data**: Gather metrics, logs, and configs from recent runs
2. **Compare**: Look at how metrics changed across runs, identify best/worst configs
3. **Analyze patterns**:
   - What changed between successful and failed runs?
   - Are there diminishing returns on certain hyperparameters?
   - Are there surprising correlations?
4. **Diagnose issues** if any runs failed:
   - Was it a code bug, resource issue, or hyperparameter choice?
   - Is the failure reproducible?
5. **Write reflection** in this format:

```markdown
## Reflection: [Topic]

### Summary of Runs
| Run | Config Change | Key Metric | Outcome |
|-----|--------------|------------|---------|
| ... | ...          | ...        | ...     |

### Patterns Observed
- Pattern 1
- Pattern 2

### What Worked
- ...

### What Didn't Work
- ...

### Proposed Next Steps
1. [Concrete action with expected impact]
2. [Concrete action with expected impact]
```

6. **Create tasks** for the proposed next steps on the Kanban board
