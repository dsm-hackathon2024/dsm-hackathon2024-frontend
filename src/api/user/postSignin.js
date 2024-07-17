

/*
  보낼 때 예시
  {
    "id": "asdf",
    "password": "qwerqewr"
  }
  - 아이디: 6~12
  - 비밀번호: 8~20

  response
  {
    accessToken: 'asdabhsdhjbajsdn'
  }
*/

import { instance } from ".."

export const postSignin = async (data) => {
    return await instance.post('user/signin', data)
}