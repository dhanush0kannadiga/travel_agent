export type AgentStatus = 'planning'|'executing'|'observing'|'replanning'|'awaiting_approval'|'completed'|'failed';
export type TaskStatus = 'pending'|'in_progress'|'completed'|'failed'|'blocked'|'needs_approval';
export type RiskLevel = 'READ'|'LOW_RISK'|'HIGH_RISK'|'IRREVERSIBLE';
export interface TravelGoal { origin?: string; destination?: string; duration_days?: number; travel_dates?: {start?: string|null; end?: string|null}; budget?: {amount:number; currency:string}; travellers?: number; interests?: string[]; preferences?: Record<string, unknown>; }
export interface Task { id:string; description:string; status:TaskStatus; }
export interface ToolCall { id:string; tool:string; input:unknown; output?:unknown; status:'success'|'failed'; }
export interface Observation { tool:string; observation:Record<string,unknown>; }
export interface Decision { decision:string; factors:{factor:string; weight:number}[]; summary:string; }
export interface Plan { goal:string; tasks:Task[]; itinerary?:unknown; }
export interface Action { action_id:string; type:string; status:'AWAITING_APPROVAL'|'APPROVED'|'REJECTED'|'EXECUTED'|'FAILED'; risk:RiskLevel; requires_confirmation:boolean; payload:Record<string,unknown>; }
export interface AgentState { runId:string; goal:TravelGoal; memories:unknown[]; plan:Plan; currentTask?:Task; toolCalls:ToolCall[]; observations:Observation[]; decisions:Decision[]; planRevisions:{reason:string; previousPlan:Plan; newPlan:Plan}[]; pendingActions:Action[]; approvals:{actionId:string; status:string}[]; status:AgentStatus; activity:string[]; }
