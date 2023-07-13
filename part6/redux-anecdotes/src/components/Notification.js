import { useSelector } from "react-redux"

const Notification = () => {
  const message = useSelector((state) => {
    return state.notification
  })

  const style = {
    border: "solid",
    padding: 10,
  }

  return <div style={style}>{message}</div>
}

export default Notification
