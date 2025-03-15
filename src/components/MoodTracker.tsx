
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Smile, Frown, Meh, ThumbsUp, Heart, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mood options with icons and colors
const moodOptions = [
  { value: 5, label: 'Great', icon: <ThumbsUp className="h-5 w-5" />, color: 'text-mindtrack-green bg-mindtrack-green/10' },
  { value: 4, label: 'Good', icon: <Smile className="h-5 w-5" />, color: 'text-mindtrack-blue bg-mindtrack-blue/10' },
  { value: 3, label: 'Okay', icon: <Meh className="h-5 w-5" />, color: 'text-mindtrack-orange bg-mindtrack-orange/10' },
  { value: 2, label: 'Low', icon: <Frown className="h-5 w-5" />, color: 'text-mindtrack-coral bg-mindtrack-coral/10' },
  { value: 1, label: 'Very Low', icon: <Heart className="h-5 w-5" />, color: 'text-mindtrack-pink bg-mindtrack-pink/10' },
];

// Function to get current date in a readable format
const getFormattedDate = () => {
  const today = new Date();
  return today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  });
};

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleMoodSelect = (value: number) => {
    setSelectedMood(value);
  };

  const handleSubmit = () => {
    if (selectedMood !== null) {
      // In a real app, we would save this mood data to a database
      console.log('Mood submitted:', selectedMood);
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setSelectedMood(null);
    setIsSubmitted(false);
  };

  return (
    <Card className="overflow-hidden border shadow-subtle transition-all duration-300 hover:shadow-apple">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-medium">Today's Mood Check-in</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            {getFormattedDate()}
          </div>
        </div>

        {!isSubmitted ? (
          <>
            <p className="text-muted-foreground mb-4">
              How are you feeling today? Tracking your mood helps identify patterns that affect your academic performance.
            </p>

            <div className="grid grid-cols-5 gap-2 my-6">
              {moodOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleMoodSelect(option.value)}
                  className={cn(
                    "flex flex-col items-center p-3 rounded-lg transition-all duration-200",
                    selectedMood === option.value 
                      ? `${option.color} ring-2 ring-primary` 
                      : "hover:bg-accent"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center mb-2",
                    selectedMood === option.value 
                      ? option.color 
                      : "text-muted-foreground"
                  )}>
                    {option.icon}
                  </div>
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>

            <Button 
              onClick={handleSubmit} 
              className="w-full button-primary"
              disabled={selectedMood === null}
            >
              Save Today's Mood
            </Button>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-primary/10">
              <ThumbsUp className="h-8 w-8 text-primary" />
            </div>
            <h4 className="text-lg font-medium mb-2">Mood Logged Successfully!</h4>
            <p className="text-muted-foreground mb-4">
              Your mood has been recorded. Check your dashboard to see mood patterns over time.
            </p>
            <Button variant="outline" onClick={handleReset}>
              Log Another Response
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MoodTracker;
