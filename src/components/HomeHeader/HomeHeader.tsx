import {Heading, HStack, Text, VStack, Icon} from "native-base";
import {UserPhoto} from "@components/UserPhoto/UserPhoto";
import {MaterialIcons} from '@expo/vector-icons';
import {TouchableOpacity} from "react-native";

export function HomeHeader() {
    return (
      <HStack bg="green.600" pt={16} pb={5} px={8} alignItems="center">
          <UserPhoto
              source={{uri: 'https://w7.pngwing.com/pngs/993/884/png-transparent-sword-of-the-berserk-guts-rage-casca-griffith-berserk.png'}}
              alt="imagem do usuario"
              size={16}
              mr={4}
          />
          <VStack flex={1}>
          <Text color="gray.100" fontSize="md">
              Olá,
          </Text>

          <Heading color="gray.100">
              Fulano de tal
          </Heading>

          </VStack>
          <TouchableOpacity>
              <Icon
                  as={MaterialIcons}
                  name="logout"
                  color="gray.200"
                  size={7}
              />
          </TouchableOpacity>

      </HStack>
    );
}