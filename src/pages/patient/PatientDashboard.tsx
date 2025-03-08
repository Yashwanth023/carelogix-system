
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../hooks/useAuth';
import apiService from '../../lib/api';
import { toast } from '../../components/ui/use-toast';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  email: string;
}

interface Consultation {
  id: number;
  doctorId: number;
  patientId: number;
  doctorName: string;
  date: string;
  time: string;
  reason: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
}

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all doctors
        const doctorsResponse = await apiService.doctors.getAll();
        setDoctors(doctorsResponse.data);
        
        // Fetch patient's consultations
        if (user?.id) {
          const consultationsResponse = await apiService.consultations.getByPatientId(user.id);
          setConsultations(consultationsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load dashboard data. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user?.id]);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-900">Patient Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">Welcome back, {user?.name}</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* My Consultations Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">My Consultations</h2>
              <Link
                to="/patient/book-consultation"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Book New Consultation
              </Link>
            </div>
            
            {consultations.length > 0 ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {consultations.map((consultation) => (
                    <li key={consultation.id} className="px-6 py-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Dr. {consultation.doctorName}</p>
                          <p className="text-sm text-gray-500">{consultation.date} at {consultation.time}</p>
                          <p className="text-sm text-gray-500">{consultation.reason}</p>
                        </div>
                        <span 
                          className={`px-2 py-1 text-xs rounded-full ${
                            consultation.status === 'approved' ? 'bg-green-100 text-green-800' :
                            consultation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            consultation.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          {consultation.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-md p-6 text-center">
                <p className="text-gray-500">You don't have any consultations yet.</p>
                <Link
                  to="/patient/book-consultation"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Book your first consultation
                </Link>
              </div>
            )}
          </div>
          
          {/* Available Doctors Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Available Doctors</h2>
            
            {doctors.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {doctors.map((doctor) => (
                  <div key={doctor.id} className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow transition">
                    <div className="p-6">
                      <h3 className="text-md font-medium text-gray-900">Dr. {doctor.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{doctor.specialty || 'General Medicine'}</p>
                      <div className="mt-4">
                        <Link
                          to={`/patient/book-consultation?doctorId=${doctor.id}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                          Book Consultation →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-md p-6 text-center">
                <p className="text-gray-500">No doctors are available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PatientDashboard;
