import { useParams } from "react-router-dom";
import { Patient, Gender, Diagnosis, Entry, EntryWithoutId } from "../../types";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import { Male, Female, Transgender } from "@mui/icons-material";
import { Typography } from "@mui/material";
import diagnosisService from "../../services/diagnoses";
import HospitalEntry from "./Entry/HospitalEntry";
import OccupationalHealthCheck from "./Entry/OccupationalHealthCheck";
import HealthCheck from "./Entry/HealthCheck";
import { assertNever } from "../../utils";
import EntryForm from "./EntryForm";
import axios from "axios";

const IndividualPatient = () => {
  const [patient, setPatient] = useState<Patient>({id: '', name: '', dateOfBirth: '', ssn: '',
    gender: Gender.Other, occupation: '', entries: []});
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
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

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const entry: Entry = await patientService.createNewEntry(patient.id, values);

      const patientCopy = {...patient};
      patientCopy.entries.push(entry);
      setPatient(patientCopy);

    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          // Add Error Notification Handling here
          // setError(message);
        } else {
          // setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        // setError("Unknown error");
      }
    }
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

      <EntryForm submitNewEntry={submitNewEntry} />

      <Typography variant="h5">entries</Typography><br/>
      {patient.entries.map(e => entryComponent(e))}
    </div>
  );
};

export default IndividualPatient;