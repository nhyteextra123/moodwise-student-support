
import { 
  MessageSquare, 
  LineChart, 
  Users, 
  Brain,  
  Clock, 
  CheckCheck 
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <MessageSquare className="h-6 w-6 text-mindtrack-blue" />,
      title: "AI Chatbot",
      description: "Daily check-ins with our AI chatbot that logs your mood and provides personalized suggestions.",
      color: "bg-mindtrack-blue/10",
    },
    {
      icon: <LineChart className="h-6 w-6 text-mindtrack-green" />,
      title: "Performance Dashboard",
      description: "View your mood trends alongside academic performance to identify patterns affecting productivity.",
      color: "bg-mindtrack-green/10",
    },
    {
      icon: <Users className="h-6 w-6 text-mindtrack-purple" />,
      title: "Teacher Insights",
      description: "Anonymized class reports help teachers understand mental health trends affecting student engagement.",
      color: "bg-mindtrack-purple/10",
    },
    {
      icon: <Brain className="h-6 w-6 text-mindtrack-indigo" />,
      title: "AI-Powered Correlation",
      description: "Analyzes student responses and study habits to provide data-driven insights and recommendations.",
      color: "bg-mindtrack-indigo/10",
    },
    {
      icon: <Clock className="h-6 w-6 text-mindtrack-orange" />,
      title: "Focus Enhancement",
      description: "AI-recommended breathing exercises and time management strategies to improve concentration.",
      color: "bg-mindtrack-orange/10",
    },
    {
      icon: <CheckCheck className="h-6 w-6 text-mindtrack-teal" />,
      title: "LMS Integration",
      description: "Connects with your learning management systems to track academic performance in relation to wellbeing.",
      color: "bg-mindtrack-teal/10",
    }
  ];

  return (
    <section className="section-spacing bg-muted/30">
      <div className="container-page">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Comprehensive Features for Student Success</h2>
          <p className="text-lg text-muted-foreground">
            MindTrack combines mental wellbeing tracking with academic performance analysis to help students thrive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card border rounded-2xl p-6 shadow-subtle transition-all duration-300 hover:shadow-apple group"
            >
              <div className={`rounded-xl ${feature.color} w-12 h-12 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
