

/*
  response
  {
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