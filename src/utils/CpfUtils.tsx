import React, { useState } from 'react';
import { VStack, Input, Button } from 'native-base';

interface MaskCpfProps {
  onNext: (cpf: string) => void; // Defina corretamente o tipo de onNext
}

const MaskCpf: React.FC<MaskCpfProps> = ({ onNext }) => {
  const [cpf, setCpf] = useState('');
  const [cpfValid, setCpfValid] = useState(false);

  const handleCpfChange = (value: string) => {
    // Remove caracteres não numéricos
    const formattedCpf = value.replace(/\D/g, '');

    // Completa o CPF com pontos e traço
    let formattedCpfWithMask = '';
    if (formattedCpf.length >= 3) {
      formattedCpfWithMask += formattedCpf.substring(0, 3) + '.';
    }
    if (formattedCpf.length >= 6) {
      formattedCpfWithMask += formattedCpf.substring(3, 6) + '.';
    }
    if (formattedCpf.length >= 9) {
      formattedCpfWithMask += formattedCpf.substring(6, 9) + '-';
    }
    if (formattedCpf.length >= 11) {
      formattedCpfWithMask += formattedCpf.substring(9, 11);
    }

    // Atualiza o estado do CPF formatado
    setCpf(formattedCpfWithMask);

    // Verifica se o CPF é válido (apenas se tiver 11 dígitos)
    setCpfValid(formattedCpf.length === 11);
  };

  const handleNext = () => {
    if (cpfValid) {
      onNext(cpf);
    }
  };

  return (
    <VStack space={4} alignItems="center">
      <Input
        placeholder="CPF"
        keyboardType="numeric"
        onChangeText={handleCpfChange}
        value={cpf}
        autoCapitalize="none"
        autoComplete="off"
        maxLength={14} // Define o máximo de caracteres permitidos para CPF com máscara
      />
      <Button onPress={handleNext} disabled={!cpfValid}>
        Próximo
      </Button>
    </VStack>
  );
};

export default MaskCpf;
