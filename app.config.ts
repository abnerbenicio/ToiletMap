import 'dotenv/config'; // Importa variáveis de ambiente do arquivo .env

export default {
  expo: {
    name: 'ToiletMap',
    slug: 'ToiletMap',
    version: '1.0.3',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true, // Suporte a tablets no iOS (já é padrão no Expo)
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.ToiletMap.ifes.abnerbenicio',
      permissions: [
        'ACCESS_FINE_LOCATION',
        'ACCESS_COARSE_LOCATION',
        'INTERNET', // Permissão de internet (já é padrão no Expo)
      ],
      usesCleartextTraffic: true, // Permitir conexões HTTP no Android
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      'expo-font',
      [
        'expo-location',
        {
          locationAlwaysAndWhenInUsePermission: {
            ios: 'Permissão para usar a localização.',
            android: 'Permissão necessária para exibir o mapa.',
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: '09f90c97-601b-4b7f-b522-c9911a549857',
      },
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY, // Adiciona a chave como extra
    },
  },
};
