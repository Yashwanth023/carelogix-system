
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../lib/db';
import User from './User';

interface PatientAttributes {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  phoneNumber: string;
  medicalHistory?: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PatientCreationAttributes extends Optional<PatientAttributes, 'id' | 'medicalHistory'> {}

class Patient extends Model<PatientAttributes, PatientCreationAttributes> implements PatientAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public dateOfBirth!: Date;
  public gender!: string;
  public address!: string;
  public phoneNumber!: string;
  public medicalHistory!: string;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Patient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    medicalHistory: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'patient',
  }
);

// Association with User
Patient.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Patient, { foreignKey: 'userId' });

export default Patient;
