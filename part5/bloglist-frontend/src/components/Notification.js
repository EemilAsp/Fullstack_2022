import '../index.css'

const Notification = ({ message, type }) => {
    if (message === null || type === '') {
      return null
    }
    if ( type === "error"){
        return (
            <div className={'error'}>
              {message}
            </div>
          )
    }else{
        return (
            <div className={'note'}>
              {message}
            </div>
          )
    }
  
    
  }
  
  export default Notification