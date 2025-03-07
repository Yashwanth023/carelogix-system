
import { Request, Response } from 'express';
import { PatientDoctor, Patient, Doctor } from '../models';
import { Op } from 'sequelize';

// Assign a doctor to a patient
export const assignDoctorToPatient = async (req: Request, res: Response) => {
  try {
    const { patientId, doctorId, notes } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Verify patient belongs to the user
    const patient = await Patient.findOne({
      where: { id: patientId, userId }
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found or you do not have permission' });
    }

    // Verify doctor exists
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if the assignment already exists
    const existingMapping = await PatientDoctor.findOne({
      where: { patientId, doctorId }
    });

    if (existingMapping) {
      return res.status(400).json({ message: 'Doctor is already assigned to this patient' });
    }

    const assignment = await PatientDoctor.create({
      patientId,
      doctorId,
      notes,
      assignmentDate: new Date()
    });

    res.status(201).json({
      message: 'Doctor assigned to patient successfully',
      assignment
    });
  } catch (error) {
    console.error('Assign doctor error:', error);
    res.status(500).json({ message: 'Failed to assign doctor to patient', error });
  }
};

// Get all patient-doctor mappings
export const getAllMappings = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Get patients that belong to the user
    const patients = await Patient.findAll({
      where: { userId },
      attributes: ['id']
    });

    const patientIds = patients.map(patient => patient.id);

    if (patientIds.length === 0) {
      return res.status(200).json([]);
    }

    // Get mappings for those patients
    const mappings = await PatientDoctor.findAll({
      where: {
        patientId: {
          [Op.in]: patientIds
        }
      },
      include: [
        {
          model: Patient,
          attributes: ['id', 'firstName', 'lastName']
        },
        {
          model: Doctor,
          attributes: ['id', 'firstName', 'lastName', 'specialization']
        }
      ]
    });

    res.status(200).json(mappings);
  } catch (error) {
    console.error('Get mappings error:', error);
    res.status(500).json({ message: 'Failed to fetch patient-doctor mappings', error });
  }
};

// Get all doctors for a specific patient
export const getDoctorsForPatient = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Verify patient belongs to the user
    const patient = await Patient.findOne({
      where: { id: patientId, userId }
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found or you do not have permission' });
    }

    // Get doctors for the patient
    const mappings = await PatientDoctor.findAll({
      where: { patientId },
      include: [
        {
          model: Doctor,
          attributes: ['id', 'firstName', 'lastName', 'specialization', 'email', 'phoneNumber']
        }
      ]
    });

    const doctors = mappings.map(mapping => ({
      ...mapping.doctor.get(),
      assignmentId: mapping.id,
      assignmentDate: mapping.assignmentDate,
      notes: mapping.notes
    }));

    res.status(200).json(doctors);
  } catch (error) {
    console.error('Get doctors for patient error:', error);
    res.status(500).json({ message: 'Failed to fetch doctors for patient', error });
  }
};

// Remove doctor from patient
export const removeDoctorFromPatient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // mapping id
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const mapping = await PatientDoctor.findByPk(id, {
      include: [
        {
          model: Patient,
          attributes: ['userId']
        }
      ]
    });

    if (!mapping) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Verify the patient belongs to the user
    if (mapping.patient.userId !== userId) {
      return res.status(403).json({ message: 'You do not have permission to remove this assignment' });
    }

    await mapping.destroy();

    res.status(200).json({ message: 'Doctor removed from patient successfully' });
  } catch (error) {
    console.error('Remove doctor from patient error:', error);
    res.status(500).json({ message: 'Failed to remove doctor from patient', error });
  }
};
