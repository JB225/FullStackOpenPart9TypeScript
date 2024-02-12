import { Diagnosis, Entry } from "../../types";

interface Props {
    entry: Entry;
    diagnoses: Diagnosis[];
}

const PatientEntry = ({ entry, diagnoses }: Props) => {
    return (
        <div>
            {entry.date} <i>{entry.description}</i><br/><br/>
            {entry.diagnosisCodes?.map(d => <li key={d}>{d} {diagnoses.find(diag => diag.code === d)?.name}</li>)}<br/>
        </div>
    );
};

export default PatientEntry;