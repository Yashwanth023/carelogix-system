
import express from 'express';
import { 
  createDoctor, 
  getAllDoctors, 
  getDoctorById, 
  updateDoctor, 
  deleteDoctor 
} from '../controllers/doctor.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Apply authentication middleware to all doctor routes
router.use(authenticate);

// Create a new doctor
router.post('/', createDoctor);

// Get all doctors
router.get('/', getAllDoctors);

// Get doctor by ID
router.get('/:id', getDoctorById);

// Update doctor
router.put('/:id', updateDoctor);

// Delete doctor
router.delete('/:id', deleteDoctor);

export default router;
