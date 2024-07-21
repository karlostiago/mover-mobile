import React, { useState } from 'react';
import { VStack, Image, Center, Heading, ScrollView, Box, Text } from 'native-base';
import { Input } from '@components/Input/Input';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorAuthProps } from '@routes/auth.routes';
import { Button } from '@components/Button/Button';
import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo-mover.svg';

export function PasswordSetupScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation<AuthNavigatorAuthProps>();

  function handleCreateAccount() {
    if (password !== confirmPassword) {
      alert('As senhas não correspondem. Tente novamente.');
      return;
    }
      navigation.navigate('signIn');
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg="gray.700">
        <Box position="absolute" width="100%" height="100%">
          <Image
            source={BackgroundImg}
            defaultSource={BackgroundImg}
            alt="Imagem de fundo"
            resizeMode="cover"
            width="100%"
            height="100%"
          />
        </Box>
        <VStack flex={1} px={10} justifyContent="center">
          <Center my={20}>
            <LogoSvg />
          </Center>
          <Center>
            <Heading color="gray.100" fontSize="xl" mb={6} fontWeight="bold">
              Definição de senha
            </Heading>
            <Text color="gray.100" fontSize="md" textAlign="center" mb={6}>
              Crie uma senha para acessar seu aplicativo Mover Frota
            </Text>
          </Center>
          <Center>
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
          </Center>
          <Center mt={4}>
            <Button
              title='Criar Conta'
              onPress={handleCreateAccount}
              bg="green.500"
              _pressed={{ bg: 'greey.700' }}
            />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
