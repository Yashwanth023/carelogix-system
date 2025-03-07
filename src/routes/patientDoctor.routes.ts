
import express from 'express';
import { 
  createPatientDoctor, 
  getAllPatientDoctors, 
  getDoctorsByPatientId, 
  deletePatientDoctor 
} from '../controllers/patientDoctor.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Apply authentication middleware to all mapping routes
router.use(authenticate);

// Assign a doctor to a patient
router.post('/', createPatientDoctor);

// Get all patient-doctor mappings
router.get('/', getAllPatientDoctors);

// Get all doctors for a specific patient
router.get('/:patientId', getDoctorsByPatientId);

// Remove doctor from patient
router.delete('/:id', deletePatientDoctor);

export default router;
