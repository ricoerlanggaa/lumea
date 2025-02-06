import { Cancel01Icon } from 'hugeicons-react';
import { ModalProps } from '@/types/components/organisms';
import { classNames } from '@/utilities/formats/string';

export default function Modal({ id, title, className, children, ...rest }: ModalProps) {
  const modalClasses = classNames('modal', className);
  return (
    <dialog id={id} className={modalClasses} {...rest}>
      <div className="modal-box">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-lg md:text-xl lg:text-2xl line-clamp-1">{title}</h2>
          <form method="dialog">
            <button
              type="submit"
              className="btn btn-sm btn-ghost btn-square"
              aria-label="close modal"
            >
              <Cancel01Icon size={20} />
            </button>
          </form>
        </div>
        <hr className="mb-4" />
        {children}
      </div>
      <form method="dialog" className="modal-backdrop bg-[#0006]">
        <button type="submit">close</button>
      </form>
    </dialog>
  );
}
