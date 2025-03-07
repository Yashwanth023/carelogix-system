
import express from 'express';
import { 
  createPatient, 
  getAllPatients, 
  getPatientById, 
  updatePatient, 
  deletePatient 
} from '../controllers/patient.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Apply authentication middleware to all patient routes
router.use(authenticate);

// Create a new patient
router.post('/', createPatient);

// Get all patients
router.get('/', getAllPatients);

// Get patient by ID
router.get('/:id', getPatientById);

// Update patient
router.put('/:id', updatePatient);

// Delete patient
router.delete('/:id', deletePatient);

export default router;
