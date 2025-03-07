
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../lib/db';
import User from './User';

interface DoctorAttributes {
  id: number;
  firstName: string;
  lastName: string;
  specialization: string;
  licenseNumber: string;
  phoneNumber: string;
  email: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface DoctorCreationAttributes extends Optional<DoctorAttributes, 'id'> {}

class Doctor extends Model<DoctorAttributes, DoctorCreationAttributes> implements DoctorAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public specialization!: string;
  public licenseNumber!: string;
  public phoneNumber!: string;
  public email!: string;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Doctor.init(
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
    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    licenseNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
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
    modelName: 'doctor',
  }
);

// Association with User
Doctor.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Doctor, { foreignKey: 'userId' });

export default Doctor;
