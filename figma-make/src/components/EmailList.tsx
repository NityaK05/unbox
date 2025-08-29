import { EmailCard } from "./EmailCard";
import { ScrollArea } from "./ui/scroll-area";

interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  aiSummary: string[];
  time: string;
  read: boolean;
}

interface EmailListProps {
  emails: Email[];
  isCardView: boolean;
}

export function EmailList({ emails, isCardView }: EmailListProps) {
  return (
    <ScrollArea className="flex-1">
      <div className={isCardView ? "p-4" : ""}>
        {emails.map((email) => (
          <EmailCard 
            key={email.id} 
            email={email} 
            isCardView={isCardView}
          />
        ))}
      </div>
    </ScrollArea>
  );
}