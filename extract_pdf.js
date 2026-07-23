require('dotenv').config(); // .env 파일에서 환경변수를 안전하게 불러옵니다.
const { GoogleGenAI } = require('@google/genai');

// API 키가 필요합니다. 실행 전에 터미널에서 아래와 같이 환경변수를 설정해주세요.
// set GEMINI_API_KEY=본인의_제미나이_API_키
const ai = new GoogleGenAI({});

async function extractEstimate() {
  // 현재 폴더에 있는 'estimate.pdf' 파일을 읽어옵니다.
  // 실제 가지고 계신 스캔본 PDF 파일 이름을 여기에 맞춰주세요.
  const filePath = './estimate.pdf'; 

  try {
    console.log('1. 스캔된 PDF 파일을 AI로 업로드 중...');
    
    // PDF 파일을 Gemini API로 업로드합니다.
    const uploadResult = await ai.files.upload({
      file: filePath,
      mimeType: 'application/pdf',
    });
    console.log(`업로드 완료!`);

    console.log('2. AI에게 견적서 스캔본 내용 분석을 요청합니다 (약 10~20초 소요)...');
    
    // Gemini 2.5 Pro 모델은 이미지/스캔본 PDF 인식(OCR)에 매우 뛰어납니다.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro', 
      contents: [
        uploadResult, 
        '이 문서는 스캔된 견적서입니다. 스캔본 안의 표와 글씨를 읽고, 품목명, 수량, 단가, 금액 등을 파악해서 보기 쉬운 텍스트나 표 형태로 추출해 줘. 글씨가 다소 흐릿해도 최대한 문맥에 맞게 읽어줘.'
      ],
    });

    console.log('\n================ [AI 분석 결과] ================');
    console.log(response.text);
    console.log('================================================');

  } catch (error) {
    console.error('\n[오류 발생]', error.message);
    console.log('해결 방법:');
    console.log('1. 같은 폴더에 "estimate.pdf" 파일이 있는지 확인하세요.');
    console.log('2. GEMINI_API_KEY가 올바르게 설정되었는지 확인하세요.');
  }
}

extractEstimate();
