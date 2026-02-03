
import { GoogleGenAI, Type } from "@google/genai";
import { ProductInfo, GeneratedCopy } from "../types";

export const generateCopy = async (info: ProductInfo): Promise<GeneratedCopy> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    다음 로컬 제품에 대한 매력적인 마케팅 카피를 작성해 주세요.
    
    [제품 정보]
    - 제품명: ${info.productName}
    - 지역/원산지: ${info.region}
    - 핵심 특징: ${info.features}
    - 타겟 고객: ${info.target}
    - 톤앤매너: ${info.tone}
  `;

  const systemInstruction = `
    당신은 10년 차 로컬 큐레이터이자 감성 에세이 작가입니다. 
    지역 고유의 제품이 가진 가치를 서정적이고 신뢰감 있는 어조로 소개합니다. 
    소비자의 감성을 자극하는 스토리텔링 능력이 탁월합니다.
    사용자의 '톤앤매너' 요청을 최우선으로 반영하되, 기본적으로 따뜻하고 신뢰감 있는 기조를 유지하세요.
    본문은 약 300자 내외로 작성하며, 마치 해당 지역의 풍경이 눈앞에 그려지듯 묘사하세요.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: {
              type: Type.STRING,
              description: "시선을 사로잡는 한 줄 헤드라인 (이모지 포함)",
            },
            body: {
              type: Type.STRING,
              description: "지역의 분위기와 제품의 특징을 엮은 감성적인 스토리텔링 (300자 내외)",
            },
            hashtags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "인스타그램용 태그 5개",
            },
          },
          required: ["headline", "body", "hashtags"],
        },
      },
    });

    const result = JSON.parse(response.text || '{}');
    return result as GeneratedCopy;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("카피를 생성하는 중에 오류가 발생했습니다.");
  }
};
