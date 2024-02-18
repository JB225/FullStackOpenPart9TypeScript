import { useParams } from "react-router-dom";
import { Patient, Gender, Diagnosis, Entry } from "../../types";
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
      <div>occupation: {patient.occupation}</div><br/>

      <EntryForm />

      <Typography variant="h5">entries</Typography><br/>
      {patient.entries.map(e => entryComponent(e))}
    </div>
  );
};

export default IndividualPatient;