
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUp, ArrowDown, TrendingUp, Brain, BookOpen, Clock } from 'lucide-react';

// Sample data for the charts
const moodData = [
  { day: 'Mon', mood: 3, productivity: 65 },
  { day: 'Tue', mood: 4, productivity: 80 },
  { day: 'Wed', mood: 2, productivity: 45 },
  { day: 'Thu', mood: 5, productivity: 90 },
  { day: 'Fri', mood: 3, productivity: 70 },
  { day: 'Sat', mood: 4, productivity: 75 },
  { day: 'Sun', mood: 5, productivity: 85 },
];

const weeklyData = [
  { week: 'Week 1', mood: 3.5, productivity: 72, studyHours: 18 },
  { week: 'Week 2', mood: 4.0, productivity: 78, studyHours: 22 },
  { week: 'Week 3', mood: 3.2, productivity: 65, studyHours: 15 },
  { week: 'Week 4', mood: 4.5, productivity: 85, studyHours: 24 },
];

const subjectData = [
  { name: 'Math', score: 85, mood: 4.2 },
  { name: 'Science', score: 78, mood: 3.8 },
  { name: 'English', score: 92, mood: 4.5 },
  { name: 'History', score: 74, mood: 3.2 },
  { name: 'Art', score: 88, mood: 4.7 },
];

// Custom tooltip component for the charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm p-3 rounded-lg border shadow-lg">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('daily');

  // Calculate some stats for the summary cards
  const moodAverage = moodData.reduce((acc, curr) => acc + curr.mood, 0) / moodData.length;
  const productivityAverage = moodData.reduce((acc, curr) => acc + curr.productivity, 0) / moodData.length;

  // Sample correlation value (in a real app, this would be calculated)
  const moodProductivityCorrelation = 0.75;  // Strong positive correlation

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border shadow-subtle">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-mindtrack-blue/10 flex items-center justify-center">
              <Brain className="h-6 w-6 text-mindtrack-blue" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Mood</p>
              <div className="flex items-center gap-2">
                <h4 className="text-2xl font-semibold">{moodAverage.toFixed(1)}/5</h4>
                <div className="flex items-center text-sm text-mindtrack-green">
                  <ArrowUp className="h-4 w-4" />
                  <span>10%</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4 border shadow-subtle">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-mindtrack-green/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-mindtrack-green" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Productivity</p>
              <div className="flex items-center gap-2">
                <h4 className="text-2xl font-semibold">{productivityAverage.toFixed(0)}%</h4>
                <div className="flex items-center text-sm text-mindtrack-coral">
                  <ArrowDown className="h-4 w-4" />
                  <span>5%</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4 border shadow-subtle">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-mindtrack-purple/10 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-mindtrack-purple" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Mood-Performance Correlation</p>
              <div className="flex items-center gap-2">
                <h4 className="text-2xl font-semibold">{(moodProductivityCorrelation * 100).toFixed(0)}%</h4>
                <div className="flex items-center text-sm text-mindtrack-green">
                  <span>Strong</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Charts */}
      <Card className="border shadow-subtle">
        <Tabs defaultValue="mood" className="p-4">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="mood">Mood Tracking</TabsTrigger>
              <TabsTrigger value="productivity">Productivity</TabsTrigger>
              <TabsTrigger value="subjects">Subject Performance</TabsTrigger>
            </TabsList>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => setTimeRange('daily')}
                className={`text-sm px-3 py-1 rounded-md ${timeRange === 'daily' ? 'bg-primary text-white' : 'bg-secondary'}`}
              >
                Daily
              </button>
              <button 
                onClick={() => setTimeRange('weekly')}
                className={`text-sm px-3 py-1 rounded-md ${timeRange === 'weekly' ? 'bg-primary text-white' : 'bg-secondary'}`}
              >
                Weekly
              </button>
            </div>
          </div>

          <TabsContent value="mood" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timeRange === 'daily' ? moodData : weeklyData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey={timeRange === 'daily' ? 'day' : 'week'} />
                <YAxis yAxisId="left" domain={[0, 5]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="mood"
                  stroke="#AF52DE"
                  activeDot={{ r: 8 }}
                  name="Mood Level"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="productivity"
                  stroke="#007AFF"
                  name="Productivity %"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="productivity" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={timeRange === 'daily' ? moodData : weeklyData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey={timeRange === 'daily' ? 'day' : 'week'} />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="productivity" name="Productivity %" fill="#007AFF" radius={[4, 4, 0, 0]} />
                {timeRange === 'weekly' && (
                  <Bar dataKey="studyHours" name="Study Hours" fill="#34C759" radius={[4, 4, 0, 0]} />
                )}
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="subjects" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={subjectData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="score" name="Score" fill="#007AFF" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Insights Card */}
      <Card className="p-6 border shadow-subtle">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Brain className="h-5 w-5 text-mindtrack-purple" />
          AI Insights & Recommendations
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-muted/40 rounded-lg">
            <h4 className="font-medium mb-1">Mood-Performance Pattern</h4>
            <p className="text-sm text-muted-foreground">
              Your data shows a strong correlation between your mood and academic performance. 
              On days when your mood rating is 4 or higher, your productivity increases by an average of 25%.
            </p>
          </div>
          
          <div className="p-4 bg-muted/40 rounded-lg">
            <h4 className="font-medium mb-1">Suggested Focus Times</h4>
            <p className="text-sm text-muted-foreground">
              Based on your mood patterns, your optimal study times appear to be in the morning between 9-11am 
              when your reported mood is consistently higher. Consider scheduling challenging tasks during this window.
            </p>
          </div>
          
          <div className="p-4 bg-muted/40 rounded-lg">
            <h4 className="font-medium mb-1">Subject-Specific Insights</h4>
            <p className="text-sm text-muted-foreground">
              Your mood tends to be lower when working on History assignments. Consider trying new study techniques 
              like visual timelines or discussion groups that might make this subject more engaging.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
