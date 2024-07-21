import React from 'react';
import { VStack, Center, Text, Button, Image, Box } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorAuthProps } from '@routes/auth.routes';
import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo-mover.svg';

export function ValidationCodeScreenError() {
  const navigation = useNavigation<AuthNavigatorAuthProps>();

  function handleGoBack() {
    navigation.navigate('signIn');
  }

  return (
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
      <VStack flex={1} justifyContent="center" alignItems="center" p={10}>
        <Center mt={20}>
          <LogoSvg width={200} height={140} />
        </Center>
        <Center>
          <Text color="gray.100" fontSize="3xl" fontWeight="bold" mb={4}>
            Código de autenticação incorreto
          </Text>
          <Text color="gray.100" fontSize="lg" textAlign="center" mb={6}>
            Verifique o código e tente novamente.
          </Text>
        </Center>
        <Center mt={8} width="100%" maxWidth={400}>
          <Button
            variant="outline"
            colorScheme="danger"
            onPress={handleGoBack}
            size="lg"
            width="100%"
          >
            Voltar
          </Button>
        </Center>
      </VStack>
    </VStack>
  );
}
