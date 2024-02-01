import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils';
import { Patient, newPatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getPatients());
});

router.post('/', (req, res) => {
    const newPatientData: newPatient = toNewPatient(req.body);
    const newPatientAdded: Patient = patientsService.addPatient(newPatientData);
    res.send(newPatientAdded);
});

export default router;