import React from 'react';
import { FlatList, HStack, Icon, Modal, Pressable, Text, VStack, Center } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

interface Car {
    id: string;
    plate: string;
}

interface CarSelectModalProps {
    isOpen: boolean;
    onClose: () => void;
    cars: Car[];
    onCarSelect: (car: Car) => void;
}

export function CarSelectModal({ isOpen, onClose, cars, onCarSelect }: CarSelectModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} safeAreaTop={true} avoidKeyboard>
            <Animatable.View 
                animation="slideInDown" 
                duration={800} 
                style={{ 
                    paddingHorizontal: 10, 
                    borderRadius: 8, 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                }}
            >
                <Center>
                    <VStack 
                        space={2} 
                        bg="white"
                        p={4} 
                        alignItems="center" 
                        width="100%" 
                    >
                        <Text fontSize="lg" color="g    reen.500" mb={4}>
                            Selecione o Carro
                        </Text>
                        <FlatList
                            data={cars}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <Pressable onPress={() => onCarSelect(item)}>
                                    {({ isPressed }) => (
                                        <HStack 
                                            alignItems="center" 
                                            justifyContent="space-between" 
                                            py={1} 
                                            bg={isPressed ? "gray.100" : "white"}
                                            borderRadius={18}
                                            mb={1}
                                            px={1}
                                        >
                                            <Text>{item.plate}</Text> 
                                        </HStack>
                                    )}
                                </Pressable>
                            )}
                        />
                    </VStack>
                </Center>
            </Animatable.View>
        </Modal>
    );
}
