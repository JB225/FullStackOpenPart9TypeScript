import React, { useState } from "react";
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "../types";
import { createDiaryEntry } from "../Services/diaryService";

const NewDiaryEntryForm = ({ addDiaryEntry, errorMessageHandler } : 
    {addDiaryEntry: (entry: DiaryEntry) => void; 
      errorMessageHandler : (error: string) => void}) => {
  const [dateInput, setDate] = useState("");
  const [visibilityInput, setVisiblity] = useState("");
  const [weatherInput, setWeather] = useState("");
  const [commentInput, setComment] = useState("");

  const handleSubmit = (event : React.SyntheticEvent) => {
    event.preventDefault();
    const diaryInput: NewDiaryEntry = {
      date: dateInput,
      weather: weatherInput as Weather,
      visibility: visibilityInput as Visibility,
      comment: commentInput
    };

    createDiaryEntry(diaryInput, errorMessageHandler).then(data => {
      addDiaryEntry(data as DiaryEntry);
    });

    setDate("");
    setVisiblity("");
    setWeather("");
    setComment("");
  };

  return (
    <div>
      <header><b>Add diary entry</b></header><br/>
      <form onSubmit={handleSubmit}>
        <label>
            date <input type="date" value={dateInput} onChange={(event) => setDate(event.target.value)} />
        </label><br/>
        <label>
            visibility 
          {/* TODO: Add Radio Buttons */}
          <input type="radio" id="visiblity1" name="visibility" value="great" />
          <label>visibility</label>
          {/* <input type="text" value={visibilityInput} onChange={(event) => setVisiblity(event.target.value)}/> */}
        </label><br/>
        <label>
            weather <input type="text" value={weatherInput} onChange={(event) => setWeather(event.target.value)}/>
        </label><br/>
        <label>
            comment <input type="text" value={commentInput} onChange={(event) => setComment(event.target.value)}/>
        </label>
        <br/><button type='submit'>add</button>
      </form>
    </div>
  );
};

export default NewDiaryEntryForm;