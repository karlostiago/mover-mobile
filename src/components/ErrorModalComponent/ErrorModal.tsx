import React from 'react';
import { Modal, VStack, Text, Center, Button as NativeBaseButton } from 'native-base';
import * as Animatable from 'react-native-animatable';

const ErrorModal = ({ isVisible, message, onClose }) => {
  return (
    <Modal isOpen={isVisible} onClose={onClose} safeAreaTop={true} avoidKeyboard>
      <Animatable.View animation="slideInDown" duration={800} style={{ marginTop: 20, paddingHorizontal: 10 }}>
        <Center flex={1}>
          <VStack space={2} bg="gray.800" p={4} borderRadius={10} alignItems="center" minWidth={300}>
            <Text fontSize="lg" color="error.600" mb={4}>
              Ops!
            </Text>
            <Text fontSize="md" color="gray.100" textAlign="center" mb={4}>
              {message}
            </Text>
            <NativeBaseButton onPress={onClose} variant="unstyled">
              <Text color="red.500">Fechar</Text>
            </NativeBaseButton>
          </VStack>
        </Center>
      </Animatable.View>
    </Modal>
  );
};

export default ErrorModal;
