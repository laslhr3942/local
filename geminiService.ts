
import { GoogleGenAI, Type } from "@google/genai";
import { ProductInfo, GeneratedCopy } from "../types";

export const generateCopy = async (info: ProductInfo): Promise<GeneratedCopy> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const isBlog = info.outputFormat === 'BLOG';

  const prompt = `
    다음 로컬 제품에 대한 매력적인 ${isBlog ? '블로그 포스팅용 긴 글' : 'SNS용 감성 카피'}를 작성해 주세요.
    
    [제품 정보]
    - 제품명: ${info.productName}
    - 지역/원산지: ${info.region}
    - 제철 정보: ${info.season}
    - 핵심 특징: ${info.features}
    - 생산자 이야기/철학: ${info.producerStory}
    - 타겟 고객: ${info.target}
    - 톤앤매너: ${info.tone}
  `;

  const systemInstruction = `
    당신은 10년 차 로컬 큐레이터이자 감성 에세이 작가입니다. 
    지역 고유의 제품이 가진 가치를 서정적이고 신뢰감 있는 어조로 소개합니다. 
    
    [작성 가이드라인]
    1. 사용자의 '톤앤매너'를 최우선으로 반영하세요.
    2. '생산자 이야기'와 '제철 정보'를 문장에 자연스럽게 녹여내어 진정성을 더하세요.
    3. ${isBlog ? '블로그 형식: 제목은 시적이며, 본문은 800자 내외로 문단을 나누어 깊이 있는 서사를 작성하세요.' : 'SNS 형식: 시선을 끄는 헤드라인과 300자 내외의 여운이 남는 짧은 본문으로 작성하세요.'}
    4. 마치 해당 지역의 풍경과 흙내음이 독자에게 전달되듯 묘사하세요.
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
              description: isBlog ? "블로그 포스팅 제목" : "인스타그램용 헤드라인 (이모지 포함)",
            },
            body: {
              type: Type.STRING,
              description: isBlog ? "800자 내외의 심도 깊은 스토리텔링 본문 (문단 구분 포함)" : "300자 내외의 감성적인 짧은 글",
            },
            hashtags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: isBlog ? "관련 키워드 5개" : "인스타그램용 해시태그 5개",
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
