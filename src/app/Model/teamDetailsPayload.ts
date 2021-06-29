export interface TeamDetailsPayload {
  name: string;
  description: string;
  members: TeamDetailsPayload[];
}
