export interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  aiSummary: string[];
  time: string;
  read: boolean;
}
