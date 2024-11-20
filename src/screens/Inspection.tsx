import React, { useState, useEffect } from 'react';
import { VStack, Center, Text, ScrollView, Box, HStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@components/Button/Button'; 
import { AppNavigatorProps } from '@routes/app.routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ClientApiService from '@services/clientApiService';
import { AuthNavigatorAuthProps } from '@routes/auth.routes';

const apiService = new ClientApiService();
const contractService = new ClientApiService();

export function Inspection() {
    const navigation = useNavigation<AppNavigatorProps>();
    const navigationProp = useNavigation<AuthNavigatorAuthProps>(); 
    const [clientData, setClientData] = useState<any>(null);
    const [contract, setContract] = useState<any>(null);

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const cpf = await AsyncStorage.getItem('@user_cpf');
                
                if (cpf) {
                    console.log('Buscando dados para o CPF:', cpf);
                    const response = await apiService.checkExistingCpf(cpf);
                    if (response) {
                        setClientData(response);
                        console.log('Cliente encontrado:', response);
        
                        const contractResponse = await contractService.getContractByClientId(response.id);
                        if (contractResponse) {
                            setContract(contractResponse);
                            
                            await AsyncStorage.setItem('@contract_data', JSON.stringify(contractResponse));
                            console.log('Contrato encontrado e salvo:', contractResponse);
                        } else {
                            console.log('Contrato não encontrado ou estrutura inesperada');
                        }
                    } else {
                        console.log('Cliente não encontrado');
                    }
                } else {
                    console.log('CPF não encontrado');
                }
            } catch (err) {
                console.log('Erro ao buscar os dados do cliente ou contrato', err);
            }
        };
    
        fetchClientData();
    }, []);

    const handleNewInspection = () => {
        if (contract) {
            navigationProp.navigate('autoInspection', { contract });
        } else {
            console.log('Contrato não encontrado');
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <Box flex={1} bg="green.600" px={10} pt={50}>
                <Center>
                    <Text
                        fontSize="7xl"
                        fontFamily="mono"
                        width={250}
                        height={87}
                        color="white"
                        alignSelf="flex-start" 
                    >
                        m
                    </Text>
                </Center>

                <VStack flex={1} justifyContent="space-between" px={15} pt={105}>
                    <Center>
                        <HStack space={2} justifyContent="flex-start" mb={100}>
                            <Text color="white" fontSize="4xl">
                                Últimas
                            </Text>
                            <Text color="white" fontSize="4xl">
                                Vistorias
                            </Text>
                        </HStack>

                        <Text color="gray.100" fontSize="xl" textAlign="center">
                            Você ainda não realizou nenhuma vistoria.
                        </Text>
                    </Center>
                    
                    <Button
                        title="Nova Vistoria"
                        onPress={handleNewInspection}
                        size="lg"
                        bg="white" 
                        _text={{ color: 'green.600' }}
                        alignSelf="flex-end"
                        mb={5} 
                    />
                </VStack>
            </Box>
        </ScrollView>
    );
}
