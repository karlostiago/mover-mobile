import { useState } from 'react';

export function useCheckboxStates(initialState: { receiveCodeByPhone: boolean, receiveCodeByEmail: boolean }) {
  const [checkboxStates, setCheckboxStates] = useState(initialState);

  function handleCheckboxChange(option: 'phone' | 'email') {
    const newCheckboxStates = {
      'phone': { receiveCodeByPhone: option === 'phone', receiveCodeByEmail: false },
      'email': { receiveCodeByPhone: false, receiveCodeByEmail: option === 'email' }
    };

    setCheckboxStates(newCheckboxStates[option]);
  }

  return {
    checkboxStates,
    handleCheckboxChange
  };
}
