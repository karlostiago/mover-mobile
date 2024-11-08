import { HStack, VStack, Icon, Box, Text, Pressable } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ClientApiService from '@services/clientApiService';

const apiService = new ClientApiService();
const contractService = new ClientApiService();

export function HomeHeader({ vehicleInfo }: { vehicleInfo: { vehicleModel: string, licensePlate: string } }) {
    const navigation = useNavigation();
    
    const [selectedCar, setSelectedCar] = useState(null);
    const [clientData, setClientData] = useState<any>(null);
    const [contract, setContract] = useState<any>(null);

    const handleCarSelect = (car) => {
        setSelectedCar(car);
    };

    // Effect to fetch client and contract data
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

    const vehicleInfoDetails = contract ? getVehicleInfo(contract.vehicleName) : { vehicleName: '', vehicleModel: '', licensePlate: '' };

    return (
        <Box>
            <Box bg="green.600" pt={41} pb={6} px={12} borderBottomRadius={16} width="100%">    
                <HStack alignItems="center" justifyContent="space-between">
                    <VStack>
                        <Text
                            fontSize="3xl"  
                            fontFamily="mono"
                            color="white"
                            fontWeight="bold"
                            mb={0} 
                        >
                            Mover
                        </Text>
                        
                        <HStack alignItems="center" mt={2}>
                            <Icon
                                as={MaterialIcons}
                                name="directions-car" 
                                color="white"
                                size={5}
                                mt={2} 
                            />
                            <Text
                                ml={2} 
                                fontSize="md"
                                color="white"
                                mt={2}
                            >
                                Selecione o Carro
                            </Text>
                        </HStack>
                    </VStack>

                    <Pressable onPress={() => navigation.navigate('login')}>
                        <Icon
                            as={MaterialIcons}
                            name="logout"
                            color="white"
                            size={7}
                            mt={-4} 
                        />
                    </Pressable>
                </HStack>
            </Box>

            <Box 
                bg="white"
                borderRadius={20}
                mt={-5}
                p={4}  
                width="80%" 
                alignSelf="center" 
                height={12} 
                shadow={2} 
            >
                <HStack alignItems="center" justifyContent="flex-start" height="100%">
                    <Icon
                        as={MaterialIcons}
                        name="check-circle" 
                        color="green.500"
                        size={5}
                    />
                    <Text
                        ml={1} 
                        fontSize="md"
                        color="green.600"
                        mt={-1}
                    >
                        Placa: {vehicleInfoDetails ? vehicleInfoDetails.licensePlate : 'Nenhum carro selecionado'}
                    </Text>
                </HStack>
            </Box>

            <Box mt={4} px={4}>
               
                <VStack mt={2}>
                    {contract?.vehicles?.map((car, index) => (
                        <Pressable 
                            key={index} 
                            onPress={() => handleCarSelect(car)} 
                            bg={selectedCar?.id === car.id ? "green.100" : "white"}
                            p={3} 
                            borderRadius={8}
                            mb={2}
                            shadow={2}
                        >
                            <HStack justifyContent="space-between" alignItems="center">
                                <Text fontSize="md" color="green.600">{car.licensePlate}</Text>
                                <Text fontSize="md" color="gray.600">{car.vehicleModel}</Text>
                            </HStack>
                        </Pressable>
                    ))}
                </VStack>
            </Box>
        </Box>
    );
}
