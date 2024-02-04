import React, { useState } from "react";

const NewDiaryEntryForm = () => {
  const [date, setDate] = useState("");
  const [visibility, setVisiblity] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");


  const handleSubmit = (event : React.SyntheticEvent) => {
    event.preventDefault();
    console.log(date);
  };

  return (
    <div>
      <header><b>Add diary entry</b></header><br/>
      <form onSubmit={handleSubmit}>
        <label>
            date <input type="text" value={date} onChange={(event) => setDate(event.target.value)}/>
        </label><br/>
        <label>
            visibility <input type="text" value={visibility} onChange={(event) => setVisiblity(event.target.value)}/>
        </label><br/>
        <label>
            weather <input type="text" value={weather} onChange={(event) => setWeather(event.target.value)}/>
        </label><br/>
        <label>
            comment <input type="text" value={comment} onChange={(event) => setComment(event.target.value)}/>
        </label>
        <br/><button type='submit'>add</button>
      </form>
    </div>
  );
};

export default NewDiaryEntryForm;