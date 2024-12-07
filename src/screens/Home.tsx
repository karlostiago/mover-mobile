import React, { useEffect, useState } from 'react';
import { HStack, VStack, Text, Box } from 'native-base';
import { HomeHeader } from "@components/HomeHeader/HomeHeader";
import { Button } from "@components/Button/Button"; 
import { CarInfoCard } from "@components/CarInfoCard/CarInfoCard"; 
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ClientApiService from '@services/clientApiService';
import { AuthNavigatorAuthProps } from '@routes/auth.routes';
import ModalInfo from '@components/ModalInfo/ModalInfo';

const apiService = new ClientApiService();
const contractService = new ClientApiService();

export function Home() {
    const navigation = useNavigation<AuthNavigatorAuthProps>(); 
    const [clientData, setClientData] = useState<any>(null);
    const [contract, setContract] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);

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

    const handleVistoriaPress = () => {
        if (contract) {
            navigation.navigate('inspection', { contract });
        } else {
            console.log('Contrato não carregado');
        }
    };

    const handleEmergencyContactPress = () => setModalVisible(true);
    const handleCloseModal = () => setModalVisible(false);

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
                        onPress={handleEmergencyContactPress}
                        w="48%" 
                        bg="white" 
                        rounded="full"
                        _pressed={{ bg: 'gray.200' }} 
                    />

                    <Button
                        title="Vistoria"
                        variant="outline"
                        onPress={handleVistoriaPress}
                        w="48%" 
                        bg={contract ? "white" : "gray.300"}
                        isDisabled={!contract}
                        rounded="full" 
                        _pressed={{ bg: 'gray.200' }} 
                    />
                </HStack>
            </VStack>
            <ModalInfo
                isVisible={isModalVisible}
                message={{
                    title: 'Furto ou Roubo',
                    body: (
                        <VStack space={4} alignItems="center" justifyContent="center" w="80%" p={4}>
                            <Text fontSize="lg" fontWeight="bold" color="black">Furto ou Roubo</Text>

                            <Box
                                borderColor="green.500"
                                borderWidth={1}
                                borderRadius="md"
                                px={4}
                                py={2}
                                w="100%"
                                alignItems="center"
                            >
                                <Text fontSize="md" color="black">0800 607 2007</Text>
                            </Box>

                            <Text fontSize="md" color="black">ou</Text>

                            <Text fontSize="md" fontWeight="bold" color="green.500">Assistência 24h</Text>

                            <Box
                                borderColor="green.500"
                                borderWidth={1}
                                borderRadius="md"
                                px={4}
                                py={2}
                                w="100%"
                                alignItems="center"
                            >
                                <Text fontSize="md" color="black">0800 948 488</Text>
                            </Box>
                        </VStack>
                    ),
                }}
                onClose={handleCloseModal}
            />
        </VStack>
    );
}
