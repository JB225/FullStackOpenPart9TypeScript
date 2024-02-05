import { useEffect, useState } from "react";
import { getAllDiaries } from "./Services/diaryService";
import { DiaryEntry } from "./types";
import DiaryEntries from "./Components/DiaryEntries";
import NewDiaryEntryForm from "./Components/NewDiaryEntryForm";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then(data => setEntries(data));
  });

  const addDiaryEntry = ((entryToAdd : DiaryEntry) => {
    setEntries(entries.concat(entryToAdd));
  });

  return (
    <div>
      <NewDiaryEntryForm addDiaryEntry={addDiaryEntry} />
      <br/>
      <DiaryEntries entries={entries}/>
    </div>
  );
};

export default App;
