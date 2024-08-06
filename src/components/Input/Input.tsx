import { Input as NativeBaseInput, IInputProps } from "native-base";

export function Input({ ...res }: IInputProps) {
    return (
        <NativeBaseInput
            bg="rgba(107, 195, 132, 0.7)"
            h={16}
            px={4}
            borderWidth={0}
            fontSize="md"
            color="white"
            fontFamily="body"
           
            placeholderTextColor="white"
            rounded="lg"
            _focus={{
                bg: 'rgba(107, 195, 132, 0.7)',
                borderColor: 'green.500',
                borderWidth: 1
            }}
            {...res}
        />
    );
}
