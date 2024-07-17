export const getCookie = (name) => {
  if (typeof window !== 'object') return
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + '=([^;]*)')
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

export const setCookie = (name, value) => {
  document.cookie = `${name}=${value}`
}

export const deleteCookie = (name) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export const cleanCookie = () => {
  document.cookie = ''
}
