import patientData from '../data/patients';
import { Patient } from '../types';

const patients: Patient[] = patientData;

const getPatients = (): Omit<Patient, 'ssn'>[] => {
    return patients.map(({id, name, gender, dateOfBirth, occupation}) => ({
        id , name, gender, dateOfBirth, occupation}));
};

export default {
    getPatients
};