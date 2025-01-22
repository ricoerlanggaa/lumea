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

export default function Avatar({
  shape = 'circle',
  size = 'md',
  altText = 'Avatar',
  imageSrc,
  className,
  ...rest
}: AvatarProps) {
  const avatarClasses = classNames('avatar', !imageSrc && 'placeholder');
  const childClasses = classNames(
    shapeClasses[shape],
    sizeClasses[size],
    !imageSrc && 'bg-neutral text-neutral-content',
    className,
  );
  return (
    <div className={avatarClasses}>
      <div className={childClasses} {...rest}>
        {imageSrc ? (
          <Image src={imageSrc} alt={altText} />
        ) : (
          <span className={textSizeClasses[size]}>{getInitials(altText)}</span>
        )}
      </div>
    </div>
  );
}
