---
name: summarize
description: Summarize a research session, conversation, or experiment results into a concise journal entry
---

# Summarize Skill

## Purpose
Generate a concise, actionable summary of a research session, conversation, or set of experiment results. The output should be suitable for a Research Journey entry.

## When to Use
- After a research conversation or work session
- When experiment runs complete
- When switching context or going AFK
- At the end of a day/week for research digests

## Instructions

1. **Gather context**: Read the conversation history, experiment logs, or session artifacts
2. **Identify key elements**:
   - Decisions made and their rationale
   - Results obtained (metrics, observations)
   - Open questions or unresolved issues
   - Next steps identified
3. **Write the summary** in this format:

```markdown
## [Session Title]

**Date**: YYYY-MM-DD
**Duration**: ~Xh
**Tags**: [tag1, tag2, ...]

### What Happened
[2-3 sentence overview]

### Key Decisions
- Decision 1: rationale
- Decision 2: rationale

### Results
- Metric/observation 1
- Metric/observation 2

### Open Questions
- Question 1
- Question 2

### Next Steps
- [ ] Action item 1
- [ ] Action item 2
```

4. **Save the summary** as a Journey entry via `POST /api/journey`
5. **Link related items**: Reference task IDs, run IDs, or issue numbers

## Quality Checklist
- [ ] Summary is < 300 words
- [ ] All decisions have rationale
- [ ] Next steps are actionable (not vague)
- [ ] Tags match the project label taxonomy
