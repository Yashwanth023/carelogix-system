
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../lib/db';
import Patient from './Patient';
import Doctor from './Doctor';

interface PatientDoctorAttributes {
  id: number;
  patientId: number;
  doctorId: number;
  notes?: string;
  assignmentDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PatientDoctorCreationAttributes extends Optional<PatientDoctorAttributes, 'id' | 'notes'> {}

class PatientDoctor extends Model<PatientDoctorAttributes, PatientDoctorCreationAttributes> implements PatientDoctorAttributes {
  public id!: number;
  public patientId!: number;
  public doctorId!: number;
  public notes!: string;
  public assignmentDate!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PatientDoctor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Patient,
        key: 'id',
      },
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Doctor,
        key: 'id',
      },
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    assignmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'patient_doctor',
  }
);

// Associations between Patient and Doctor (many-to-many)
Patient.belongsToMany(Doctor, { through: PatientDoctor, foreignKey: 'patientId' });
Doctor.belongsToMany(Patient, { through: PatientDoctor, foreignKey: 'doctorId' });

export default PatientDoctor;
