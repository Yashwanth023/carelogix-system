
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../hooks/useAuth';
import apiService from '../../lib/api';
import { toast } from '../../components/ui/use-toast';

interface Patient {
  id: number;
  name: string;
  email: string;
}

interface Consultation {
  id: number;
  doctorId: number;
  patientId: number;
  patientName: string;
  date: string;
  time: string;
  reason: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
}

const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all patients
        const patientsResponse = await apiService.patients.getAll();
        setPatients(patientsResponse.data);
        
        // Fetch doctor's consultations
        if (user?.id) {
          const consultationsResponse = await apiService.consultations.getByDoctorId(user.id);
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

  const updateConsultationStatus = async (consultationId: number, status: 'approved' | 'completed' | 'cancelled') => {
    try {
      await apiService.put(`/consultations/${consultationId}`, { status });
      
      // Update the local state
      setConsultations(prevConsultations => 
        prevConsultations.map(consultation => 
          consultation.id === consultationId ? { ...consultation, status } : consultation
        )
      );
      
      toast({
        title: "Status updated",
        description: `Consultation has been ${status}.`,
      });
    } catch (error) {
      console.error('Error updating consultation status:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update consultation status. Please try again.",
      });
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-900">Doctor Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">Welcome back, Dr. {user?.name}</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Consultations Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">My Consultations</h2>
            
            {consultations.length > 0 ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {consultations.map((consultation) => (
                    <li key={consultation.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{consultation.patientName}</p>
                          <p className="text-sm text-gray-500">{consultation.date} at {consultation.time}</p>
                          <p className="text-sm text-gray-500">{consultation.reason}</p>
                        </div>
                        <div className="flex items-center space-x-2">
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
                          
                          {consultation.status === 'pending' && (
                            <button
                              onClick={() => updateConsultationStatus(consultation.id, 'approved')}
                              className="px-3 py-1 text-xs font-medium rounded bg-green-600 text-white hover:bg-green-700"
                            >
                              Approve
                            </button>
                          )}
                          
                          {consultation.status === 'approved' && (
                            <button
                              onClick={() => updateConsultationStatus(consultation.id, 'completed')}
                              className="px-3 py-1 text-xs font-medium rounded bg-blue-600 text-white hover:bg-blue-700"
                            >
                              Complete
                            </button>
                          )}
                          
                          {(consultation.status === 'pending' || consultation.status === 'approved') && (
                            <button
                              onClick={() => updateConsultationStatus(consultation.id, 'cancelled')}
                              className="px-3 py-1 text-xs font-medium rounded bg-red-600 text-white hover:bg-red-700"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-md p-6 text-center">
                <p className="text-gray-500">You don't have any consultations yet.</p>
              </div>
            )}
          </div>
          
          {/* Patients Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">My Patients</h2>
            
            {patients.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {patients.map((patient) => (
                  <div key={patient.id} className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow transition">
                    <div className="p-6">
                      <h3 className="text-md font-medium text-gray-900">{patient.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{patient.email}</p>
                      <div className="mt-4">
                        <Link
                          to={`/doctor/patient/${patient.id}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-md p-6 text-center">
                <p className="text-gray-500">You don't have any patients yet.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DoctorDashboard;
