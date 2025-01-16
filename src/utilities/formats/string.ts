type ClassNames =
  | string
  | number
  | boolean
  | null
  | undefined
  | Record<string, boolean | undefined>
  | ClassNames[];

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

export function getInitials(value: string | undefined) {
  if (!value) return '';
  const words = value.trim().split(/\s+/);
  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
}
