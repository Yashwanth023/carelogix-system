
import { Request, Response } from 'express';
import { Doctor } from '../models';
import { Op } from 'sequelize';

// Create a new doctor
export const createDoctor = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, specialization, licenseNumber, phoneNumber, email } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Check if license number or email already exists
    const existingDoctor = await Doctor.findOne({
      where: {
        [Op.or]: [{ licenseNumber }, { email }]
      }
    });

    if (existingDoctor) {
      return res.status(400).json({ message: 'License number or email already in use' });
    }

    const doctor = await Doctor.create({
      firstName,
      lastName,
      specialization,
      licenseNumber,
      phoneNumber,
      email,
      userId
    });

    res.status(201).json({
      message: 'Doctor created successfully',
      doctor
    });
  } catch (error) {
    console.error('Create doctor error:', error);
    res.status(500).json({ message: 'Failed to create doctor', error });
  }
};

// Get all doctors
export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.findAll({
      order: [['lastName', 'ASC'], ['firstName', 'ASC']]
    });

    res.status(200).json(doctors);
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ message: 'Failed to fetch doctors', error });
  }
};

// Get doctor by ID
export const getDoctorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const doctor = await Doctor.findByPk(id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error('Get doctor by ID error:', error);
    res.status(500).json({ message: 'Failed to fetch doctor', error });
  }
};

// Update doctor
export const updateDoctor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const { firstName, lastName, specialization, licenseNumber, phoneNumber, email } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const doctor = await Doctor.findOne({
      where: { id, userId }
    });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found or you do not have permission to update' });
    }

    // Check if the updated email or license is already in use by another doctor
    if (email !== doctor.email || licenseNumber !== doctor.licenseNumber) {
      const existingDoctor = await Doctor.findOne({
        where: {
          [Op.and]: [
            { id: { [Op.ne]: id } },
            { [Op.or]: [{ licenseNumber }, { email }] }
          ]
        }
      });

      if (existingDoctor) {
        return res.status(400).json({ message: 'License number or email already in use' });
      }
    }

    await doctor.update({
      firstName,
      lastName,
      specialization,
      licenseNumber,
      phoneNumber,
      email
    });

    res.status(200).json({
      message: 'Doctor updated successfully',
      doctor
    });
  } catch (error) {
    console.error('Update doctor error:', error);
    res.status(500).json({ message: 'Failed to update doctor', error });
  }
};

// Delete doctor
export const deleteDoctor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const doctor = await Doctor.findOne({
      where: { id, userId }
    });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found or you do not have permission to delete' });
    }

    await doctor.destroy();

    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('Delete doctor error:', error);
    res.status(500).json({ message: 'Failed to delete doctor', error });
  }
};
