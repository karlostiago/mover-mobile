import { HStack, VStack } from 'native-base';
import { HomeHeader } from "@components/HomeHeader/HomeHeader";
import { Button } from "@components/Button/Button"; 
import { MaterialIcons } from '@expo/vector-icons'; 

export function Home() {
    return (
        <VStack flex={1}>
            <HomeHeader />

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
                        w="50%" 
                        bg="white" 
                        rounded="full"
                        _pressed={{ bg: 'gray.200' }} 
                    />

                    {/* Botão Vistoria */}
                    <Button
                        title="Vistoria"
                        variant="outline"
                        
                        onPress={() => {
                            console.log('Vistoria Pressionado');
                        }}
                        w="50%" 
                        bg="white"
                        rounded="full" 
                        _pressed={{ bg: 'gray.200' }} 
                    />
                </HStack>
            </VStack>
        </VStack>
    );
}
