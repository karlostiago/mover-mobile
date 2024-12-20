import React, { useState, useEffect } from 'react';
import { VStack, Center, Text, ScrollView, Box, Image, Pressable, HStack } from 'native-base';
import { Button } from '@components/Button/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import ClientService from '@services/clientApiService';
import { AuthNavigatorAuthProps } from '@routes/auth.routes';

interface Contract {
    id: number;
    vehicleId: number;
    clientId: number;
    vehicleName: string;
    clientName: string;
    number: string;
    initialDate: string;
    endDate: string;
    billingStartDate: string | null;
    depositAmount: number;
    recurrenceValue: number;
    paymentFrequency: string;
    situation: string;
    paymentDay: string;
    reason: string | null;
    active: boolean;
}

interface InspectionData {
    id: number;
    mileage: number;
    date: string;
    inspectionStatus: string;
    contract: Contract;
}

interface Shape {
    id: string;
    title: string;
    description: string;
    image: any;
}

interface Photos {
    [key: string]: { uri: string };
}

export function PhotoAutoInspection() {

    const navigationProp = useNavigation<AuthNavigatorAuthProps>(); 
    const route = useRoute();

    const contrat = route.params as InspectionData;
    const clientId = contrat.contract.id;

    const [shapes, setShapes] = useState<Shape[]>([]);
    const [photos, setPhotos] = useState<Photos>({});

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchInspectionQuestions = async () => {
            try {
                const clientService = new ClientService();
                const questions = await clientService.getInspectionQuestionsByContractId(clientId);
                
                if (questions) {
                    const formattedShapes = questions.map((question: any) => ({
                        id: question.id.toString(),
                        title: question.question.description,
                        description: question.question.description,
                        image: require('../assets/photos.png'),
                    }));
                    setShapes(formattedShapes);
                } else {
                    setErrorMessage('Não foi possível carregar as perguntas de inspeção.');
                }
            } catch (error) {
                setErrorMessage('Erro ao carregar perguntas. Tente novamente.');
            }
        };

        fetchInspectionQuestions();
    }, [clientId]);

    const handleCapturePhoto = async (shapeId: string) => {
        try {
            setLoading(true);
            setErrorMessage(null);

            const response = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                base64: true,
            });

            if (response.canceled) {
                setLoading(false);
                return;
            }

            if (response.assets && response.assets.length > 0) {
                const uri = response.assets[0].uri;
                setPhotos((prev) => ({ ...prev, [shapeId]: { uri } }));
            } else {
                setErrorMessage('Erro ao capturar a imagem. Tente novamente.');
            }
        } catch (error) {
            setErrorMessage('Ocorreu um erro ao acessar a câmera. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const allPhotosCaptured = shapes.every(shape => photos[shape.id]);

    const handleStartInspection = async () => {
        if (allPhotosCaptured) {
            const clientService = new ClientService();
            setLoading(true);
    
            const photosToUpload = shapes.map((shape) => {
                const photo = photos[shape.id];
                if (photo) {
                    return {
                        uri: photo.uri,
                        name: `${shape.title}.jpg`,
                        type: 'image/jpeg',
                    };
                }
                return null; 
            }).filter(photo => photo !== null);
    
            try {
                const uploadResponse = await clientService.startInspection(clientId, photosToUpload);
    
                if (uploadResponse) {
                    navigationProp.navigate('photoAutoInspectionFinished', { contractId: clientId });
                }
            } catch (error) {
                console.error('Erro ao enviar fotos', error);
                setErrorMessage('Erro ao enviar fotos. Tente novamente.');
            } finally {
                setLoading(false);
            }
        } else {
            setErrorMessage('Por favor, capture todas as fotos antes de finalizar.');
        }
    };

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
                                <Pressable key={shape.id} onPress={() => handleCapturePhoto(shape.id)} disabled={loading}>
                                    <Box
                                        bg="white"
                                        p={4}
                                        borderRadius="md"
                                        shadow={2}
                                        width="100%"
                                        maxWidth="160px"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Image
                                            source={photos[shape.id] ? { uri: photos[shape.id].uri } : shape.image}
                                            alt={shape.title}
                                            size="lg"
                                            resizeMode="cover"
                                            marginBottom={2}
                                        />
                                        <Text color="green.600" fontSize="sm" textAlign="center" numberOfLines={2}>
                                            {shape.description}
                                        </Text>
                                    </Box>
                                </Pressable>
                            ))}
                        </HStack>
                    ))}
                </VStack>
            </ScrollView>

            {errorMessage && (
                <Box bg="red.500" p={4} borderRadius="md" mb={4} width="80%" alignSelf="center">
                    <Text color="white">{errorMessage}</Text>
                </Box>
            )}

            <VStack justifyContent="center" alignItems="center" px={1} pb={1}>
                <Button
                    title={loading ? 'Carregando...' : 'Finalizar'}
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
                    isDisabled={!allPhotosCaptured || loading}
                />
            </VStack>
        </Box>
    );
}
