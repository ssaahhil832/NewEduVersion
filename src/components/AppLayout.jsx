
    import React from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Home, LogIn, UserPlus, LogOut, LayoutDashboard, ShoppingBag, Search, Settings, Bell } from 'lucide-react';
    import { useAuth } from '@/contexts/AuthContext';
    import { motion } from 'framer-motion';

    const AppLayout = ({ children }) => {
      const { user, logout } = useAuth();
      const navigate = useNavigate();

      const handleLogout = () => {
        logout();
        navigate('/login');
      };

      return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800">
          <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <ShoppingBag className="h-8 w-8 text-primary" />
                <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">EduCycle</span>
              </Link>
              <nav className="flex items-center space-x-4">
                {user ? (
                  <>
                    <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} aria-label="Dashboard">
                      <LayoutDashboard className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" aria-label="Notifications">
                      <Bell className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" aria-label="Settings">
                       <Settings className="h-5 w-5" />
                    </Button>
                    <Button onClick={handleLogout} variant="outline" className="group">
                      <LogOut className="mr-2 h-4 w-4  group-hover:text-destructive" /> Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="ghost">
                      <Link to="/login"><LogIn className="mr-2 h-4 w-4" /> Login</Link>
                    </Button>
                    <Button asChild>
                      <Link to="/signup"><UserPlus className="mr-2 h-4 w-4" /> Sign Up</Link>
                    </Button>
                  </>
                )}
              </nav>
            </div>
          </header>
          
          <main className="flex-grow container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </main>

          <footer className="py-6 md:px-8 md:py-0 bg-background/95 border-t border-border/40">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                &copy; {new Date().getFullYear()} EduCycle. All rights reserved. 
                Built with <span className="text-primary">&hearts;</span> by Hostinger Horizons.
              </p>
              <div className="flex space-x-4">
                 <a href="#" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
                 <a href="#" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
              </div>
            </div>
          </footer>
        </div>
      );
    };

    export default AppLayout;
  