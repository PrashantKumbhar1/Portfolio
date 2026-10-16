import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';

export function Modal({ children, label, onClose, className = '' }: { children: ReactNode; label: string; onClose: () => void; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const prior = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.showModal();
    return () => {
      ref.current?.close();
      document.body.style.overflow = previousOverflow;
      prior?.focus({ preventScroll: true });
    };
  }, []);
  return <dialog ref={ref} className={`modal ${className}`} aria-label={label} onCancel={event => { event.preventDefault(); closeRef.current(); }} onClick={event => { if (event.target === event.currentTarget) closeRef.current(); }}><div className="modal-inner"><button className="modal-close icon-button" aria-label="Close dialog" onClick={onClose}><X size={21}/></button>{children}</div></dialog>;
}
