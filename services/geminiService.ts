import { GoogleGenAI, Type, Chat } from "@google/genai";
import type { DiagnosisResult, ChatMessage } from '../types';

// Assume process.env.API_KEY is configured in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
let chat: Chat | null = null;

const diagnosisSchema = {
  type: Type.OBJECT,
  properties: {
    diseaseName: {
      type: Type.STRING,
      description: "The common name of the plant disease in Arabic. If no disease is detected, respond with 'نبتة سليمة'."
    },
    confidence: {
      type: Type.NUMBER,
      description: "A confidence score from 0 to 100 in the diagnosis. If healthy, this should be 100."
    },
    symptoms: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of key visual symptoms observed on the plant, in Arabic."
    },
    recommendedTreatment: {
      type: Type.STRING,
      description: "A brief, actionable recommendation for a type of treatment (e.g., 'رش زيت النيم', 'مبيد فطري نحاسي'), in Arabic."
    },
    preventiveMeasures: {
      type: Type.STRING,
      description: "A short paragraph on measures to prevent this disease in the future, in Arabic."
    },
  },
  required: ["diseaseName", "confidence", "symptoms", "recommendedTreatment", "preventiveMeasures"],
};

export const analyzeCropImage = async (base64Image: string): Promise<DiagnosisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image,
            },
          },
          {
            text: `أنت خبير في علم أمراض النباتات الزراعية. حلل الصورة المرفقة.
            حدد أي أمراض موجودة.
            يجب أن تكون إجابتك بصيغة JSON وتلتزم بالمخطط المحدد.
            إذا كانت النبتة سليمة، فاستخدم 'نبتة سليمة' كـ diseaseName بثقة 100% وقدم نصائح رعاية عامة باللغة العربية.`,
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: diagnosisSchema,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result as DiagnosisResult;

  } catch (error) {
    console.error("Error analyzing crop image:", error);
    throw new Error("فشل تحليل الصورة. الرجاء المحاولة مرة أخرى.");
  }
};


export const continueChat = async (history: ChatMessage[], newMessage: string): Promise<string> => {
    if (!chat) {
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: 'أنت خبير زراعي يمني متخصص. مهمتك هي الإجابة على أسئلة المزارعين حول الزراعة في اليمن، أمراض النباتات، أفضل الممارسات الزراعية، والمحاصيل اليمنية. كن ودودًا ومساعدًا. أجب باللغة العربية فقط.',
            },
        });
    }

    try {
        const response = await chat.sendMessage({ message: newMessage });
        return response.text;
    } catch (error) {
        console.error("Error in chat:", error);
        return "عذرًا، حدث خطأ أثناء محاولة التواصل مع الخبير. يرجى المحاولة مرة أخرى.";
    }
};
