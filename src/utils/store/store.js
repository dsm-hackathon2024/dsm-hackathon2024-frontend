import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import rootReducer from './modules'
import { useDispatch } from 'react-redux'

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})

export const useAppDispatch = useDispatch

export default store
