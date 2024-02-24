import { Host } from './host';

export type Comment = {
  id: string;
  date: Date;
  user: Host;
  comment: string;
  rating: number;
}
