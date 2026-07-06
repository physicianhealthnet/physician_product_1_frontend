import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PatientDetailsTable from './PatientDetailsTable.jsx';
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
  default: ({ isOpen, dataType, patientId }) => isOpen ? (
    <div data-testid="clinical-modal">
      Modal Open: {dataType} for {patientId}
    </div>
  ) : null
}));

describe('PatientDetailsTable Component', () => {
  const mockPatients = [
    { patientId: 'P001', patientName: 'Alice', patientGender: 'female', patientAge: 30, patientPhone: '111', createdAt: '2023-01-01' },
    { patientId: 'P002', patientName: 'Bob', patientGender: 'male', patientAge: 40, patientPhone: '222', createdAt: '2023-01-02' },
    { patientId: 'P003', patientName: 'Charlie', patientGender: 'male', patientAge: 50, patientPhone: '333', createdAt: '2023-01-03' },
    { patientId: 'P004', patientName: 'Diana', patientGender: 'female', patientAge: 60, patientPhone: '444', createdAt: '2023-01-04' },
    { patientId: 'P005', patientName: 'Eve', patientGender: 'female', patientAge: 70, patientPhone: '555', createdAt: '2023-01-05' },
    { patientId: 'P006', patientName: 'Frank', patientGender: 'male', patientAge: 80, patientPhone: '666', createdAt: '2023-01-06' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
    sessionStorage.setItem('user', JSON.stringify({ clinicId: 'clinic_1' }));
    
    // Mock the initial patient list fetch
    AxiosInstance.get.mockImplementation((url) => {
      if (url.includes('/patient/get-all')) {
        return Promise.resolve({ data: { patients: mockPatients } });
      }
      if (url.includes('/business-tool/dashboard-patient-list')) {
        return Promise.resolve({
          data: {
            data: {
              'P001': {
                patientDetails: {
                  primaryComplaint: 'Headache',
                  attenderName: 'John',
                  prescriptionsCount: 2,
                  labReportsCount: 1,
                  scanReportsCount: 0
                }
              }
            }
          }
        });
      }
      return Promise.resolve({ data: {} });
    });
  });

  it('renders loading state initially', () => {
    // To test initial loading state, we need to delay the promise
    AxiosInstance.get.mockImplementationOnce(() => new Promise(() => {}));
    
    render(<PatientDetailsTable />);
    expect(screen.getByText('Loading all patients...')).toBeInTheDocument();
  });

  it('fetches and renders patients, prioritizing today and future appointments', async () => {
    const todayAppointments = [{ patientId: 'P003' }]; // Priority 1
    const futureAppointments = [{ patientId: 'P001' }]; // Priority 2

    render(
      <PatientDetailsTable 
        todayAppointments={todayAppointments} 
        futureAppointments={futureAppointments} 
      />
    );
    
    await waitFor(() => {
      expect(screen.getByText('Patient Details')).toBeInTheDocument();
    });

    // We expect Charlie (P003) to be first, Alice (P001) to be second, then the rest sorted by date descending.
    // The rest are: Frank(006), Eve(005), Diana(004). 
    // Since page size is 5, Bob(002) is on page 2.

    const rows = screen.getAllByRole('row');
    // rows[0] is the header
    expect(rows[1]).toHaveTextContent('Charlie');
    expect(rows[2]).toHaveTextContent('Alice');
    expect(rows[3]).toHaveTextContent('Frank');
    expect(rows[4]).toHaveTextContent('Eve');
    expect(rows[5]).toHaveTextContent('Diana');
    
    // Bob should not be on page 1
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();
  });

  it('handles pagination', async () => {
    render(<PatientDetailsTable />);
    
    await waitFor(() => {
      expect(screen.getByText('Frank')).toBeInTheDocument(); // Newest is Frank
    });

    // Click next page
    const nextBtn = document.querySelectorAll('.flex.gap-2 button')[1];
    fireEvent.click(nextBtn);

    await waitFor(() => {
      // Alice (P001) is the oldest (last in descending date order) so she is on page 2
      expect(screen.getByText('Alice')).toBeInTheDocument();
      // Frank should not be on page 2
      expect(screen.queryByText('Frank')).not.toBeInTheDocument();
    });
  });

  it('handles row expansion and clinical data modal triggering', async () => {
    // Click on Alice's row (which is prioritized to be on page 1)
    render(
      <PatientDetailsTable todayAppointments={[{ patientId: 'P001' }]} />
    );
    
    await waitFor(() => {
      expect(screen.getAllByText('Alice')[0]).toBeInTheDocument();
    });

    // Click Alice's row to expand
    // We can just find the row containing Alice and click it
    const aliceRow = screen.getAllByText('Alice')[0].closest('tr');
    fireEvent.click(aliceRow);

    // After clicking, the expanded details should show up
    await waitFor(() => {
      expect(screen.getByText('Additional Info')).toBeInTheDocument();
      expect(screen.getByText('John')).toBeInTheDocument(); // Attender name
    });

    // Click the prescriptions View button
    const viewButtons = screen.getAllByRole('button', { name: /View \(2\)/i });
    fireEvent.click(viewButtons[0]);

    // Modal should be open
    expect(screen.getByTestId('clinical-modal')).toHaveTextContent('Modal Open: prescription for P001');
  });

  it('navigates to assessment when Ongoing Treatment is clicked', async () => {
    render(<PatientDetailsTable todayAppointments={[{ patientId: 'P001' }]} />);
    
    await waitFor(() => {
      expect(screen.getAllByText('Alice')[0]).toBeInTheDocument();
    });

    // Find the ongoing treatment button in Alice's row
    const aliceRow = screen.getAllByText('Alice')[0].closest('tr');
    const ongoingBtn = aliceRow.querySelector('button');
    
    fireEvent.click(ongoingBtn);

    expect(mockNavigate).toHaveBeenCalledWith('/assessment/P001');
  });
});
