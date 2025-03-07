import { Request, Response } from 'express';
import { PatientDoctor, Patient, Doctor } from '../models';

export const createPatientDoctor = async (req: Request, res: Response) => {
  try {
    const { patientId, doctorId } = req.body;
    const patientDoctor = await PatientDoctor.create({ patientId, doctorId });
    res.status(201).json(patientDoctor);
  } catch (error) {
    console.error('Error creating patient-doctor mapping:', error);
    res.status(500).json({ message: 'Error creating mapping' });
  }
};

export const getAllPatientDoctors = async (req: Request, res: Response) => {
  try {
    const patientDoctors = await PatientDoctor.findAll();
    res.json(patientDoctors);
  } catch (error) {
    console.error('Error fetching patient-doctor mappings:', error);
    res.status(500).json({ message: 'Error fetching mappings' });
  }
};

export const getDoctorsByPatientId = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;
    const mappings = await PatientDoctor.findAll({
      where: { patientId },
      include: [
        {
          model: Doctor,
          attributes: ['id', 'name', 'specialization', 'userId']
        }
      ]
    });

    const doctors = mappings.map(mapping => mapping.get({ plain: true }));
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors by patient ID:', error);
    res.status(500).json({ message: 'Error fetching doctors' });
  }
};

export const getPatientsByDoctorId = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.params;
    const mappings = await PatientDoctor.findAll({
      where: { doctorId },
      include: [
        {
          model: Patient,
          attributes: ['id', 'name', 'dateOfBirth', 'userId']
        }
      ]
    });

    const patients = mappings.map(mapping => mapping.get({ plain: true }));
    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients by doctor ID:', error);
    res.status(500).json({ message: 'Error fetching patients' });
  }
};

export const deletePatientDoctor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await PatientDoctor.destroy({
      where: { id }
    });
    if (deleted) {
      return res.status(204).send();
    }
    return res.status(404).json({ message: 'Mapping not found' });
  } catch (error) {
    console.error('Error deleting patient-doctor mapping:', error);
    res.status(500).json({ message: 'Error deleting mapping' });
  }
};
