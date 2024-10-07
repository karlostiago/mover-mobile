import React from 'react';
import { VStack, Center, Text, ScrollView, Box, Image } from 'native-base';
import { Button } from '@components/Button/Button'; 
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorProps } from '@routes/app.routes';

export function PhotoAutoInspectionFinished() {
    const navigation = useNavigation<AppNavigatorProps>();

    const handleGoBack = () => {
        navigation.navigate('home');
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
           <Box flex={1} bg="green.600" px={10} pt={50}>
                
                <Box alignItems="flex-start">  
                    <Text fontSize="4xl" color="white" fontWeight="bold">
                        Auto-inspeção finalizada!
                    </Text>
                </Box>

                <Center mt={20}>
                    <Image
                        source={require('../assets/car-removebg-preview.png')} 
                        alt="Finished Inspection Image"
                        size="2xl" 
                        resizeMode="contain"
                        marginBottom={10}
                    />
                </Center>

                <VStack flex={1} justifyContent="center" alignItems="center" px={5} pt={2} mb={12}>
                    <Button
                        title="Voltar"
                        onPress={handleGoBack}
                        size="lg"
                        bg="white" 
                        _text={{ color: 'green.600' }}
                        alignSelf="center"
                        mb={4} 
                    />

                    <Text fontSize="md" color="white" textAlign="center" mt={-2}> 
                        Logo você receberá um e-mail com o laudo dessa vistoria.
                    </Text>
                </VStack>
            </Box>
        </ScrollView>
    );
}
