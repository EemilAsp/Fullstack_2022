import { notificationChange } from "../reducers/notificationReducer"
import { useSelector } from "react-redux"


const Notification = () => {
  const message = useSelector(state => {
    return state.notification
  })

  const style = {
    padding: 10,
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification