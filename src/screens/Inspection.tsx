import React, { useState, useEffect } from 'react';
import { VStack, Center, Text, Box, HStack, FlatList } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@components/Button/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ClientApiService from '@services/clientApiService';
import { AuthNavigatorAuthProps } from '@routes/auth.routes';
import { Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const apiService = new ClientApiService();
const contractService = new ClientApiService();

export function Inspection() {

    const navigationProp = useNavigation<AuthNavigatorAuthProps>();
    const [clientData, setClientData] = useState<any>(null);

    const [contract, setContract] = useState<any>(null);
    const [inspections, setInspections] = useState<any[]>([]);

    const fetchClientData = async () => {
        try {
            const cpf = await AsyncStorage.getItem('@user_cpf');

            if (cpf) {
                const response = await apiService.checkExistingCpf(cpf);
                if (response) {
                    setClientData(response);

                    const contractResponse = await contractService.getContractByClientId(response.id);
                    if (contractResponse) {
                        setContract(contractResponse);

                        const inspectionsResponse = await contractService.getInspectionDataByContractId(contractResponse.id);
                        if (inspectionsResponse && inspectionsResponse.length > 0) {
                            setInspections(inspectionsResponse);
                        }
                    }

                    await AsyncStorage.setItem('@contract_data', JSON.stringify(contractResponse));
                }
            }
        } catch (err) {
            console.error('Erro ao buscar os dados do cliente ou contrato', err);
        }
    };

    useEffect(() => {
        fetchClientData();
    }, []); 

    useFocusEffect(
        React.useCallback(() => {
            fetchClientData();
        }, [])
    );

    const handleNewInspection = () => {
        if (contract) {
            navigationProp.navigate('autoInspection', { contract });
        }
    };

    const translateStatus = (status: string) => {
        switch (status) {
            case 'APPROVED':
                return 'Aprovado';
            case 'REJECTED':
                return 'Rejeitado';
            case 'UNDER_REVIEW':
                return 'Em análise';
            default:
                return status;
        }
    };

    const formatDate = (date: string) => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('pt-BR');
    };

    const handleRejectedStatus = (contract: any) => {
        if (contract) {
            navigationProp.navigate('autoInspection', { contract });
        }
    };

    const handleItemPress = (item: any) => {
        if (item.inspectionStatus === 'REJECTED') {
            handleRejectedStatus(contract);
        }
    };

    return (
        <Box flex={1} bg="green.600" px={6} pt={12}>
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

            <VStack flex={1} px={15} pt={6}>
                <HStack space={2} justifyContent="flex-start" mb={4}>
                    <Text color="white" fontSize="4xl">
                        Últimas
                    </Text>
                    <Text color="white" fontSize="4xl">
                        Vistorias
                    </Text>
                </HStack>

                <Box flex={1}>
                    {inspections.length === 0 ? (
                        <Text color="gray.100" fontSize="xl" textAlign="center">
                            Você ainda não realizou nenhuma vistoria.
                        </Text>
                    ) : (
                        <FlatList
                            data={inspections}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <Pressable onPress={() => handleItemPress(item)}>
                                    <Box
                                        bg="white"
                                        borderWidth={1}
                                        borderColor="gray.200"
                                        p={4}
                                        mb={4}
                                        borderRadius="md"
                                        shadow={1}
                                        alignItems="flex-start"
                                        width="100%"
                                        opacity={1}
                                    >
                                        <Text fontSize="md" fontWeight="bold" color="gray.700">
                                            Data: {formatDate(item.date)}
                                        </Text>
                                        <Text fontSize="md" color="gray.600">
                                            Status:
                                            <Text
                                                color={
                                                    item.inspectionStatus === 'REJECTED'
                                                        ? 'red.500'
                                                        : item.inspectionStatus === 'APPROVED'
                                                            ? 'green.500'
                                                            : item.inspectionStatus === 'UNDER_REVIEW'
                                                                ? 'blue.500'
                                                                : 'gray.600'
                                                }
                                                fontWeight={item.inspectionStatus === 'REJECTED' ? 'bold' : 'normal'}
                                            >
                                                {translateStatus(item.inspectionStatus)}
                                            </Text>
                                        </Text>
                                    </Box>
                                </Pressable>
                            )}
                            contentContainerStyle={{ paddingBottom: 20 }}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />

                    )}
                </Box>

                <Button
                    title="Nova Vistoria"
                    onPress={handleNewInspection}
                    size="lg"
                    bg="white"
                    _text={{ color: 'green.600' }}
                    alignSelf="center"
                    mt={4}
                    mb={5}
                />
            </VStack>
        </Box>
    );
}
