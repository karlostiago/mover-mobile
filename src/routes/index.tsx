import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useTheme, Box } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import { Text } from 'react-native-svg';

export function Routes() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const { colors } = useTheme();
    const theme = DefaultTheme;
    theme.colors.background = colors.gray[700];

    
    const checkAuthentication = async () => {
        try {
            const token = await AsyncStorage.getItem('@auth_token'); 
            setIsAuthenticated(!!token); 
        } catch (error) {
            console.log('Erro ao buscar o token:', error);
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        checkAuthentication(); 
    }, []);


    if (isAuthenticated === null) {
        return <Box flex={1} justifyContent="center" alignItems="center"><Text>Carregando...</Text></Box>;
    }

    return (
        <Box flex={1} bg="gray.700">
            <NavigationContainer theme={theme}>
                {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
            </NavigationContainer>
        </Box>
    );
}