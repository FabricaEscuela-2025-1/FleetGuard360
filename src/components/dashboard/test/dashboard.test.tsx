import { render, screen } from '@testing-library/react'; 
import '@testing-library/jest-dom'; 
import { Dashboard } from '../dashboard'; 


describe('Dashboard Component', () => {
  // Prueba 1: Verifica que el componente se renderiza correctamente
  it('should render the Dashboard title', () => {
    render(<Dashboard />); 

    const dashboardTitle = screen.getByRole('heading', { name: /Dashboard/i });
    expect(dashboardTitle).toBeInTheDocument();
  });

  // Prueba 2: Verifica que el mensaje de bienvenida y la descripción estén presentes
  it('should display the welcome message and description', () => {
    render(<Dashboard />);

    const welcomeTitle = screen.getByRole('heading', { name: /Welcome a Fleet Manager/i });
    expect(welcomeTitle).toBeInTheDocument();

    const descriptionText = screen.getByText(/Sistema de gestión de flota para optimizar sus operaciones/i);
    expect(descriptionText).toBeInTheDocument();
  });

  // Prueba 3: Verifica que el texto instructivo esté presente
  it('should display the instructional text', () => {
    render(<Dashboard />);
    const instructionalText = screen.getByText(/Utilice el menú lateral para navegar entre las diferentes secciones del sistema./i);
    expect(instructionalText).toBeInTheDocument();
  });

  // Prueba 4: Verifica que las tarjetas de métricas se rendericen con los títulos y valores correctos
  it('should render all metric cards with their titles and values', () => {
    render(<Dashboard />);

    expect(screen.getByText('Total Vehículos')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('+2 desde el mes pasado')).toBeInTheDocument();

    expect(screen.getByText('Conductores')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('+1 desde el mes pasado')).toBeInTheDocument();

    expect(screen.getByText('Mantenimientos')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Programados este mes')).toBeInTheDocument();

    expect(screen.getByText('Eficiencia')).toBeInTheDocument();
    expect(screen.getByText('89%')).toBeInTheDocument();
    expect(screen.getByText('+4% desde el mes pasado')).toBeInTheDocument();
  });
});
