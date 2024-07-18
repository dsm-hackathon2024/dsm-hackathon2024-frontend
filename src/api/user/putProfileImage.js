import { instance } from ".."

export const putProfileImage = async (accessToken, imageFile) => {
  const data = new FormData()
  data.append('image', imageFile)

  return await instance({
    method: 'PUT',
    url: 'user/profile',
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}