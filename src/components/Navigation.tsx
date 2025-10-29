import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Home, BarChart3, Phone } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "होम", icon: Home },
    { path: "/chatbot", label: "चैटबॉट", icon: MessageSquare },
    { path: "/impact", label: "प्रभाव", icon: BarChart3 },
    { path: "/contact", label: "संपर्क", icon: Phone },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border shadow-[var(--shadow-soft)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-xl">🩺</span>
            </div>
            <span className="text-xl font-bold text-primary">ArogyaAI</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path}>
                <Button
                  variant={location.pathname === path ? "default" : "ghost"}
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex md:hidden">
            <Button variant="outline" size="sm">Menu</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
