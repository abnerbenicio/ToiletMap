import { render, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import MapPage from '../src/app/MapPage';

// Mock do expo-location para evitar chamadas reais de localização
jest.mock('expo-location', () => ({
  getCurrentPositionAsync: jest.fn().mockResolvedValue({
    coords: { latitude: 37.78825, longitude: -122.4324 },
  }),
}));

// Função auxiliar para renderizar o componente dentro do NavigationContainer
const renderWithNavigation = (component: React.ReactElement) => {
  return render(<NavigationContainer>{component}</NavigationContainer>);
};

describe('MapPage', () => {
  it('deve exibir a tela de carregamento', () => {
    renderWithNavigation(<MapPage />);
    expect(screen.getByText('Carregando...')).toBeTruthy();
  });

  it('deve exibir a tela de carregamento enquanto busca a localização', () => {
    renderWithNavigation(<MapPage />);
    expect(screen.getByText('Carregando...')).toBeTruthy();
  });
});


  
