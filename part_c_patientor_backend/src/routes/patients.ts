import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils';
import { Patient, newPatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getPatients());
});

router.get('/:id', (req, res) => {
    res.send(patientsService.getPatient(req.params.id));
});

router.post('/', (req, res) => {
    const newPatientData: newPatient = toNewPatient(req.body);
    const newPatientAdded: Patient = patientsService.addPatient(newPatientData);
    res.send(newPatientAdded);
});

// TODO: Implement typechecking for entries then add method to the service
// router.post('/:id/entries', (req, res) => {
//     const newEntryData: EntryWithoutId = toNewEntry(req.body);

// })

export default router;