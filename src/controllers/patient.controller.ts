
import { Request, Response } from 'express';
import { Patient } from '../models';

// Create a new patient
export const createPatient = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, dateOfBirth, gender, address, phoneNumber, medicalHistory } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const patient = await Patient.create({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      address,
      phoneNumber,
      medicalHistory,
      userId
    });

    res.status(201).json({
      message: 'Patient created successfully',
      patient
    });
  } catch (error) {
    console.error('Create patient error:', error);
    res.status(500).json({ message: 'Failed to create patient', error });
  }
};

// Get all patients for current user
export const getAllPatients = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const patients = await Patient.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(patients);
  } catch (error) {
    console.error('Get patients error:', error);
    res.status(500).json({ message: 'Failed to fetch patients', error });
  }
};

// Get patient by ID
export const getPatientById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const patient = await Patient.findOne({
      where: { id, userId }
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error('Get patient by ID error:', error);
    res.status(500).json({ message: 'Failed to fetch patient', error });
  }
};

// Update patient
export const updatePatient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const { firstName, lastName, dateOfBirth, gender, address, phoneNumber, medicalHistory } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const patient = await Patient.findOne({
      where: { id, userId }
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    await patient.update({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      address,
      phoneNumber,
      medicalHistory
    });

    res.status(200).json({
      message: 'Patient updated successfully',
      patient
    });
  } catch (error) {
    console.error('Update patient error:', error);
    res.status(500).json({ message: 'Failed to update patient', error });
  }
};

// Delete patient
export const deletePatient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const patient = await Patient.findOne({
      where: { id, userId }
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    await patient.destroy();

    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Delete patient error:', error);
    res.status(500).json({ message: 'Failed to delete patient', error });
  }
};
