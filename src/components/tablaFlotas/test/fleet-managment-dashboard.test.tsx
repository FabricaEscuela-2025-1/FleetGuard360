import { render, screen, waitFor} from '@testing-library/react'; 
import userEvent from '@testing-library/user-event'; // Importa userEvent para simular interacciones de usuario
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

jest.useFakeTimers();

describe('FleetManagementDashboard Component', () => {
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.clearAllTimers(); 
  });

  // Prueba 1: Verifica que el componente se renderiza correctamente con los elementos iniciales
  it('should render the dashboard with initial elements and data', () => {
    render(<FleetManagementDashboard />);

    expect(screen.getByRole('heading', { name: /Gestión de Flota/i })).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/Buscar.../i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Agregar Unidad/i })).toBeInTheDocument();

    expect(screen.getByText('ABC-123')).toBeInTheDocument();
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByText('Activo')).toBeInTheDocument();
    expect(screen.getByText('Ford Ranger 2021')).toBeInTheDocument();
  });

  // Prueba 2: Verifica la funcionalidad de búsqueda
  it('should filter table data based on search term', async () => {
    const user = userEvent.setup(); // Configura user-event
    render(<FleetManagementDashboard />);

    const searchInput = screen.getByPlaceholderText(/Buscar.../i);
    await user.type(searchInput, 'María'); 

    await waitFor(() => {
      expect(screen.getByText('María López')).toBeInTheDocument();
      expect(screen.queryByText('Juan Pérez')).not.toBeInTheDocument(); 
    });

    await user.clear(searchInput); 
    await user.type(searchInput, 'XYZ-456'); 

    await waitFor(() => {
      expect(screen.getByText('XYZ-456')).toBeInTheDocument();
      expect(screen.queryByText('ABC-123')).not.toBeInTheDocument();
    });

    await user.clear(searchInput); 
    await user.type(searchInput, 'no-existente'); 

    await waitFor(() => {
      expect(screen.getByText('No se encontraron resultados.')).toBeInTheDocument();
      expect(screen.queryByText('ABC-123')).not.toBeInTheDocument(); 
    });
  });

  // Prueba 3: Agregar una nueva unidad (vehículo)
  it('should add a new vehicle to the table', async () => {
    const user = userEvent.setup();
    render(<FleetManagementDashboard />);

    await user.click(screen.getByRole('button', { name: /Agregar Unidad/i }));

    const dialogTitle = screen.getByRole('heading', { name: /Agregar Nueva Unidad/i });
    expect(dialogTitle).toBeInTheDocument();

    await user.type(screen.getByLabelText(/Placa/i), 'NEW-001');
    await user.type(screen.getByLabelText(/Modelo/i), 'Tesla Cybertruck');
    await user.type(screen.getByLabelText(/Capacidad/i), '3 toneladas');

    await user.click(screen.getByLabelText(/Conductor/i)); 
    await user.click(screen.getByText('Laura Gómez')); 

    await user.click(screen.getByLabelText(/Estado/i)); 
    await user.click(screen.getByText('Activo')); 

    await user.click(screen.getByRole('button', { name: /Guardar/i }));

    await waitFor(() => {
      expect(dialogTitle).not.toBeInTheDocument();
    });

    expect(screen.getByText('NEW-001')).toBeInTheDocument();
    expect(screen.getByText('Tesla Cybertruck')).toBeInTheDocument();
    expect(screen.getByText('Laura Gómez')).toBeInTheDocument();
    expect(screen.getByText('Activo')).toBeInTheDocument();
  });

  // Prueba 4: Validación del formulario al intentar agregar una unidad sin datos
  it('should show validation errors when adding an empty vehicle', async () => {
    const user = userEvent.setup();
    render(<FleetManagementDashboard />);

    await user.click(screen.getByRole('button', { name: /Agregar Unidad/i }));

    await user.click(screen.getByRole('button', { name: /Guardar/i }));
    await waitFor(() => {
      expect(screen.getByText('La placa debe tener al menos 6 caracteres')).toBeInTheDocument();
      expect(screen.getByText('El modelo debe tener al menos 3 caracteres')).toBeInTheDocument();
      expect(screen.getByText('Debe seleccionar un conductor')).toBeInTheDocument();
      expect(screen.getByText('Debe ingresar la capacidad')).toBeInTheDocument();
      expect(screen.getByText('Debe seleccionar un estado')).toBeInTheDocument();
    });
  });

  

  // Prueba 6: Verifica que el estado "En mantenimiento" tenga el color correcto
  it('should display correct badge color for "En mantenimiento" status', () => {
    render(<FleetManagementDashboard />);
    const maintenanceBadge = screen.getByText('En mantenimiento');
    expect(maintenanceBadge).toHaveClass('bg-yellow-100');
    expect(maintenanceBadge).toHaveClass('text-yellow-800');
  });

  // Prueba 7: Verifica que el estado "Inactivo" tenga el color correcto
  it('should display correct badge color for "Inactivo" status', () => {
    render(<FleetManagementDashboard />);
    const inactiveBadge = screen.getByText('Inactivo');
    expect(inactiveBadge).toHaveClass('bg-red-100');
    expect(inactiveBadge).toHaveClass('text-red-800');
  });

  // Prueba 8: Verifica que el estado "Activo" tenga el color correcto
  it('should display correct badge color for "Activo" status', () => {
    render(<FleetManagementDashboard />);
    const activeBadge = screen.getAllByText('Activo')[0]; // Hay múltiples, toma el primero
    expect(activeBadge).toHaveClass('bg-green-100');
    expect(activeBadge).toHaveClass('text-green-800');
  });
});
