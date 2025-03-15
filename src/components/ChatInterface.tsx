
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Sparkles, User, Loader2, Settings, Save, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateAIResponse } from '@/utils/openai';
import ApiKeyModal from '@/components/ApiKeyModal';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import ChatBubble from '@/components/ChatBubble';

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

type ConversationHistory = Array<{
  role: 'user' | 'assistant';
  content: string;
}>;

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ConversationHistory>([]);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Mood suggestions that appear as chips
  const moodSuggestions = [
    'Happy', 'Stressed', 'Tired', 'Motivated', 'Anxious'
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Check if API key exists on component mount
    const apiKey = localStorage.getItem('openai_api_key');
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please add your OpenAI API key to enable AI chat responses.",
        action: (
          <Button variant="outline" size="sm" onClick={() => setApiKeyModalOpen(true)}>
            Add Key
          </Button>
        ),
      });
    }
  }, [toast]);

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
    
    // Update conversation history
    const updatedHistory: ConversationHistory = [
      ...conversationHistory,
      { role: 'user', content: messageText }
    ];
    
    setConversationHistory(updatedHistory);
    
    // Get AI response
    const response = await generateAIResponse(messageText, updatedHistory);
    
    if (response.success) {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.message,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(msgs => [...msgs, aiMessage]);
      
      // Update conversation history with AI response
      setConversationHistory([
        ...updatedHistory,
        { role: 'assistant', content: response.message }
      ]);
    } else {
      // Show error message
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I'm having trouble connecting to my AI. ${response.message}`,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(msgs => [...msgs, aiMessage]);
    }
    
    setIsTyping(false);
  };

  const handleMoodSelect = (mood: string) => {
    handleSend({ target: mood, preventDefault: () => {} } as any);
  };

  const saveConversation = () => {
    // Create a file to download with the chat history
    const chatData = {
      messages: messages,
      timestamp: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindtrack-chat-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Chat Saved",
      description: "Your conversation has been downloaded successfully.",
    });
  };

  return (
    <div className="flex flex-col h-full bg-muted/20 rounded-xl overflow-hidden border shadow-subtle">
      {/* Chat header */}
      <div className="bg-card p-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-mindtrack-blue flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-medium">MindTrack Assistant</h3>
            <p className="text-xs text-muted-foreground">AI-powered support for your academic journey</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={saveConversation}
            title="Save Chat"
            className="text-mindtrack-blue hover:text-mindtrack-blue/80 hover:bg-mindtrack-blue/10"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setApiKeyModalOpen(true)}
            title="API Settings"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-muted/10 to-background/20">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * Math.min(index, 5) }}
          >
            <ChatBubble message={message} />
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3"
          >
            <div className="h-8 w-8 rounded-full bg-mindtrack-blue flex-shrink-0 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div className="rounded-2xl rounded-tl-none bg-mindtrack-blue/10 px-4 py-3 flex items-center gap-1">
              <Loader2 className="h-4 w-4 animate-spin text-mindtrack-blue" />
              <span className="text-sm">Thinking...</span>
            </div>
          </motion.div>
        )}
        
        <div ref={endOfMessagesRef} />
      </div>
      
      {/* Quick mood selections */}
      {messages.length <= 2 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="p-4 border-t bg-card"
        >
          <div className="mb-2">
            <p className="text-sm text-muted-foreground">How are you feeling today?</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {moodSuggestions.map((mood, index) => (
              <motion.div
                key={mood}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
              >
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleMoodSelect(mood)}
                  className="rounded-full text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {mood}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
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

      {/* API Key Modal */}
      <ApiKeyModal open={apiKeyModalOpen} onOpenChange={setApiKeyModalOpen} />
    </div>
  );
};

export default ChatInterface;
