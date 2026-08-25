import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BillFormat from './BillFormat.jsx';

describe('BillFormat Component', () => {
  const mockBill = {
    treatmentBillId: 'INV-001',
    invoiceDate: '2023-10-15T00:00:00Z',
    patientId: 'PT-123',
    modeOfPayment: 'Card',
    totalAmount: '1500',
    discount: '10',
    paidAmount: '1350',
    balanceAmount: '0',
    treatments: [
      { name: 'Consultation', price: '500' },
      { name: 'X-Ray', price: '1000' }
    ]
  };

  it('renders null when no selectedBill is provided', () => {
    const { container } = render(<BillFormat />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders bill details correctly', () => {
    render(<BillFormat selectedBill={mockBill} />);
    
    // Header
    expect(screen.getByText('Physician Clinic')).toBeInTheDocument();
    expect(screen.getByText('INV-001')).toBeInTheDocument();
    
    // Date formatting (assuming 'en-IN' locale)
    const formattedDate = new Date('2023-10-15T00:00:00Z').toLocaleDateString('en-IN');
    expect(screen.getByText(formattedDate)).toBeInTheDocument();

    // Patient ID
    expect(screen.getByText('PT-123')).toBeInTheDocument();

    // Treatments
    expect(screen.getByText('Consultation')).toBeInTheDocument();
    expect(screen.getAllByText('500.00')[0]).toBeInTheDocument();
    expect(screen.getByText('X-Ray')).toBeInTheDocument();
    expect(screen.getAllByText('1000.00')[0]).toBeInTheDocument();

    // Summary Math Formatting
    expect(screen.getAllByText('1500.00')[0]).toBeInTheDocument();
    expect(screen.getByText('10%')).toBeInTheDocument();
    expect(screen.getByText('1350.00')).toBeInTheDocument();
    expect(screen.getByText('0.00')).toBeInTheDocument();

    // Payment Mode
    expect(screen.getByText('Card')).toBeInTheDocument();
  });

  it('handles missing invoiceDate gracefully', () => {
    const billWithoutDate = { ...mockBill, invoiceDate: null };
    render(<BillFormat selectedBill={billWithoutDate} />);
    
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('handles empty treatments array gracefully', () => {
    const billWithoutTreatments = { ...mockBill, treatments: [] };
    render(<BillFormat selectedBill={billWithoutTreatments} />);
    
    // Ensure the table headers exist but no body rows are mapped
    expect(screen.getByText('Item Name')).toBeInTheDocument();
    expect(screen.queryByText('Consultation')).not.toBeInTheDocument();
  });
});
