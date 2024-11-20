import React, { useEffect, useState } from 'react';
import { HStack, VStack, Text } from 'native-base';
import { HomeHeader } from "@components/HomeHeader/HomeHeader";
import { Button } from "@components/Button/Button"; 
import { CarInfoCard } from "@components/CarInfoCard/CarInfoCard"; 
import { AppNavigatorProps } from '@routes/app.routes';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ClientApiService from '@services/clientApiService';

const apiService = new ClientApiService();
const contractService = new ClientApiService();

export function Home() {
    const navigation = useNavigation<AppNavigatorProps>();
    const [clientData, setClientData] = useState<any>(null);
    const [contract, setContract] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClientAndContractData = async () => {
            setLoading(true);
            try {
                const cpf = await AsyncStorage.getItem('@user_cpf');
                
                if (cpf) {
                    const clientResponse = await apiService.checkExistingCpf(cpf);
                    if (clientResponse) {
                        setClientData(clientResponse);  
        
                        const contractResponse = await contractService.getContractByClientId(clientResponse.id);
                        if (contractResponse && contractResponse.id) {
                            setContract(contractResponse);
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
                console.error('Erro ao buscar os dados do cliente ou contrato', err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchClientAndContractData();
    }, []);
    
    const getVehicleInfo = (vehicleInfo: string) => {
        const parts = vehicleInfo.split(" - ");
        return {
            vehicleName: parts[0] || '',
            vehicleModel: parts[1] || '',
            licensePlate: parts[2] || '',
        };
    };

    const vehicleInfo = contract ? getVehicleInfo(contract.vehicleName) : { vehicleName: '', vehicleModel: '', licensePlate: '' };

    return (
        <VStack flex={1} bg="gray.100">
            <HomeHeader vehicleInfo={{
                vehicleModel: vehicleInfo.vehicleModel,
                licensePlate: vehicleInfo.licensePlate,
            }} />
            
            <VStack flex={1} justifyContent="center" alignItems="center" mt={-10}>
                {loading ? (
                    <Text>Carregando...</Text>
                ) : contract ? (
                    <CarInfoCard
                        vehicleName={vehicleInfo.vehicleName}  
                        vehicleModel={vehicleInfo.vehicleModel} 
                        licensePlate={vehicleInfo.licensePlate}
                    />
                ) : (
                    <Text>Contrato não encontrado</Text> 
                )}
            </VStack>

            <VStack flex={1} justifyContent="flex-end" mb={6} px={4}>
                <HStack
                    justifyContent="space-between"
                    w="full"
                    space={2}
                >
                    <Button
                        title="Contato de Emergência"
                        variant="outline"
                        onPress={() => console.log('Contato de Emergência Pressionado')}
                        w="48%" 
                        bg="white" 
                        rounded="full"
                        _pressed={{ bg: 'gray.200' }} 
                    />

                    <Button
                        title="Vistoria"
                        variant="outline"
                        onPress={() => {
                            if (contract) {
                                navigation.navigate('inspection', { contract });
                            } else {
                                console.log('Contrato não carregado.');
                            }
                        }}
                        w="48%" 
                        bg={contract ? "white" : "gray.300"}
                        isDisabled={!contract}
                        rounded="full" 
                        _pressed={{ bg: 'gray.200' }} 
                    />
                </HStack>
            </VStack>
        </VStack>
    );
}
