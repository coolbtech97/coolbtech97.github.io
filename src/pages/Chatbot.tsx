import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Mic, Image as ImageIcon, Languages, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import aiDoctorAvatar from "@/assets/ai-doctor-avatar.png";

const Chatbot = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("Hindi");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [outbreakAlerts, setOutbreakAlerts] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const languages = ["Hindi", "English", "Bengali", "Tamil", "Marathi", "Telugu"];

  const greetings: Record<string, string> = {
    Hindi: "नमस्ते! मैं ArogyaAI हूं। मैं आपकी स्वास्थ्य संबंधी सहायता के लिए यहां हूं। आप अपने लक्षण बता सकते हैं या X-ray/scan अपलोड कर सकते हैं।",
    English: "Hello! I am ArogyaAI. I am here to help you with your health-related queries. You can describe your symptoms or upload X-ray/scan images.",
    Bengali: "নমস্কার! আমি ArogyaAI। আমি আপনার স্বাস্থ্য-সম্পর্কিত সাহায্যের জন্য এখানে আছি। আপনি আপনার লক্ষণ বলতে পারেন বা X-ray/scan আপলোড করতে পারেন।",
    Tamil: "வணக்கம்! நான் ArogyaAI. உங்கள் சுகாதார தொடர்பான உதவிக்காக நான் இங்கே இருக்கிறேன். நீங்கள் உங்கள் அறிகுறிகளை விவரிக்கலாம் அல்லது X-ray/scan பதிவேற்றலாம்.",
    Marathi: "नमस्कार! मी ArogyaAI आहे। मी तुमच्या आरोग्य संबंधित मदतीसाठी येथे आहे. तुम्ही तुमची लक्षणे सांगू शकता किंवा X-ray/scan अपलोड करू शकता.",
    Telugu: "నమస్కారం! నేను ArogyaAI. మీ ఆరోగ్య సంబంధిత సహాయం కోసం నేను ఇక్కడ ఉన్నాను. మీరు మీ లక్షణాలను వివరించవచ్చు లేదా X-ray/scan అప్‌లోడ్ చేయవచ్చు."
  };

  // Initialize conversation
  useEffect(() => {
    const initConversation = async () => {
      const { data, error } = await supabase
        .from("chat_conversations")
        .insert({ language: selectedLanguage })
        .select()
        .single();

      if (error) {
        console.error("Error creating conversation:", error);
        toast({
          title: "Error",
          description: "Failed to initialize chat",
          variant: "destructive",
        });
        return;
      }

      setConversationId(data.id);
      
      // Add greeting message
      const greeting = {
        role: "assistant",
        content: greetings[selectedLanguage],
      };
      setMessages([greeting]);

      // Save greeting to DB
      await supabase.from("chat_messages").insert({
        conversation_id: data.id,
        role: "assistant",
        content: greeting.content,
      });
    };

    initConversation();

    // Load outbreak alerts
    loadOutbreakAlerts();

    // Setup realtime subscription for new messages
    const channel = supabase
      .channel("chat_messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          console.log("New message:", payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedLanguage]);

  const loadOutbreakAlerts = async () => {
    const { data, error } = await supabase
      .from("outbreak_alerts")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false })
      .limit(3);

    if (!error && data) {
      setOutbreakAlerts(data);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        toast({
          title: "Image uploaded",
          description: "Send a message to analyze the image",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !uploadedImage) return;
    
    const userMessage = {
      role: "user",
      content: inputMessage || "Please analyze this image",
      image_url: uploadedImage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Save user message to DB
    if (conversationId) {
      await supabase.from("chat_messages").insert({
        conversation_id: conversationId,
        role: "user",
        content: userMessage.content,
        image_url: uploadedImage,
      });
    }

    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: {
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          conversationId,
          language: selectedLanguage,
          imageUrl: uploadedImage,
        },
      });

      if (error) throw error;

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message,
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setInputMessage("");
      setUploadedImage(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Outbreak Alerts Banner */}
        {outbreakAlerts.length > 0 && (
          <Card className="mb-4 p-4 bg-destructive/10 border-destructive">
            <h3 className="font-semibold text-destructive mb-2">🚨 Health Alerts</h3>
            <div className="space-y-2">
              {outbreakAlerts.map((alert) => (
                <div key={alert.id} className="text-sm">
                  <span className="font-medium">{alert.disease_name}</span> in {alert.region} - {alert.description}
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary">ArogyaAI चैटबॉट</h1>
          <div className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-primary" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Card className="shadow-[var(--shadow-hover)] border-2 bg-[image:var(--gradient-card)]">
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === "assistant" ? "justify-start" : "justify-end"
                }`}
              >
                {message.role === "assistant" && (
                  <img
                    src={aiDoctorAvatar}
                    alt="AI Doctor"
                    className="w-10 h-10 rounded-full border-2 border-primary"
                  />
                )}
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    message.role === "assistant"
                      ? "bg-accent text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  {message.image_url && (
                    <img src={message.image_url} alt="Uploaded scan" className="mt-2 rounded-lg max-w-full" />
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start gap-3">
                <img
                  src={aiDoctorAvatar}
                  alt="AI Doctor"
                  className="w-10 h-10 rounded-full border-2 border-primary"
                />
                <div className="bg-accent text-foreground rounded-2xl px-4 py-3">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              </div>
            )}
          </div>

          <div className="border-t bg-background/80 backdrop-blur p-4">
            {uploadedImage && (
              <div className="mb-3 relative inline-block">
                <img src={uploadedImage} alt="Preview" className="h-20 rounded-lg" />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute -top-2 -right-2"
                  onClick={() => setUploadedImage(null)}
                >
                  ×
                </Button>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2 mb-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Upload Scan
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="अपने लक्षण बताएं... (जैसे: मुझे बुखार और सिरदर्द है)"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage} 
                variant="hero" 
                size="icon"
                disabled={isLoading || (!inputMessage.trim() && !uploadedImage)}
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-2 text-center">
              ⚠️ यह केवल जानकारी के लिए है, चिकित्सा निदान नहीं। गंभीर समस्याओं के लिए डॉक्टर से संपर्क करें।
            </p>
          </div>
        </Card>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-[image:var(--gradient-card)] hover:shadow-[var(--shadow-soft)] transition-all">
            <h3 className="font-semibold text-primary mb-2">📋 लक्षण जांच</h3>
            <p className="text-sm text-muted-foreground">अपने लक्षण बताएं और संभावित स्थिति जानें</p>
          </Card>
          <Card className="p-4 bg-[image:var(--gradient-card)] hover:shadow-[var(--shadow-soft)] transition-all">
            <h3 className="font-semibold text-primary mb-2">🩺 AI स्कैन विश्लेषण</h3>
            <p className="text-sm text-muted-foreground">X-ray, CT या MRI अपलोड करें</p>
          </Card>
          <Card className="p-4 bg-[image:var(--gradient-card)] hover:shadow-[var(--shadow-soft)] transition-all">
            <h3 className="font-semibold text-primary mb-2">💉 टीकाकरण</h3>
            <p className="text-sm text-muted-foreground">टीके की तारीख और रिमाइंडर</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
