
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import apiService from '../../lib/api';
import { toast } from '../../components/ui/use-toast';

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
}

const PatientsList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await apiService.patients.getAll();
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load patients. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Patients</h1>
          <p className="mt-1 text-sm text-gray-600">Manage your patient records</p>
        </div>
        <Link
          to="/patients/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
        >
          Add New Patient
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : patients.length > 0 ? (
        <div className="bg-white shadow overflow-hidden rounded-md">
          <ul className="divide-y divide-gray-200">
            {patients.map((patient) => (
              <li key={patient.id}>
                <Link to={`/patients/${patient.id}`} className="block hover:bg-gray-50 transition-colors duration-200">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 truncate">
                        {patient.firstName} {patient.lastName}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Patient
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {patient.email}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          Added on {new Date(patient.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p className="text-gray-500 mb-4">No patients found.</p>
          <Link
            to="/patients/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
          >
            Add your first patient
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default PatientsList;
