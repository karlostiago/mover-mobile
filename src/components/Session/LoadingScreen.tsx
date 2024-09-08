import React from 'react';
import { Center, Spinner, Text } from 'native-base';

const LoadingScreen = () => (
  <Center flex={1} bg="green.600">
    <Spinner color="white" />
    <Text color="white" mt={4}>Carregando</Text>
  </Center>
);

export default LoadingScreen;
