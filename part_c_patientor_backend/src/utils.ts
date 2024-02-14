import { Entry, Gender, newPatient } from "./types";

const toNewPatient = (object: unknown): newPatient => {
        if (!object || typeof object !== 'object') {
            throw new Error('Incorrect or missing data');
        }

        if ('name' in object && 'dateOfBirth' in object 
            && 'ssn' in object && 'gender' in object 
            && 'occupation' in object && 'entries' in object) {

            const newEntry: newPatient = {
                name: parseName(object.name),
                dateOfBirth: parseDateOfBirth(object.dateOfBirth),
                ssn: parseSSN(object.ssn),
                gender: parseGender(object.gender),
                occupation: parseOccupation(object.occupation),
                entries: parseEntries(object.entries)
            };

            return newEntry;
        }
        throw new Error('Incorrect data: some fields are missing');
};


// TODO: Type Check Entries
// const toNewEntry = (object: unknown): EntryWithoutId => {
//     if (!object || typeof object !== 'object') {
//         throw new Error('Incorrect or missing data');
//     }

//     if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object) {
//         switch (object.type) {
//             case 'OccupationalHealthcare':
//                 return parseOccupationalHealthcareEntry(object);
//             case 'HealthCheck':
//                 return parseHealthCheckEntry(obejct);
//             case 'Hosptial':
//                 return parseHospitalEntry(object);
//             default:
//                 return assertNever(object);
//         }
//     }
// };

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
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

const parseEntries = (entries: unknown): Entry[] => {
    if (!entries || !isEntryArray(entries)) {
        throw new Error('Incorrect or missing entries');
    }
    return entries;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(gender);
};

const isEntryArray = (entries: unknown): entries is Entry[] => {
    if (!Array.isArray(entries)) {
        throw new Error ('Incorrect or missing entries');
    }
    return entries.every(e => isEntry(e));
};

const isEntry = (entry: unknown): entry is {Entry: unknown} => {
    return typeof entry === 'object' && entry !== null && 'type' in entry && (entry.type === 'Hospital' ||  
        entry.type === 'OccupationalHealthcare' || entry.type === 'HealthCheck');
};

// const parseOccupationalHealthcareEntry = (entry: unknown): entry is OccupationalHealthcareEntry => {
//     if ('employerName' in entry) {

//     }
// }

// const assertNever = (value: never): never => {
//     throw new Error(
//       `Unhandled discriminated union member: ${JSON.stringify(value)}`
//     );
//   };

export default toNewPatient;