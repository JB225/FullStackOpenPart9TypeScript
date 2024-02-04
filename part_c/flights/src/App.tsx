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

  return (
    <div>
      <NewDiaryEntryForm />
      <br/>
      <DiaryEntries entries={entries}/>
    </div>
  );
};

export default App;
