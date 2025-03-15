
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart2, Heart, BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-[400px] opacity-20 bg-gradient-to-b from-mindtrack-purple/30 via-mindtrack-teal/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-[300px] opacity-10 bg-gradient-to-t from-mindtrack-blue/20 to-transparent blur-3xl" />
        <div className="absolute left-1/3 top-1/3 w-64 h-64 bg-mindtrack-teal/20 rounded-full blur-3xl" />
      </div>

      <div className="container-page relative">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="bg-foreground/5 text-foreground/80 backdrop-blur-sm rounded-full py-2 px-4 inline-flex items-center gap-2 mb-4 border border-foreground/10 shadow-subtle animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mindtrack-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-mindtrack-green"></span>
            </span>
            <span className="text-sm font-medium">Introducing MindTrack for Students</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight animate-scale-in text-balance">
            Connect your <span className="text-mindtrack-blue">mental wellbeing</span> to academic <span className="text-mindtrack-purple">success</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mt-6 animate-fade-in delay-200 text-balance">
            Track your mood, understand your performance patterns, and get AI-powered recommendations to improve your academic journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center items-center animate-slide-up">
            <Link to="/chat">
              <Button className="button-primary w-full sm:w-auto h-12 text-base gap-2 group">
                Try AI Chat
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" className="button-secondary w-full sm:w-auto h-12 text-base">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Heart className="h-5 w-5 text-mindtrack-pink" />,
              title: "Mood Tracking",
              description: "Log your daily emotions and see patterns over time"
            },
            {
              icon: <BarChart2 className="h-5 w-5 text-mindtrack-blue" />,
              title: "Performance Insights",
              description: "Understand how your mood affects academic performance"
            },
            {
              icon: <BrainCircuit className="h-5 w-5 text-mindtrack-purple" />,
              title: "AI Recommendations",
              description: "Get personalized suggestions to improve your wellbeing"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="glass-card rounded-2xl p-6 backdrop-blur-sm animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="rounded-full bg-foreground/5 w-10 h-10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
