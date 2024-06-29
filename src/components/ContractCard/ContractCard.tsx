import {TouchableOpacity, TouchableOpacityProps} from "react-native";
import {Heading, HStack, Image, Text, VStack, Icon} from "native-base";
import {Entypo} from '@expo/vector-icons';

type Props = TouchableOpacityProps & {

};

export function ContractCard({...rest}: Props) {
    return (
        <TouchableOpacity {...rest}>
            <HStack bg="gray.500" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
                <Image
                    w={16}
                    h={16}
                    marginTop={1}
                    alt="Imagem do contrato"
                    resizeMode="center"
                    rounded="md"
                    mr={4}
                    source={{uri: 'https://img.freepik.com/premium-vector/vector-illustration-contract-agreement-icon_550971-184.jpg'}}
                />

                <VStack flex={1}>
                    <Heading marginTop={1} fontSize="lg" color="white">
                        Contrato #9832
                    </Heading>

                    <Text marginTop={1} fontSize="sm" color="gray.200" mt={1}>
                        Contrato do carro Kiwid
                        aluguel do carro feito pelo Fulano de tal.
                        mais detalhes .....
                    </Text>
                </VStack>

                <Icon as={Entypo} name="chevron-thin-right" color="gray.300"/>
            </HStack>
        </TouchableOpacity>
    )
}