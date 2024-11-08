import { HStack, VStack, Icon, Box, Text, Pressable } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { LayoutAnimation, Platform, UIManager } from "react-native";
import { CarSelectModal } from '@components/CarSelectModal/CarSelectModal'; // Importe o componente do modal

// Habilitar animações no Android
if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

export function HomeHeader() {
    const navigation = useNavigation();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    
    const cars = [
        { id: '1', plate: 'PNK9D22' },
        { id: '2', plate: 'ABC1234' },
        { id: '3', plate: 'XYZ5678' }
    ];

    useEffect(() => {
        if (!selectedCar) {
            setSelectedCar(cars[0]);
        }
    }, [selectedCar]);

    const handleCarSelect = (car) => {
        setSelectedCar(car);
        setIsModalOpen(false); 
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen); 
    };

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

           
            <Pressable onPress={toggleModal}>
                {({ isPressed }) => (
                    <Box
                        bg={isPressed ? "gray.100" : "white"}  
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
                                Placa: {selectedCar ? selectedCar.plate : 'Nenhum carro selecionado'}
                            </Text>
                        </HStack>
                    </Box>
                )}
            </Pressable>

            <CarSelectModal 
                isOpen={isModalOpen} 
                onClose={toggleModal} 
                cars={cars} 
                onCarSelect={handleCarSelect} 
            />
        </Box>
    );
}
