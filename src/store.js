import { configureStore } from '@reduxjs/toolkit'
import loaderSlice from './redux/feature/loaderSlice'

export default configureStore({
  reducer: {
    loader: loaderSlice,
  },
})
