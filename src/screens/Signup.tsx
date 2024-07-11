
import BackgroundImg from '@assets/background.png';
import ClientService from '@services/clientApiService';
import LogoSvg from '@assets/logo-mover.svg';
import React, { useEffect } from 'react';
import { VStack, Image, Center, Text, Heading, ScrollView, Checkbox, Box } from 'native-base';
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorAuthProps } from "@routes/auth.routes";
import { Button } from "@components/Button/Button";
import { useLoadingState } from '@hooks/useLoadingState';
import { ClientProps } from './Signin';
import { useCheckboxStates } from '@hooks/useCheckboxStates';


interface SignupProps {
  route: {
    params?: ClientProps;
  };
}

export function Signup({ route }: SignupProps) {

  const navigation = useNavigation<AuthNavigatorAuthProps>();
  const { client } = route.params as ClientProps;

  const { handleAsyncOperation } = useLoadingState();
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
      console.error('Erro ao enviar código por email:', error);
      navigation.navigate('validationCodeScreenError');
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg="gray.700">
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Imagem da logo de carro"
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
            <Text color="gray.100" fontSize="md" textAlign="left" mb={4}>
              Selecione por onde você quer receber o código:
            </Text>

            <VStack space={4} alignItems="flex-start">
              <Box>
                <Checkbox
                  value="phone"
                  colorScheme="danger"
                  isChecked={checkboxStates.receiveCodeByPhone}
                  onChange={() => handleCheckboxChange('phone')}
                >
                  <Text color="gray.100" fontSize="sm" textAlign="left">
                    Telefone {client?.number}
                  </Text>
                </Checkbox>
              </Box>

              <Box>
                <Checkbox
                  value="email"
                  colorScheme="danger"
                  isChecked={checkboxStates.receiveCodeByEmail}
                  onChange={() => handleCheckboxChange('email')}
                >
                  <Text color="gray.100" fontSize="sm" textAlign="left">
                    E-mail {client?.email}
                  </Text>
                </Checkbox>
              </Box>
            </VStack>
          </Center>

          <Center mt={4}>
            <Button
              title='Avançar'
              onPress={sendSecurityCodeByEmail}
            />
          </Center>

          <Center mt={4}>
            <Text color="gray.100" fontSize="sm" textAlign="left">
              Obs.: O código pode demorar alguns segundos para chegar.
            </Text>
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
