import { Button } from "./ui/button";
import { Grid3X3, List } from "lucide-react";

interface MailHeaderProps {
  isCardView: boolean;
  onToggleView: () => void;
  emailCount?: number;
}

export function MailHeader({ isCardView, onToggleView, emailCount = 0 }: MailHeaderProps) {
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-background border-b border-border">
      <div>
        <h1 className="font-semibold text-foreground">
          {isCardView ? "Email Cards" : "Mailbox"}
        </h1>
        <p className="text-muted-foreground text-sm">
          {isCardView 
            ? `${emailCount} cards to review` 
            : `${emailCount} new messages`
          }
        </p>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleView}
        className="p-2 h-8 w-8"
      >
        {isCardView ? (
          <List className="h-4 w-4" />
        ) : (
          <Grid3X3 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}