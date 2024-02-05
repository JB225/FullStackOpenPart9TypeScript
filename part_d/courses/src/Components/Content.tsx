import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({courses} : {courses: CoursePart[]}): JSX.Element => {
  return (
    <div>
      { courses.map((course : CoursePart) => {
        return <Part coursePart={course}/>; 
      })}
    </div>
  );
};

export default Content;