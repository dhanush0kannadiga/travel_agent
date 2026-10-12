import { createPlan } from './planner';
import { AgentState, TravelGoal } from './types';
import { getTool } from '@/tools/registry';

export async function runDemoAgent(goal: TravelGoal): Promise<AgentState> {
  const state: AgentState = {runId:crypto.randomUUID(),goal,memories:[],plan:createPlan(goal),toolCalls:[],observations:[],decisions:[],planRevisions:[],pendingActions:[],approvals:[],status:'planning',activity:[]};
  state.activity.push('Understanding your request...',`Created ${state.plan.tasks.length} planning tasks.`);
  state.status='executing';
  for (const task of state.plan.tasks.slice(0,5)) {
    task.status='in_progress'; state.currentTask=task;
    const toolName = task.id==='flight_search'?'search_flights':task.id==='hotel_search'?'search_hotels':task.id==='activity_search'?'search_activities':task.id==='budget_check'?'calculate_budget':'get_weather';
    const tool=getTool(toolName); if(!tool) continue;
    const input=toolName==='calculate_budget'?{flight:52400,hotel:36400,local:18000,food:12000}:{};
    const output=await tool.execute(input);
    state.toolCalls.push({id:crypto.randomUUID(),tool:toolName,input,output,status:'success'});
    state.observations.push({tool:toolName,observation:output}); state.activity.push(`Used ${toolName}.`); task.status='completed';
  }
  const budget=state.observations.find(o=>o.tool==='calculate_budget')?.observation?.total as number|undefined;
  if (budget && goal.budget?.amount && budget > goal.budget.amount) {
    state.status='replanning'; state.activity.push('Budget constraint exceeded. Re-planning itinerary.');
    const previous=structuredClone(state.plan); state.plan.tasks=state.plan.tasks.map(t=>t.id==='optimize'?{...t,status:'in_progress'}:t); state.planRevisions.push({reason:'Initial estimate exceeded the user budget.',previousPlan:previous,newPlan:structuredClone(state.plan)});
    state.activity.push('Reduced itinerary scope to fit the budget.');
  }
  state.status='awaiting_approval';
  state.pendingActions.push({action_id:crypto.randomUUID(),type:'BOOK_FLIGHT',status:'AWAITING_APPROVAL',risk:'IRREVERSIBLE',requires_confirmation:true,payload:{flight_id:'FL-101',price:52400}});
  state.activity.push('Waiting for approval before booking.');
  return state;
}
