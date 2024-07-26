import React, { useState } from 'react';
import { VStack, Image, Center, Text, Heading, ScrollView, Box } from 'native-base';
import { Input } from '@components/Input/Input';
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorAuthProps } from "@routes/auth.routes";
import { Button } from "@components/Button/Button";
import { useLoadingState } from '@hooks/useLoadingState';
import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo-mover.svg';
import ClientService from '@services/clientApiService';
import { Client } from '@dtos/Client';
import ErrorModal from '@components/ErrorModalComponent/ErrorModal';

interface ValidationCodeScreenProps {
  route: {
    params: {
      client: Client;
    };
  };
}

export function ValidationCodeScreen({ route }: ValidationCodeScreenProps) {
  
  const [validationCode, setValidationCode] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false); 

  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation<AuthNavigatorAuthProps>();

  const { loading, handleAsyncOperation } = useLoadingState();
  const { client } = route.params;

  const clientService = new ClientService();

  async function handleAdvance() {
    await handleAsyncOperation(async () => {
      if (!client) {
        throw new Error('Client object is undefined.');
      }

      try {
        await clientService.validateSecurityCode(client.id, client.email, validationCode);
        navigation.navigate('passwordSetupScreen', { client });

      } catch (error) {
        setErrorMessage('Código de validação inválido.'); 
        setShowErrorModal(true);
      }
    }, 'Erro ao validar código');
  }

  if (!client) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg="gray.700">
        <Box position="absolute" width="100%" height="100%">
          <Image
            source={BackgroundImg}
            defaultSource={BackgroundImg}
            alt="Imagem de fundo"
            resizeMode="cover"
            width="100%"
            height="100%"
          />
        </Box>
        <VStack flex={1} px={10} justifyContent="center">
          <Center my={20}>
            <LogoSvg />
          </Center>
          <Center>
            <Heading color="gray.100" fontSize="xl" mb={6} fontWeight="bold">
              Digite o código de validação enviado
            </Heading>
          </Center>
          <Center>
            <Input
              placeholder="Digite o código"
              value={validationCode}
              keyboardType="numeric"
              onChangeText={(text) => setValidationCode(text)}
              width="100%"
              maxWidth="400px"
              marginBottom={4}
            />
          </Center>
          <Center mt={4}>
            <Button
              title='Avançar'
              onPress={handleAdvance}
              bg="green.500"
              _pressed={{ bg: 'green.700' }}
              isLoading={loading}
              isDisabled={validationCode.trim() === ''}
            />
          </Center>
          <Center mt={4}>
            <Text color="gray.100" fontSize="sm" textAlign="center">
              Obs: O código pode demorar alguns segundos para chegar.
            </Text>
          </Center>
        </VStack>
      </VStack>

      <ErrorModal
        isVisible={showErrorModal}
        message={errorMessage}
        onClose={() => setShowErrorModal(false)}
      />
    </ScrollView>
  );
}