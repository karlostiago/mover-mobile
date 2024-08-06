import React, { useState } from 'react';
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

const apiService = new ClientApiService();

export function Signin() {
  const navigation = useNavigation<AuthNavigatorAuthProps>();
  
  const [cpf, setCpf] = useState('');
  const { loading, errorMessage, handleAsyncOperation } = useLoadingState();
  const [modalVisible, setModalVisible] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleNext() {
    setIsSubmitting(true);
    await handleAsyncOperation(async () => {
      const cleanedCpf = cpf.replace(/\D/g, '');
      const client = await apiService.checkExistingCpf(cleanedCpf);
      if (!client) {
        setModalMessage('CPF inválido ou não encontrado.');
        setModalVisible(true);
        return;
      }

      navigation.navigate('signUp', { client } as { client: Client });
    }, 'Erro ao verificar o CPF');
    setIsSubmitting(false);
  }

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
            isDisabled={cpf.trim() === ''}
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
