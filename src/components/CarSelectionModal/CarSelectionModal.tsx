import { Modal, FlatList, Pressable, Box, Text } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';


interface Car {
    id: string;
    plate: string;
}

interface CarSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    cars: Car[];
    onCarSelect: (car: Car) => void;
}

export function CarSelectionModal({ isOpen, onClose, cars, onCarSelect }: CarSelectionModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} animationPreset="slide" size="full">
            <Modal.Content width="100%" maxHeight="50%" borderTopRadius={20}>
                <Modal.CloseButton />
                <Modal.Header>Selecione o Carro</Modal.Header>
                <Modal.Body>
                    <FlatList 
                        data={cars} 
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }: { item: Car }) => (
                            <Pressable onPress={() => onCarSelect(item)}>
                                {({ isPressed }) => (
                                    <Box
                                        bg={isPressed ? "gray.200" : "gray.50"}
                                        borderRadius={10}
                                        p={3}
                                        mb={2}
                                        shadow={1}
                                    >
                                        <Text color="green.600">Placa: {item.plate}</Text>
                                    </Box>
                                )}
                            </Pressable>
                        )}
                    />
                </Modal.Body>
            </Modal.Content>
        </Modal>
    );
}
