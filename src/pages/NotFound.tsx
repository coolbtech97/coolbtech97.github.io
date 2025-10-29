import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="text-center px-4">
        <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">पृष्ठ नहीं मिला</p>
        <a href="/" className="text-primary font-semibold underline hover:text-primary/80 transition-colors">
          होम पर वापस जाएं
        </a>
      </div>
    </div>
  );
};

export default NotFound;
