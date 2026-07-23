require('dotenv').config(); // .env 파일에서 환경변수를 안전하게 불러옵니다.
const fs = require('fs');
const OpenAI = require('openai');
// PDF를 이미지로 변환하기 위한 라이브러리 (npm install pdf2pic)
// 주의: Windows의 경우 Ghostscript와 GraphicsMagick이 시스템에 설치되어 있어야 합니다.
const { fromPath } = require('pdf2pic'); 

// 터미널에서 set OPENAI_API_KEY=당신의_API_키 로 설정해야 합니다.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

async function extractScannedPDFWithChatGPT() {
  const pdfPath = './estimate.pdf';

  try {
    console.log('1. 스캔된 PDF를 이미지(PNG)로 변환합니다...');
    
    // PDF의 1페이지를 이미지로 변환하는 설정
    const options = {
      density: 300,           // 해상도 (스캔본 인식을 위해 높게 설정)
      saveFilename: "estimate_page_1",
      savePath: "./",
      format: "png",
      width: 2480,
      height: 3508
    };
    
    const storeAsImage = fromPath(pdfPath, options);
    const resolve = await storeAsImage(1); // 1페이지 변환
    
    console.log(`[성공] 이미지 변환 완료: ${resolve.path}`);

    console.log('2. ChatGPT (gpt-4o) 모델에 이미지를 전송하여 텍스트를 추출합니다...');
    
    // 생성된 이미지를 Base64 문자열로 읽어옵니다.
    const imageAsBase64 = fs.readFileSync(resolve.path, 'base64');

    // ChatGPT의 최신 비전 모델(gpt-4o)에 이미지와 프롬프트를 함께 보냅니다.
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { 
              type: "text", 
              text: "이 이미지는 스캔된 견적서입니다. 안에 있는 표와 글씨를 인식해서 품목, 수량, 단가, 총액 등을 JSON 형식으로 정리해 줘." 
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${imageAsBase64}`,
              },
            },
          ],
        },
      ],
    });

    console.log('\n================ [ChatGPT 분석 결과] ================');
    console.log(response.choices[0].message.content);
    console.log('====================================================');

  } catch (error) {
    console.error('\n[오류 발생]', error.message);
    console.log('팁: 스캔본을 읽으려면 PDF를 이미지로 바꾸는 작업이 필수적입니다.');
  }
}

extractScannedPDFWithChatGPT();
