

const Alerts = ({alertmessage}) => {
    if(alertmessage === null || alertmessage.length === 0 ){
        return (<div>{alertmessage}</div>)
    }else{
        if(alertmessage.includes("ERROR!")){
            return(
                <div className={"error"}>
                {alertmessage}
                </div>
                ) 
        }else{
        return(
            <div className={"alert"}>
                <br/>
                <em>{alertmessage}</em>
                </div>
            )}
    }

}

export default Alerts