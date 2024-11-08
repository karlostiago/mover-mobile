import { Box, VStack, HStack, Icon, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

type CarInfoCardProps = {
    vehicleName: string;
    vehicleModel: string;
    licensePlate: string;
};

export function CarInfoCard({ vehicleName, vehicleModel, licensePlate }: CarInfoCardProps) {
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
                <HStack alignItems="center" justifyContent="flex-start">
                    <Icon
                        as={MaterialIcons}
                        name="directions-car"
                        color="green.500"
                        size={6}
                        mr={2}
                    />
                    <Text fontSize="lg" fontWeight="bold" color="black">
                        {vehicleName} - {vehicleModel} 
                    </Text>
                </HStack>

                <HStack alignItems="center" justifyContent="flex-start">
                    <Icon
                        as={MaterialIcons}
                        name="check-circle"
                        color="green.500"
                        size={6}
                        mr={2}
                    />
                    <Text fontSize="md" color="gray.700">
                        Placa: {licensePlate} 
                    </Text>
                </HStack>

     
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
