import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Compass, ArrowLeft } from "lucide-react";

const Pricing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Pricing - Atlas Sanctum";
  }, []);

  const plans = [
    {
      name: "Sanctuary Starter",
      price: "Free",
      description: "Perfect for families beginning their journey",
      features: [
        "Up to 4 family members",
        "Basic Family Atlas",
        "Essential Ledger tracking",
        "Community access",
        "Mobile app access",
      ],
      cta: "Start Free",
      variant: "outline" as const,
      popular: false,
    },
    {
      name: "Legacy Builder",
      price: "$29",
      period: "/month",
      description: "For families committed to conscious prosperity",
      features: [
        "Unlimited family members",
        "Full Family Atlas with AI insights",
        "Advanced Sanctum Ledger",
        "Mirror Room with AI guidance",
        "Legacy Engine with unlimited storage",
        "Priority support",
        "Family wisdom network access",
      ],
      cta: "Begin Journey",
      variant: "legacy" as const,
      popular: true,
    },
    {
      name: "Sanctum Circle",
      price: "$99",
      period: "/month",
      description: "For multi-generational family networks",
      features: [
        "Everything in Legacy Builder",
        "Multi-family network connections",
        "Custom AI models for your family",
        "White-label options",
        "Dedicated family advisor",
        "Annual family retreat invitation",
        "Early access to new features",
      ],
      cta: "Join Circle",
      variant: "sanctuary" as const,
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-6 h-6 text-secondary" />
              <h1 className="text-2xl font-bold">Atlas Sanctum</h1>
            </div>
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Choose Your Family's Path
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every family's journey is unique. Select the plan that aligns with your vision for conscious prosperity.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative border-border/50 ${
                  plan.popular
                    ? "shadow-sanctuary scale-105 border-secondary"
                    : "shadow-sm"
                } transition-all hover:shadow-glow`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-secondary text-secondary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription className="mb-4">
                    {plan.description}
                  </CardDescription>
                  <div className="space-y-1">
                    <div className="text-4xl font-bold">
                      {plan.price}
                      {plan.period && (
                        <span className="text-lg text-muted-foreground">
                          {plan.period}
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.variant}
                    className="w-full"
                    size="lg"
                    onClick={() => navigate("/auth")}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Section */}
          <div className="text-center pt-8 space-y-4">
            <p className="text-sm text-muted-foreground">
              Join 1M+ families building conscious prosperity together
            </p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">30-day</div>
                <div className="text-sm text-muted-foreground">Money-back guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">24/7</div>
                <div className="text-sm text-muted-foreground">Family support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">100%</div>
                <div className="text-sm text-muted-foreground">Love-driven</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;
