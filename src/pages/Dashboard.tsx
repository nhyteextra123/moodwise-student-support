
import { useEffect } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import MoodTracker from '@/components/MoodTracker';
import Footer from '@/components/Footer';

const DashboardPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container-page section-spacing pt-32">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Your Performance Dashboard</h1>
        <p className="text-muted-foreground mb-8">Track your mood patterns and academic performance over time.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <MoodTracker />
          </div>
          <div className="lg:col-span-2">
            <Dashboard />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
