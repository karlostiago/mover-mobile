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
    const route = useRoute();
    const [clientData, setClientData] = useState<any>(null);
    const [contract, setContract] = useState<any>(null);

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const cpf = await AsyncStorage.getItem('@user_cpf');
                
                if (cpf) {
                    const response = await apiService.checkExistingCpf(cpf);
                    if (response) {
                        setClientData(response);  
        
                        const contractResponse = await contractService.getContractByClientId(response.id);

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
                console.log('Erro ao buscar os dados do cliente ou contrato', err);
            }
        };
    
        fetchClientData();
    }, []);
    
    
    const getVehicleInfo = (vehicleInfo: string) => {
        const parts = vehicleInfo.split(" - ");
        const vehicleName = parts[0]; 
        const vehicleModel = parts[1]; 
        const licensePlate = parts[2]; 

        return { vehicleName, vehicleModel, licensePlate };
    };

    const vehicleInfo = contract ? getVehicleInfo(contract.vehicleName) : { vehicleName: '', vehicleModel: '', licensePlate: '' };

    return (
        <VStack flex={1} bg="gray.100">
            <HomeHeader vehicleInfo={{
                vehicleModel: '',
                licensePlate: vehicleInfo.licensePlate
            }} />
            
            <VStack flex={1} justifyContent="center" alignItems="center" mt={-10}>
               
                {contract ? (
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
                        onPress={() => {
                            console.log('Contato de Emergência Pressionado');
                        }}
                        w="48%" 
                        bg="white" 
                        rounded="full"
                        _pressed={{ bg: 'gray.200' }} 
                    />

                    <Button
                        title="Vistoria"
                        variant="outline"
                        onPress={() => {
                            navigation.navigate('inspection');
                        }}
                        w="48%" 
                        bg="white"
                        rounded="full" 
                        _pressed={{ bg: 'gray.200' }} 
                    />
                </HStack>
            </VStack>
        </VStack>
    );
}
