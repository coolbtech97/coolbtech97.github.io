import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Search, Home, LogIn } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full z-50 glass-card border-0 border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold gradient-text">SkillSphere</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link 
              to="/explore" 
              className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors"
            >
              <Search size={18} />
              <span>Explore</span>
            </Link>
            <Link 
              to="/profile" 
              className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors"
            >
              <User size={18} />
              <span>Profile</span>
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="hidden sm:flex items-center space-x-2">
                <LogIn size={16} />
                <span>Login</span>
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="hero" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};