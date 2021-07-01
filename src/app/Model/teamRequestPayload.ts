import { TeamMembersPayload } from './teamMembersPayload';

export interface TeamRequestPayload {
  name: string;
  description: string;
  email: string;
  maxMembers: number;
  city: string;
  contact: string;
  members: TeamMembersPayload[];
}
