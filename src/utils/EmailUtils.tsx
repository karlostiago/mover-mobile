/**
 * Mascarar parte do e-mail para ocultar o meio.
 *
 * @param email O endereço de e-mail a ser mascarado.
 * @returns O e-mail mascarado.
 */
export const maskEmail = (email) => {
    if (!email) return '';
  
    const [localPart, domain] = email.split('@');
    if (!localPart || !domain) return email; // Caso não tenha formato de e-mail válido
  
    // Se o localPart tiver mais de 2 caracteres, mascara o meio
    const maskedLocalPart =
      localPart.length > 2
        ? localPart[0] + '***' + localPart[localPart.length - 1]
        : localPart;
  
    return `${maskedLocalPart}@${domain}`;
  };
  