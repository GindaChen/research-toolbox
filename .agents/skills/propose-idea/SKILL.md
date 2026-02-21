---
name: propose-idea
description: Generate research ideas and experiment proposals from current context
---

# Propose Idea Skill

## Purpose
Generate novel research ideas, experiment proposals, or optimization strategies based on the current research context.

## When to Use
- When brainstorming next experiments
- When a research direction stalls
- After reading related papers
- When exploring a new problem space

## Instructions

1. **Review context**: Current experiments, results, literature, and open questions
2. **Generate ideas** using these strategies:
   - Ablation: What if we remove/change component X?
   - Combination: What if we combine approach A with B?
   - Scale: What if we scale up/down parameter X?
   - Transfer: What worked in domain A that we can try in domain B?
   - Failure analysis: What caused failure X, and what's the opposite approach?
3. **For each idea**, document:

```markdown
### Idea: [Title]

**Hypothesis**: [One sentence]
**Rationale**: [Why this might work, 2-3 sentences]
**Estimated effort**: [small/medium/large]
**Expected impact**: [low/medium/high]
**Risk**: [What could go wrong]
**Experiment plan**:
1. Step 1
2. Step 2
3. Evaluation criteria
```

4. **Rank ideas** by expected_impact / estimated_effort ratio
5. **Create Kanban tasks** for the top 2-3 ideas
