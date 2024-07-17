

/*
  response
  {
    "userLinkList": [
        {
            "username": "ajtwld",
            "score": 3,
            "profile": "https://daema3.s3.ap-northeast-2.amazonaws.com/06e75706-5af8-4359-8ab7-a319fb630dc8.png"
        },
        {
            "username": "nicknick",
            "score": 0,
            "profile": "https://daema3.s3.ap-northeast-2.amazonaws.com/default.png"
        }
    ]
  }
*/

import { instance } from ".."

export const getRank = async (accessToken) => {
  return await instance({
    method: 'GET',
    url: 'user/rank',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}