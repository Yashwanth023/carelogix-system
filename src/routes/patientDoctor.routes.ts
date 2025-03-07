
import express from 'express';
import { 
  assignDoctorToPatient, 
  getAllMappings, 
  getDoctorsForPatient, 
  removeDoctorFromPatient 
} from '../controllers/patientDoctor.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Apply authentication middleware to all mapping routes
router.use(authenticate);

// Assign a doctor to a patient
router.post('/', assignDoctorToPatient);

// Get all patient-doctor mappings
router.get('/', getAllMappings);

// Get all doctors for a specific patient
router.get('/:patientId', getDoctorsForPatient);

// Remove doctor from patient
router.delete('/:id', removeDoctorFromPatient);

export default router;
