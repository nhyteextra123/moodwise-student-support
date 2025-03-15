
import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, User } from 'lucide-react';

type ChatBubbleProps = {
  message: {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
  };
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  return (
    <div 
      className={cn(
        "flex items-start gap-3",
        message.sender === 'user' ? "flex-row-reverse" : ""
      )}
    >
      <div className={cn(
        "h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center",
        message.sender === 'user' 
          ? "bg-mindtrack-purple" 
          : "bg-mindtrack-blue"
      )}>
        {message.sender === 'user' ? (
          <User className="h-4 w-4 text-white" />
        ) : (
          <Sparkles className="h-4 w-4 text-white" />
        )}
      </div>
      
      <div className={cn(
        "rounded-2xl px-4 py-3 max-w-[80%] text-sm",
        message.sender === 'user' 
          ? "bg-mindtrack-purple/10 rounded-tr-none" 
          : "bg-mindtrack-blue/10 rounded-tl-none"
      )}>
        {message.content}
      </div>
    </div>
  );
};

export default ChatBubble;
