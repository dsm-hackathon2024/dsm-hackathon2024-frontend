import { nanoid } from '@reduxjs/toolkit'
import { createToast, showToastAsync } from '../store/modules/toast'
import store from '../store/store'

export const toast = (type, message, toastId) => {
  const id = toastId || nanoid()
  switch (type) {
    case 'success':
      return (() => {
        store.dispatch(showToastAsync({
          id,
          message,
          type: 'success',
          duration: 2000
        }))
        return id
      })()
    case 'error':
      return (() => {
        store.dispatch(showToastAsync({
          id,
          message,
          type: 'error',
          duration: 2000
        }))
        return id
      })()
    case 'loading':
      return (() => {
        store.dispatch(createToast({
          id,
          message,
          type: 'loading',
          duration: Infinity
        }))
        return id
      })()
  }
}

toast.success = (message, toastId) => toast('success', message, toastId)
toast.error = (message, toastId) => toast('error', message, toastId)
toast.loading = (message, toastId) => toast('loading', message, toastId)