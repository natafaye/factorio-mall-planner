import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
    showAaiIcons: true,
    showKrIcons: false,
    showSeIcons: false
}

const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<Partial<typeof initialState>>) => {
        return {
            ...state,
            ...action.payload
        }
    }
  }
});

export const { setSettings } = settingSlice.actions

export const settingReducer = settingSlice.reducer