import { CardProps } from '@/types/components/organisms';
import { classNames } from '@/utilities/formats/string';

export default function Card({ title, className, children, ...rest }: CardProps) {
  const cardClasses = classNames('card bg-base-100', className);
  return (
    <section className={cardClasses} {...rest}>
      <div className="card-body">
        <h2 className="card-title text-lg md:text-xl lg:text-2xl line-clamp-1 mb-2">{title}</h2>
        <hr className="mb-4" />
        {children}
      </div>
    </section>
  );
}
