import React, { useState } from 'react';
import LogoSvg from '@assets/logo-mover.svg';
import { VStack, Image, Center, Text, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorAuthProps } from '@routes/auth.routes';
import { Button } from '@components/Button/Button';
import BackgroundImg from '@assets/background.png';
import ErrorModal from '@components/ErrorModalComponent/ErrorModal';

export function ScreenPasswordError() {
  const navigation = useNavigation<AuthNavigatorAuthProps>();
  const [showErrorModal, setShowErrorModal] = useState(true);

  function handleGoBack() {
    navigation.navigate('passwordSetupScreen');
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg="gray.700" justifyContent="center">
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
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
            <Text color="gray.100" fontSize="md" textAlign="center" mb={6}>
              Senhas não conferem.
            </Text>
          </Center>

          <Button
            title='Voltar'
            variant='outline'
            mt={10}
            onPress={handleGoBack}
          />
        </VStack>

        <ErrorModal
          isVisible={showErrorModal}
          message="Verifique as senhas e tente novamente."
          onClose={() => setShowErrorModal(false)}
        />
      </VStack>
    </ScrollView>
  );
}
