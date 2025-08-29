import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { SwipeableEmailCard } from "./SwipeableEmailCard";

interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  aiSummary: string[];
  time: string;
  read: boolean;
}

interface EmailDeckProps {
  emails: Email[];
}

export function EmailDeck({ emails }: EmailDeckProps) {
  const [currentEmails, setCurrentEmails] = useState(emails);
  const [swipedIds, setSwipedIds] = useState<Set<string>>(new Set());

  const handleSwipe = (emailId: string) => {
    setSwipedIds(prev => new Set([...prev, emailId]));
    
    // Remove the card after animation completes
    setTimeout(() => {
      setCurrentEmails(prev => prev.filter(email => email.id !== emailId));
    }, 300);
  };

  const visibleEmails = currentEmails.filter(email => !swipedIds.has(email.id));

  if (visibleEmails.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="w-20 h-20 bg-card rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-border/50">
            <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl text-foreground mb-3">All caught up!</h3>
          <p className="text-muted-foreground">You've reviewed all your emails.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Card stack container with proper padding for shadows */}
      <div className="absolute inset-4">
        <AnimatePresence>
          {visibleEmails.slice(0, 3).map((email, index) => (
            <SwipeableEmailCard
              key={email.id}
              email={email}
              onSwipe={() => handleSwipe(email.id)}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>
      
      {/* Email counter */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/25 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm shadow-lg border border-white/10">
          {visibleEmails.length} remaining
        </div>
      </div>
    </div>
  );
}