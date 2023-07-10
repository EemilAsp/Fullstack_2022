import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        notificationChange(state, action) {
            return action.payload
        }
    }
})

export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch(notificationChange(content))
        setTimeout(() => {
            dispatch(notificationChange(null));
        }, time * 1000)
    }
}

export const {notificationChange} = notificationSlice.actions
export default notificationSlice.reducer