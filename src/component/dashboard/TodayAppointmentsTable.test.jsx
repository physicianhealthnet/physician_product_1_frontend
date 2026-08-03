import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TodayAppointmentsTable from './TodayAppointmentsTable.jsx';
import { AxiosInstance } from '../../utilities/AxiosInstance';

// Mock Axios
vi.mock('../../utilities/AxiosInstance', () => ({
  AxiosInstance: {
    get: vi.fn()
  }
}));

// Mock React Router
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

// Mock PatientClinicalDataModal
vi.mock('./PatientClinicalDataModal', () => ({
  default: ({ isOpen, onClose, type, patientId }) => isOpen ? (
    <div data-testid="clinical-modal">
      Modal Open: {type} for {patientId}
      <button onClick={onClose}>Close Modal</button>
    </div>
  ) : null
}));

describe('TodayAppointmentsTable Component', () => {
  const mockMorning = [
    { _id: 'apt-01', patientId: 'P-001', name: 'Alice Morning', time: '09:00 AM', status: 'Completed' },
    { _id: 'apt-02', patientId: 'P-002', name: 'Bob Morning', time: '10:00 AM', status: 'Checked-in' }
  ];

  const mockAfternoon = [
    { _id: 'apt-03', patientId: 'P-003', name: 'Charlie Afternoon', time: '02:00 PM', status: 'Checked-in' }
  ];

  const mockEvening = [
    { _id: 'apt-04', patientId: 'P-004', name: 'Diana Evening', time: '06:00 PM', status: 'Scheduled' }
  ];

  const demoPatients = [
    { patientId: 'P-001', patientName: 'Alice Morning', patientGender: 'female', patientAge: 30, patientPhone: '1112223333', location: 'Chennai' },
    { patientId: 'P-002', patientName: 'Bob Morning', patientGender: 'male', patientAge: 40, patientPhone: '2223334444', location: 'Madurai' },
    { patientId: 'P-003', patientName: 'Charlie Afternoon', patientGender: 'male', patientAge: 50, patientPhone: '3334445555', location: 'Coimbatore' },
    { patientId: 'P-004', patientName: 'Diana Evening', patientGender: 'female', patientAge: 60, patientPhone: '4445556666', location: 'Trichy' }
  ];

  const demoPatientDetails = {
    'P-001': {
      patientDetails: {
        primaryComplaint: 'Fever and chills',
        attenderName: 'John',
        attenderPhone: '9999999999',
        attenderRelationship: 'spouse',
        prescriptionsCount: 1,
        labReportsCount: 0,
        scanReportsCount: 2
      }
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
    sessionStorage.setItem('user', JSON.stringify({ clinicId: 'clinic_1' }));

    AxiosInstance.get.mockImplementation((url) => {
      if (url.includes('/business-tool/dashboard-patient-list')) {
        return Promise.resolve({
          data: {
            data: demoPatientDetails
          }
        });
      }
      return Promise.resolve({ data: {} });
    });
  });

  it('renders all appointments initially when All Today is active', () => {
    render(
      <TodayAppointmentsTable
        morningAppointments={mockMorning}
        afternoonAppointments={mockAfternoon}
        eveningAppointments={mockEvening}
        isDemoMode={true}
        demoPatients={demoPatients}
        demoPatientDetails={demoPatientDetails}
      />
    );

    expect(screen.getByText('Alice Morning')).toBeInTheDocument();
    expect(screen.getByText('Bob Morning')).toBeInTheDocument();
    expect(screen.getByText('Charlie Afternoon')).toBeInTheDocument();
    expect(screen.getByText('Diana Evening')).toBeInTheDocument();
  });

  it('filters appointments by slots when tabs are clicked', () => {
    render(
      <TodayAppointmentsTable
        morningAppointments={mockMorning}
        afternoonAppointments={mockAfternoon}
        eveningAppointments={mockEvening}
        isDemoMode={true}
        demoPatients={demoPatients}
        demoPatientDetails={demoPatientDetails}
      />
    );

    // Click Morning tab
    const morningTab = screen.getByRole('button', { name: /Morning/i });
    fireEvent.click(morningTab);

    expect(screen.getByText('Alice Morning')).toBeInTheDocument();
    expect(screen.getByText('Bob Morning')).toBeInTheDocument();
    expect(screen.queryByText('Charlie Afternoon')).not.toBeInTheDocument();
    expect(screen.queryByText('Diana Evening')).not.toBeInTheDocument();

    // Click Afternoon tab
    const afternoonTab = screen.getByRole('button', { name: /Afternoon/i });
    fireEvent.click(afternoonTab);

    expect(screen.queryByText('Alice Morning')).not.toBeInTheDocument();
    expect(screen.getByText('Charlie Afternoon')).toBeInTheDocument();

    // Click Evening tab
    const eveningTab = screen.getByRole('button', { name: /Evening/i });
    fireEvent.click(eveningTab);

    expect(screen.queryByText('Charlie Afternoon')).not.toBeInTheDocument();
    expect(screen.getByText('Diana Evening')).toBeInTheDocument();
  });

  it('filters appointments dynamically using search query', () => {
    render(
      <TodayAppointmentsTable
        morningAppointments={mockMorning}
        afternoonAppointments={mockAfternoon}
        eveningAppointments={mockEvening}
        isDemoMode={true}
        demoPatients={demoPatients}
        demoPatientDetails={demoPatientDetails}
      />
    );

    const searchInput = screen.getByPlaceholderText('Search patient, ID, phone...');
    fireEvent.change(searchInput, { target: { value: 'Alice' } });

    expect(screen.getByText('Alice Morning')).toBeInTheDocument();
    expect(screen.queryByText('Bob Morning')).not.toBeInTheDocument();
  });

  it('expands row to show additional info, attender details, and report trigger', async () => {
    render(
      <TodayAppointmentsTable
        morningAppointments={mockMorning}
        afternoonAppointments={mockAfternoon}
        eveningAppointments={mockEvening}
        isDemoMode={true}
        demoPatients={demoPatients}
        demoPatientDetails={demoPatientDetails}
      />
    );

    // Click Alice's row
    const aliceRow = screen.getByText('Alice Morning').closest('tr');
    fireEvent.click(aliceRow);

    // Additional info should be visible
    expect(screen.getByText('Additional Info')).toBeInTheDocument();
    expect(screen.getByText('Attender Details')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument(); // Attender Name

    // View prescriptions
    const viewPrescriptionBtn = screen.getByRole('button', { name: /View \(1\)/i });
    fireEvent.click(viewPrescriptionBtn);

    expect(screen.getByTestId('clinical-modal')).toHaveTextContent('Modal Open: prescription for P-001');
  });

  it('triggers navigate to assessment when Ongoing Treatment is clicked', () => {
    render(
      <TodayAppointmentsTable
        morningAppointments={mockMorning}
        afternoonAppointments={mockAfternoon}
        eveningAppointments={mockEvening}
        isDemoMode={true}
        demoPatients={demoPatients}
        demoPatientDetails={demoPatientDetails}
      />
    );

    const ongoingBtn = screen.getAllByRole('button', { name: /Ongoing Treatment/i })[0];
    fireEvent.click(ongoingBtn);

    expect(mockNavigate).toHaveBeenCalledWith('/assessment/P-001');
  });
});
