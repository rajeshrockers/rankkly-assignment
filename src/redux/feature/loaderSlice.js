import { createSlice } from '@reduxjs/toolkit'

export const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    isLoading: false,
  },
  reducers: {
    startLoading: (state, action) => {
      state.isLoading = true
    },
    stopLoading: (state, action) => {
      state.isLoading = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { startLoading, stopLoading } = loaderSlice.actions

export default loaderSlice.reducer
