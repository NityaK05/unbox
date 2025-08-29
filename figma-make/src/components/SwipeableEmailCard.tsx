import { motion, useMotionValue, useTransform, PanInfo } from "motion/react";
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

interface SwipeableEmailCardProps {
  email: Email;
  onSwipe: () => void;
  index: number;
}

export function SwipeableEmailCard({ email, onSwipe, index }: SwipeableEmailCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    
    if (Math.abs(info.offset.x) > threshold) {
      onSwipe();
    }
  };

  // Calculate shadow and positioning based on stack position
  const isActive = index === 0;
  const isPeeking = index > 0 && index < 3;
  
  const shadowIntensity = Math.max(0.4 - index * 0.15, 0.1);
  const cardScale = 1 - index * 0.02;
  const cardY = index * 4;
  const cardRotation = index * 1.5;

  return (
    <motion.div
      className={`absolute inset-0 bg-card rounded-2xl overflow-hidden ${
        isActive ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
      }`}
      style={{
        x: isActive ? x : 0,
        rotate: isActive ? rotate : cardRotation,
        opacity: isPeeking ? 0.95 : opacity,
        zIndex: 10 - index,
        boxShadow: `
          0 ${4 + index * 2}px ${8 + index * 4}px rgba(0, 0, 0, ${shadowIntensity * 0.15}),
          0 ${8 + index * 4}px ${16 + index * 8}px rgba(0, 0, 0, ${shadowIntensity * 0.1}),
          0 ${16 + index * 8}px ${32 + index * 16}px rgba(0, 0, 0, ${shadowIntensity * 0.05})
        `,
      }}
      drag={isActive ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={isActive ? handleDragEnd : undefined}
      animate={{
        scale: cardScale,
        y: cardY,
        rotate: isActive ? 0 : cardRotation,
      }}
      exit={{
        x: 400,
        opacity: 0,
        rotate: 15,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25,
        }
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* Card border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
      
      <div className="h-full flex flex-col p-8 relative">
        {/* Header with sender and time */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <h1 className="text-2xl text-foreground">{email.sender}</h1>
            <p className="text-muted-foreground mt-2">{email.time}</p>
          </div>
          {!email.read && (
            <div className="w-3 h-3 bg-blue-500 rounded-full ml-4 mt-2 flex-shrink-0 shadow-lg"></div>
          )}
        </div>

        {/* Subject */}
        <div className="mb-8">
          <h2 className="text-xl text-foreground leading-tight">
            {email.subject}
          </h2>
        </div>

        {/* Preview content */}
        <div className="flex-1 mb-8">
          <p className="text-foreground leading-relaxed text-lg opacity-90">
            {email.preview}
          </p>
        </div>

        {/* AI Summary chips at bottom */}
        <div className="flex flex-wrap gap-3 pt-4">
          {email.aiSummary.map((tag, tagIndex) => (
            <Badge 
              key={tagIndex} 
              variant="secondary" 
              className="text-sm px-4 py-2 bg-blue-50 text-blue-700 border-blue-200 rounded-full shadow-sm"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Swipe indicator */}
        {isActive && (
          <div className="flex justify-center mt-8 mb-2">
            <div className="flex gap-2">
              <div className="w-1 h-1 bg-muted-foreground/40 rounded-full"></div>
              <div className="w-1 h-1 bg-muted-foreground/40 rounded-full"></div>
              <div className="w-1 h-1 bg-muted-foreground/40 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}