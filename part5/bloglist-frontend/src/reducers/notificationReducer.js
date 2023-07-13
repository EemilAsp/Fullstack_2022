import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    notificationChange(state, action) {
      const { content, type } = action.payload
      return { content, type }
    },
  },
})

export const setNotification = (content, time, type) => {
  return async (dispatch) => {
    dispatch(notificationChange({ content, type }))
    setTimeout(() => {
      dispatch(notificationChange({ content: null, type: null }))
    }, time * 1000)
  }
}

export const { notificationChange } = notificationSlice.actions
export default notificationSlice.reducer
