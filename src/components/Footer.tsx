import { Compass } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg gradient-wisdom">
              <Compass className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Atlas Sanctum</span>
          </div>

          {/* Tagline */}
          <p className="text-muted-foreground max-w-md">
            Where Love Meets Legacy — A Family's Map to Conscious Prosperity
          </p>

          {/* Copyright */}
          <div className="text-sm text-muted-foreground pt-6 border-t border-border/30 w-full">
            © {new Date().getFullYear()} Atlas Sanctum. Built with love for families worldwide.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
