import { Diagnosis, Entry, EntryWithoutId, Gender, newPatient } from "./types";

export const toNewPatient = (object: unknown): newPatient => {
        if (!object || typeof object !== 'object') {
            throw new Error('Incorrect or missing data');
        }

        if ('name' in object && 'dateOfBirth' in object 
            && 'ssn' in object && 'gender' in object 
            && 'occupation' in object && 'entries' in object) {

            const newEntry: newPatient = {
                name: parseString(object.name, 'name'),
                dateOfBirth: parseString(object.dateOfBirth, 'dateOfBirth'),
                ssn: parseString(object.ssn, 'ssn'),
                gender: parseGender(object.gender),
                occupation: parseString(object.occupation, 'occupation'),
                entries: parseEntries(object.entries)
            };

            return newEntry;
        }
        throw new Error('Incorrect data: some fields are missing');
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('description' in object && 'date' in object && 'specialist' in object 
     && 'diagnosisCodes' in object && 'type' in object 
     && (object.type === 'Hospital' || object.type === 'OccupationalHealthcare' || object.type === 'HealthCheck') ) {

        // const newEntry: EntryWithoutId = {
        //     description: parseString(object.description, 'description'),
        //     date: parseString(object.date, 'date'),
        //     specialist: parseString(object.specialist, 'specialist'),
        //     diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        //     type: object.type
        // };

        switch (object.type) {
            case 'OccupationalHealthcare':
                if ('employerName' in object && 'sickLeave' in object) {
                    const newEntry: EntryWithoutId = {
                        description: parseString(object.description, 'description'),
                        date: parseString(object.date, 'date'),
                        specialist: parseString(object.specialist, 'specialist'),
                        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                        type: object.type,
                        employerName: parseString(object.employerName, 'employerName'),
                        // sickLeave: parseSickLeave
                    };

                    return newEntry;
                }
            // case 'HealthCheck':
            //     return parseHealthCheckEntry(object);
            // case 'Hosptial':
            //     return parseHospitalEntry(object);
        }

        // return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};

const parseString = (stringValue: unknown, variableName: string): string => {
    if (!stringValue || !isString(stringValue)) {
        throw new Error(`Inccorect or missing ${variableName}`);
    }
    return stringValue;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Inccorect or missing gender');
    }
    return gender;
};

const parseEntries = (entries: unknown): Entry[] => {
    if (!entries || !isEntryArray(entries)) {
        throw new Error('Incorrect or missing entries');
    }
    return entries;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      return [] as Array<Diagnosis['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnosis['code']>;
  };

// const parseSickLeave(object: unknown): SickLeave => {
//     if (!object || !isSickLeave(object) || !('endDate' in object) ) {
//         throw new Error('Incorrect or missing sick leave');
//     }

//     return object;
// }

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
    return typeof entry === 'object' && entry !== null && 'description' in entry 
    && 'date' in entry && 'specialist' in entry && 'type' in entry 
    && (entry.type === 'Hospital' || entry.type === 'OccupationalHealthcare' || entry.type === 'HealthCheck');
};

// const isSickLeave(leave: unknown): leave is SickLeave => {
//     return typeof leave === 'object' && leave !== null && 'startDate' in leave && isString(leave.startDate) 
//     && 'endDate' in leave && isString(leave.endDate);
// }