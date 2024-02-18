import patientData from '../data/patients';
import { Entry, NewEntry, Patient, newPatient } from '../types';
import { v1 as uuid } from 'uuid';
import { toNewPatient } from '../utils';

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
    const patient = patients.find(p => p.id === id);
    if (!patient) {
        throw new Error("No patient matching the id given has been found");
    }
    return patient;
};

const addPatient = (patient: newPatient): Patient => {
    const newPatientAdded = {
        id: uuid(), 
        ...patient};

    patients.push(newPatientAdded);
    return newPatientAdded;
};

const addEntry = (patientID: string, entry: NewEntry): Entry => {
    const newEntryAdded: Entry = {
        id: uuid(),
        ...entry
    };

    try {
        patients.find(patient => patient.id === patientID)?.entries.push(newEntryAdded);
    }  catch (e) {
        throw new Error("No patient matching the id given has been found");
    }

    return newEntryAdded;
};

export default {
    getPatients,
    getPatient,
    addPatient,
    addEntry
};