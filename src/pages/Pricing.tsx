import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Compass, ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Stripe product mapping
const STRIPE_TIERS = {
  legacy: {
    product_id: "prod_TP5DmzRuX7uVdJ",
    price_id: "price_1SSH2zP68A80rUwDwmoCBQeu",
  },
  sanctuary: {
    product_id: "prod_TP5DE9IO0QfmHM",
    price_id: "price_1SSH3FP68A80rUwDwyhsXmc0",
  },
};

const Pricing = () => {
  const navigate = useNavigate();
  const { session, subscriptionStatus } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Pricing - Atlas Sanctum";
  }, []);

  const handleSubscribe = async (priceId: string, planName: string) => {
    if (!session) {
      navigate("/auth");
      return;
    }

    setLoadingPlan(planName);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast.error('Failed to start checkout. Please try again.');
    } finally {
      setLoadingPlan(null);
    }
  };

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
      priceId: STRIPE_TIERS.legacy.price_id,
      productId: STRIPE_TIERS.legacy.product_id,
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
      priceId: STRIPE_TIERS.sanctuary.price_id,
      productId: STRIPE_TIERS.sanctuary.product_id,
    },
  ];

  const isCurrentPlan = (productId?: string) => {
    return productId && subscriptionStatus.product_id === productId;
  };

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
                    onClick={() => {
                      if (plan.name === "Sanctuary Starter") {
                        navigate("/auth");
                      } else if (plan.priceId) {
                        handleSubscribe(plan.priceId, plan.name);
                      }
                    }}
                    disabled={loadingPlan === plan.name || isCurrentPlan(plan.productId)}
                  >
                    {loadingPlan === plan.name ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : isCurrentPlan(plan.productId) ? (
                      "Current Plan"
                    ) : (
                      plan.cta
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Feature Comparison Table */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center">Compare All Features</h3>
            <div className="border border-border/50 rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 bg-muted/30">
                    <TableHead className="w-[280px] text-foreground font-semibold">Feature</TableHead>
                    <TableHead className="text-center text-foreground font-semibold">Sanctuary Starter</TableHead>
                    <TableHead className="text-center text-foreground font-semibold bg-secondary/10">Legacy Builder</TableHead>
                    <TableHead className="text-center text-foreground font-semibold">Sanctum Circle</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { feature: "Family Members", starter: "Up to 4", legacy: "Unlimited", sanctuary: "Unlimited" },
                    { feature: "Family Atlas", starter: "Basic", legacy: "Full + AI Insights", sanctuary: "Full + AI Insights" },
                    { feature: "Sanctum Ledger", starter: "Essential", legacy: "Advanced", sanctuary: "Advanced" },
                    { feature: "Mirror Room AI Guidance", starter: false, legacy: true, sanctuary: true },
                    { feature: "Legacy Engine Storage", starter: "500MB", legacy: "Unlimited", sanctuary: "Unlimited" },
                    { feature: "Mobile App Access", starter: true, legacy: true, sanctuary: true },
                    { feature: "Community Access", starter: true, legacy: true, sanctuary: true },
                    { feature: "Family Wisdom Network", starter: false, legacy: true, sanctuary: true },
                    { feature: "Priority Support", starter: false, legacy: true, sanctuary: true },
                    { feature: "Multi-Family Network", starter: false, legacy: false, sanctuary: true },
                    { feature: "Custom AI Models", starter: false, legacy: false, sanctuary: true },
                    { feature: "White-Label Options", starter: false, legacy: false, sanctuary: true },
                    { feature: "Dedicated Family Advisor", starter: false, legacy: false, sanctuary: true },
                    { feature: "Annual Family Retreat", starter: false, legacy: false, sanctuary: true },
                    { feature: "Early Access Features", starter: false, legacy: false, sanctuary: true },
                  ].map((row, index) => (
                    <TableRow key={row.feature} className={`border-border/50 ${index % 2 === 0 ? 'bg-background/50' : ''}`}>
                      <TableCell className="font-medium">{row.feature}</TableCell>
                      <TableCell className="text-center">
                        {typeof row.starter === 'boolean' ? (
                          row.starter ? (
                            <Check className="w-5 h-5 text-secondary mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                          )
                        ) : (
                          <span className="text-muted-foreground">{row.starter}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center bg-secondary/5">
                        {typeof row.legacy === 'boolean' ? (
                          row.legacy ? (
                            <Check className="w-5 h-5 text-secondary mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                          )
                        ) : (
                          <span className="text-secondary font-medium">{row.legacy}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {typeof row.sanctuary === 'boolean' ? (
                          row.sanctuary ? (
                            <Check className="w-5 h-5 text-secondary mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                          )
                        ) : (
                          <span className="text-foreground font-medium">{row.sanctuary}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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
