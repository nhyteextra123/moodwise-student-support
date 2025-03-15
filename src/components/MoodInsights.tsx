
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, ArrowUpRight, TrendingUp, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const MoodInsights = () => {
  const insights = [
    {
      title: "Peak Productivity Times",
      description: "Your productivity is highest between 9-11 AM when your mood is typically rated 4 or higher.",
      icon: <Clock className="h-5 w-5 text-mindtrack-green" />,
      color: "bg-mindtrack-green/10"
    },
    {
      title: "Subject Correlations",
      description: "Math work correlates with higher moods, while History shows lower mood ratings. Consider varying your study approach.",
      icon: <Brain className="h-5 w-5 text-mindtrack-blue" />,
      color: "bg-mindtrack-blue/10"
    },
    {
      title: "Weekly Patterns",
      description: "Wednesdays show dips in mood and productivity. Plan lighter workloads or extra breaks mid-week.",
      icon: <Calendar className="h-5 w-5 text-mindtrack-purple" />,
      color: "bg-mindtrack-purple/10"
    },
    {
      title: "Growth Trend",
      description: "Your overall mood has improved 15% this month compared to last month, with corresponding productivity gains.",
      icon: <TrendingUp className="h-5 w-5 text-mindtrack-coral" />,
      color: "bg-mindtrack-coral/10"
    }
  ];

  return (
    <Card className="border shadow-subtle overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-mindtrack-purple" />
          AI Mood Insights
        </CardTitle>
        <CardDescription>
          Personalized insights based on your mood and productivity patterns
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`${insight.color} p-4 rounded-lg hover:shadow-sm transition-shadow`}
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="mt-0.5">
                  {insight.icon}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {insight.description}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MoodInsights;
