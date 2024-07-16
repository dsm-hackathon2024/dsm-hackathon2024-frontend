import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = []

export const showToastAsync = createAsyncThunk(
  'toast/showToastAsync',
  async (payload, { dispatch, getState }) => {
    const { id } = payload
    const { toast: toastData } = getState()
    const key = toastData.map((value) => value.id)

    if (key.includes(id)) {
      dispatch(patchToast(payload))
    } else {
      dispatch(createToast(payload))
    }
  })

const toastReducer = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    createToast: (state, action) => {
      state.push({
        id: action.payload.id,
        message: action.payload.message,
        type: action.payload.type,
        duration: action.payload.duration
      })
    },
    deleteToast: (state, action) => {
      const key = state.map((value) => value.id)
      const toastIndex = key.indexOf(action.payload.id)
      return state.filter((_, index) => index != toastIndex)
    },
    patchToast: (state, action) => {
      return state.map((value) => value.id === action.payload.id ? action.payload : value)
    }
  }
})

export default toastReducer.reducer
export const { createToast, deleteToast, patchToast } = toastReducer.actions