

/*
  response
  {
    "question": "미국의 ‘니어쇼어링’으로부터 경제가 큰 수혜를 받는 나라로 꼽힌다. 미국과 국경이 맞닿아 있고 화폐는 페소화를 쓰는 이 국가는?",
    "options": [
      "베트남",
      "멕시코",
      "쿠바",
      "브라질"
    ],
    "answer": "멕시코"
  }
*/

import { instance } from ".."

export const postPrompt = async (value) => {
  return await instance({
    method: 'POST',
    baseURL: 'http://192.168.0.26:8000',
    url: 'prompt',
    data: {
      prompt: value
    }
  })
}