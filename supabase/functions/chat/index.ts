import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, conversationId, language, imageUrl } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Build system prompt based on language
    const systemPrompts: Record<string, string> = {
      Hindi: "आप एक मददगार स्वास्थ्य सहायक हैं। आप लक्षणों को समझते हैं और सरल स्वास्थ्य सलाह देते हैं। हमेशा याद दिलाएं कि गंभीर समस्याओं के लिए डॉक्टर से परामर्श लें। यदि कोई चिकित्सा छवि प्रदान की गई है, तो उसका विश्लेषण करें और स्पष्ट जानकारी दें।",
      English: "You are a helpful health assistant. You understand symptoms and provide simple health advice. Always remind users to consult a doctor for serious issues. If a medical image is provided, analyze it and provide clear information.",
      Bengali: "আপনি একজন সহায়ক স্বাস্থ্য সহায়ক। আপনি লক্ষণগুলি বোঝেন এবং সরল স্বাস্থ্য পরামর্শ দেন। গুরুতর সমস্যার জন্য সর্বদা ডাক্তারের সাথে পরামর্শ করার কথা মনে করিয়ে দিন।",
      Tamil: "நீங்கள் ஒரு உதவிகரமான சுகாதார உதவியாளர். நீங்கள் அறிகுறிகளைப் புரிந்துகொண்டு எளிய சுகாதார ஆலோசனைகளை வழங்குகிறீர்கள். தீவிர பிரச்சினைகளுக்கு மருத்துவரை அணுகுமாறு எப்போதும் நினைவூட்டுங்கள்.",
      Marathi: "तुम्ही एक उपयुक्त आरोग्य सहाय्यक आहात. तुम्ही लक्षणे समजता आणि सोपा आरोग्य सल्ला देता. गंभीर समस्यांसाठी डॉक्टरांचा सल्ला घेण्याची नेहमी आठवण करून द्या.",
      Telugu: "మీరు సహాయక ఆరోగ్య సహాయకులు. మీరు లక్షణాలను అర్థం చేసుకుంటారు మరియు సాధారణ ఆరోగ్య సలహాలు అందిస్తారు. తీవ్రమైన సమస్యల కోసం ఎల్లప్పుడూ వైద్యుడిని సంప్రదించమని గుర్తు చేయండి."
    };

    const systemPrompt = systemPrompts[language] || systemPrompts["Hindi"];

    // Build messages array for AI
    const aiMessages: any[] = [
      { role: "system", content: systemPrompt }
    ];

    // Add conversation history
    if (messages && messages.length > 0) {
      aiMessages.push(...messages);
    }

    // If there's an image, add it to the last user message
    if (imageUrl && aiMessages.length > 1) {
      const lastMessage = aiMessages[aiMessages.length - 1];
      if (lastMessage.role === "user") {
        lastMessage.content = [
          { type: "text", text: lastMessage.content },
          { type: "image_url", image_url: { url: imageUrl } }
        ];
      }
    }

    // Call Lovable AI with vision-capable model
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: aiMessages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    // Save assistant message to database if conversationId provided
    if (conversationId) {
      const { error: msgError } = await supabase
        .from("chat_messages")
        .insert({
          conversation_id: conversationId,
          role: "assistant",
          content: assistantMessage,
        });

      if (msgError) {
        console.error("Error saving assistant message:", msgError);
      }
    }

    return new Response(
      JSON.stringify({ message: assistantMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in chat function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
