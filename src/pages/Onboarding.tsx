import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Compass, ArrowRight, ArrowLeft, Users, Target, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Form data
  const [familyName, setFamilyName] = useState("");
  const [familySize, setFamilySize] = useState("");
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [coreValue, setCoreValue] = useState("");

  useEffect(() => {
    document.title = "Welcome - Atlas Sanctum";
    
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const handleComplete = async () => {
    setLoading(true);
    
    try {
      // Update user profile with onboarding data
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: familyName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user?.id);

      if (error) throw error;

      toast({
        title: "Welcome to your Sanctum!",
        description: "Your family journey begins now.",
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Setup incomplete",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Compass className="w-8 h-8 text-secondary" />
            <h1 className="text-3xl font-bold">Welcome to Your Sanctum</h1>
          </div>
          <p className="text-muted-foreground">
            Let's personalize your family's journey to conscious prosperity
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step {step} of {totalSteps}</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full gradient-legacy transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <Card className="border-border/50 shadow-sanctuary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {step === 1 && <Users className="w-5 h-5 text-secondary" />}
              {step === 2 && <Target className="w-5 h-5 text-secondary" />}
              {step === 3 && <Heart className="w-5 h-5 text-secondary" />}
              {step === 1 && "Your Family"}
              {step === 2 && "Your Vision"}
              {step === 3 && "Your Values"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Tell us about your family sanctum"}
              {step === 2 && "What brings you to Atlas Sanctum?"}
              {step === 3 && "What principles guide your family?"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="family-name">Family Name</Label>
                  <Input
                    id="family-name"
                    placeholder="The Smith Family"
                    value={familyName}
                    onChange={(e) => setFamilyName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="family-size">Number of Family Members</Label>
                  <Input
                    id="family-size"
                    type="number"
                    placeholder="4"
                    min="1"
                    value={familySize}
                    onChange={(e) => setFamilySize(e.target.value)}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-goal">Primary Goal</Label>
                  <Input
                    id="primary-goal"
                    placeholder="Build financial wisdom together"
                    value={primaryGoal}
                    onChange={(e) => setPrimaryGoal(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    What do you hope to achieve as a family?
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="core-value">Core Family Value</Label>
                  <Input
                    id="core-value"
                    placeholder="Love, integrity, growth"
                    value={coreValue}
                    onChange={(e) => setCoreValue(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    What principle matters most to your family?
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              {step > 1 ? (
                <Button
                  variant="ghost"
                  onClick={() => setStep(step - 1)}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < totalSteps ? (
                <Button
                  variant="sanctuary"
                  onClick={() => setStep(step + 1)}
                  disabled={
                    (step === 1 && (!familyName || !familySize)) ||
                    (step === 2 && !primaryGoal)
                  }
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  variant="legacy"
                  onClick={handleComplete}
                  disabled={loading || !coreValue}
                >
                  {loading ? "Setting up..." : "Complete Setup"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
