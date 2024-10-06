import React, { useState } from 'react';
import { VStack, Center, Text, ScrollView, Box, HStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@components/Button/Button'; 
import { AppNavigatorProps } from '@routes/app.routes';

export function Inspection() {
    const navigation = useNavigation<AppNavigatorProps>();
    const [hasInspection, setHasInspection] = useState(false);

    function handleNewInspection() {
        console.log('Iniciar nova vistoria');
        navigation.navigate('autoInspection'); 
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <Box flex={1} bg="green.600" px={10} pt={50}>
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

                <VStack flex={1} justifyContent="space-between" px={15} pt={105}>
                    <Center>
                        <HStack space={2} justifyContent="flex-start" mb={100}>
                            <Text color="white" fontSize="4xl">
                                Últimas
                            </Text>
                            <Text color="white" fontSize="4xl">
                                Vistorias
                            </Text>
                        </HStack>

                        <Text color="gray.100" fontSize="xl" textAlign="center">
                            Você ainda não realizou nenhuma vistoria.
                        </Text>
                    </Center>
                    
                    <Button
                        title="Nova Vistoria"
                        onPress={handleNewInspection}
                        size="lg"
                        bg="white" 
                        _text={{ color: 'green.600' }}
                        alignSelf="flex-end"
                        mb={5} 
                    />
                </VStack>
            </Box>
        </ScrollView>
    );
}
