
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Sparkles, User, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: '1',
    content: "Hi there! I'm your MindTrack assistant. How are you feeling today?",
    sender: 'ai',
    timestamp: new Date()
  }
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  
  // Mood suggestions that appear as chips
  const moodSuggestions = [
    'Happy', 'Stressed', 'Tired', 'Motivated', 'Anxious'
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!input.trim() && !e?.target) return;
    
    // Use the clicked mood suggestion or the input text
    const messageText = typeof e?.target === 'string' ? e.target : input;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(msgs => [...msgs, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      // Generate AI response based on mood
      let response = '';
      const lowerCaseMsg = messageText.toLowerCase();
      
      if (lowerCaseMsg.includes('happy') || lowerCaseMsg.includes('good') || lowerCaseMsg.includes('great')) {
        response = "That's wonderful to hear! When you're in a positive mood, it's a great time to tackle challenging tasks. Would you like some suggestions for making the most of your productive state?";
      } else if (lowerCaseMsg.includes('stress') || lowerCaseMsg.includes('anxious') || lowerCaseMsg.includes('worried')) {
        response = "I'm sorry to hear you're feeling stressed. This can definitely impact your focus and learning. Would you like to try a quick 2-minute breathing exercise that can help reduce anxiety?";
      } else if (lowerCaseMsg.includes('tired') || lowerCaseMsg.includes('exhausted')) {
        response = "Feeling tired can make studying difficult. Consider taking a short 20-minute power nap or going for a brief walk outside. Studies show both can improve alertness. Would you like more energy-boosting tips?";
      } else if (lowerCaseMsg.includes('motivated')) {
        response = "It's great that you're feeling motivated! This is a perfect time to work on your most challenging assignments or start projects you've been putting off. Would you like me to help you prioritize your tasks?";
      } else {
        response = "Thanks for sharing how you're feeling. Your emotional state can significantly impact your learning. Would you like some personalized suggestions based on your current mood?";
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(msgs => [...msgs, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleMoodSelect = (mood: string) => {
    handleSend({ target: mood, preventDefault: () => {} } as any);
  };

  return (
    <div className="flex flex-col h-full bg-muted/20 rounded-xl overflow-hidden border shadow-subtle">
      {/* Chat header */}
      <div className="bg-card p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-mindtrack-blue flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-medium">MindTrack Assistant</h3>
            <p className="text-xs text-muted-foreground">AI-powered support for your academic journey</p>
          </div>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={cn(
              "flex items-start gap-3 animate-fade-in",
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
        ))}
        
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-mindtrack-blue flex-shrink-0 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div className="rounded-2xl rounded-tl-none bg-mindtrack-blue/10 px-4 py-3 flex items-center gap-1">
              <Loader2 className="h-4 w-4 animate-spin text-mindtrack-blue" />
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        )}
        
        <div ref={endOfMessagesRef} />
      </div>
      
      {/* Quick mood selections */}
      {messages.length <= 2 && (
        <div className="p-4 border-t bg-card">
          <div className="mb-2">
            <p className="text-sm text-muted-foreground">How are you feeling today?</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {moodSuggestions.map(mood => (
              <Button 
                key={mood}
                variant="outline" 
                size="sm" 
                onClick={() => handleMoodSelect(mood)}
                className="rounded-full text-sm hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {mood}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      {/* Input area */}
      <form onSubmit={handleSend} className="p-4 border-t bg-card flex items-center gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-full border-muted-foreground/20 focus-visible:ring-primary"
        />
        <Button 
          type="submit" 
          size="icon" 
          className="rounded-full bg-primary hover:bg-primary/90 transition-colors"
          disabled={!input.trim() || isTyping}
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInterface;
