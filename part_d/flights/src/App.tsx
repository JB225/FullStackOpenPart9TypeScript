import { useEffect, useState } from "react";
import { getAllDiaries } from "./Services/diaryService";
import { DiaryEntry } from "./types";
import DiaryEntries from "./Components/DiaryEntries";
import NewDiaryEntryForm from "./Components/NewDiaryEntryForm";
import ErrorNotification from "./Components/ErrorNotification";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAllDiaries().then(data => setEntries(data));
  });

  const addDiaryEntry = ((entryToAdd : DiaryEntry) => {
    setEntries(entries.concat(entryToAdd));
  });

  const updateErrorMessage = (message : string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 5000);
  };

  return (
    <div>
      <ErrorNotification message={errorMessage} />
      <NewDiaryEntryForm addDiaryEntry={addDiaryEntry} errorMessageHandler={updateErrorMessage}/>
      <br/>
      <DiaryEntries entries={entries}/>
    </div>
  );
};

export default App;
