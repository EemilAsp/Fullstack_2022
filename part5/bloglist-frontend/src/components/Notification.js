import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) {
    return null
  }
  const { content, type } = notification

  const style = {
    border: 'solid',
    padding: 10,
    color: type === 'error' ? 'red' : 'Green',
    backgroundColor: type === 'error' ? 'lightpink' : 'lightgreen',
  }

  return <div style={style}>{content}</div>
}

export default Notification
