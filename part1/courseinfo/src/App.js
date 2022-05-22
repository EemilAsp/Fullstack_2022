
const Header = (props) =>{
  return( 
    <h1>
      {props.course}
    </h1>
  )
}

const Part = (props) =>{
  return(
    <div>
      <p>{props.content.title} {props.content.exercises}</p>
    </div>
  )
}

const Content = (props) =>{
  return(
    <div>
      <Part content={props.content[0]}/>
      <Part content={props.content[1]}/>
      <Part content={props.content[2]}/>
    </div>
  )
}

const Total = (props) =>{
  return(
    <div>
      Number of excercises {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises}
    </div>
  )
}




const App = () => {
  const course = {
  header: 'Half Stack application development',
  parts: [
    {
      title: 'Fundamentals of React',
      exercises: 10
    },
    {
      title: 'Using props to pass data',
      exercises: 7
    },
    {
      title: 'State of a component',
      exercises: 4
    }
  ]
}

  return (
    <div>
       <Header course={course.header} />
       <Content content={course.parts} />
       <Total total={course.parts} />
    </div>
  )
}

export default App