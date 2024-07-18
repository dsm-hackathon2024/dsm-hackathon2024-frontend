

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

export const putProfile = async (accessToken, value) => {
  return await instance({
    method: 'PUT',
    url: 'user/mypages/update',
    data: {
      username: value
    },
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}