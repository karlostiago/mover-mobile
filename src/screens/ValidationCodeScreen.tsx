import React, { useState } from 'react';
import { VStack, Image, Center, Text, Heading, ScrollView, Box, Input } from 'native-base';
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorAuthProps } from "@routes/auth.routes";
import { Button } from "@components/Button/Button";
import { useLoadingState } from '@hooks/useLoadingState';
import { ClientProps } from './Signin';
import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo-mover.svg';
import ClientService from '@services/clientApiService';

interface SignupProps {
    route: {
      params?: ClientProps;
    };
  }

export function ValidationCodeScreen({ route }: SignupProps) {

  const [validationCode, setValidationCode] = useState('');
  const navigation = useNavigation<AuthNavigatorAuthProps>();

  const { loading, errorMessage, handleAsyncOperation } = useLoadingState();

  const clientService = new ClientService();
  const client = route.params?.client;

  console.log('route.params:', route.params);

  async function handleAdvance() {
    try {
      await handleAsyncOperation(async () => {
        if (!client) {
          throw new Error('Client object is undefined.');
        }
        const response = await clientService.validateSecurityCode(client.id, client.email, validationCode);
        if (response.success) {
          console.log('sucesso:', JSON.stringify(response));
        } else {
          navigation.navigate('validationCodeScreenError');
        }
      }, 'Erro ao validar código');
    } catch (error) {
      console.error(error);
      navigation.navigate('validationCodeScreenError');
    }
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
              onChangeText={(text) => setValidationCode(text)}
              bg="white"
              color="black"
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
            />
          </Center>
          {errorMessage && (
            <Center mt={4}>
              <Text color="red.500" fontSize="sm" textAlign="center">
                {errorMessage}
              </Text>
            </Center>
          )}
          <Center mt={4}>
            <Text color="gray.100" fontSize="sm" textAlign="center">
              Obs: O código pode demorar alguns segundos para chegar.
            </Text>
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
