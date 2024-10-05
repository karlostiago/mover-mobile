import { HStack, VStack, Icon, Box, Text } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

export function HomeHeader() {
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

                    <TouchableOpacity>
                        <Icon
                            as={MaterialIcons}
                            name="logout"
                            color="white"
                            size={7}
                            mt={-4} 
                        />
                    </TouchableOpacity>
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
                       Placa: PNK9D22
                    </Text>
                </HStack>
            </Box>
        </Box>
    ); 
}
