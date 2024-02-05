import { CoursePart } from "../types";

const Part = ({coursePart} : {coursePart : CoursePart}) : JSX.Element => {

  const narrowType = (part: CoursePart) => {
    switch(part.kind) {
    case "basic":
      return <div>
        <p><b>{part.name} {part.exerciseCount}</b>
          <br/><i>{part.description}</i></p>
      </div>;
    case "group":
      return <div>
        <p><b>{part.name} {part.exerciseCount}</b>
          <br/>project exercises {part.groupProjectCount}</p>
      </div>;
    case "background":
      return <div>
        <p><b>{part.name} {part.exerciseCount}</b>
          <br/><i>{part.description}</i>
          <br/>required material {part.backgroundMaterial}</p>
      </div>;
    default:
      break;        
    }
  };

  return (
    <div>
      {narrowType(coursePart)}
    </div>
  );
};

export default Part;