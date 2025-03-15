
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import ConversationActions from '@/components/ConversationActions';
import { Message } from '@/components/ChatBubble';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showClearWarning, setShowClearWarning] = useState(false);
  
  // Function to update messages (will be passed to ChatInterface)
  const updateMessages = (newMessages: Message[]) => {
    setMessages(newMessages);
  };
  
  const handleClearChat = () => {
    if (messages.length > 0) {
      setShowClearWarning(true);
    }
  };
  
  const confirmClearChat = () => {
    setMessages([]);
    setShowClearWarning(false);
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tl from-mindtrack-blue/5 to-mindtrack-purple/5">
      <Header />
      <main className="flex-1 container-page section-spacing pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-mindtrack-blue to-mindtrack-purple">
            AI-Powered Mood Support
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Chat with your AI assistant to track your mood and get personalized insights
          </p>
        </motion.div>
        <motion.div 
          className="max-w-3xl mx-auto h-[600px]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <ChatInterface onMessagesUpdate={updateMessages} />
          
          <ConversationActions 
            messages={messages} 
            onClearChat={handleClearChat} 
          />
          
          <Dialog open={showClearWarning} onOpenChange={setShowClearWarning}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Clear conversation?
                </DialogTitle>
                <DialogDescription>
                  This will delete all messages in this conversation. This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowClearWarning(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmClearChat}>
                  Clear conversation
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Chat;
