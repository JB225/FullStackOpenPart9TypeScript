import { useParams } from "react-router-dom";
import { Patient, Gender, Diagnosis, Entry, EntryWithoutId } from "../../types";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import { Male, Female, Transgender } from "@mui/icons-material";
import { Alert, Button, Fade, MenuItem, Select, Typography } from "@mui/material";
import diagnosisService from "../../services/diagnoses";
import HospitalEntry from "./Entry/HospitalEntry";
import OccupationalHealthCheck from "./Entry/OccupationalHealthCheck";
import HealthCheck from "./Entry/HealthCheck";
import { assertNever } from "../../utils";
import axios from "axios";
import HealthCheckEntryForm from "./EntryForms/HealthCheckEntryForm";
import HosptialEntryForm from "./EntryForms/HospitalEntryForm";
import OccupationalHealthCheckEntryForm from "./EntryForms/OccupationalHealthCheckEntryForm";

const IndividualPatient = () => {
  const [patient, setPatient] = useState<Patient>({id: "", name: "", dateOfBirth: "", ssn: "",
    gender: Gender.Other, occupation: "", entries: []});
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [entryFormVisible, setEntryFormVisible] = useState<boolean>(false);
  const [entryFormType, setEntryFormType] = useState<string>("HealthCheck");

  const id: string = useParams().id as string;

  useEffect(() => {
    const fetchPatient = async () => {
      const patient: Patient = await patientService.getPatient(id);
      setPatient(patient);
    };
    void fetchPatient();

    const fetchDiagnoses = async () => {
      const diagnosesData: Diagnosis[] = await diagnosisService.getAll();
      setDiagnoses(diagnosesData);
    };
    void fetchDiagnoses();

  }, [id]);

  const entryComponent = (entry: Entry) => {
    switch(entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} diagnoses={diagnoses} key={entry.id}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthCheck entry={entry} diagnoses={diagnoses} key={entry.id}/>;
    case "HealthCheck":
      return <HealthCheck entry={entry} diagnoses={diagnoses} key={entry.id}/>;
    default:
      return assertNever(entry);
    }
  };

  const entryFormComponent = () => {
    switch(entryFormType) {
    case "Hospital":
      return <HosptialEntryForm submitNewEntry={submitNewEntry} setEntryFormVisible={setEntryFormVisible} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthCheckEntryForm submitNewEntry={submitNewEntry} setEntryFormVisible={setEntryFormVisible} />;
    case "HealthCheck":
      return <HealthCheckEntryForm submitNewEntry={submitNewEntry} setEntryFormVisible={setEntryFormVisible} />;
    default:
      return assertNever(entryFormType as never);
    }
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const entry: Entry = await patientService.createNewEntry(patient.id, values);

      const patientCopy = {...patient};
      patientCopy.entries.push(entry);
      setPatient(patientCopy);

    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data?.error && typeof e?.response?.data?.error === "string") {
          const  message = e.response.data.error.replace("Something went wrong. Error: ", "");
          console.error(message);
          handleError(message);
        } else {
          handleError("Unrecognized axios error");
        }
      } else {
        handleError("Unkown Error");
      }
    }
  };

  const handleError = (message: string) => {
    setErrorMessage(message);
    setAlertVisible(true);
  };

  return (
    <div>
      <br/>
      <Typography variant="h4" style={{ fontWeight: "bold" }}>
        {patient.name} 
        {{
          [Gender.Male]: <Male />,
          [Gender.Female]: <Female />,
          [Gender.Other]: <Transgender />
        } [patient.gender]}
      </Typography><br/>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>

      { alertVisible &&
      (<Fade in={alertVisible} addEndListener={() => setTimeout(() => {setAlertVisible(false);}, 5000)}>
        <Alert severity="error">{errorMessage}</Alert>
      </Fade>)}

      {entryFormVisible ? 
        entryFormComponent() : 
        <div>
          <Select label="Entry Form Type" variant="standard" value={entryFormType} 
            onChange={event => setEntryFormType(event.target.value as string)}>
            <MenuItem value={"Hospital"}>Hospital</MenuItem>
            <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
            <MenuItem value={"OccupationalHealthcare"}>Occupational Health Check</MenuItem>            
          </Select><br/>
          <Button sx={{mt: 2, mb:2}} variant="contained" onClick={() => setEntryFormVisible(!entryFormVisible)}>
          Create New Entry</Button>
        </div>}


      <Typography variant="h5">entries</Typography><br/>
      {patient.entries.map(e => entryComponent(e))}
    </div>
  );
};

export default IndividualPatient;