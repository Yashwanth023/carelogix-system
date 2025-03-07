
import express from 'express';
import authRoutes from './auth.routes';
import patientRoutes from './patient.routes';
import doctorRoutes from './doctor.routes';
import patientDoctorRoutes from './patientDoctor.routes';

const router = express.Router();

// Auth routes
router.use('/auth', authRoutes);

// Patient routes
router.use('/patients', patientRoutes);

// Doctor routes
router.use('/doctors', doctorRoutes);

// Patient-Doctor mapping routes
router.use('/mappings', patientDoctorRoutes);

export default router;
