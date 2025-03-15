
import { useEffect } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import MoodTracker from '@/components/MoodTracker';
import MoodInsights from '@/components/MoodInsights';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

const DashboardPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Animation variants for staggered content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-mindtrack-blue/5 to-mindtrack-purple/5">
      <Header />
      <main className="flex-1 container-page section-spacing pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-mindtrack-blue to-mindtrack-purple">
            Your Performance Dashboard
          </h1>
          <p className="text-muted-foreground mb-4">Track your mood patterns and academic performance over time.</p>
          
          <Alert className="mb-6 bg-mindtrack-blue/5 border-mindtrack-blue/20">
            <InfoIcon className="h-4 w-4 text-mindtrack-blue" />
            <AlertTitle>Enhanced Analytics</AlertTitle>
            <AlertDescription>
              Your dashboard now shows correlations between your mood and academic performance with AI-powered insights.
            </AlertDescription>
          </Alert>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-1 space-y-6"
          >
            <MoodTracker />
            <MoodInsights />
          </motion.div>
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <Dashboard />
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
