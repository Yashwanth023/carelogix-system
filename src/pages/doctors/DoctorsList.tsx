
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import apiService from '../../lib/api';
import { toast } from '../../components/ui/use-toast';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
}

const DoctorsList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await apiService.doctors.getAll();
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load doctors. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Doctors</h1>
          <p className="mt-1 text-sm text-gray-600">Manage your doctor records</p>
        </div>
        <Link
          to="/doctors/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 transition-colors duration-200"
        >
          Add New Doctor
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      ) : doctors.length > 0 ? (
        <div className="bg-white shadow overflow-hidden rounded-md">
          <ul className="divide-y divide-gray-200">
            {doctors.map((doctor) => (
              <li key={doctor.id}>
                <Link to={`/doctors/${doctor.id}`} className="block hover:bg-gray-50 transition-colors duration-200">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-green-600 truncate">
                        Dr. {doctor.name}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {doctor.specialty || 'General Medicine'}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {doctor.email}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          Added on {new Date(doctor.createdAt).toLocaleDateString()}
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
          <p className="text-gray-500 mb-4">No doctors found.</p>
          <Link
            to="/doctors/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 transition-colors duration-200"
          >
            Add your first doctor
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default DoctorsList;
