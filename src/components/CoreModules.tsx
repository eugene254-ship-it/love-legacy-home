import ModuleCard from "./ModuleCard";
import { Map, Coins, Sparkles, BookOpen } from "lucide-react";
import familyAtlasImage from "@/assets/family-atlas.jpg";
import mirrorRoomImage from "@/assets/mirror-room.jpg";
import legacyEngineImage from "@/assets/legacy-engine.jpg";

const CoreModules = () => {
  const modules = [
    {
      icon: <Map className="w-6 h-6 text-primary-foreground" />,
      title: "The Family Atlas",
      description: "Map your family's values, dreams, and shared journey",
      features: [
        "Digital world mapping family values, milestones, and aspirations",
        "Personal journey nodes for each family member's evolving story",
        "AI-powered harmony modeling and emotional state tracking",
        "Integration of ancestry, life lessons, and future goals"
      ],
      image: familyAtlasImage,
      gradient: "wisdom" as const
    },
    {
      icon: <Coins className="w-6 h-6 text-foreground" />,
      title: "Sanctum Ledger",
      description: "A family economy built on trust and regenerative values",
      features: [
        "Track spending, giving, saving with full transparency",
        "RVE tokens - Regenerative Value Exchange currency",
        "Impact metrics: sustainability, education, philanthropy",
        "Wisdom and love-driven transaction protocols"
      ],
      image: familyAtlasImage,
      gradient: "legacy" as const
    },
    {
      icon: <Sparkles className="w-6 h-6 text-card-foreground" />,
      title: "The Mirror Room",
      description: "Guided reflection for emotional wisdom and purpose",
      features: [
        "Conversational AI for navigating emotions and forgiveness",
        "Inspired by Stoicism, Buddhism, and Biblical discernment",
        "Safe space for conflict resolution and family healing",
        "Purpose discovery and alignment exercises"
      ],
      image: mirrorRoomImage,
      gradient: "sanctuary" as const
    },
    {
      icon: <BookOpen className="w-6 h-6 text-primary-foreground" />,
      title: "Legacy Engine",
      description: "Preserve and connect wisdom across generations",
      features: [
        "Archive of letters, stories, and multimedia from ancestors",
        "Auto-curated Family Codex - dynamic chronicle of values",
        "Connection to global Atlas Sanctum Wisdom Network",
        "Living document that grows with your family's story"
      ],
      image: legacyEngineImage,
      gradient: "wisdom" as const
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Core Modules
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four pillars that transform your family into a regenerative ecosystem
          </p>
        </div>

        {/* Module Cards */}
        <div className="space-y-8">
          {modules.map((module, index) => (
            <div 
              key={index}
              className="animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ModuleCard {...module} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreModules;
