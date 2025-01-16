import { HTMLAttributes } from 'react';

type AvatarShape = 'square' | 'circle' | 'squircle' | 'hexagon' | 'triangle';
type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  imageSrc?: string;
  imageAlt?: string;
  shape?: AvatarShape;
  size?: AvatarSize;
  name?: string;
}
