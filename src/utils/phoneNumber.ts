type ValidateMobileResult =
  | { valid: true }
  | { valid: false; reason: 'length' | 'format' };

export const validateMobile010 = (phoneNumber: string): ValidateMobileResult => {
  const digits = phoneNumber.replace(/\D/g, '');

  if (digits.length !== 11) {
    return { valid: false, reason: 'length' };
  }

  if (!digits.startsWith('010')) {
    return { valid: false, reason: 'format' };
  }

  return { valid: true };
};
