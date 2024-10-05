import { Box, VStack, HStack, Icon, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export function CarInfoCard() {
    return (
        <Box
            bg="white"
            borderRadius={16}
            p={4}
            shadow={3}
            width="90%" 
            alignSelf="center" 
            mt={8} 
        >
            <VStack space={4}>
                {/* Nome do Carro */}
                <HStack alignItems="center" justifyContent="flex-start">
                    <Icon
                        as={MaterialIcons}
                        name="directions-car"
                        color="green.500"
                        size={6}
                        mr={2}
                    />
                    <Text fontSize="lg" fontWeight="bold" color="black">
                        Kwid Intense Branco
                    </Text>
                </HStack>

                {/* Placa */}
                <HStack alignItems="center" justifyContent="flex-start">
                    <Icon
                        as={MaterialIcons}
                        name="check-circle"
                        color="green.500"
                        size={6}
                        mr={2}
                    />
                    <Text fontSize="md" color="gray.700">
                        Placa: PNK9D22
                    </Text>
                </HStack>

                {/* Última Vistoria */}
                <HStack alignItems="center" justifyContent="flex-start">
                    <Icon
                        as={MaterialIcons}
                        name="calendar-today"
                        color="green.500"
                        size={6}
                        mr={2}
                    />
                    <Text fontSize="md" color="gray.700">
                        Última vistoria em: 31/08/2024
                    </Text>
                </HStack>
            </VStack>
        </Box>
    );
}
