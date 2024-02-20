import { Diagnosis, Discharge, Entry, Gender, HealthCheckRating, NewBaseEntry, NewEntry, SickLeave, newPatient } from "./types";

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

export const toNewEntry = (object: unknown): NewEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    const newBaseEntry = toNewBaseEntry (object);

    if ('type' in object) {
        switch (object.type) {
            case 'OccupationalHealthcare':
                return toOccupationalHealthCareEntry(newBaseEntry, object);

            case 'HealthCheck':
                return toHealthCheck(newBaseEntry, object);

            case 'Hospital':
               return toHospital(newBaseEntry, object);
        }

    }
    throw new Error('Incorrect entry: some fields are missing');
};

const toNewBaseEntry = (entry: unknown): NewBaseEntry => {
    if (!entry || typeof entry !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('description' in entry && 'date' in entry && 'specialist' in entry && 'type' in entry 
    && (entry.type === 'Hospital' || entry.type === 'OccupationalHealthcare' || entry.type === 'HealthCheck') ) {

       const newBaseEntry: NewBaseEntry = {
           description: parseString(entry.description, 'description'),
           date: parseString(entry.date, 'date'),
           specialist: parseString(entry.specialist, 'specialist')
       };

       if ('diagnosisCodes' in entry) {
           newBaseEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
       }

       return newBaseEntry;
    }
    throw new Error('Incorrect entry: some fields are missing');
};

const toOccupationalHealthCareEntry = (baseEntry : NewBaseEntry, entry: unknown): NewEntry => {
    if (!entry || typeof entry !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    
    if ('type' in entry && entry.type === 'OccupationalHealthcare' && 'employerName' in entry) {
        const newEntry: NewEntry = {
            ...baseEntry,
            type: entry.type,
            employerName: parseString(entry.employerName, 'employer name')
        };

        if ('sickLeave' in entry) {
            newEntry.sickLeave = parseSickLeave(entry.sickLeave);
        }

        return newEntry;
    }
    throw new Error('Incorrect or missing values in occupational healthcare entry');
};

const toHealthCheck = (baseEntry : NewBaseEntry, entry: unknown): NewEntry => {
    if (!entry || typeof entry !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ( 'type' in entry && entry.type === 'HealthCheck' && 'healthCheckRating' in entry) {
        const newEntry: NewEntry = {
            ...baseEntry,
            type: entry.type,
            healthCheckRating: parseHealthCheckEntry(entry.healthCheckRating)
        };

        return newEntry;
    }
    throw new Error('Incorrect or missing values in health check entry');
};

const toHospital = (baseEntry : NewBaseEntry, entry: unknown): NewEntry => {
    if (!entry || typeof entry !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('type' in entry && entry.type === 'Hospital' && 'discharge' in entry) {
        const newEntry: NewEntry = {
            ...baseEntry,
            type: entry.type,
            discharge: parseDischarge(entry.discharge)
        };

        return newEntry;
    }
    throw new Error('Incorrect or missing values in occupational hosptial entry'); 
};

const parseString = (stringValue: unknown, variableName: string): string => {
    if (!stringValue || !isString(stringValue)) {
        throw new Error(`Inccorect or missing ${variableName}`);
    }
    return stringValue;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorect or missing gender');
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

const parseSickLeave = (object: unknown): SickLeave => {
    if (!object || !isSickLeave(object)) {
        throw new Error('Incorrect or missing sick leave');
    }

    return object;
};

const parseHealthCheckEntry = (healthRating: unknown): HealthCheckRating => {
    console.log(healthRating);
    if (!healthRating || !isHealthCheckRating(healthRating)) {
        throw new Error('Incorrect or missing health check rating');
    }
    return healthRating;
};

const parseDischarge = (discharge: unknown): Discharge => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error('Incorrect or missing discharge');
    }

    return discharge;
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
    return typeof entry === 'object' && entry !== null && 'description' in entry 
    && 'date' in entry && 'specialist' in entry && 'type' in entry 
    && (entry.type === 'Hospital' || entry.type === 'OccupationalHealthcare' || entry.type === 'HealthCheck');
};

const isSickLeave = (leave: unknown): leave is SickLeave => {
    return typeof leave === 'object' && leave !== null && 'startDate' in leave && isString(leave.startDate) 
        && 'endDate' in leave && isString(leave.endDate);
};

const isHealthCheckRating = (healthRating: unknown): healthRating is HealthCheckRating => {
    return isString(healthRating) && Object.values(HealthCheckRating).map(v => v).includes(healthRating);
};

const isDischarge = (discharge: unknown): discharge is Discharge => {
    return typeof discharge === 'object' && discharge !== null && 'date' in discharge && isString(discharge.date) 
    && 'criteria' in discharge && isString(discharge.criteria);
};