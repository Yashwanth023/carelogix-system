
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import api from '../lib/api';

interface PatientCount {
  count: number;
}

interface DoctorCount {
  count: number;
}

interface RecentPatient {
  id: number;
  firstName: string;
  lastName: string;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const [patientCount, setPatientCount] = useState<number>(0);
  const [doctorCount, setDoctorCount] = useState<number>(0);
  const [recentPatients, setRecentPatients] = useState<RecentPatient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch patient count
        const patientsResponse = await api.get('/patients');
        setPatientCount(patientsResponse.data.length);
        
        // Fetch doctor count
        const doctorsResponse = await api.get('/doctors');
        setDoctorCount(doctorsResponse.data.length);
        
        // Fetch recent patients
        if (patientsResponse.data.length > 0) {
          // Sort by creation date and get the 5 most recent
          const sortedPatients = [...patientsResponse.data]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5);
          
          setRecentPatients(sortedPatients);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">Overview of your healthcare management system</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Patient Stats Card */}
          <div className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Patients</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{patientCount}</div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-6">
                <Link 
                  to="/patients" 
                  className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors duration-200"
                >
                  View all patients →
                </Link>
              </div>
            </div>
          </div>
          
          {/* Doctor Stats Card */}
          <div className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Doctors</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{doctorCount}</div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-6">
                <Link 
                  to="/doctors" 
                  className="text-sm font-medium text-green-500 hover:text-green-600 transition-colors duration-200"
                >
                  View all doctors →
                </Link>
              </div>
            </div>
          </div>
          
          {/* Quick Actions Card */}
          <div className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-all duration-300">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              <div className="mt-6 space-y-4">
                <Link
                  to="/patients/new"
                  className="block w-full rounded-md bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors duration-200"
                >
                  Add New Patient
                </Link>
                <Link
                  to="/doctors/new"
                  className="block w-full rounded-md bg-green-50 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100 transition-colors duration-200"
                >
                  Add New Doctor
                </Link>
                <Link
                  to="/mappings/new"
                  className="block w-full rounded-md bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-100 transition-colors duration-200"
                >
                  Assign Doctor to Patient
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Recent Patients Section */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Patients</h2>
        
        {recentPatients.length > 0 ? (
          <div className="bg-white shadow-sm overflow-hidden sm:rounded-md hover:shadow-md transition-all duration-300">
            <ul className="divide-y divide-gray-200">
              {recentPatients.map((patient) => (
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
          <div className="bg-white shadow-sm rounded-lg p-6 text-center">
            <p className="text-gray-500">No patients added yet.</p>
            <Link
              to="/patients/new"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
            >
              Add your first patient
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
