import React, { useState } from 'react';
import { Box, Center, ScrollView, Text } from 'native-base';
import { Input } from '@components/Input/Input';
import { Button } from '@components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorAuthProps } from '@routes/auth.routes';
import { useLoadingState } from '@hooks/useLoadingState';
import ClientApiService from '@services/clientApiService';
import { formatCpf } from '@utils/CpfUtils';
import ErrorModal from '@components/ErrorModalComponent/ErrorModal';

const apiService = new ClientApiService();

export function LoginScreen() {
  const navigation = useNavigation<AuthNavigatorAuthProps>();
  
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const { loading, errorMessage, handleAsyncOperation } = useLoadingState();
  const [modalVisible, setModalVisible] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    setIsSubmitting(true);
    await handleAsyncOperation(async () => {
      if (!cpf.trim() || !password.trim()) {
        setModalMessage('Por favor, preencha todos os campos.');
        setModalVisible(true);
        return;
      }

      const cleanedCpf = cpf.replace(/\D/g, '');
      const client = await apiService.login(cleanedCpf, password);
      if (!client) {
        setModalMessage('CPF ou senha incorretos');
        setModalVisible(true);
        return;
      }

      navigation.navigate('home');
    }, 'Erro ao fazer login');
    setIsSubmitting(false);
  };

  React.useEffect(() => {
    if (errorMessage && isSubmitting) { 
      setModalMessage(errorMessage);
      setModalVisible(true);
    }
  }, [errorMessage, isSubmitting]);

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
            Acesse sua conta
          </Text>

          <Input
            placeholder="Digite seu CPF"
            value={formatCpf(cpf)}
            keyboardType="numeric"
            maxLength={14}
            onChangeText={(text) => setCpf(text)}
            mb={4}
          />
          <Input
            placeholder="Digite sua senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
            type="password"
            mb={6}
          />
        </Box>
        <Center mt={5}>
          <Button
            title="Entrar"
            size="lg"
            onPress={handleLogin}
            isLoading={loading}
            isDisabled={!cpf.trim() || !password.trim() || cpf.trim().length !== 14 }
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
