import '../index.css'

const Notification = ({ message, type }) => {
    if (message === null || type === '') {
      return null
    }
    if ( type === "error"){
        return (
            <div class={'error'}>
              {message}
            </div>
          )
    }else{
        return (
            <div class={'note'}>
              {message}
            </div>
          )
    }
  
    
  }
  
  export default Notification