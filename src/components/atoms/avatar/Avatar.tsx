import Image from 'next/image';
import { classNames, getInitials } from '@/utilities/formats/string';
import type { AvatarProps, AvatarShape, AvatarSize } from './Avatar.d';

const shapeClasses: Record<AvatarShape, string> = {
  square: 'rounded',
  circle: 'rounded-full',
  squircle: 'mask mask-squircle',
  hexagon: 'mask mask-hexagon',
  triangle: 'mask mask-triangle',
};
const sizeClasses: Record<AvatarSize, string> = {
  sm: 'w-8',
  md: 'w-10',
  lg: 'w-16',
};
const textSizeClasses: Record<AvatarSize, string> = {
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-2xl',
};

export default function Avatar({
  imageSrc,
  imageAlt = 'square',
  shape = 'circle',
  size = 'md',
  name,
  className,
  ...rest
}: AvatarProps) {
  const rootClasses = classNames('avatar', !imageSrc && 'placeholder');
  const childClasses = classNames(
    shapeClasses[shape],
    sizeClasses[size],
    !imageSrc && 'bg-neutral text-neutral-content',
    className,
  );
  return (
    <div className={rootClasses}>
      <div className={childClasses} {...rest}>
        {imageSrc ? (
          <Image src={imageSrc} alt={imageAlt} />
        ) : (
          <span className={textSizeClasses[size]}>{getInitials(name)}</span>
        )}
      </div>
    </div>
  );
}
