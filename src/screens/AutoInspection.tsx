import React, { useState, useEffect } from 'react';
import { VStack, Center, Text, ScrollView, Box, Image } from 'native-base';
import { Button } from '@components/Button/Button'; 
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorProps } from '@routes/app.routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ClientApiService from '@services/clientApiService';

const apiService = new ClientApiService();

export function AutoInspection() {
    const navigation = useNavigation<AppNavigatorProps>();
    const [clientData, setClientData] = useState<any>(null);
    const [contract, setContract] = useState<any>(null);

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const storedContract = await AsyncStorage.getItem('@contract_data');
                if (storedContract) {
                    const contractObj = JSON.parse(storedContract);
                    setContract(contractObj);

                    const cpf = await AsyncStorage.getItem('@user_cpf');
                    if (cpf) {
                        const response = await apiService.checkExistingCpf(cpf);
                        if (response) {
                            setClientData(response);
                        }
                    }
                }
            } catch (err) {
                console.log('Erro ao buscar os dados do cliente:', err);
            }
        };

        fetchClientData();
    }, []);

    function handleStartInspection() {
        if (contract) {
            navigation.navigate('photoAutoInspection', { contract });
        } else {
            console.log('Contract não encontrado');
        }
    }

    const getFirstName = (fullName: string) => fullName.split(' ')[0];

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <Box flex={1} bg="green.600" px={10} pt={50}>
                <Center>
                    <Text fontSize="4xl" color="white" fontWeight="bold" isTruncated maxW="90%">
                        Olá, {clientData ? getFirstName(clientData.name) : 'Carregando...'}
                    </Text>
                    <Text fontSize="lg" color="white" textAlign="center" mt={2}>
                        Seja bem-vindo a Auto-inspeção.
                    </Text>
                </Center>

                <Center mt={20}>
                    <Image
                        source={require('../assets/car-removebg-preview.png')}
                        alt="Inspection Image"
                        size="2xl" 
                        resizeMode="contain"
                        marginBottom={10}
                    />
                </Center>

                <VStack flex={1} justifyContent="flex-end" alignItems="center" px={5} pt={6}>
                    <Button
                        title="Iniciar"
                        onPress={handleStartInspection}
                        size="lg"
                        bg="white" 
                        _text={{ color: 'green.600' }}
                        alignSelf="flex-end"
                        mb={5} 
                    />
                    <Text color="white" fontSize="md" textAlign="center" mt={2} mb={4}> 
                        Tire as fotos do veículo em um local com boa iluminação.
                    </Text>
                </VStack>
            </Box>
        </ScrollView>
    );
}
