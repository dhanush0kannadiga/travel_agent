# Autonomous AI Travel Agent

A Next.js/TypeScript foundation for the agent architecture described in the project specification.

## Run

```bash
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:3000.

## Architecture

`AgentState` is the runtime state. `AgentOrchestrator` owns the lifecycle. `Planner` creates structured tasks. `Tool Registry` exposes read/action tools. Observations are recorded after tool execution. Budget violations trigger a plan revision. Consequential booking remains pending until approval.

## Current demo

The first vertical slice intentionally uses mock travel tools. It demonstrates request extraction, planning, tool calls, observations, budget evaluation, re-planning, and a server-created pending irreversible action.

The booking action is not executable merely because the model requests it; a production implementation must verify approval server-side before execution.
