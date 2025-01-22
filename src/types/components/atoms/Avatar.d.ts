import type { HTMLAttributes } from 'react';

export type AvatarShape = 'square' | 'circle' | 'squircle' | 'hexagon' | 'triangle';
export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  imageSrc?: string;
  altText?: string;
  shape?: AvatarShape;
  size?: AvatarSize;
}
