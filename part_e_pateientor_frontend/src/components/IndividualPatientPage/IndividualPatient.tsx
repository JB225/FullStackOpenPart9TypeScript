import { useParams } from "react-router-dom";
import { Patient, Gender } from "../../types";
// import MaleIcon from '@mui/icons-material/Male';
import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import { Male, Female, Transgender } from "@mui/icons-material";
import { Typography } from "@mui/material";

const IndividualPatient = () => {
    const [patient, setPatient] = useState<Patient>({} as Patient);
    const id: string = useParams().id as string;

    useEffect(() => {
        const fetchPatient = async () => {
            const patient: Patient = await patientService.getPatient(id);
            setPatient(patient);
        };
        fetchPatient();
    });

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

        </div>
    );
};

export default IndividualPatient;