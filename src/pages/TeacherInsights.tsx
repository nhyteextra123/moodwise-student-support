
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { GraduationCap, Users, TrendingUp, AlertTriangle } from 'lucide-react';

// Sample class mood data
const classMoodData = [
  { week: 'Week 1', averageMood: 3.7, attendance: 92 },
  { week: 'Week 2', averageMood: 3.5, attendance: 88 },
  { week: 'Week 3', averageMood: 3.2, attendance: 84 },
  { week: 'Week 4', averageMood: 3.9, attendance: 93 },
  { week: 'Week 5', averageMood: 4.1, attendance: 95 },
  { week: 'Week 6', averageMood: 3.8, attendance: 91 },
];

// Sample at-risk students data
const atRiskStudents = [
  { id: 1, name: 'Alex Johnson', mood: 2.1, performance: 'Declining', lastActivity: '2 days ago', risk: 'High' },
  { id: 2, name: 'Jamie Smith', mood: 2.4, performance: 'Stable', lastActivity: '1 day ago', risk: 'Medium' },
  { id: 3, name: 'Taylor Wilson', mood: 2.3, performance: 'Declining', lastActivity: '3 days ago', risk: 'High' },
  { id: 4, name: 'Jordan Richards', mood: 2.8, performance: 'Improving', lastActivity: 'Today', risk: 'Medium' },
  { id: 5, name: 'Casey Brown', mood: 2.2, performance: 'Stable', lastActivity: '5 days ago', risk: 'High' },
];

// Sample class performance data
const classPerformanceData = [
  { subject: 'Math', avgScore: 78, previousAvg: 75, change: '+3%' },
  { subject: 'Science', avgScore: 82, previousAvg: 80, change: '+2%' },
  { subject: 'English', avgScore: 85, previousAvg: 88, change: '-3%' },
  { subject: 'History', avgScore: 79, previousAvg: 76, change: '+3%' },
  { subject: 'Art', avgScore: 91, previousAvg: 92, change: '-1%' },
];

// Sample subject correlation data
const subjectMoodCorrelation = [
  { subject: 'Math', correlation: 0.72 },
  { subject: 'Science', correlation: 0.65 },
  { subject: 'English', correlation: 0.58 },
  { subject: 'History', correlation: 0.48 },
  { subject: 'Art', correlation: 0.81 },
];

const TeacherInsights = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [isAuthenticated, navigate]);
  
  // Format mood score to display with a smiley face
  const formatMoodScore = (score: number) => {
    let emoji = '😐';
    if (score <= 2) emoji = '😔';
    else if (score <= 3) emoji = '😐';
    else if (score <= 4) emoji = '🙂';
    else emoji = '😄';
    
    return (
      <span className="flex items-center gap-1">
        {score.toFixed(1)} {emoji}
      </span>
    );
  };
  
  // Custom tooltip for charts
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
            Teacher Insights
          </h1>
          <p className="text-muted-foreground mb-6">
            Anonymized class report to understand mental health trends affecting student engagement
          </p>
        </motion.div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 border shadow-subtle">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-mindtrack-blue/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-mindtrack-blue" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Class Average Mood</p>
                <h4 className="text-2xl font-semibold">3.8/5.0</h4>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border shadow-subtle">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-mindtrack-green/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-mindtrack-green" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Class Performance</p>
                <h4 className="text-2xl font-semibold">82%</h4>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border shadow-subtle">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-mindtrack-purple/10 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-mindtrack-purple" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
                <h4 className="text-2xl font-semibold">91%</h4>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border shadow-subtle">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-mindtrack-coral/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-mindtrack-coral" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">At-Risk Students</p>
                <h4 className="text-2xl font-semibold">5</h4>
              </div>
            </div>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
            <TabsTrigger value="overview">Class Overview</TabsTrigger>
            <TabsTrigger value="at-risk">At-Risk Students</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 border shadow-subtle">
                <h3 className="text-lg font-medium mb-4">Class Mood & Attendance Trends</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={classMoodData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="week" />
                      <YAxis yAxisId="left" domain={[0, 5]} />
                      <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="averageMood"
                        stroke="#AF52DE"
                        name="Average Mood"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="attendance"
                        stroke="#007AFF"
                        name="Attendance %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              <Card className="p-6 border shadow-subtle">
                <h3 className="text-lg font-medium mb-4">Subject-Mood Correlation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Higher correlation indicates stronger relationship between student mood and performance
                </p>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={subjectMoodCorrelation}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis type="number" domain={[0, 1]} />
                      <YAxis dataKey="subject" type="category" />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="correlation" name="Correlation" fill="#AF52DE" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="at-risk">
            <Card className="p-6 border shadow-subtle">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-mindtrack-coral" />
                Students Needing Attention
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                These students have shown signs of declining mood or performance and may need support
              </p>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Mood Score</TableHead>
                      <TableHead>Performance Trend</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead>Risk Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {atRiskStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{formatMoodScore(student.mood)}</TableCell>
                        <TableCell>{student.performance}</TableCell>
                        <TableCell>{student.lastActivity}</TableCell>
                        <TableCell>
                          <span 
                            className={`px-2 py-1 rounded-full text-xs ${
                              student.risk === 'High' 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {student.risk}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> This data is anonymized and for educational purposes only. In a real 
                  implementation, privacy concerns would be addressed and proper consent obtained.
                </p>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance">
            <Card className="p-6 border shadow-subtle">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-mindtrack-purple" />
                Class Performance by Subject
              </h3>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Current Average</TableHead>
                      <TableHead>Previous Period</TableHead>
                      <TableHead>Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classPerformanceData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.subject}</TableCell>
                        <TableCell>{item.avgScore}%</TableCell>
                        <TableCell>{item.previousAvg}%</TableCell>
                        <TableCell>
                          <span 
                            className={`px-2 py-1 rounded-full text-xs ${
                              item.change.startsWith('+') 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {item.change}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-8">
                <h4 className="text-md font-medium mb-4">AI-Generated Insights</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Math Performance:</strong> Students reporting higher mood scores (4-5) showed a 15% improvement 
                      in math performance compared to those with lower mood scores (1-2).
                    </p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-sm text-purple-800">
                      <strong>Art Correlation:</strong> The strongest mood-performance correlation is in Art classes, 
                      suggesting creative activities may have a positive impact on student wellbeing.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Recommendation:</strong> Consider implementing short mindfulness exercises before 
                      challenging subjects like Math and Science, which show strong mood-performance correlations.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default TeacherInsights;
