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
    return patients.map(({id, name, gender, dateOfBirth, occupation}) => ({
        id , name, gender, dateOfBirth, occupation}));
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
    addPatient
};