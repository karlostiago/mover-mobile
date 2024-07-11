import React from 'react';
import LogoSvg from '@assets/logo-mover.svg';
import { VStack, Image, Center, Text, Heading, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorAuthProps } from '@routes/auth.routes';
import { Button } from '@components/Button/Button';
import BackgroungImg from '@assets/background.png';

export function BackScreen() {
    const navigation = useNavigation<AuthNavigatorAuthProps>();

    function handleGoBack() {
        navigation.navigate('signIn');
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack flex={1} bg="gray.700" justifyContent="center">

                <Image
                    source={BackgroungImg}
                    defaultSource={BackgroungImg}
                    alt="imagem da logo de carro"
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
                            fontWeight="heading"
                            textAlign="center"
                        >
                            Dados do cliente não encontrados.
                        </Heading>

                        <Text color="gray.100" fontSize="md" textAlign="center" mb={6}>
                            Verifique seu CPF e tente novamente.
                        </Text>
                    </Center>

                    <Button
                        title='Voltar'
                        variant='outline'
                        mt={10}
                        onPress={handleGoBack}
                    />

                </VStack>
            </VStack>
        </ScrollView>
    );
}
