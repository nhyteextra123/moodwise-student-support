
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis,
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Brain, Lightbulb, Zap } from 'lucide-react';

// Sample correlation data
const moodPerformanceData = [
  { mood: 1, performance: 50, subject: 'Math', size: 20 },
  { mood: 2, performance: 60, subject: 'Math', size: 20 },
  { mood: 3, performance: 70, subject: 'Math', size: 20 },
  { mood: 4, performance: 85, subject: 'Math', size: 20 },
  { mood: 5, performance: 95, subject: 'Math', size: 20 },
  { mood: 1, performance: 55, subject: 'Science', size: 20 },
  { mood: 2, performance: 65, subject: 'Science', size: 20 },
  { mood: 3, performance: 75, subject: 'Science', size: 20 },
  { mood: 4, performance: 80, subject: 'Science', size: 20 },
  { mood: 5, performance: 90, subject: 'Science', size: 20 },
  { mood: 1, performance: 60, subject: 'English', size: 20 },
  { mood: 2, performance: 70, subject: 'English', size: 20 },
  { mood: 3, performance: 80, subject: 'English', size: 20 },
  { mood: 4, performance: 85, subject: 'English', size: 20 },
  { mood: 5, performance: 95, subject: 'English', size: 20 },
  { mood: 1, performance: 45, subject: 'History', size: 20 },
  { mood: 2, performance: 55, subject: 'History', size: 20 },
  { mood: 3, performance: 65, subject: 'History', size: 20 },
  { mood: 4, performance: 75, subject: 'History', size: 20 },
  { mood: 5, performance: 85, subject: 'History', size: 20 },
];

// AI insights based on correlations
const aiInsights = [
  {
    id: 1,
    title: 'Strong Correlation Detected',
    content: 'There is a strong positive correlation (r=0.87) between your mood ratings and academic performance, particularly in Math and English.',
    icon: <Zap className="h-5 w-5 text-mindtrack-blue" />,
    color: 'bg-mindtrack-blue/10 text-mindtrack-blue'
  },
  {
    id: 2,
    title: 'Performance Optimization',
    content: 'Your optimal performance occurs when your mood rating is 4 or higher. Consider scheduling challenging tasks during these periods.',
    icon: <Lightbulb className="h-5 w-5 text-mindtrack-green" />,
    color: 'bg-mindtrack-green/10 text-mindtrack-green'
  },
  {
    id: 3,
    title: 'Subject-Specific Pattern',
    content: 'History shows the weakest mood-performance correlation. This suggests other factors may have more influence on your performance in this subject.',
    icon: <Brain className="h-5 w-5 text-mindtrack-purple" />,
    color: 'bg-mindtrack-purple/10 text-mindtrack-purple'
  }
];

// Custom tooltip for scatter chart
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background/95 backdrop-blur-sm p-3 rounded-lg border shadow-lg">
        <p className="font-medium">Subject: {data.subject}</p>
        <p className="text-sm">Mood: {data.mood}/5</p>
        <p className="text-sm">Performance: {data.performance}%</p>
      </div>
    );
  }
  return null;
};

const AiCorrelation = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  
  const filteredData = selectedSubject === 'all' 
    ? moodPerformanceData 
    : moodPerformanceData.filter(item => item.subject === selectedSubject);
  
  const subjectColors: Record<string, string> = {
    'Math': '#007AFF',
    'Science': '#34C759',
    'English': '#AF52DE',
    'History': '#FF9500'
  };

  return (
    <Card className="border shadow-subtle p-6">
      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
        <Brain className="h-5 w-5 text-mindtrack-purple" />
        AI-Powered Correlation Analysis
      </h3>
      
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              type="number" 
              dataKey="mood" 
              name="Mood" 
              domain={[0, 5.5]} 
              tickCount={6} 
              label={{ value: 'Mood Rating', position: 'bottom', offset: 0 }} 
            />
            <YAxis 
              type="number" 
              dataKey="performance" 
              name="Performance" 
              domain={[40, 100]} 
              label={{ value: 'Performance %', angle: -90, position: 'left' }} 
            />
            <ZAxis type="number" dataKey="size" range={[60, 60]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {selectedSubject === 'all' ? (
              Object.keys(subjectColors).map(subject => (
                <Scatter 
                  key={subject}
                  name={subject} 
                  data={moodPerformanceData.filter(item => item.subject === subject)} 
                  fill={subjectColors[subject as keyof typeof subjectColors]} 
                />
              ))
            ) : (
              <Scatter 
                name={selectedSubject} 
                data={filteredData} 
                fill={subjectColors[selectedSubject as keyof typeof subjectColors] || '#007AFF'} 
              />
            )}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mb-6 flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedSubject('all')}
          className={`px-3 py-1 rounded-md text-sm ${
            selectedSubject === 'all' 
              ? 'bg-primary text-white' 
              : 'bg-secondary'
          }`}
        >
          All Subjects
        </button>
        {Object.keys(subjectColors).map(subject => (
          <button
            key={subject}
            onClick={() => setSelectedSubject(subject)}
            className={`px-3 py-1 rounded-md text-sm ${
              selectedSubject === subject 
                ? 'bg-primary text-white' 
                : 'bg-secondary'
            }`}
            style={selectedSubject === subject ? {} : { borderLeft: `3px solid ${subjectColors[subject as keyof typeof subjectColors]}` }}
          >
            {subject}
          </button>
        ))}
      </div>
      
      <div className="space-y-4">
        <h4 className="font-medium">AI-Generated Insights</h4>
        {aiInsights.map(insight => (
          <div 
            key={insight.id}
            className={`p-4 rounded-lg border flex gap-3 ${insight.color.split(' ')[0]} border-${insight.color.split(' ')[0]}/20`}
          >
            <div className="mt-1">{insight.icon}</div>
            <div>
              <h5 className="font-medium mb-1">{insight.title}</h5>
              <p className="text-sm text-muted-foreground">{insight.content}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AiCorrelation;
