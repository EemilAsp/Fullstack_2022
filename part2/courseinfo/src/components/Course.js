
const Title = ({name}) => {
  return( <h2>{name}</h2> )
};

const Content = ({parts}) => {
  return( parts.map((part) => <p>{part.name} {part.exercises}</p>) );
    };

const Sum = ({parts}) => {
  const part = parts.map(part => part.exercises);
  const total = part.reduce((prev, curr) => prev + curr);
  return(
    <h3>Total of {total} exercises</h3>
  );
};

const Course = ({course}) => {
  return (
      <div>
        <Title name = {course.name} />
        <Content parts = {course.parts} />
        <Sum parts = {course.parts}/>
      </div>
    );
  };

  
  export default Course