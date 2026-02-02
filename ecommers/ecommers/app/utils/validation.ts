import { VALIDATION } from '@/constants';

/**
 * Validate email address
 */
export const isValidEmail = (email: string): boolean => {
  return VALIDATION.EMAIL_REGEX.test(email);
};

/**
 * Validate password strength
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= VALIDATION.PASSWORD_MIN_LENGTH && VALIDATION.PASSWORD_REGEX.test(password);
};

/**
 * Get password strength level
 */
export const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' | 'very-strong' => {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[@$!%*?&]/.test(password)) strength++;

  if (strength <= 1) return 'weak';
  if (strength <= 2) return 'medium';
  if (strength <= 3) return 'strong';
  return 'very-strong';
};

/**
 * Validate phone number
 */
export const isValidPhone = (phone: string): boolean => {
  return VALIDATION.PHONE_REGEX.test(phone);
};

/**
 * Validate URL
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate credit card number (Luhn algorithm)
 */
export const isValidCreditCard = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\D/g, '');
  if (cleaned.length < 13 || cleaned.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

/**
 * Validate postal code
 */
export const isValidPostalCode = (postalCode: string, country: string = 'US'): boolean => {
  const patterns: Record<string, RegExp> = {
    US: /^\d{5}(-\d{4})?$/,
    CA: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
    UK: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
  };

  const pattern = patterns[country.toUpperCase()] || patterns.US;
  return pattern.test(postalCode);
};

/**
 * Validate file size
 */
export const isValidFileSize = (sizeInBytes: number, maxSizeInMB: number = 5): boolean => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return sizeInBytes <= maxSizeInBytes;
};

/**
 * Validate file type
 */
export const isValidFileType = (
  mimeType: string,
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/webp']
): boolean => {
  return allowedTypes.includes(mimeType);
};

/**
 * Validate minimum quantity order
 */
export const isValidMOQ = (quantity: number, moq: number): boolean => {
  return quantity >= moq;
};

/**
 * Validate price range
 */
export const isValidPriceRange = (min: number, max: number): boolean => {
  return min >= 0 && max >= 0 && min <= max;
};

/**
 * Validate username
 */
export const isValidUsername = (username: string): boolean => {
  // 3-20 alphanumeric characters, underscores, hyphens
  const pattern = /^[a-zA-Z0-9_-]{3,20}$/;
  return pattern.test(username);
};

/**
 * Validate company name
 */
export const isValidCompanyName = (name: string): boolean => {
  return name.length >= 2 && name.length <= 100;
};
