import{Input as NativeBaseInput, IInputProps} from "native-base";

export function Input({...res} : IInputProps) {
    return(
        <NativeBaseInput
            bg='gray.700'
            h={14}
            px={4}
            borderWidth={0}
            fontSize="md"
            color="white"
            fontFamily="body"
            mb={4}
            placeholderTextColor="gray.300"
            _focus={{
                bg:'gray.700',
                borderColor: 'green.500',
                borderWidth: 1
            }}
            {...res}
        />
    );

}