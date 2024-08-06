import React from 'react';
import { Modal, VStack, Text, Center, Button as NativeBaseButton } from 'native-base';
import * as Animatable from 'react-native-animatable';

const ErrorModal = ({ isVisible, message, onClose }) => {
  return (
    <Modal isOpen={isVisible} onClose={onClose} safeAreaTop={true} avoidKeyboard>
      <Animatable.View 
        animation="slideInUp" 
        duration={800} 
        style={{ 
          paddingHorizontal: 10, 
          borderRadius: 8, 
          position: 'absolute',
          bottom: 0,
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
            minHeight={150}
          >
            <Text fontSize="lg" color="green.500" mb={4}>
              Ops, algo deu errado!
            </Text>
            <Text fontSize="md" color="black" textAlign="center">
              {message}
            </Text>
            <NativeBaseButton onPress={onClose} variant="unstyled">
              <Text color="green.500">Fechar</Text>
            </NativeBaseButton>
          </VStack>
        </Center>
      </Animatable.View>
    </Modal>
  );
};

export default ErrorModal;
