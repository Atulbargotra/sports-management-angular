export interface EventResponsePayload {
  id: number;
  eventName: string;
  description: string;
  category: string;
  type: string;
  maxParticipant: number;
  totalRegistered: number;
  lastDate: string;
  eventDate: string;
  location: string;
}
