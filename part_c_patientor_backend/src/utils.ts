import { Gender, newPatient } from "./types";

const toNewPatient = (object: unknown): newPatient => {
        if (!object || typeof object !== 'object') {
            throw new Error('Incorrect or missing data');
        }

        if ('name' in object && 'dateOfBirth' in object 
            && 'ssn' in object && 'gender' in object && 'occupation' in object) {

            const newEntry: newPatient = {
                name: parseName(object.name),
                dateOfBirth: parseDateOfBirth(object.dateOfBirth),
                ssn: parseSSN(object.ssn),
                gender: parseGender(object.gender),
                occupation: parseOccupation(object.occupation),
                entries: []
            };

            return newEntry;
        }
        throw new Error('Incorrect data: some fields are missing');

};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Inccorect or missing name');
    }
    return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth)) {
        throw new Error('Inccorect or missing date of birth');
    }
    return dateOfBirth;
};

const parseSSN = (SSN: unknown): string => {
    if (!SSN || !isString(SSN)) {
        throw new Error('Inccorect or missing social security number');
    }
    return SSN;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Inccorect or missing gender');
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Inccorect or missing occupation');
    }
    return occupation;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(gender);
};

export default toNewPatient;