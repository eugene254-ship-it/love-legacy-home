import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, LogOut, Map, Coins, Sparkles, BookOpen, CreditCard, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const STRIPE_TIERS = {
  "prod_TP5DmzRuX7uVdJ": { name: "Legacy Builder", price: "$29/month" },
  "prod_TP5DE9IO0QfmHM": { name: "Sanctum Circle", price: "$99/month" },
};

const Dashboard = () => {
  const { user, signOut, loading, session, subscriptionStatus, checkSubscription } = useAuth();
  const navigate = useNavigate();
  const [loadingPortal, setLoadingPortal] = useState(false);

  useEffect(() => {
    document.title = "Dashboard - Atlas Sanctum";
    
    if (!loading && !user) {
      navigate("/auth");
    }

    // Check for success parameter
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      toast.success('Subscription activated! Welcome to your journey.');
      checkSubscription();
      // Clean up URL
      window.history.replaceState({}, '', '/dashboard');
    }
  }, [user, loading, navigate, checkSubscription]);

  const handleManageSubscription = async () => {
    if (!session) return;

    setLoadingPortal(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast.error('Failed to open subscription management. Please try again.');
    } finally {
      setLoadingPortal(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

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
            <Button variant="ghost" onClick={signOut}>
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold">
                Welcome to Your Sanctum
              </h2>
              <p className="text-xl text-muted-foreground">
                Your family's journey to conscious prosperity begins here.
              </p>
            </div>

            {/* Subscription Status */}
            {subscriptionStatus.subscribed && subscriptionStatus.product_id && (
              <Card className="border-secondary/50 shadow-sanctuary">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Current Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="font-bold text-lg">
                      {STRIPE_TIERS[subscriptionStatus.product_id as keyof typeof STRIPE_TIERS]?.name || "Premium"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {STRIPE_TIERS[subscriptionStatus.product_id as keyof typeof STRIPE_TIERS]?.price}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleManageSubscription}
                    disabled={loadingPortal}
                    className="w-full"
                  >
                    {loadingPortal ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Manage Subscription"
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border/50 shadow-sm hover:shadow-sanctuary transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Family Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">1</div>
              </CardContent>
            </Card>
            <Card className="border-border/50 shadow-sm hover:shadow-sanctuary transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Shared Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">0</div>
              </CardContent>
            </Card>
            <Card className="border-border/50 shadow-sm hover:shadow-sanctuary transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Legacy Entries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">0</div>
              </CardContent>
            </Card>
          </div>

          {/* Core Modules Access */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Your Sanctum Modules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-border/50 shadow-sm hover:shadow-sanctuary transition-all hover:scale-105 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Map className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>The Family Atlas</CardTitle>
                      <CardDescription>Map your family's journey</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Create your digital map of values, milestones, and shared dreams.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-sm hover:shadow-sanctuary transition-all hover:scale-105 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-secondary/10">
                      <Coins className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <CardTitle>Sanctum Ledger</CardTitle>
                      <CardDescription>Track your family economy</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Build transparency and regenerative investment together.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-sm hover:shadow-sanctuary transition-all hover:scale-105 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-accent/10">
                      <Sparkles className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <CardTitle>The Mirror Room</CardTitle>
                      <CardDescription>Reflect and grow together</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Navigate emotions, forgiveness, and purpose as a family.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-sm hover:shadow-sanctuary transition-all hover:scale-105 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Legacy Engine</CardTitle>
                      <CardDescription>Your family codex</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Archive stories and wisdom across generations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
