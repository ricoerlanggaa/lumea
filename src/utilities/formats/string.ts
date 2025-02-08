import { ClassNames } from '@/types/utilities/formats';

export function classNames(...args: ClassNames[]): string {
  return args
    .reduce<string[]>((result, value) => {
      if (typeof value === 'string' || typeof value === 'number') {
        return result.concat(String(value));
      }
      if (Array.isArray(value)) {
        return result.concat(classNames(...value));
      }
      if (typeof value === 'object' && value !== null) {
        return result.concat(
          Object.entries(value)
            .filter(([, isActive]) => isActive)
            .map(([className]) => className),
        );
      }

      return result;
    }, [])
    .filter(Boolean)
    .join(' ');
}

export function getInitials(value?: string) {
  if (!value) return '';
  const words = value.trim().split(/\s+/);
  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
}

export function formatPhoneNumber(phoneNumber?: string): string {
  if (!phoneNumber) return '';
  let normalizedNumber = phoneNumber.trim();

  if (normalizedNumber.startsWith('0')) {
    normalizedNumber = `+62${normalizedNumber.slice(1)}`;
  } else if (normalizedNumber.startsWith('62')) {
    normalizedNumber = `+62${normalizedNumber.slice(2)}`;
  }

  const phoneRegex = /^\+62\d{9,13}$/;
  if (!phoneRegex.test(normalizedNumber)) {
    throw new Error('Invalid phone number');
  }
  const formattedNumber = normalizedNumber.replace(/(\+62)(\d{3})(\d{3,4})(\d{4,})/, '$1 $2-$3-$4');

  return formattedNumber;
}
