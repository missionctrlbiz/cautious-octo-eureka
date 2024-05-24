import { configureStore } from '@reduxjs/toolkit'
import imageSlice from '../store/counter/ImageSlice'


export const store = configureStore({
  reducer: {
    image: imageSlice
  },
})