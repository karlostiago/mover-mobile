import React, { useState } from 'react';
import { VStack, Image, Center, Heading, ScrollView, Text, Alert } from 'native-base';
import { Input } from '@components/Input/Input';
import { Button } from '@components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo-mover.svg';
import ClientApiService from '@services/clientApiService';
import ErrorModal from '@components/ErrorModalComponent/ErrorModal';
import { useLoadingState } from '@hooks/useLoadingState';
import { AuthNavigatorAuthProps } from '@routes/auth.routes';
import { formatCpf } from '@utils/CpfUtils';

const apiService = new ClientApiService();

export function LoginScreen() {
  const navigation = useNavigation<AuthNavigatorAuthProps>();
  
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { loading } = useLoadingState();

  const handleLogin = async () => {
    if (!cpf.trim() || !password.trim()) {
      setErrorMessage('Por favor, preencha todos os campos.');
      setShowErrorModal(true);
      return;
    }

    try {
      const cleanedCpf = cpf.replace(/\D/g, '');
      const client = await apiService.login(cleanedCpf, password);
      if (!client) {
        throw new Error('CPF ou senha incorretos');
      }
      navigation.navigate('home');
    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorModal(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg="gray.700">
        <Image
          source={BackgroundImg}
          alt="Imagem de fundo"
          resizeMode="cover"
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        />
        <VStack flex={1} px={10} justifyContent="center">
          <Center my={20}>
            <LogoSvg />
          </Center>
          <Center>
            <Heading color="gray.100" fontSize="4xl" mb={8} fontWeight="bold">
              Acesse sua conta
            </Heading>
            <Text color="gray.100" fontSize="lg" textAlign="center" mb={6}>
              Informe seu CPF e senha para acessar sua conta
            </Text>
            <Input
              placeholder="Digite seu CPF"
              value={formatCpf(cpf)}
              onChangeText={(text) => setCpf(text)}
              keyboardType="numeric"
            />
            <Input
              placeholder="Digite sua senha"
              value={password}
              onChangeText={(text) => setPassword(text)}
              type="password"
            />
          </Center>
          <Center mt={8}>
            <Button
              title='Entrar'
              onPress={handleLogin}
              isLoading={loading}
              isDisabled={!cpf.trim() || !password.trim()}
            >
              Entrar
            </Button>
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
