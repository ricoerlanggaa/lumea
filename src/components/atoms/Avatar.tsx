import Image from 'next/image';
import { classNames, getInitials } from '@/utilities/formats/string';
import type { AvatarProps, AvatarShape, AvatarSize } from '@/types/components/atoms';

const shapeClasses: Record<AvatarShape, string> = {
  square: 'rounded',
  circle: 'rounded-full',
  squircle: 'mask mask-squircle',
  hexagon: 'mask mask-hexagon',
  triangle: 'mask mask-triangle',
};
const sizeClasses: Record<AvatarSize, string> = {
  sm: 'w-10',
  md: 'w-16',
  lg: 'w-20',
};
const textSizeClasses: Record<AvatarSize, string> = {
  sm: 'text-md',
  md: 'text-2xl',
  lg: 'text-3xl',
};
const imageSize: Record<AvatarSize, number> = {
  sm: 40,
  md: 64,
  lg: 80,
};

export default function Avatar({
  shape = 'circle',
  size = 'md',
  alt,
  src,
  className,
  ...rest
}: AvatarProps) {
  const avatarClasses = classNames('avatar', !src && 'placeholder');
  const contentClasses = classNames(
    shapeClasses[shape],
    sizeClasses[size],
    !src && 'bg-neutral text-neutral-content',
    className,
  );
  return (
    <div className={avatarClasses}>
      <div className={contentClasses} {...rest}>
        {src ? (
          <Image src={src} alt={alt ?? 'avatar'} width={imageSize[size]} height={imageSize[size]} />
        ) : (
          <span className={textSizeClasses[size]}>{getInitials(alt)}</span>
        )}
      </div>
    </div>
  );
}
