import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MessageSquare,
  Languages,
  Brain,
  Bell,
  Calendar,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react";
import heroImage from "@/assets/hero-health.jpg";

const Index = () => {
  const features = [
    {
      icon: Languages,
      title: "बहुभाषी चैट",
      description: "हिंदी, अंग्रेजी, बंगाली, तमिल, मराठी, तेलुगू और अधिक भाषाओं का समर्थन",
    },
    {
      icon: Brain,
      title: "AI स्वास्थ्य सहायक",
      description: "बुखार, मधुमेह, टीकाकरण आदि के बारे में प्रश्नों के उत्तर",
    },
    {
      icon: ImageIcon,
      title: "छवि-आधारित निदान",
      description: "X-ray, CT, या MRI अपलोड करें – AI अंतर्दृष्टि प्राप्त करें",
    },
    {
      icon: Bell,
      title: "प्रकोप अलर्ट",
      description: "सरकारी स्रोतों से वास्तविक समय स्वास्थ्य अलर्ट",
    },
    {
      icon: Calendar,
      title: "टीकाकरण ट्रैकर",
      description: "पोलियो, COVID और बाल टीकाकरण के लिए अनुस्मारक",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp के माध्यम से सुलभ",
      description: "कम इंटरनेट वाले क्षेत्रों के लिए SMS या WhatsApp",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center bg-gradient-to-br from-primary/10 via-accent/20 to-background overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={heroImage}
            alt="Rural families using healthcare technology"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
              हर नागरिक के लिए स्मार्ट स्वास्थ्य साथी
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              स्वास्थ्य प्रश्न पूछें, अपनी X-ray या स्कैन अपलोड करें, और तत्काल मार्गदर्शन प्राप्त करें
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/chatbot">
                <Button variant="hero" size="lg" className="text-lg">
                  अभी चैट करें
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to="/impact">
                <Button variant="secondary" size="lg" className="text-lg">
                  और जानें
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-primary mb-4">
            प्रमुख विशेषताएं
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            AI-संचालित स्वास्थ्य सहायता जो गांव-गांव तक पहुंचती है
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 bg-[image:var(--gradient-card)] hover:shadow-[var(--shadow-hover)] transition-all hover:scale-105"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Banner */}
      <section className="py-16 bg-[image:var(--gradient-hero)] text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ग्रामीण क्षेत्रों में रोग जागरूकता में 20% की वृद्धि
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            AI और सामुदायिक भागीदारी द्वारा संचालित
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">
            आज ही अपनी स्वास्थ्य बातचीत शुरू करें!
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            बीमारियों के बारे में जानें, अपने लक्षणों की जांच करें, और टीकाकरण की याद दिलाएं
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/chatbot">
              <Button variant="hero" size="lg" className="text-lg">
                चैट शुरू करें
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="text-lg">
                साझेदारी करें
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
