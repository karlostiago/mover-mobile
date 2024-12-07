import React from 'react';
import { Modal, VStack, Text, Center, Box, Button as NativeBaseButton } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { Linking } from 'react-native';

const ModalInfo = ({ isVisible, message, onClose }) => {


  const handleCall = (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch((err) => console.error('Erro ao tentar ligar:', err));
  };

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
            space={1} 
            bg="white"
            p={4} 
            alignItems="center" 
            width="100%" 
            minHeight={250}
          >
            
            <Text fontSize="lg" fontWeight="bold" color="green.500" mb={4}>
              {message.title || 'Ops, algo deu errado!'}
            </Text>

            <VStack space={2} alignItems="center" width="49%">
              
              <Box
                borderColor="green.500"
                borderWidth={1}
                borderRadius="md"
                px={4}
                py={2}
                w="80%"
                alignItems="center"
              >
                <Text
                  fontSize="md"
                  color="black"
                  onPress={() => handleCall(message.body?.phone1 || '0800 607 2007')}
                  style={{ textDecorationLine: 'none' }}
                >
                  {message.body?.phone1 || '0800 607 2007'}
                </Text>
              </Box>

              <Text fontSize="md" color="black">ou</Text>

              <Text fontSize="md" fontWeight="bold" color="green.500">Assistência 24h</Text>
              <Box
                borderColor="green.500"
                borderWidth={1}
                borderRadius="md"
                px={4}
                py={2}
                w="80%"
                alignItems="center"
              >
                <Text
                  fontSize="md"
                  color="black"
                  onPress={() => handleCall(message.body?.phone2 || '0800 948 488')}
                  style={{ textDecorationLine: 'none' }}
                >
                  {message.body?.phone2 || '0800 948 488'}
                </Text>
              </Box>
            </VStack>

            <NativeBaseButton onPress={onClose} variant="unstyled">
              <Text color="green.500">Fechar</Text>
            </NativeBaseButton>
          </VStack>
        </Center>
      </Animatable.View>
    </Modal>
  );
};

export default ModalInfo;
