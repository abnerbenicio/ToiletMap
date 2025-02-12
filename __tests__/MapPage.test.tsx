import { render, screen } from '@testing-library/react-native';
import MapPage from '../src/app/MapPage'; // Caminho correto do componente

jest.mock('expo-location', () => ({
  getCurrentPositionAsync: jest.fn().mockResolvedValue({
    coords: { latitude: 37.78825, longitude: -122.4324 },
  }),
}));

describe('MapPage', () => {
  it('deve exibir a tela de carregamento', () => {
    render(<MapPage />);
    expect(screen.getByText('Carregando...')).toBeTruthy();
  });
});


jest.mock('expo-location', () => ({
    getCurrentPositionAsync: jest.fn().mockResolvedValue({
      coords: { latitude: 37.78825, longitude: -122.4324 },
    }),
  }));
  
  describe('MapPage', () => {
    it('deve exibir a tela de carregamento enquanto busca a localização', () => {
      render(<MapPage />);
      expect(screen.getByText('Carregando...')).toBeTruthy();
    });
  });

  
