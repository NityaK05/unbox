import { Badge } from "./ui/badge";

interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  aiSummary: string[];
  time: string;
  read: boolean;
}

interface EmailCardProps {
  email: Email;
  isCardView: boolean;
}

export function EmailCard({ email, isCardView }: EmailCardProps) {
  if (isCardView) {
    return (
      <div className="bg-card border border-border rounded-xl p-4 mb-3 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-medium text-foreground">{email.sender}</h3>
            <p className="text-muted-foreground text-sm mt-1">{email.time}</p>
          </div>
          {!email.read && (
            <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></div>
          )}
        </div>
        
        <h4 className="font-medium text-foreground mb-2 leading-tight">
          {email.subject}
        </h4>
        
        <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
          {email.preview}
        </p>
        
        <div className="flex flex-wrap gap-1.5">
          {email.aiSummary.map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs px-2 py-1 bg-blue-50 text-blue-700 border-blue-200"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center px-4 py-3 border-b border-border bg-background">
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-medium text-foreground truncate">{email.sender}</h3>
          <span className="text-muted-foreground text-sm ml-2 flex-shrink-0">{email.time}</span>
        </div>
        <h4 className="font-medium text-foreground mb-1 truncate">{email.subject}</h4>
        <p className="text-muted-foreground text-sm truncate">{email.preview}</p>
      </div>
      {!email.read && (
        <div className="w-2 h-2 bg-blue-500 rounded-full ml-3 flex-shrink-0"></div>
      )}
    </div>
  );
}