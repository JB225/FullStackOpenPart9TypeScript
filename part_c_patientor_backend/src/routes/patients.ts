import express from 'express';
import patientsService from '../services/patientsService';
import { Entry, NewEntry, Patient, newPatient } from '../types';
import { toNewEntry, toNewPatient } from '../utils';

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

router.post('/:id/entries', (req, res) => {
    const newEntryData: NewEntry = toNewEntry(req.body);
    const newEntryAdded: Entry = patientsService.addEntry(req.params.id, newEntryData);
    res.send(newEntryAdded);
});

export default router;