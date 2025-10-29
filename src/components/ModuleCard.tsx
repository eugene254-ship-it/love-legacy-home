import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface ModuleCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
  image: string;
  gradient: "wisdom" | "legacy" | "sanctuary" | "dawn";
}

const ModuleCard = ({ icon, title, description, features, image, gradient }: ModuleCardProps) => {
  return (
    <Card className="group overflow-hidden border-border/50 hover:border-accent transition-smooth shadow-sanctuary hover:shadow-glow bg-card/50 backdrop-blur-sm">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image Side */}
        <div className="relative h-64 md:h-full overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
          />
          <div className={`absolute inset-0 gradient-${gradient} opacity-40 group-hover:opacity-30 transition-smooth`} />
        </div>

        {/* Content Side */}
        <div className="p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl gradient-${gradient} shadow-lg`}>
              {icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </div>
          </div>

          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default ModuleCard;
