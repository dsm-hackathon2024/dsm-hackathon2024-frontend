

/*
  보낼 때 예시
  {
    "id": "asdf",
    "username": "닉네임",
    "password": "qwerqewr"
  }
  - 아이디: 6~12
  - 비밀번호: 8~20
  - 닉네임: 2~20
*/

import { instance } from ".."

export const postSignup = async (data) => {
    return await instance.post('user/signup', data)
}