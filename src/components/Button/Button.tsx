import { Button as ButtonNativeBase, Text, IButtonProps } from 'native-base';

type Props = IButtonProps & {
  title: string;
};

export function Button({ title, variant, ...rest }: Props) {
  return (
    <ButtonNativeBase
      w="full"
      h={16}
      bg={variant === 'outline' ? 'transparent' : 'white'}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor="white"
      rounded="lg"
      _pressed={{
        bg: variant === 'outline' ? 'gray.600' : 'gray.200',
      }}
      {...rest}
    >
      <Text
        color={variant === 'outline' ? 'green.600' : '#47B051'}
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
}
