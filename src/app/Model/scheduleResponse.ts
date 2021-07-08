import { MatchResponse } from './matchResponse';

export interface ScheduleResponse {
  id: number;
  eventId: number;
  eventName: string;
  matches: MatchResponse[];
}
