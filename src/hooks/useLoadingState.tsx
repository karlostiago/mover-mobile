import { useState } from 'react';

export function useLoadingState() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAsyncOperation = async (asyncFunction: () => Promise<any>, errorMessageOverride?: string) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      await asyncFunction();
    } catch (error: any) {
      setErrorMessage(error.message || errorMessageOverride || 'Erro durante a operação assíncrona');
    } finally {
      setLoading(false);
    }
  };

  return { loading, errorMessage, handleAsyncOperation };
}
