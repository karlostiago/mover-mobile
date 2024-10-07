import React, { useState } from 'react';
import { VStack, Center, Text, ScrollView, Box, Image, Pressable, HStack } from 'native-base';
import { Button } from '@components/Button/Button'; 
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorProps } from '@routes/app.routes';
import * as ImagePicker from 'expo-image-picker';


const shapes = [
    { id: '1', title: 'Frente', image: require('../assets/frente.jpg') },
    { id: '2', title: 'Traseira', image: require('../assets/traseira.jpg') },
    { id: '3', title: 'Lateral Dianteira Direita', image: require('../assets/direita.jpg') },
    { id: '4', title: 'Lateral Dianteira Esquerda', image: require('../assets/esquerda.jpg') },
    { id: '5', title: 'Banco Traseiro', image: require('../assets/bancodianteiro.png') },
    { id: '6', title: 'Banco Dianteiro', image: require('../assets/bancotraseiro.jpg') },
    { id: '7', title: 'Painel', image: require('../assets/painel.jpg') },
];

export function PhotoAutoInspection() {
    const navigation = useNavigation<AppNavigatorProps>();
    const [photos, setPhotos] = useState({});

    const handleStartInspection = () => {
        navigation.navigate('photoAutoInspectionFinished'); 
    };


    const handleCapturePhoto = async (shapeId) => {
        try {
            const response = await ImagePicker.launchCameraAsync({ 
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                base64: true,
            });
    
            if (response.canceled) {
                console.log('Usuário cancelou a captura');
                return; 
            }
    
            if (response.assets && response.assets.length > 0) {
                const uri = response.assets[0].uri; 
                setPhotos((prev) => ({ ...prev, [shapeId]: { uri } }));
            } else {
                console.error('Nenhuma imagem foi capturada');
            }
        } catch (error) {
            console.error('Erro ao abrir a câmera', error); 
        }
    };

    const allPhotosCaptured = shapes.every(shape => photos[shape.id]);

    return (
        <Box flex={1} bg="green.600">
            <Center mt={5}>
                <Text fontSize="xl" color="white" fontWeight="bold" mt={4}>
                    Fotos Obrigatórias
                </Text>
            </Center>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <VStack space={4} mt={4} alignItems="center">
                    {shapes.reduce((rows, shape, index) => {
                        if (index % 2 === 0) {
                            rows.push([]);
                        }
                        rows[rows.length - 1].push(shape);
                        return rows;
                    }, []).map((row, rowIndex) => (
                        <HStack key={rowIndex} space={4} justifyContent="center" alignItems="flex-start">
                            {row.map((shape) => (
                                <Pressable key={shape.id} onPress={() => handleCapturePhoto(shape.id)}>
                                    <Box
                                        bg="white"
                                        p={4}
                                        borderRadius="md"
                                        shadow={2}
                                        width="100%"
                                        maxWidth="150px"
                                        alignItems="center"
                                    >
                                        <Image
                                            source={photos[shape.id] ? photos[shape.id] : shape.image}
                                            alt={shape.title}
                                            size="lg"
                                            resizeMode="cover"
                                            marginBottom={2}
                                        />
                                        <Text color="green.600" fontSize="lg">
                                            {shape.title}
                                        </Text>
                                    </Box>
                                </Pressable>
                            ))}
                        </HStack>
                    ))}
                </VStack>
            </ScrollView>

            <VStack justifyContent="center" alignItems="center" px={1} pb={1}>
                <Button
                    title="Finalizar"
                    onPress={handleStartInspection}
                    size="md" 
                    bg="white" 
                    _text={{ color: 'green.600' }}
                    alignSelf="flex"
                    width="80%" 
                    height="55px" 
                    px={2} 
                    py={1} 
                    _pressed={{ bg: 'gray.200' }}
                    isDisabled={!allPhotosCaptured} 
                />
            </VStack>
        </Box>
    );
}
