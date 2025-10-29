import { Card } from "@/components/ui/card";
import { Users, TrendingUp, Heart, Bell } from "lucide-react";

const Impact = () => {
  const stats = [
    { icon: Users, value: "50,000+", label: "स्वास्थ्य वार्तालाप पूर्ण" },
    { icon: TrendingUp, value: "80%", label: "प्रश्नों में सटीकता" },
    { icon: Heart, value: "20%", label: "निवारक देखभाल जागरूकता में वृद्धि" },
    { icon: Bell, value: "10,000+", label: "टीकाकरण अनुस्मारक भेजे गए" },
  ];

  const stories = [
    {
      title: "बच्चे के निमोनिया की शीघ्र पहचान",
      description: "ArogyaAI ने एक माँ को बच्चे के गंभीर लक्षणों को पहचानने में मदद की, जिससे समय पर इलाज हो सका।",
      image: "👶",
    },
    {
      title: "माताओं को टीकाकरण ज्ञान",
      description: "गांवों में माताओं को बच्चों के टीकाकरण की सही जानकारी मिली।",
      image: "👩‍👧",
    },
    {
      title: "मधुमेह प्रबंधन सहायता",
      description: "ग्रामीण क्षेत्रों में मधुमेह के रोगियों को दैनिक सलाह और आहार सुझाव मिले।",
      image: "🩸",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            हमारा प्रभाव
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            गांवों में जीवन बदलना, एक बार में एक स्वास्थ्य प्रश्न
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map(({ icon: Icon, value, label }, index) => (
            <Card
              key={index}
              className="p-6 text-center bg-[image:var(--gradient-card)] hover:shadow-[var(--shadow-hover)] transition-all hover:scale-105"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-primary mb-2">{value}</h3>
              <p className="text-sm text-muted-foreground">{label}</p>
            </Card>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            क्षेत्र से कहानियां
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map((story, index) => (
              <Card
                key={index}
                className="p-6 bg-[image:var(--gradient-card)] hover:shadow-[var(--shadow-hover)] transition-all"
              >
                <div className="text-5xl mb-4">{story.image}</div>
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {story.title}
                </h3>
                <p className="text-muted-foreground">{story.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-8 bg-primary text-primary-foreground text-center">
          <h2 className="text-2xl font-bold mb-4">
            "गांव-गांव तक स्वास्थ्य जागरूकता लाना हमारा मिशन है"
          </h2>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto">
            AI और सामुदायिक भागीदारी के माध्यम से ग्रामीण भारत में रोग जागरूकता में 20% की वृद्धि
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Impact;
