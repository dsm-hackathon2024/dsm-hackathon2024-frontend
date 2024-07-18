

/*
  response
  {
    "count": 0,
    "id": "asdfasdf",
    "userId": "qwertyui",
    "profile": "https://daema3.s3.ap-northeast-2.amazonaws.com/default.png"
  }
*/

import { instance } from ".."

const levelList = {
  '상': 3,
  '중': 2,
  '하': 1
}

export const postAnswerCount = async (accessToken, value) => {
  return await instance({
    method: 'POST',
    url: `user/correct/${levelList[value]}`,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}