import React from 'react';
import { Checkbox, Center } from 'native-base';

interface EmailCheckboxProps {
  isChecked: boolean;
  onChange: () => void;
}

export const EmailCheckbox: React.FC<EmailCheckboxProps> = ({ isChecked, onChange }) => {
  return (
    <Center>
      <Checkbox
        isChecked={isChecked}
        onChange={onChange}
        value="email"
        colorScheme="green"
      >
        Receber código por e-mail
      </Checkbox>
    </Center>
  );
};
