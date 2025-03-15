
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Play, Pause, RotateCcw, Brain } from 'lucide-react';

const FocusTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentMode, setCurrentMode] = useState<'focus' | 'break'>('focus');
  const [focusTime, setFocusTime] = useState(25 * 60); // 25 minutes in seconds
  const [breakTime, setBreakTime] = useState(5 * 60); // 5 minutes in seconds
  const [totalTime, setTotalTime] = useState(focusTime);
  
  useEffect(() => {
    // Load focus settings from localStorage
    const savedFocusSettings = localStorage.getItem('focus_settings');
    if (savedFocusSettings) {
      const settings = JSON.parse(savedFocusSettings);
      setFocusTime(settings.focusTime * 60);
      setBreakTime(settings.breakTime * 60);
      setTotalTime(settings.focusTime * 60);
      setTimeLeft(settings.focusTime * 60);
    } else {
      setTimeLeft(focusTime);
    }
  }, []);
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // Timer complete
      const notification = localStorage.getItem('focus_settings') 
        ? JSON.parse(localStorage.getItem('focus_settings') || '{}').enableNotifications 
        : true;
      
      if (currentMode === 'focus') {
        if (notification) {
          toast("Focus session complete! Time for a break.", {
            description: "Take a short break to refresh your mind.",
          });
        }
        setCurrentMode('break');
        setTimeLeft(breakTime);
        setTotalTime(breakTime);
      } else {
        if (notification) {
          toast("Break time over!", {
            description: "Ready to focus again?",
          });
        }
        setCurrentMode('focus');
        setTimeLeft(focusTime);
        setTotalTime(focusTime);
      }
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, currentMode, focusTime, breakTime]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };
  
  const handleReset = () => {
    setIsRunning(false);
    if (currentMode === 'focus') {
      setTimeLeft(focusTime);
    } else {
      setTimeLeft(breakTime);
    }
  };
  
  const progress = Math.round((1 - timeLeft / totalTime) * 100);
  
  return (
    <Card className="p-6 shadow-subtle border">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-1 flex items-center justify-center gap-2">
          <Brain className="h-5 w-5 text-mindtrack-blue" />
          Focus Timer
        </h2>
        <p className="text-muted-foreground">
          {currentMode === 'focus' ? 'Stay focused and productive' : 'Take a short break'}
        </p>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="text-5xl font-mono font-semibold mb-4">{formatTime(timeLeft)}</div>
        
        <Progress value={progress} className="h-2 w-full mb-6" />
        
        <div className="flex items-center gap-4">
          <Button 
            onClick={handleStartPause} 
            size="lg"
            className="gap-2"
          >
            {isRunning ? <Pause size={18} /> : <Play size={18} />}
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleReset}
          >
            <RotateCcw size={18} />
          </Button>
        </div>
        
        <div className="mt-6 text-sm">
          <p className="text-muted-foreground">
            {currentMode === 'focus' ? 'Focus session' : 'Break time'}: 
            <span className="font-medium ml-1">
              {currentMode === 'focus' ? focusTime / 60 : breakTime / 60} min
            </span>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default FocusTimer;
