import React, { useState } from 'react';
import { Box, Center, Heading, ScrollView, Text, Alert } from 'native-base';
import { Input } from '@components/Input/Input';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthNavigatorAuthProps } from '@routes/auth.routes';
import { Button } from '@components/Button/Button';
import { Client } from '@dtos/Client'; 
import { useLoadingState } from '@hooks/useLoadingState';
import ClientApiService from '@services/clientApiService';
import ErrorModal from '@components/ErrorModalComponent/ErrorModal';

const apiService = new ClientApiService();

export function PasswordSetupScreen() {
  const route = useRoute();
  const { client } = route.params as { client: Client }; 

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 

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
        const response = await apiService.updateClient(client.id, clientRequest);
        if (response) {
          navigation.navigate('login');
        }
      }, 'Erro ao criar a conta');
    } catch (error) {
      setModalMessage(error);
      setModalVisible(true);
    }
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
        
        <Box mt={40} alignItems="flex-start"> {}
          <Text color="gray.100" fontSize="4xl" mb={8}>
            Definição de senha
          </Text>
          <Text color="gray.100" fontSize="md" mb={6}>
            Crie uma senha para acessar seu aplicativo Mover Frota
          </Text>
          
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

          <Button
            title='Criar Conta'
            onPress={handleCreateAccount}
            _pressed={{ bg: 'grey.700' }}
            isLoading={loading}
            isDisabled={password.trim() === '' || confirmPassword.trim() === '' || password !== confirmPassword }
          />

          {errorMessage && (
            <Alert w="100%" status="error" mb={6}>
              <Text fontSize="md" color="error.600" textAlign="center">
                {errorMessage}
              </Text>
            </Alert>
          )}
        </Box>

        <ErrorModal 
          isVisible={modalVisible} 
          message={modalMessage} 
          onClose={() => setModalVisible(false)} 
        />
      </Box>
    </ScrollView>
  );
}
