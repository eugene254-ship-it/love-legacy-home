import { Button } from "@/components/ui/button";
import { Target, TrendingUp, Users, Heart } from "lucide-react";

const ImpactVision = () => {
  const metrics = [
    {
      icon: <Target className="w-6 h-6" />,
      label: "Household Stress Reduction",
      description: "Measured decrease in financial and emotional burden"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: "Shared Learning Hours",
      description: "Increase in family education and growth time"
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: "Intergenerational Mentorship",
      description: "Rise in wisdom exchange across generations"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      label: "Family Harmony Index",
      description: "Growth in collective well-being across nations"
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            Our Impact Vision
          </h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Building the world's first <span className="text-secondary font-semibold">Wisdom-Driven Family Network</span> — 
            A planetary guild of 1 million families creating wealth, peace, and innovation together.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border/50 hover:border-accent transition-smooth shadow-sanctuary"
            >
              <div className="p-3 rounded-lg bg-accent/10 text-accent flex-shrink-0">
                {metric.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{metric.label}</h3>
                <p className="text-sm text-muted-foreground">{metric.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Positioning Statement */}
        <div className="gradient-sanctuary rounded-2xl p-12 text-center space-y-8 shadow-glow">
          <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Positioned as the Future
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-secondary text-xl font-bold">The Apple of Family OS</div>
              <p className="text-primary-foreground/80 text-sm">Elegant, intelligent, emotion-aware</p>
            </div>
            <div className="space-y-2">
              <div className="text-secondary text-xl font-bold">The Palantir of the Heart</div>
              <p className="text-primary-foreground/80 text-sm">Data for empathy, not exploitation</p>
            </div>
            <div className="space-y-2">
              <div className="text-secondary text-xl font-bold">The Church of the Future</div>
              <p className="text-primary-foreground/80 text-sm">Unity replacing dogma</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Ready to Build Your Family Sanctum?</h3>
            <p className="text-muted-foreground mb-6">Join the waitlist for early access</p>
            <Button variant="legacy" size="xl" className="shadow-glow">
              Request Early Access
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactVision;
