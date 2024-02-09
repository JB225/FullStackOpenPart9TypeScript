import patientData from '../data/patients';
import { Patient, newPatient } from '../types';
import { v1 as uuid } from 'uuid';
import toNewPatient from '../utils';

const patients: Patient [] = patientData.map(obj => {
    const object = toNewPatient(obj) as Patient;
    object.id = obj.id;
    return object;
  });

const getPatients = (): Omit<Patient, 'ssn'>[] => {
    return patients.map(({id, name, gender, dateOfBirth, occupation, entries}) => ({
        id , name, gender, dateOfBirth, occupation, entries}));
};

const getPatient = (id: string): Omit<Patient, 'ssn'> => {
    const filteredPatients = patients.filter(p => p.id === id);
    if (filteredPatients.length > 1 || filteredPatients.length === 0) {
        throw new Error("No patient matching the id given has been found");
    }
    return patients.filter(p => p.id === id)[0];
};

const addPatient = (patient: newPatient): Patient => {
    
    const newPatientAdded = {
        id: uuid(), 
        ...patient};

    patients.push(newPatientAdded);
    return newPatientAdded;
};

export default {
    getPatients,
    getPatient,
    addPatient
};