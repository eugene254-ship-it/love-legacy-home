import { Heart, Brain, Sparkles } from "lucide-react";

const PhilosophySection = () => {
  const principles = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Love as Governance",
      description: "Families operate on principles of empathy, discernment, and shared responsibility — turning love into a decision-making protocol.",
      gradient: "from-accent/20 to-accent/5"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Wisdom as Currency",
      description: "Replace endless consumption with learning, contribution, and intergenerational knowledge as measures of true wealth.",
      gradient: "from-secondary/20 to-secondary/5"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Legacy as Design",
      description: "Every home becomes a micro-laboratory of innovation, ethics, and cultural preservation for future generations.",
      gradient: "from-primary/20 to-primary/5"
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 gradient-dawn">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Philosophy
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            The Foundation of
            <span className="block mt-2 text-primary">Conscious Prosperity</span>
          </h2>
        </div>

        {/* Principles Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-card shadow-sanctuary hover:shadow-glow transition-smooth border border-border/50"
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${principle.gradient} mb-6 group-hover:scale-110 transition-smooth`}>
                {principle.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{principle.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <blockquote className="text-2xl md:text-3xl font-serif italic text-foreground/80 leading-relaxed">
            "The family is not just a unit of society — it is a living sanctum, 
            a sovereign ecosystem where purpose and prosperity are consciously cultivated."
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
