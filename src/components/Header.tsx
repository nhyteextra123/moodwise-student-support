
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn, LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Chat', href: '/chat' },
    { name: 'Teacher Insights', href: '/teacher-insights' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md',
        isScrolled 
          ? 'bg-white/80 shadow-subtle dark:bg-black/80' 
          : 'bg-transparent'
      )}
    >
      <nav className="container-page flex items-center justify-between h-16 sm:h-20">
        <Link 
          to="/" 
          className="text-2xl font-bold text-foreground flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <span className="h-8 w-8 rounded-full bg-mindtrack-blue flex items-center justify-center text-white">
            M
          </span>
          <span>MindTrack</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'font-medium transition-colors',
                  location.pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/settings')}
                className="text-muted-foreground hover:text-foreground"
              >
                <Settings className="h-5 w-5" />
              </Button>
              <Button onClick={handleLogout} variant="destructive" size="sm">
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate('/sign-up')}>
                Sign Up
              </Button>
              <Button onClick={() => navigate('/sign-in')}>
                <LogIn className="h-4 w-4 mr-1" />
                Sign In
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t animate-slide-down">
          <div className="container-page py-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'block py-2 px-3 rounded-lg font-medium transition-colors',
                  location.pathname === item.href
                    ? 'bg-accent text-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="pt-4 border-t space-y-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/settings"
                    className="flex items-center gap-2 py-2 px-3 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    <Settings className="h-5 w-5" />
                    Settings
                  </Link>
                  <Button onClick={handleLogout} variant="destructive" className="w-full justify-start">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => navigate('/sign-in')} className="w-full justify-start">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                  <Button onClick={() => navigate('/sign-up')} variant="outline" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
