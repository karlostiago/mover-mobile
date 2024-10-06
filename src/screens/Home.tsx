import { HStack, VStack } from 'native-base';
import { HomeHeader } from "@components/HomeHeader/HomeHeader";
import { Button } from "@components/Button/Button"; 
import { CarInfoCard } from "@components/CarInfoCard/CarInfoCard"; 
import { AppNavigatorProps } from '@routes/app.routes';
import { useNavigation } from '@react-navigation/native';

export function Home() {
    const navigation = useNavigation<AppNavigatorProps>();
    return (
        <VStack flex={1} bg="gray.100">
            <HomeHeader />

            
            <VStack flex={1} justifyContent="center" alignItems="center" mt={-10}>
                <CarInfoCard />
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
