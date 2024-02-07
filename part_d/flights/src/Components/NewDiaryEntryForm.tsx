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
        <div onChange={(event) => setVisiblity((event.target as HTMLInputElement).value)}>
            visibility 
          <input type="radio" name="visibility" value="great"/> great
          <input type="radio" name="visibility" value="good" /> good
          <input type="radio" name="visibility" value="ok" /> ok
          <input type="radio" name="visibility" value="poor" /> poor
        </div>
        <div onChange={(event) => setWeather((event.target as HTMLInputElement).value)}>
            weather 
          <input type="radio" name="weather" value="sunny"/> sunny
          <input type="radio" name="weather" value="rainy" /> rainy
          <input type="radio" name="weather" value="cloudy" /> cloudy
          <input type="radio" name="weather" value="stormy" /> stormy
          <input type="radio" name="weather" value="windy" /> windy
        </div>
        <label>
            comment <input type="text" value={commentInput} onChange={(event) => setComment(event.target.value)}/>
        </label>
        <br/><button type='submit'>add</button>
      </form>
    </div>
  );
};

export default NewDiaryEntryForm;