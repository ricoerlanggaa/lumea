import { CardBackgroundColor, CardProps } from '@/types/components/organisms';
import { classNames } from '@/utilities/formats/string';

const bgColorClasses: Record<CardBackgroundColor, string> = {
  base: 'bg-base-100 text-base-content',
  primary: 'bg-primary text-primary-content',
};
export default function Card({ title, bgColor = 'base', className, children, ...rest }: CardProps) {
  const cardClasses = classNames('card', bgColorClasses[bgColor]);
  const cardBodyClasses = classNames('card-body', className);
  return (
    <section className={cardClasses}>
      <div className={cardBodyClasses} {...rest}>
        {title && (
          <>
            <h2 className="card-title text-lg md:text-xl lg:text-2xl line-clamp-1 mb-2">{title}</h2>
            <hr className="mb-4" />
          </>
        )}
        {children}
      </div>
    </section>
  );
}
