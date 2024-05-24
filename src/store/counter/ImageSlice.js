import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  themeMode: "light",
}

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {

    toggleThemeMode: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    },
    setDark: (state) => {
      state.themeMode = "dark"
    },
    setLight: (state) => {
      state.themeMode = "light"
    },
  },
})

export const { toggleThemeMode, setDark, setLight } = imageSlice.actions

export default imageSlice.reducer