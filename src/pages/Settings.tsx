
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Bell, Clock, Brain, User, Key, Mail, Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  
  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
    
    // Load API key from localStorage
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
      setOpenaiApiKey(savedApiKey);
    }
  }, [isAuthenticated, navigate]);
  
  useEffect(() => {
    // Load focus settings from localStorage
    const savedFocusSettings = localStorage.getItem('focus_settings');
    if (savedFocusSettings) {
      const settings = JSON.parse(savedFocusSettings);
      setFocusTime(settings.focusTime);
      setBreakTime(settings.breakTime);
      setEnableNotifications(settings.enableNotifications);
    }
  }, []);
  
  const handleSaveFocusSettings = () => {
    const settings = {
      focusTime,
      breakTime,
      enableNotifications
    };
    localStorage.setItem('focus_settings', JSON.stringify(settings));
    toast.success('Focus settings saved successfully');
  };
  
  const handleSaveApiKey = () => {
    localStorage.setItem('openai_api_key', openaiApiKey);
    toast.success('API key saved successfully');
  };
  
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
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
            Settings
          </h1>
          <p className="text-muted-foreground mb-6">Customize your MindTrack experience</p>
        </motion.div>
        
        <Tabs defaultValue="focus" className="mt-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
            <TabsTrigger value="focus" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>Focus</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              <span>API</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="focus">
            <Card className="p-6 shadow-subtle border">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-mindtrack-blue" />
                Focus Enhancement Settings
              </h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Focus Session Duration (minutes): {focusTime}</Label>
                  <Slider 
                    value={[focusTime]} 
                    min={5} 
                    max={60} 
                    step={5}
                    onValueChange={(value) => setFocusTime(value[0])} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Break Duration (minutes): {breakTime}</Label>
                  <Slider 
                    value={[breakTime]} 
                    min={1} 
                    max={30} 
                    step={1}
                    onValueChange={(value) => setBreakTime(value[0])} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Enable Focus Notifications</Label>
                  <Switch 
                    id="notifications"
                    checked={enableNotifications}
                    onCheckedChange={setEnableNotifications}
                  />
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleSaveFocusSettings} className="w-full">
                    Save Focus Settings
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="account">
            <Card className="p-6 shadow-subtle border">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-mindtrack-purple" />
                Account Settings
              </h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={user?.email || ''} disabled />
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleLogout} variant="destructive" className="w-full">
                    Log Out
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="api">
            <Card className="p-6 shadow-subtle border">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Key className="h-5 w-5 text-mindtrack-green" />
                API Settings
              </h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>OpenAI API Key</Label>
                  <Input
                    type="password"
                    value={openaiApiKey}
                    onChange={(e) => setOpenaiApiKey(e.target.value)}
                    placeholder="sk-..."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Your API key is stored locally in your browser.
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleSaveApiKey} className="w-full">
                    Save API Key
                  </Button>
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

export default Settings;
