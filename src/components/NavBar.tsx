
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { LogOut, User } from 'lucide-react';

const NavBar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Don't show navbar on auth pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-nairagreen flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
            <span className="font-bold text-xl">NairaLock</span>
          </Link>
        </div>
        
        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/profile" className="flex items-center gap-2 text-sm">
              <User size={18} />
              <span className="hidden md:inline">{user.name}</span>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut size={18} className="mr-2" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Register</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
