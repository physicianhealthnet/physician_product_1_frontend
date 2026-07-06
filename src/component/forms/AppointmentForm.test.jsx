import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AppointmentForm from './AppointmentForm.jsx';
import { AxiosInstance } from '../../utilities/AxiosInstance';

// Mock AxiosInstance
vi.mock('../../utilities/AxiosInstance', () => ({
  AxiosInstance: {
    post: vi.fn(),
    get: vi.fn(),
    patch: vi.fn()
  }
}));

// Mock Ant Design Message
vi.mock('antd', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    message: {
      success: vi.fn(),
      error: vi.fn()
    }
  };
});

// Mock ResizeObserver for Ant Design components
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

describe('AppointmentForm Component', () => {
  const mockHandleCancel = vi.fn();
  const mockGetAppointment = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
    sessionStorage.setItem('user', JSON.stringify({
      u_vName: 'Receptionist',
      u_vClinicId: 'clinic_1'
    }));
  });

  it('renders correctly in create mode', () => {
    render(<AppointmentForm handleCancel={mockHandleCancel} getAppointment={mockGetAppointment} />);
    
    expect(screen.getByText('Patient Name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Book Appointment/i })).toBeInTheDocument();
  });

  it('populates fields in edit mode', () => {
    const editData = {
      ap_vid: '123',
      ap_vname: 'John Doe',
      ap_vphone: '+919876543210',
      ap_taddress: '123 Main St',
      ap_status_type: 'O',
      ap_viaptime: '10:30 AM',
      ap_japfor: 'Dr. Ramesh Babu',
      ap_tcomplaints: 'Fever',
      ap_vdate: '2023-10-15T00:00:00Z'
    };

    render(
      <AppointmentForm 
        handleCancel={mockHandleCancel} 
        getAppointment={mockGetAppointment} 
        editData={editData} 
      />
    );

    // Expect inputs to be populated
    const nameInput = screen.getByDisplayValue('John Doe');
    expect(nameInput).toBeInTheDocument();
    
    const phoneInput = screen.getByDisplayValue('+919876543210');
    expect(phoneInput).toBeInTheDocument();

    const addressInput = screen.getByDisplayValue('123 Main St');
    expect(addressInput).toBeInTheDocument();
    
    // Expect Update button instead of Book
    expect(screen.getByRole('button', { name: /Update Appointment/i })).toBeInTheDocument();
  });

  it('handles mobile number check correctly', async () => {
    // Mock the Axios GET request for checking mobile
    AxiosInstance.get.mockResolvedValueOnce({
      data: {
        status: 200,
        message: 'Patient found',
        response: {
          p_vclinicid: 'clinic_1',
          p_vName: 'Jane Smith',
          p_vPhone: '+919999999999',
          p_tAddress: '456 Test Ave',
          cs_status_type: 'N'
        }
      }
    });

    render(<AppointmentForm handleCancel={mockHandleCancel} getAppointment={mockGetAppointment} />);
    
    // Type in phone number
    // We cannot use getByLabelText for phone because it's not strictly linked, 
    // so let's find the input with name="ap_vphone"
    const phoneInput = document.querySelector('input[name="ap_vphone"]');
    fireEvent.change(phoneInput, { target: { value: '9999999999' } });
    
    // Click the check button (has tabler:circle-dashed-check icon)
    // The button doesn't have text, but we can query by type="button"
    const checkBtn = document.querySelector('button[type="button"].p-2');
    fireEvent.click(checkBtn);
    
    await waitFor(() => {
      expect(AxiosInstance.get).toHaveBeenCalledWith('patient/get-patient-by-phone/+919999999999');
      // Verify fields updated
      expect(screen.getByDisplayValue('Jane Smith')).toBeInTheDocument();
      expect(screen.getByDisplayValue('456 Test Ave')).toBeInTheDocument();
    });
  });

  it('submits correctly in create mode', async () => {
    AxiosInstance.post.mockResolvedValue({
      data: { status: 201, message: 'Appointment added successfully' }
    });

    render(<AppointmentForm handleCancel={mockHandleCancel} getAppointment={mockGetAppointment} />);
    
    const nameInput = document.querySelector('input[name="ap_vname"]');
    fireEvent.change(nameInput, { target: { value: 'New Patient' } });
    
    const addressInput = document.querySelector('textarea[name="ap_taddress"]');
    fireEvent.change(addressInput, { target: { value: 'New Address' } });
    
    const form = document.querySelector('form');
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(AxiosInstance.post).toHaveBeenCalled();
      expect(mockGetAppointment).toHaveBeenCalled();
      expect(mockHandleCancel).toHaveBeenCalled();
    });
  });

  it('submits correctly in edit mode', async () => {
    AxiosInstance.patch.mockResolvedValue({
      data: { status: 200, message: 'Appointment updated successfully' }
    });

    const editData = {
      ap_vid: '123',
      ap_vname: 'John Doe',
      ap_status_type: 'O',
      ap_vphone: '+919876543210',
      ap_taddress: '123 Main St',
      ap_viaptime: '10:30 AM',
      ap_japfor: 'Dr. Ramesh Babu',
      ap_tcomplaints: 'Fever',
      ap_vscheduled: 'Receptionist',
      ap_vdate: '2023-10-15T00:00:00Z'
    };

    render(
      <AppointmentForm 
        handleCancel={mockHandleCancel} 
        getAppointment={mockGetAppointment} 
        editData={editData} 
      />
    );
    
    const submitBtn = screen.getByRole('button', { name: /Update Appointment/i });
    fireEvent.click(submitBtn);
    
    await waitFor(() => {
      expect(AxiosInstance.patch).toHaveBeenCalled();
      expect(mockGetAppointment).toHaveBeenCalled();
      expect(mockHandleCancel).toHaveBeenCalled();
    });
  });

  it('cancels form and resets data', () => {
    render(<AppointmentForm handleCancel={mockHandleCancel} getAppointment={mockGetAppointment} />);
    
    const cancelBtn = screen.getByRole('button', { name: /Cancel/i });
    fireEvent.click(cancelBtn);
    
    expect(mockHandleCancel).toHaveBeenCalled();
  });
});
