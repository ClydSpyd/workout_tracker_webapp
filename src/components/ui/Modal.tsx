import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';
import useOutsideClick from '../../hooks/useOutsideClick';

interface ModalProps {
  /** Large title, e.g. "BUILD YOUR SESSION". */
  mainHeading: string;
  /** Small eyebrow label above the title, e.g. "ADD EXERCISE". */
  subHeading: string;
  /** Optional supporting line under the title. */
  description?: string;
  /** Called once when the modal mounts. */
  onOpen?: () => void;
  /** Called when the user dismisses the modal (backdrop, Escape, or close button). */
  onClose?: () => void;
  children?: ReactNode;
}

/**
 * Reusable modal: renders a centered, slide-up panel over a dimmed backdrop.
 * Visibility is controlled by the parent mounting/unmounting this component;
 * `onClose` fires when the user requests dismissal so the parent can unmount it.
 */
export default function Modal({
  mainHeading,
  subHeading,
  description,
  onOpen,
  onClose,
  children,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  const handleClose = () => onClose?.();
  useOutsideClick(panelRef, handleClose);

  // Fire onOpen once, lock body scroll, and close on Escape while mounted.
  useEffect(() => {
    onOpen?.();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div
      className="animate-modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={mainHeading}
    >
      <div
        ref={panelRef}
        className="animate-modal-panel flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[var(--contrast-one)] bg-[var(--dark-two)] text-white shadow-2xl"
      >
        {/* Header */}
        <div className="relative border-b border-[var(--contrast-one)] px-8 py-6">
          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--contrast-one)] text-[var(--contrast-three)] transition-colors hover:border-[var(--accent-primary)] hover:text-white"
          >
            <FiX className="text-xl" />
          </button>

          <p className="space-mono text-xs uppercase tracking-wide text-[var(--accent-primary)]">
            {subHeading}
          </p>
          <h2 className="mt-1 heading-three pr-12">{mainHeading}</h2>
          {description && (
            <p className="mt-2 body-text text-sm! text-[var(--contrast-three)]">
              {description}
            </p>
          )}
        </div>

        {/* Case-by-case content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
