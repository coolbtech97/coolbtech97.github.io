import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            स्वास्थ्य क्रांति में शामिल हों
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            NGO, डॉक्टर और सरकारी संस्थाएं हमसे जुड़ें
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="p-8 bg-[image:var(--gradient-card)] shadow-[var(--shadow-hover)]">
            <h2 className="text-2xl font-bold text-primary mb-6">संपर्क फॉर्म</h2>
            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">नाम</label>
                <Input placeholder="अपना नाम दर्ज करें" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">ईमेल</label>
                <Input type="email" placeholder="your@email.com" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">संगठन</label>
                <Input placeholder="संगठन का नाम (वैकल्पिक)" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">संदेश</label>
                <Textarea
                  placeholder="हमें बताएं कि आप कैसे सहयोग करना चाहते हैं..."
                  rows={5}
                />
              </div>
              <Button variant="hero" size="lg" className="w-full">
                संदेश भेजें
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 bg-[image:var(--gradient-card)] hover:shadow-[var(--shadow-soft)] transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">ईमेल</h3>
                  <p className="text-muted-foreground">contact@arogyaai.org</p>
                  <p className="text-muted-foreground">partnerships@arogyaai.org</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-[image:var(--gradient-card)] hover:shadow-[var(--shadow-soft)] transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">WhatsApp</h3>
                  <p className="text-muted-foreground">+91-98765-43210</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    सीधे WhatsApp पर चैटबॉट से बात करें
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-[image:var(--gradient-card)] hover:shadow-[var(--shadow-soft)] transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">हेल्पलाइन</h3>
                  <p className="text-muted-foreground">1800-XXX-XXXX (Toll Free)</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    सोमवार - शुक्रवार, 9 AM - 6 PM
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary text-primary-foreground">
              <h3 className="font-bold text-xl mb-3">साझेदारी के अवसर</h3>
              <ul className="space-y-2 text-sm">
                <li>✓ CSR फंडिंग सहयोग</li>
                <li>✓ NGO और सामुदायिक स्वास्थ्य कार्यक्रम</li>
                <li>✓ स्वास्थ्य पेशेवर नेटवर्क</li>
                <li>✓ सरकारी स्वास्थ्य पहल</li>
              </ul>
            </Card>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            © 2025 ArogyaAI – Powered by Ethical AI for Public Health
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            <a href="#" className="text-primary hover:underline">Terms of Use</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
