

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

export const getMyData = async (accessToken) => {
  return await instance({
    method: 'GET',
    url: 'user/mypages',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}