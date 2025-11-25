import React, { useRef, useEffect } from 'react';

type ModalSize = 'small' | 'medium' | 'large';
type ModalPosition = 'center' | 'top' | 'bottom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeButtonLabel?: string;
  overlayColor?: string;
  contentBgColor?: string;
  width?: ModalSize;
  position?: ModalPosition;
  style?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
};

const getSizeStyle = (size: ModalSize) => {
  switch (size) {
    case 'small': return { width: '320px', maxWidth: '92%' };
    case 'large': return { width: '720px', maxWidth: '98%' };
    default: return { width: '500px', maxWidth: '98%' };
  }
};

const getPositionStyle = (position: ModalPosition) => {
  switch (position) {
    case 'top': return { alignItems: 'flex-start' };
    case 'bottom': return { alignItems: 'flex-end' };
    default: return { alignItems: 'center' };
  }
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  showCloseButton = true,
  closeButtonLabel = 'x',
  overlayColor = 'rgba(0,0,0,0.5)',
  contentBgColor = '#fff',
  width = 'medium',
  position = 'center',
  style = {},
  contentStyle = {}
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Trap focus
  useEffect(() => {
    if (!isOpen) return;
    const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (!focusable || focusable.length === 0) return;
      // cycle focus
      if (event.key === 'Tab') {
        const firstEl = focusable[0];
        const lastEl = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === firstEl) {
          event.preventDefault();
          lastEl.focus();
        } else if (!event.shiftKey && document.activeElement === lastEl) {
          event.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Dismiss on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: overlayColor,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 9999,
        ...getPositionStyle(position),
        ...style
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        style={{
          background: contentBgColor,
          borderRadius: '10px',
          padding: '2em 1.5em 1.5em 1.5em',
          boxShadow: '0 10px 32px rgba(0,0,0,0.20)',
          position: 'relative',
          outline: 0,
          ...getSizeStyle(width),
          ...contentStyle
        }}
      >
        {showCloseButton && (
          <button
            aria-label="Close modal"
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 10,
              right: 14,
              fontSize: 28,
              background: 'transparent',
              color: '#444',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {closeButtonLabel}
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
