
import { useEffect } from 'react';
import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Chat = () => {
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
          <ChatInterface />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Chat;
