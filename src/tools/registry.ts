import { RiskLevel } from '@/agent/types';
export interface Tool { name:string; description:string; risk_level:RiskLevel; execute(input:Record<string,unknown>):Promise<Record<string,unknown>>; }
const tools: Record<string,Tool> = {
 search_flights:{name:'search_flights',description:'Search flights matching route, dates and budget.',risk_level:'READ',async execute(){return {status:'success',results:[{id:'FL-101',route:'Bengaluru → Tokyo',price:52400,currency:'INR'},{id:'FL-102',route:'Bengaluru → Tokyo',price:61800,currency:'INR'}],metadata:{source:'mock',timestamp:new Date().toISOString()}}}},
 search_hotels:{name:'search_hotels',description:'Search accommodation.',risk_level:'READ',async execute(){return {status:'success',results:[{id:'HT-201',name:'Quiet Garden Stay',nightly:5200},{id:'HT-202',name:'Central Tokyo Hotel',nightly:7800}],metadata:{source:'mock'}}}},
 search_activities:{name:'search_activities',description:'Search activities.',risk_level:'READ',async execute(){return {status:'success',results:[{name:'Arashiyama early-morning photography',crowd:'low'},{name:'Nikko nature trail',crowd:'low'},{name:'Shibuya crossing',crowd:'high'}]}}},
 get_weather:{name:'get_weather',description:'Get destination weather.',risk_level:'READ',async execute(){return {status:'success',forecast:'mild autumn conditions',source:'mock'}}},
 calculate_budget:{name:'calculate_budget',description:'Calculate trip estimate.',risk_level:'READ',async execute(input){const flight=Number(input.flight ?? 52400); const hotel=Number(input.hotel ?? 36400); const local=Number(input.local ?? 18000); const food=Number(input.food ?? 12000); return {status:'success',total:flight+hotel+local+food,currency:'INR',breakdown:{flight,hotel,local,food}}}},
 book_flight:{name:'book_flight',description:'Book a selected flight after server-side approval.',risk_level:'IRREVERSIBLE',async execute(input){return {status:'success',booking_id:'MOCK-BKG-9001',confirmation:`Flight ${input.flight_id ?? 'FL-101'} booked successfully.`}}}
};
export function getTool(name:string){return tools[name];}
export function listTools(){return Object.values(tools).map(({name,description,risk_level})=>({name,description,risk_level}));}
