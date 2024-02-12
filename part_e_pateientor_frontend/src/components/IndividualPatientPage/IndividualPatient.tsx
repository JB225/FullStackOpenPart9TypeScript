import { useParams } from "react-router-dom";
import { Patient, Gender, Diagnosis } from "../../types";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import { Male, Female, Transgender } from "@mui/icons-material";
import { Typography } from "@mui/material";
import PatientEntry from "./PatientEntry";
import diagnosisService from "../../services/diagnoses";

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
            <Typography variant="h5">entries</Typography><br/>
            {patient.entries.map(e => <PatientEntry key={e.id} entry={e} diagnoses={diagnoses}/>)}
        </div>
    );
};

export default IndividualPatient;