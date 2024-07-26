import React, { useEffect } from 'react';
import { VStack, Image, Center, Text, Heading, ScrollView, Checkbox, Box } from 'native-base';
import { useNavigation } from "@react-navigation/native";
import { Button } from "@components/Button/Button";
import { useLoadingState } from '@hooks/useLoadingState';
import { Client } from '@dtos/Client';
import { useCheckboxStates } from '@hooks/useCheckboxStates';
import { AuthNavigatorAuthProps } from "@routes/auth.routes";
import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo-mover.svg';
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

      await handleAsyncOperation(async () => {
        await clientService.sendSecurityCode(client.id, client.email);
      }, 'Erro ao enviar código de segurança por email');

      navigation.navigate('validationCodeScreen', { client });
    } catch (error) {
      navigation.navigate('validationCodeScreenError');
    }
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
            <Heading
              color="gray.100"
              fontSize="xl"
              mb={6}
              fontWeight="bold"
            >
              Código de Validação
            </Heading>
          </Center>
          <Center>
              <Center>
                <Text color="gray.100" fontSize="md" textAlign="left" mb={6} width="90%" flexWrap="nowrap">
                          Selecione onde você quer receber o código:
                </Text>
             </Center>

            <VStack space={4} alignItems="flex-start">
            
              <Box>
                <Checkbox
                  value="email"
                  colorScheme="danger"
                  isChecked={checkboxStates.receiveCodeByEmail}
                  onChange={() => handleCheckboxChange('email')}
                >
                  <Text color="gray.100" fontSize="sm" textAlign="left">
                    E-mail: {client?.email}
                  </Text>
                </Checkbox>
              </Box>
            </VStack>
          </Center>

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
      </VStack>
    </ScrollView>
  );
}