import React, { useState } from 'react';
import { VStack, Image, Center, Heading, ScrollView, Text, Alert } from 'native-base';
import { Input } from '@components/Input/Input';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorAuthProps } from '@routes/auth.routes';
import { Button } from '@components/Button/Button';
import { useLoadingState } from '@hooks/useLoadingState';
import { Client } from '@dtos/Client';
import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo-mover.svg';
import ClientApiService from '@services/clientApiService';
import { formatCpf } from '@utils/CpfUtils';

const apiService = new ClientApiService();

export function Signin() {
  const navigation = useNavigation<AuthNavigatorAuthProps>();
  
  const [cpf, setCpf] = useState('');
  const { loading, errorMessage, handleAsyncOperation } = useLoadingState();

  async function handleNext() {
    await handleAsyncOperation(async () => {
      const cleanedCpf = cpf.replace(/\D/g, '');
      const client = await apiService.checkExistingCpf(cleanedCpf);
      if (!client) {
        navigation.navigate('backScreen');
        return;
      }

      navigation.navigate('signUp', { client } as { client: Client });
    }, 'Erro ao verificar o CPF');
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg="gray.700">
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Imagem de fundo"
          resizeMode="cover"
          position="absolute"
          width="100%"
          height="100%"
        />
        <VStack flex={1} px={10} justifyContent="center">
          <Center my={20}>
            <LogoSvg />
          </Center>
          <Center>
            <Heading color="gray.100" fontSize="4xl" mb={8} fontWeight="bold">
              Olá, digite o seu CPF
            </Heading>
            <Text color="gray.100" fontSize="lg" textAlign="center" mb={6}>
              Tem que ser o mesmo que você utilizou no cadastro
            </Text>
            {errorMessage && (
              <Alert w="100%" status="error" mb={6}>
                <VStack space={2} flexShrink={1} w="100%">
                  <Text fontSize="md" color="error.600" textAlign="center">
                    {errorMessage}
                  </Text>
                </VStack>
              </Alert>
            )}
            <Input
              placeholder="Digite seu CPF"
              value={formatCpf(cpf)}
              keyboardType="numeric"
              maxLength={14}
              onChangeText={(text) => setCpf(text)}
            />
          </Center>
          <Center mt={8}>
            <Button
              title="Próximo"
              size="lg"
              onPress={handleNext}
              isLoading={loading}
              isDisabled={cpf.trim() === ''}
            />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
