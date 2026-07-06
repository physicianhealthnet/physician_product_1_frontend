import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import BillsEntery from './BillsEntery.jsx';
import { AxiosInstance } from '../../utilities/AxiosInstance';

// Mock React Router
vi.mock('react-router-dom', () => ({
  useParams: () => ({ patient_id: 'PT-123' })
}));

// Mock Axios
vi.mock('../../utilities/AxiosInstance', () => ({
  AxiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn()
  }
}));

// Mock html2pdf.js
const mockOutput = vi.fn().mockResolvedValue('data:application/pdf;base64,mockbase64data');
const mockSave = vi.fn();
const mockSet = vi.fn(() => ({
  output: mockOutput,
  save: mockSave
}));
const mockFrom = vi.fn(() => ({
  set: mockSet
}));

vi.mock('html2pdf.js', () => ({
  default: () => ({
    from: mockFrom
  })
}));

// Mock Ant Design Message
vi.mock('antd', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    message: {
      success: vi.fn(),
      warning: vi.fn(),
      error: vi.fn()
    }
  };
});

// Mock Iconify
vi.mock('@iconify/react/dist/iconify.js', () => ({
  Icon: ({ icon }) => <span data-testid="icon">{icon}</span>
}));

// Mock BillFormat to prevent deep rendering issues
vi.mock('./BillFormat', () => ({
  default: React.forwardRef((props, ref) => (
    <div ref={ref} data-testid="mock-bill-format">
      Mocked Bill Format
    </div>
  ))
}));

describe('BillsEntery Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
    sessionStorage.setItem('user', JSON.stringify({ clinicId: 'clinic_1' }));
    
    AxiosInstance.get.mockImplementation((url) => {
      if (url.includes('/treatment-bill/get-patient')) {
        return Promise.resolve({
          data: {
            data: [
              {
                _id: 'bill1',
                treatmentBillId: 'INV-001',
                invoiceDate: '2023-10-15T00:00:00Z',
                totalAmount: '1500',
                paidAmount: '1500',
                balanceAmount: '0',
                discount: 0,
                modeOfPayment: 'Card',
                treatments: [{ name: 'Consultation', price: '500', total: '500' }]
              }
            ]
          }
        });
      }
      if (url.includes('/patient/get-by-id')) {
        return Promise.resolve({
          data: {
            patient: {
              PHN_ID: 'PHN-456',
              patientName: 'John Doe',
              patientPhone: '1234567890'
            }
          }
        });
      }
      return Promise.resolve({ data: {} });
    });
  });

  it('renders correctly and fetches initial data', async () => {
    render(<BillsEntery />);
    
    await waitFor(() => {
      expect(AxiosInstance.get).toHaveBeenCalledWith('/treatment-bill/get-patient/PT-123');
      expect(screen.getByText('INV-001')).toBeInTheDocument();
      expect(screen.getByText('₹1500')).toBeInTheDocument();
    });
  });

  it('switches to add bill form and calculates math correctly', async () => {
    render(<BillsEntery />);
    
    // Wait for initial render to complete
    await waitFor(() => {
      expect(screen.getByText('Add Bill')).toBeInTheDocument();
    });

    // Click Add Bill
    fireEvent.click(screen.getByText('Add Bill'));

    // We should be in the form
    expect(screen.getByText('Bill Details')).toBeInTheDocument();
    expect(screen.getByText('Items / Treatments')).toBeInTheDocument();

    // Add a treatment
    const nameInput = document.querySelector('input[name="name"]');
    const priceInput = document.querySelector('input[name="price"]');
    
    fireEvent.change(nameInput, { target: { value: 'X-Ray' } });
    fireEvent.change(priceInput, { target: { value: '1000' } });

    // The total should auto-calculate in the input
    const totalInput = document.querySelector('input[name="total"]');
    expect(totalInput).toHaveValue(1000); // total input should be disabled but populated

    // Click Add Item
    fireEvent.click(screen.getByRole('button', { name: /Add Item/i }));

    // Item should appear in table
    expect(screen.getByRole('cell', { name: 'X-Ray' })).toBeInTheDocument();
    
    // Check global bill total
    const billTotalInput = document.querySelector('input[name="totalAmount"]');
    expect(billTotalInput).toHaveValue(1000);

    // Add discount
    const discountInput = document.querySelector('input[name="discount"]');
    fireEvent.change(discountInput, { target: { value: '10' } }); // 10%

    // Check balance (1000 - 10% = 900)
    const balanceInput = document.querySelector('input[name="balanceAmount"]');
    expect(balanceInput).toHaveValue(900);

    // Add paid amount
    const paidInput = document.querySelector('input[name="paidAmount"]');
    fireEvent.change(paidInput, { target: { value: '400' } });

    // New balance should be 500
    expect(balanceInput).toHaveValue(500);
  });

  it('submits a new bill successfully and generates PDF', async () => {
    AxiosInstance.post.mockResolvedValue({ data: { status: 201 } });
    
    render(<BillsEntery />);
    
    await waitFor(() => {
      expect(screen.getByText('Add Bill')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Add Bill'));

    // Fill minimum fields
    fireEvent.change(document.querySelector('input[name="name"]'), { target: { value: 'Test' } });
    fireEvent.change(document.querySelector('input[name="price"]'), { target: { value: '100' } });
    fireEvent.click(screen.getByRole('button', { name: /Add Item/i }));

    // Submit Bill
    fireEvent.click(screen.getByRole('button', { name: /Submit Bill/i }));

    await waitFor(() => {
      // PDF Generation should be called
      expect(mockFrom).toHaveBeenCalled();
      expect(mockOutput).toHaveBeenCalledWith('datauristring');
      
      // Axios POST should be called
      expect(AxiosInstance.post).toHaveBeenCalledWith('/treatment-bill/add', expect.objectContaining({
        patientId: 'PT-123',
        totalAmount: '100.00',
        pdfBase64: 'mockbase64data'
      }));
    });
  });

  it('shares bill via email using PDF generation', async () => {
    AxiosInstance.post.mockResolvedValue({ data: { message: 'Shared' } });
    
    render(<BillsEntery />);
    
    // Wait for the bill to render
    await waitFor(() => {
      expect(screen.getByText('INV-001')).toBeInTheDocument();
    });

    // The share button is inside the bill card
    // We can find it by title="Share via Email"
    const shareBtn = screen.getByTitle('Share via Email');
    
    // Click it
    fireEvent.click(shareBtn);

    // Wait for PDF logic and Axios
    await waitFor(() => {
      expect(mockFrom).toHaveBeenCalled();
      expect(mockOutput).toHaveBeenCalledWith('datauristring');
      
      expect(AxiosInstance.post).toHaveBeenCalledWith('/share/bill', expect.objectContaining({
        billId: 'bill1',
        pdfAttachment: 'mockbase64data'
      }));
    });
  });
});
