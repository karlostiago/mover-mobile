import {Center, Heading, VStack} from "native-base";

type Props = {
    title:string;
}

export function ScreeanHeader({title}: Props) {
    return(
       <Center
           bg="green.600"
           pb={6}
           pt={16}
       >
            <Heading
                color="gray.100"
                fontSize="xl"
                fontFamily="heading"
            >
                {title}
            </Heading>
       </Center>
    );
}