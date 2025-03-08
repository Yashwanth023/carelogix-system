
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import apiService from '../../lib/api';
import { toast } from '../../components/ui/use-toast';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Label } from '../../components/ui/label';

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

const AssignDoctor: React.FC = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [patientsResponse, doctorsResponse] = await Promise.all([
          apiService.patients.getAll(),
          apiService.doctors.getAll()
        ]);
        
        setPatients(patientsResponse.data);
        setDoctors(doctorsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load patients and doctors. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPatientId || !selectedDoctorId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select both a patient and a doctor.",
      });
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Create the mapping
      await apiService.post('/mappings', {
        patientId: parseInt(selectedPatientId),
        doctorId: parseInt(selectedDoctorId)
      });
      
      toast({
        title: "Success",
        description: "Doctor assigned to patient successfully.",
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error assigning doctor:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to assign doctor to patient. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-medium text-gray-900">Assign Doctor to Patient</h1>
        <p className="mt-1 text-sm text-gray-600">Create a new doctor-patient relationship</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="patient">Select Patient</Label>
                <Select
                  value={selectedPatientId}
                  onValueChange={setSelectedPatientId}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id.toString()}>
                        {patient.firstName} {patient.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="doctor">Select Doctor</Label>
                <Select
                  value={selectedDoctorId}
                  onValueChange={setSelectedDoctorId}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id.toString()}>
                        Dr. {doctor.name} {doctor.specialty ? `- ${doctor.specialty}` : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting || !selectedPatientId || !selectedDoctorId}>
                {submitting ? 'Assigning...' : 'Assign Doctor'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </Layout>
  );
};

export default AssignDoctor;
