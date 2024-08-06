import React, { useEffect } from 'react';
import { VStack, Center, Text, Heading, ScrollView, Checkbox, Box } from 'native-base';
import { useNavigation } from "@react-navigation/native";
import { Button } from "@components/Button/Button";
import { useLoadingState } from '@hooks/useLoadingState';
import { Client } from '@dtos/Client';
import { useCheckboxStates } from '@hooks/useCheckboxStates';
import { AuthNavigatorAuthProps } from "@routes/auth.routes";
import ClientService from '@services/clientApiService';

interface SignupProps {
  route: {
    params: {
      client: Client;
    };
  };
}

export function Signup({ route }: SignupProps) {
  const navigation = useNavigation<AuthNavigatorAuthProps>();
  const { client } = route.params;

  const { handleAsyncOperation, loading } = useLoadingState();
  const { checkboxStates, handleCheckboxChange } = useCheckboxStates({ receiveCodeByPhone: false, receiveCodeByEmail: false });

  const clientService = new ClientService();

  useEffect(() => {
    if (!client) {
      navigation.navigate('validationCodeScreenError');
    }
  }, [client, navigation]);

  async function sendSecurityCodeByEmail() {
    try {
      if (!client || !client.id || !client.email) {
        throw new Error('Parâmetros de cliente inválidos ou não definidos');
      }

      const modifiedEmail = client.email.replace(/\.com$/, '');

      await handleAsyncOperation(async () => {
        await clientService.sendSecurityCode(client.id, modifiedEmail);
      }, 'Erro ao enviar código de segurança por email');

      navigation.navigate('validationCodeScreen', { client });
    } catch (error) {
      navigation.navigate('validationCodeScreenError');
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg="green.600" px={10} pt={100}>
        <Box alignItems="flex-start">
          <Center>
            <Text
              fontSize="7xl"
              fontFamily="mono"
              color="white"
              mr={2}
            >
              m
            </Text>
          </Center>
          
          <Box mt={12} alignItems="flex-start"> {}
            <Heading color="gray.100" fontSize="4xl" mb={4}>
              Código de Validação
            </Heading>

            <Text fontFamily="body" color="gray.100" fontSize="lg" mb={6}>
              Selecione onde você quer receber o código.
            </Text>
            <VStack space={4} alignItems="flex-start">
              <Box>
                <Checkbox
                  value="email"
                  colorScheme="gray"
                  isChecked={checkboxStates.receiveCodeByEmail}
                  onChange={() => handleCheckboxChange('email')}
                >
                  <Text color="gray.100" fontSize="sm" textAlign="left">
                    E-mail: {client?.email}
                  </Text>
                </Checkbox>
              </Box>
            </VStack>
          </Box>
        </Box>

        <Center mt={4}>
          <Button
            title='Avançar'
            isDisabled={!checkboxStates.receiveCodeByEmail}
            onPress={sendSecurityCodeByEmail}
            isLoading={loading}
          />
        </Center>

        <Center mt={10}>
          <Text color="gray.100" fontSize="sm" textAlign="left">
            Obs.: O código pode demorar alguns segundos para chegar.
          </Text>
        </Center>
      </VStack>
    </ScrollView>
  );
}
