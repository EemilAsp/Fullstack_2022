
const Header = (props) =>{
  return( 
    <h1>
      {props.name}
    </h1>
  )
}

const Content = (props) =>{
  return(
    <div>
      <p>{props.content1} {props.exercises1}</p>
      <p>{props.content2} {props.exercises2}</p>
      <p>{props.content3} {props.exercises3}</p>
    </div>
  )
}

const Total = (props) =>{
  return(
    <div>
      <p>Number of excercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </div>
  )
}




const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
       <Header name={course} />
      <Content content1={part1} exercises1={exercises1} 
              content2={part2} exercises2={exercises2}
              content3={part3} exercises3={exercises3}/>
      <Total exercises1={exercises1} exercises2={exercises2}
              exercises3={exercises3}/>
    </div>
  )
}

export default App