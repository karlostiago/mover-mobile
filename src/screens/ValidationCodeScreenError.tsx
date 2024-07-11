import React from 'react';
import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo-mover.svg';
import { VStack, Center, Text, Button, Image } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorAuthProps } from '@routes/auth.routes';

export function ValidationCodeScreenError() {
    const navigation = useNavigation<AuthNavigatorAuthProps>(); // Usando AuthNavigatorAuthProps como tipo genérico para useNavigation

    function handleGoBack() {
        navigation.navigate('signIn');
    }

    return (
        <VStack flex={1} bg="gray.700">
            <Center position="absolute" width="100%" height="100%">
                <Image
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
                    alt="Imagem de fundo"
                    resizeMode="cover"
                    width="100%"
                    height="100%"
                />
            </Center>
            <VStack flex={1} px={10} justifyContent="center" alignItems="center">
                <Center my={20}>
                    <LogoSvg />
                </Center>
                <Center>
                    <Text color="gray.100" fontSize="xl" mb={4} fontWeight="bold">
                        Código de autenticação incorreto
                    </Text>
                    <Text color="gray.100" fontSize="md" textAlign="center" mb={6}>
                        Verifique o código e tente novamente.
                    </Text>
                </Center>
                <Center>
                    <Button
                        variant="outline"
                        colorScheme="danger"
                        onPress={handleGoBack}
                    >
                        Voltar
                    </Button>
                </Center>
            </VStack>
        </VStack>
    );
}
