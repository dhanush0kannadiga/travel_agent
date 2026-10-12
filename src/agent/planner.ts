import { Plan, TravelGoal } from './types';
export function createPlan(goal: TravelGoal): Plan {
  const tasks = [
    ['flight_search','Find suitable flights'],['destination_search','Identify regions matching preferences'],['hotel_search','Find accommodation'],['activity_search','Find activities'],['transport_search','Estimate transportation'],['budget_check','Calculate total trip cost'],['optimize','Optimize itinerary']
  ];
  return { goal: `Plan a ${goal.duration_days ?? '?'}-day trip to ${goal.destination ?? 'the requested destination'}.`, tasks: tasks.map(([id,description])=>({id,description,status:'pending'})) };
}
