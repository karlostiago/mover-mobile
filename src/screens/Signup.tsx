import {VStack, Image, Center,Text, Heading, ScrollView} from 'native-base'
import {Input} from "@components/Input/Input";
import {Button} from "@components/Button/Button";
import BackgroungImg from '@assets/background.png'
import LogoSvg from '@assets/logo-mover.svg'
import {useNavigation} from "@react-navigation/native";
import {AuthNavigatorAuthProps} from "@routes/auth.routes";

export function Signup() {
    const navigation = useNavigation<AuthNavigatorAuthProps>();

    function handleGoBack() {
        navigation.navigate('signIn');
    }

    return(
        <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
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
                <Center
                    my={20}>
                    <LogoSvg/>
                </Center>

                <Center>
                    <Heading
                        color="gray.100"
                        fontSize="xl"
                        mb={6}
                        fontWeight="heading"
                    >
                        Crie sua conta
                    </Heading>

                    <Input
                        placeholder="Nome"
                    />

                    <Input
                        placeholder="E-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Input
                        placeholder="Senha"
                        secureTextEntry
                    />

                    <Input
                        placeholder="CPF"
                    />

                    <Button
                        mt={4}
                        title='Criar e acessar'
                    />
                </Center>

                <Button
                    title='Voltar para o login'
                    variant='outline'
                    mt={10}
                    onPress={handleGoBack}
                />

            </VStack>
        </VStack>
        </ScrollView>
    )
}


