import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FleetManagementDashboard } from '../fleet-managment-dashboar';

jest.mock('lucide-react', () => ({
  Search: () => <svg data-testid="search-icon" />,
  Plus: () => <svg data-testid="plus-icon" />,
  Edit: () => <svg data-testid="edit-icon" />,
  Trash2: () => <svg data-testid="trash2-icon" />,
  AlertTriangle: () => <svg data-testid="alert-triangle-icon" />,
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

describe('FleetManagementDashboard Component', () => {

  it('should be a placeholder test that passes', () => {
    expect(true).toBe(true);
  });
  
  it('should display correct badge color for "En mantenimiento" status', () => {
    render(<FleetManagementDashboard />);
    const maintenanceBadge = screen.getByText('En mantenimiento');
    expect(maintenanceBadge).toHaveClass('bg-yellow-100');
  });

  it('should display correct badge color for "Inactivo" status', () => {
    render(<FleetManagementDashboard />);
    const inactiveBadge = screen.getByText('Inactivo');
    expect(inactiveBadge).toHaveClass('bg-red-100');
  });

  it('should display correct badge color for "Activo" status', () => {
    render(<FleetManagementDashboard />);
    const activeBadges = screen.getAllByText('Activo');
    expect(activeBadges[0]).toHaveClass('bg-green-100');
  });
});