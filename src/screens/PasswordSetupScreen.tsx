import React, { useState } from 'react';
import { VStack, Image, Center, Heading, ScrollView, Box, Text, Alert } from 'native-base';
import { Input } from '@components/Input/Input';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthNavigatorAuthProps } from '@routes/auth.routes';
import { Button } from '@components/Button/Button';
import { Client } from '@dtos/Client'; 
import { useLoadingState } from '@hooks/useLoadingState';
import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo-mover.svg';
import ClientApiService from '@services/clientApiService';

const apiService = new ClientApiService();

export function PasswordSetupScreen() {
  const route = useRoute();
  const { client } = route.params as { client: Client }; 

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation<AuthNavigatorAuthProps>();
  const { loading, errorMessage, handleAsyncOperation } = useLoadingState();

  async function handleCreateAccount() {
    if (password !== confirmPassword) {
      navigation.navigate('screenPasswordError');
      return;
    }

    const clientRequest: Client & { password: string; confirmPassword: string } = {
      ...client,
      rg: client.rg || 'N/A',
      birthDate: client.birthDate || '1990-01-01',
      state: client.state || 'N/A',
      cep: client.cep || 'N/A',
      user: {
        ...client.user,
        password,
      },
      password,
      confirmPassword,
    };

    try {
      await handleAsyncOperation(async () => {
        const response = await apiService.registerClientAndUser(clientRequest);
        if (response) {
          navigation.navigate('login');
        }
      }, 'Erro ao criar a conta');
    } catch (error) {
      console.error('Aconteceu algo', error);
    }
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
              Definição de senha
            </Heading>
            <Text color="gray.100" fontSize="md" textAlign="center" mb={6}>
              Crie uma senha para acessar seu aplicativo Mover Frota
            </Text>
          </Center>
          <Center>
            <Input
              placeholder="Digite a senha"
              value={password}
              onChangeText={(text) => setPassword(text)}
              width="100%"
              maxWidth="400px"
              marginBottom={4}
              type="password"
            />
            <Input
              placeholder="Confirme a senha"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              width="100%"
              maxWidth="400px"
              marginBottom={4}
              type="password"
            />
          </Center>
          <Center mt={4}>
            <Button
              title='Criar Conta'
              onPress={handleCreateAccount}
              bg="green.500"
              _pressed={{ bg: 'green.700' }}
              isLoading={loading}
              isDisabled={password.trim() === '' || confirmPassword.trim() === '' || password !== confirmPassword}
            />
          </Center>
          {errorMessage && (
            <Alert w="100%" status="error" mb={6}>
              <VStack space={2} flexShrink={1} w="100%">
                <Text fontSize="md" color="error.600" textAlign="center">
                  {errorMessage}
                </Text>
              </VStack>
            </Alert>
          )}
        </VStack>
      </VStack>
    </ScrollView>
  );
}
