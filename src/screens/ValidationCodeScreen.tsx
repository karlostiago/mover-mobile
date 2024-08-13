import React, { useState, useEffect } from 'react';
import { VStack, Text, ScrollView, Box, Center } from 'native-base';
import { Input } from '@components/Input/Input';
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorAuthProps } from "@routes/auth.routes";
import { Button } from "@components/Button/Button";
import { useLoadingState } from '@hooks/useLoadingState';
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
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(true);
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
        setErrorMessage('Código de autenticação incorreto.');
        setShowErrorModal(true);
      }
    }, 'Erro ao validar código');
  }


  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  useEffect(() => {
    if (client) {
      setCountdown(0);
      setCanResend(true);
    }
  }, [client]);

  async function sendSecurityCodeByEmail() {
    if (!client || !client.id || !client.email) {
      setErrorMessage('Parâmetros de cliente inválidos ou não definidos');
      setShowErrorModal(true);
      return;
    }

    const modifiedEmail = client.email.replace(/\.com$/, '');


    setCountdown(30);
    setCanResend(false);

    try {

      await clientService.sendSecurityCode(client.id, modifiedEmail);
    } catch (error) {
      setErrorMessage('Erro ao reenviar o código.');
      setShowErrorModal(true);
    }
  }

  if (!client) {
    return null;
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
            Digite o código de validação enviado
          </Text>
          <Input
            placeholder="Digite o código"
            value={validationCode}
            keyboardType="numeric"
            onChangeText={(text) => setValidationCode(text)}
            width="100%"
            maxWidth="400px"
            marginBottom={4}
          />
        </Box>

        <Center mt={4}>
          <Button
            title='Avançar'
            onPress={handleAdvance}
            _pressed={{ bg: 'grey.700' }}
            isLoading={loading}
            isDisabled={validationCode.trim() === ''}
          />
        </Center>

        <Center mt={4}>
          {countdown > 0 ? (
            <Text color="gray.100" fontSize="sm" textAlign="center">
              {`${countdown}s para solicitar novo reenvio de código.`}
            </Text>
          ) : (
            <Text color="gray.100" fontSize="sm" textAlign="center"></Text>
          )}
          <Text
            color="gray.100"
            fontSize="sm"
            textAlign="center"
            onPress={canResend ? sendSecurityCodeByEmail : undefined}
            underline
            style={{ cursor: 'pointer', display: canResend ? 'inline' : 'none' }}
          >
            Reenviar código de segurança
          </Text>
        </Center>
      </Box>

      <ErrorModal
        isVisible={showErrorModal}
        message={errorMessage}
        onClose={() => setShowErrorModal(false)}
      />
    </ScrollView>
  );
}
