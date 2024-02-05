import { DiaryEntry } from "../types";

const DiaryEntries = ({entries} : {entries : DiaryEntry[]}) => {
  return (
    <div>
      <header><b>Diary Entries</b></header><br/>
      {entries.map((entry : DiaryEntry) => {
        return <div key={entry.id}> 
          <header><b>{entry.date}</b></header>
          <p>visibility: {entry.visibility}
            <br/> weather: {entry.weather}</p>
        </div>;
      })}
    </div>
  );
};

export default DiaryEntries;