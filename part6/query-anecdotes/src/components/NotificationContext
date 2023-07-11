import React, {  createContext , useReducer } from 'react';

const NotificationContext = createContext();

const notificationReducer = (state, action) =>{
  switch (action.type) {
    case 'SHOW':
      return {message: action.payload}
    case 'HIDE':
      return {message: null}
    default:
      return state
  }
}

export const NotificationContextProvider = (props) => {
  const [counter, counterDispatch] = useReducer(notificationReducer, 0)
  return(
    <NotificationContext.Provider value={[counter, counterDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext