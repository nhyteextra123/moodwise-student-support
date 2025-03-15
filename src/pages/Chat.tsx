
import { useEffect } from 'react';
import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';
import Footer from '@/components/Footer';

const Chat = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container-page section-spacing pt-32">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">AI-Powered Mood Support</h1>
        <div className="max-w-3xl mx-auto h-[600px]">
          <ChatInterface />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Chat;
