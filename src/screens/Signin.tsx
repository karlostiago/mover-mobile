import React, { useState, useEffect } from 'react';
import { Box, Center, ScrollView, Text } from 'native-base';
import { Input } from '@components/Input/Input';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorAuthProps } from '@routes/auth.routes';
import { Button } from '@components/Button/Button';
import { useLoadingState } from '@hooks/useLoadingState';
import { Client } from '@dtos/Client';
import ClientApiService from '@services/clientApiService';
import { formatCpf } from '@utils/CpfUtils';
import ErrorModal from '@components/ErrorModalComponent/ErrorModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '@components/Session/LoadingScreen';

const apiService = new ClientApiService();

export function Signin() {
  const navigation = useNavigation<AuthNavigatorAuthProps>();
  const [cpf, setCpf] = useState('');
  const { loading, errorMessage, handleAsyncOperation } = useLoadingState();
  const [modalVisible, setModalVisible] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = await AsyncStorage.getItem('@auth_token');
        const expiry = await AsyncStorage.getItem('@session_expiry');

        if (token && expiry) {
          const now = new Date(); 
          const expiryDate = new Date(expiry);
          const expiryTimeLimit = 10 * 60 * 1000;
          const timeDifference = now.getTime() - expiryDate.getTime();

          if (timeDifference < expiryTimeLimit) {
            navigation.navigate('home');
          } else {
            await AsyncStorage.removeItem('@auth_token');
            navigation.navigate('login');
          }
        } else if (!token && !expiry) {
          navigation.navigate('signIn');
        } else {
          navigation.navigate('login');
        }
      } catch (error) {
        console.error("Erro ao verificar a sessão:", error);
        navigation.navigate('login');
      } finally {
        setInitializing(false);
      }
    };

    checkSession();
  }, [navigation]);

  async function handleNext() {
    setIsSubmitting(true);
    await handleAsyncOperation(async () => {
      const cleanedCpf = cpf.replace(/\D/g, '');
      try {
        const client = await apiService.checkExistingCpf(cleanedCpf);
        if (!client) {
          setModalMessage('Dados do cliente não encontrados.');
          setModalVisible(true);
          return;
        }
        navigation.navigate('signUp', { client } as { client: Client });
      } catch (error) {
        setModalMessage('Erro ao verificar o CPF. Tente novamente.');
        setModalVisible(true);
      }
    }, 'Erro ao verificar o CPF');
    setIsSubmitting(false);
  }

  useEffect(() => {
    if (errorMessage && isSubmitting) {
      setModalMessage(errorMessage);
      setModalVisible(true);
    }
  }, [errorMessage, isSubmitting]);

  if (initializing) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <Box flex={1} bg="green.600" px={10} pt={100}>
        <Center>
          <Text
            fontSize="7xl" 
            fontFamily="mono"
            width={250}
            height={87}
            position="absolute"
            top={0}
            left={0}
            color="white"
          >
            m
          </Text>
        </Center>

        <Box mt={40} alignItems="flex-start">
          <Text color="gray.100" fontSize="4xl" mb={8}>
            Olá, digite o seu CPF
          </Text>
          <Text fontFamily="body" color="gray.100" fontSize="lg" mb={6}>
            Tem que ser o mesmo que você utilizou na contratação.
          </Text>
          <Input
            placeholder="Digite seu CPF"
            value={formatCpf(cpf)}
            keyboardType="numeric"
            maxLength={14}
            onChangeText={(text) => setCpf(text)}
          />
        </Box>
        <Center mt={5}>
          <Button
            title="AVANÇAR"
            size="lg"
            onPress={handleNext}
            isLoading={loading}
            isDisabled={cpf.trim() === '' || cpf.trim().length !== 14}
          />
        </Center>
      </Box>

      <ErrorModal 
        isVisible={modalVisible} 
        message={modalMessage} 
        onClose={() => setModalVisible(false)} 
      />
    </ScrollView>
  );
}
