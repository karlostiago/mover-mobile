import {VStack, Image, Center,Text, Heading, ScrollView} from 'native-base'
import {useNavigation} from "@react-navigation/native";

import {Input} from "@components/Input/Input";
import {Button} from "@components/Button/Button";

import BackgroungImg from '@assets/background.png'
import LogoSvg from '@assets/logo-mover.svg'

import {AuthNavigatorAuthProps} from '@routes/auth.routes';

export function Signin() {
    const navigation = useNavigation<AuthNavigatorAuthProps>();

    function handleNewAccount() {
        navigation.navigate('signUp');
    }

    return(
        <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}
        >

        <VStack flex={1} bg="gray.700">
            <Image
                source={BackgroungImg}
                defaultSource={BackgroungImg}
                alt="imagem da logo de carro"
                resizeMode="cover"
                position="absolute"
                width="100%"
                height="100%"
            />

            <VStack flex={1} px={10}>
                <Center my={20}>
                    <LogoSvg />
                </Center>

                <Center>
                    <Heading
                        color="gray.100"
                        fontSize="xl"
                        mb={6}
                        fontWeight="heading"
                    >
                        Acesse sua conta
                    </Heading>
                    <Input
                        placeholder="E-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Input
                        placeholder="Senha"
                        secureTextEntry
                    />
                    <Button
                        mt={4}
                        title='Acessar'
                    />
                </Center>

                <Center my={20}>

                    <Text
                        color='gray.100'
                        fontSize='sm'
                        fontFamily="body"
                    >
                        Ainda não tem acesso?
                    </Text>

                    <Button
                        mt={10}
                        title='Criar conta'
                        variant='outline'
                        onPress={handleNewAccount}
                    />

                </Center>
            </VStack>
        </VStack>
        </ScrollView>
    )
}


